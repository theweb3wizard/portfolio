/**
 * Cross-registry slug check.
 *
 * An insight article has to be registered in six places. A typo in any one of
 * them produces a page that either 404s, ships without a canonical, ships
 * without schema, or is missing from the sitemap. None of those fail the build.
 *
 * This script extracts the slug from each registry as text and asserts that all
 * six agree. Run it after adding or renaming any article.
 *
 *   node scripts/_check-slugs.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const read = (file) => fs.readFileSync(path.join(ROOT, file), "utf-8");

const failures = [];
const notes = [];

function unique(list) {
  return [...new Set(list)];
}

/** Slugs declared in client/src/site.ts (the canonical publishing list). */
function siteSlugs() {
  const text = read("client/src/site.ts");
  const start = text.indexOf("export const insights: Insight[] = [");
  const end = text.indexOf("\n];", start);
  const block = text.slice(start, end);
  return unique([...block.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]));
}

/** Slugs that have a rendered body component. */
function bodySlugs() {
  const text = read("client/src/content/insights/index.tsx");
  const start = text.indexOf("export const INSIGHT_BODIES");
  const end = text.indexOf("};", start);
  const block = text.slice(start, end);
  return unique([...block.matchAll(/"([a-z0-9-]+)":\s*[A-Za-z]/g)].map((m) => m[1]));
}

/** Route paths in SSG_ROUTES. */
function ssgRoutes() {
  const text = read("vite-plugin-ssg-meta.ts");
  const start = text.indexOf("export const SSG_ROUTES = [");
  const end = text.indexOf("\n];", start);
  const block = text.slice(start, end);
  return unique([...block.matchAll(/"(\/[^"]*)"/g)].map((m) => m[1]));
}

/** Keys in a ROUTE_META-style object that start with "/insights/". */
function metaKeys(file) {
  const text = read(file);
  return unique([...text.matchAll(/^\s*"(\/insights\/[^"]+)":\s*\{/gm)].map((m) => m[1]));
}

/** /insights/<slug> paths in the sitemap. */
function sitemapInsightPaths() {
  const text = read("client/public/sitemap.xml");
  return unique(
    [...text.matchAll(/<loc>https:\/\/www\.theweb3wizard\.xyz(\/insights\/[^<]+)<\/loc>/g)].map(
      (m) => m[1],
    ),
  );
}

/** /insights/<slug> paths referenced in llms.txt. */
function llmsInsightPaths() {
  const text = read("client/public/llms.txt");
  return unique(
    [...text.matchAll(/https:\/\/www\.theweb3wizard\.xyz(\/insights\/[a-z0-9-]+)/g)].map(
      (m) => m[1],
    ),
  );
}

const site = siteSlugs().map((slug) => `/insights/${slug}`);
const bodies = bodySlugs().map((slug) => `/insights/${slug}`);
const ssg = ssgRoutes().filter((route) => route.startsWith("/insights/"));
const serverMeta = metaKeys("server/meta.ts");
const clientMeta = metaKeys("shared/routeMeta.ts");
const sitemap = sitemapInsightPaths();
const llms = llmsInsightPaths();

const registries = {
  "client/src/site.ts": site,
  "client/src/content/insights/index.tsx": bodies,
  "vite-plugin-ssg-meta.ts (SSG_ROUTES)": ssg,
  "server/meta.ts (ROUTE_META)": serverMeta,
  "shared/routeMeta.ts (CLIENT_ROUTE_META)": clientMeta,
  "client/public/sitemap.xml": sitemap,
  "client/public/llms.txt": llms,
};

console.log("[slug check] article counts per registry");
for (const [name, list] of Object.entries(registries)) {
  console.log(`  ${String(list.length).padStart(2)}  ${name}`);
}

// The site.ts list is the source of truth.
for (const [name, list] of Object.entries(registries)) {
  if (name === "client/src/site.ts") continue;
  const missing = site.filter((route) => !list.includes(route));
  const extra = list.filter((route) => !site.includes(route));
  if (missing.length) failures.push(`${name} is missing: ${missing.join(", ")}`);
  if (extra.length) failures.push(`${name} has unknown route(s): ${extra.join(", ")}`);
}

// llms.txt descriptions: flag entries with no text after the link, which read
// badly once an assistant quotes them.
const llmsText = read("client/public/llms.txt");
const bareLinks = [...llmsText.matchAll(/^- \[[^\]]+\]\([^)]+\)\s*$/gm)];
if (bareLinks.length > 0) {
  notes.push(`${bareLinks.length} llms.txt link(s) have no description text`);
}

// Every route needs an Open Graph card, or the meta tags point at a 404.
const ogDir = path.join(ROOT, "client/public/og");
const ogFiles = fs.existsSync(ogDir) ? fs.readdirSync(ogDir) : [];
const allRoutes = ssgRoutes();
const missingOg = allRoutes
  .map((route) => {
    const slug = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");
    return { route, slug };
  })
  .filter(({ slug }) => !ogFiles.includes(`${slug}.png`))
  .map(({ route }) => route);

if (missingOg.length > 0) {
  notes.push(`${missingOg.length} route(s) have no OG card: ${missingOg.join(", ")}`);
}

console.log("");
if (notes.length) {
  console.log("[slug check] notes");
  for (const note of notes) console.log(`  - ${note}`);
  console.log("");
}

if (failures.length > 0) {
  console.error(`[slug check] FAIL (${failures.length})`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log("[slug check] PASS - all registries agree.");
