/**
 * scripts/prerender.tsx
 *
 * Second half of `npm run build`. Runs after vite build has emitted one HTML file
 * per route via vite-plugin-ssg-meta, then replaces the hand-written crawlable
 * stub with the REAL server-rendered markup of that page.
 *
 * Why this exists:
 *   The site is a Vite + React SPA. The static HTML used to carry a ~150-word
 *   text stub while the actual page (1,700+ words on the homepage) was rendered
 *   in the browser. Crawlers that do not execute JavaScript — GPTBot, ClaudeBot,
 *   PerplexityBot, CCBot — only ever saw the stub.
 *
 *   After this step, the static HTML contains the full page: its real <h2>/<h3>
 *   outline, its images, and its internal links. Browsers are unaffected, because
 *   client/src/main.tsx mounts with createRoot(), which replaces this markup on
 *   load exactly as it replaced the stub before.
 *
 * Browsers and Googlebot see no change via JS. Everything else gains the page.
 */
import fs from "node:fs";
import path from "node:path";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { renderToStaticMarkup } from "react-dom/server";
import superjson from "superjson";
import { Router } from "wouter";
import App from "../client/src/App";
import { trpc } from "../client/src/lib/trpc";
import { ROUTE_META } from "../server/meta";
import { SSG_BODY_END, SSG_BODY_START, SSG_ROUTES } from "../vite-plugin-ssg-meta";

const OUT_DIR = path.resolve(process.cwd(), "dist", "public");

function htmlPathFor(route: string): string {
  const segments = route.split("/").filter(Boolean);
  return segments.length === 0
    ? path.join(OUT_DIR, "index.html")
    : path.join(OUT_DIR, ...segments, "index.html");
}

function visibleWords(html: string): number {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
}

// A route that rendered a 404 or hit the error boundary would ship a broken page,
// so treat an implausibly small render as a hard failure rather than guessing.
// Noindex pages (currently only /start, which is mostly a form) legitimately
// carry less copy than a content page.
const MIN_RENDERED_WORDS = 60;
const MIN_RENDERED_WORDS_NOINDEX = 20;
const minWordsFor = (route: string) =>
  ROUTE_META[route]?.noindex ? MIN_RENDERED_WORDS_NOINDEX : MIN_RENDERED_WORDS;

type Row = { route: string; before: number; after: number; headings: number };
const rows: Row[] = [];
const failures: string[] = [];

for (const route of SSG_ROUTES) {
  const file = htmlPathFor(route);
  if (!fs.existsSync(file)) {
    failures.push(`${route}: ${path.relative(OUT_DIR, file)} does not exist — did the SSG plugin run?`);
    continue;
  }

  let markup: string;
  try {
    // Mirror the provider stack from client/src/main.tsx. Pages that call tRPC
    // hooks during render (currently /start) throw without it. Queries are not
    // prefetched, so nothing hits the network here — hooks just return their
    // loading state, which is the correct server render.
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
    });
    const trpcClient = trpc.createClient({
      links: [httpBatchLink({ url: "/api/trpc", transformer: superjson })],
    });

    markup = renderToStaticMarkup(
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Router ssrPath={route}>
            <App />
          </Router>
        </QueryClientProvider>
      </trpc.Provider>,
    );
  } catch (error) {
    failures.push(`${route}: render threw — ${(error as Error).message}`);
    continue;
  }

  // React re-creates these on the client. Leaving them in the static HTML would
  // risk double-executing analytics or mounting a second toast container.
  const safeMarkup = markup.replace(/<script[\s\S]*?<\/script>/gi, "");

  const renderedWords = visibleWords(safeMarkup);
  if (renderedWords < minWordsFor(route)) {
    failures.push(`${route}: rendered only ${renderedWords} words — likely a 404 or error boundary`);
    continue;
  }

  const html = fs.readFileSync(file, "utf-8");
  const start = html.indexOf(SSG_BODY_START);
  const end = html.indexOf(SSG_BODY_END);
  if (start === -1 || end === -1 || end < start) {
    failures.push(`${route}: SSG body markers not found — refusing to overwrite`);
    continue;
  }

  const before = visibleWords(html);
  const next = `${html.slice(0, start)}${safeMarkup}${html.slice(end + SSG_BODY_END.length)}`;
  fs.writeFileSync(file, next, "utf-8");

  rows.push({
    route,
    before,
    after: visibleWords(next),
    headings: (safeMarkup.match(/<h[2-6][\s>]/gi) || []).length,
  });
}

// ─── Report ───────────────────────────────────────────────────────────────────

const pad = (value: string, width: number) => value.padEnd(width, " ");
console.log("\n[prerender] real page markup written into static HTML\n");
console.log(`  ${pad("route", 50)} ${"was".padStart(6)} ${"now".padStart(7)} ${"h2-h6".padStart(7)}`);
for (const row of rows) {
  console.log(
    `  ${pad(row.route, 50)} ${String(row.before).padStart(6)} ${String(row.after).padStart(7)} ${String(row.headings).padStart(7)}`,
  );
}
const totalBefore = rows.reduce((sum, row) => sum + row.before, 0);
const totalAfter = rows.reduce((sum, row) => sum + row.after, 0);
const totalHeadings = rows.reduce((sum, row) => sum + row.headings, 0);
console.log(
  `  ${pad("TOTAL", 50)} ${String(totalBefore).padStart(6)} ${String(totalAfter).padStart(7)} ${String(totalHeadings).padStart(7)}`,
);

if (failures.length > 0) {
  console.error(`\n[prerender] FAILED for ${failures.length} route(s):`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`\n[prerender] ${rows.length} routes prerendered.\n`);
