/**
 * verify-seo.mjs — regression gate for theweb3wizard.xyz
 *
 * Runs against the BUILD OUTPUT (dist/public), so it verifies what actually ships
 * rather than what the source claims. Re-run after every build:
 *
 *   node verify-seo.mjs
 *
 * Exit code 1 means at least one hard check failed.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = "C:/Users/KHALID PC/Documents/Github Projects/portfolio";
const DIST = path.join(ROOT, "dist", "public");
const OK = "PASS";
const BAD = "FAIL";
const INFO = "INFO";

const failures = [];
const infos = [];

const fail = (msg) => { failures.push(msg); console.log(`  ${BAD}  ${msg}`); };
const pass = (msg) => console.log(`  ${OK}  ${msg}`);
const info = (msg) => { infos.push(msg); console.log(`  ${INFO}  ${msg}`); };

// ─── 1. vercel.json ───────────────────────────────────────────────────────────

console.log("\n[1] vercel.json");

let vercel;
try {
  vercel = JSON.parse(fs.readFileSync(path.join(ROOT, "vercel.json"), "utf8"));
} catch (error) {
  fail(`vercel.json does not parse: ${error.message}`);
}

if (vercel) {
  vercel.trailingSlash === false
    ? pass("trailingSlash is false")
    : fail("trailingSlash should be false");

  const host = (vercel.redirects ?? []).find((r) => r.has?.[0]?.type === "host");
  host
    ? pass(`apex -> www redirect present (${host.destination})`)
    : fail("no host redirect from apex domain to www");

  // A redirect loops if its destination resolves back to its own source pattern.
  // An apex->www rule is exempt: the `has` host guard stops it matching once the
  // request is already on www.
  const normPath = (value) => (value ?? "").replace(/^https?:\/\/[^/]+/, "");
  const loops = (vercel.redirects ?? []).filter((r) => {
    const destination = r.destination ?? "";
    const destinationHost = (destination.match(/^https?:\/\/([^/]+)/) || [])[1] ?? null;
    if (destinationHost && (r.has ?? []).some((c) => c.type === "host")) return false;
    return normPath(destination) === r.source;
  });
  loops.length === 0
    ? pass("no redirect loops")
    : fail(`${loops.length} redirect(s) may loop: ${loops.map((r) => r.source).join(", ")}`);
}

// ─── 2. sitemap.xml ───────────────────────────────────────────────────────────

console.log("\n[2] sitemap.xml");

const sitemap = fs.readFileSync(path.join(ROOT, "client", "public", "sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const openUrl = (sitemap.match(/<url>/g) || []).length;
const closeUrl = (sitemap.match(/<\/url>/g) || []).length;
openUrl === closeUrl ? pass(`${openUrl} <url> blocks balanced`) : fail(`${openUrl} <url> vs ${closeUrl} </url>`);

const badLocs = locs.filter((u) => !u.startsWith("https://www.theweb3wizard.xyz"));
badLocs.length === 0 ? pass("every <loc> uses the www host") : fail(`non-www locs: ${badLocs.join(", ")}`);

const trailingSlashLocs = locs.filter((u) => u.endsWith("/") && u !== "https://www.theweb3wizard.xyz/");
trailingSlashLocs.length === 0
  ? pass("no trailing-slash locs")
  : fail(`trailing-slash locs: ${trailingSlashLocs.join(", ")}`);

locs.includes("https://www.theweb3wizard.xyz/profile")
  ? fail("/profile is in the sitemap but canonicalises to /hire-khalid")
  : pass("/profile correctly absent (canonicalised to /hire-khalid)");

const dupeLocs = locs.filter((u, i) => locs.indexOf(u) !== i);
dupeLocs.length === 0 ? pass("no duplicate locs") : fail(`duplicate locs: ${dupeLocs.join(", ")}`);

// ─── 3. built pages ───────────────────────────────────────────────────────────

console.log("\n[3] built pages");

function findIndexFiles(dir, found = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) findIndexFiles(full, found);
    else if (entry.name === "index.html") found.push(full);
  }
  return found;
}

const files = findIndexFiles(DIST).sort();
const pages = [];

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const route = "/" + path.relative(DIST, file).replace(/\\/g, "/").replace(/\/?index\.html$/, "");

  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] ?? "";
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] ?? "";
  const canonical = (html.match(/rel="canonical" href="([^"]*)"/) || [])[1] ?? "";
  const robots = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] ?? "";
  const ogImage = (html.match(/property="og:image" content="([^"]*)"/) || [])[1] ?? "";

  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = text.split(" ").filter(Boolean).length;

  const h2h6 = (html.match(/<h[2-6][\s>]/gi) || []).length;
  const imgs = (html.match(/<img[\s>]/gi) || []).length;

  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  let ldBroken = 0;
  const ldTypes = [];
  for (const block of ld) {
    try {
      const parsed = JSON.parse(block[1]);
      ldTypes.push(parsed["@type"]);
    } catch {
      ldBroken++;
    }
  }

  const internalLinks = [...html.matchAll(/href="(\/[^"#]*)"/g)].map((m) => m[1]);

  pages.push({
    route, title, desc, canonical, robots, ogImage, words, h2h6, imgs,
    ldTypes, ldBroken, internalLinks, file,
  });
}

console.log(`  ${INFO}  ${pages.length} built pages found`);

const canonicalised = (p) => (p.canonical || "").endsWith("/hire-khalid");
const noindexed = (p) => p.robots.includes("noindex");
const indexable = pages.filter((p) => !noindexed(p) && !canonicalised(p));

// title / description lengths
for (const p of indexable) {
  if (p.title.length === 0) fail(`${p.route}: missing <title>`);
  else if (p.title.length > 60) fail(`${p.route}: title is ${p.title.length} chars (max 60) — "${p.title}"`);

  if (p.desc.length === 0) fail(`${p.route}: missing meta description`);
  else if (p.desc.length > 160) fail(`${p.route}: description is ${p.desc.length} chars (max 160)`);
}

// canonical shape
for (const p of pages) {
  if (noindexed(p) && !p.canonical) continue;
  if (!p.canonical) { fail(`${p.route}: missing canonical`); continue; }
  if (!p.canonical.startsWith("https://www.theweb3wizard.xyz")) fail(`${p.route}: canonical is not on www — ${p.canonical}`);
  if (p.canonical.endsWith("/") && p.canonical !== "https://www.theweb3wizard.xyz/") fail(`${p.route}: canonical has a trailing slash — ${p.canonical}`);
}

// duplicate titles / descriptions
for (const [label, key] of [["title", "title"], ["description", "desc"]]) {
  const seen = new Map();
  for (const p of indexable) {
    const value = p[key];
    if (!value) continue;
    if (seen.has(value)) fail(`duplicate ${label}: ${seen.get(value)} and ${p.route}`);
    else seen.set(value, p.route);
  }
}

// crawlable depth
const thin = indexable.filter((p) => p.words < 200);
thin.length === 0
  ? pass(`every indexable page has 200+ words in static HTML (min ${Math.min(...indexable.map((p) => p.words))})`)
  : fail(`${thin.length} page(s) under 200 words: ${thin.map((p) => `${p.route} (${p.words})`).join(", ")}`);

const zeroHeadings = indexable.filter((p) => p.h2h6 === 0);
zeroHeadings.length === 0
  ? pass("every indexable page has h2-h6 structure")
  : fail(`no subheadings on: ${zeroHeadings.map((p) => p.route).join(", ")}`);

// JSON-LD integrity
const brokenLd = pages.filter((p) => p.ldBroken > 0);
brokenLd.length === 0
  ? pass("all JSON-LD parses")
  : fail(`broken JSON-LD on: ${brokenLd.map((p) => p.route).join(", ")}`);

// /hire-khalid must be reachable by internal links
const inbound = pages.filter((p) => p.route !== "/hire-khalid" && p.internalLinks.some((h) => h.replace(/\/$/, "") === "/hire-khalid"));
inbound.length === 0
  ? fail("/hire-khalid has no inbound internal links (still an orphan)")
  : pass(`/hire-khalid is linked from ${inbound.length} pages`);

// /profile must consolidate
const profilePage = pages.find((p) => p.route === "/profile");
profilePage
  ? profilePage.canonical === "https://www.theweb3wizard.xyz/hire-khalid"
    ? pass("/profile canonicalises to /hire-khalid")
    : fail(`/profile canonical is ${profilePage.canonical}`)
  : fail("/profile page missing from build");

// A noindex route must ship its own HTML file. Without one, the catch-all
// rewrite serves it the indexable homepage — which is both a duplicate and a
// noindex directive that never arrives.
for (const route of ["/start"]) {
  const page = pages.find((p) => p.route === route);
  if (!page) fail(`${route}: no static HTML — catch-all would serve the homepage instead`);
  else if (!page.robots.includes("noindex")) fail(`${route}: static HTML is missing the noindex directive`);
  else pass(`${route} ships its own noindex HTML (${page.words} words)`);
}

// Every page must carry a per-page OG card, and the file must actually exist in
// the build. This is what catches slug drift between ogImageFor() in
// server/meta.ts, shared/routeMeta.ts, and generate-og-images.py.
const ogProblems = [];
const ogDistinct = new Set();
for (const p of pages) {
  if (!p.ogImage) {
    ogProblems.push(`${p.route}: no og:image`);
    continue;
  }
  if (!p.ogImage.startsWith("https://www.theweb3wizard.xyz/og/")) {
    ogProblems.push(`${p.route}: ${p.ogImage} is not a per-page card`);
    continue;
  }
  ogDistinct.add(p.ogImage);
  const rel = p.ogImage.replace("https://www.theweb3wizard.xyz/", "");
  if (!fs.existsSync(path.join(DIST, rel))) ogProblems.push(`${p.route}: ${rel} missing from build`);
}
ogProblems.length === 0
  ? pass(`every page has a per-page og:image that exists (${ogDistinct.size} distinct cards)`)
  : fail(`og:image problems — ${ogProblems.join("; ")}`);

// ─── report ───────────────────────────────────────────────────────────────────

const totalWords = pages.reduce((sum, p) => sum + p.words, 0);
const totalHeadings = pages.reduce((sum, p) => sum + p.h2h6, 0);

console.log(`\n  crawlable words across all pages : ${totalWords}`);
console.log(`  total h2-h6 headings             : ${totalHeadings}`);
console.log(`  pages with images                : ${pages.filter((p) => p.imgs > 0).length}/${pages.length}`);

console.log("\n  page                                                   words  h2-h6  can");
console.log("  " + "-".repeat(78));
for (const p of pages) {
  const can = canonicalised(p) ? "hire-khalid" : "";
  console.log(
    `  ${p.route.padEnd(52)} ${String(p.words).padStart(6)} ${String(p.h2h6).padStart(6)}  ${can}`,
  );
}

if (failures.length > 0) {
  console.error(`\n${BAD}: ${failures.length} check(s) failed.\n`);
  process.exit(1);
}
console.log(`\n${OK}: all checks passed.\n`);
