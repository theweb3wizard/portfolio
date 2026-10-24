/**
 * Reading-time gate for insight articles.
 *
 * A reading-time label is a claim shown to readers, so it has to match the words
 * actually on the page and it has to survive future edits. Counting from
 * dist/public is the honest measurement: it includes every heading and paragraph
 * a reader or crawler receives, and it cannot be fooled by JSX syntax the way a
 * source-file heuristic can.
 *
 * Run after a build. Exits non-zero if any label is out of step by more than one
 * minute, so a lengthened or trimmed article cannot silently keep a stale label.
 *
 *   npm run build
 *   node scripts/_check-reading-time.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PUB = path.join(ROOT, "dist", "public");
const SITE = path.join(ROOT, "client", "src", "site.ts");
const WPM = 200;
const TOLERANCE = 1; // minutes

function words(html) {
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");
  const main = (stripped.match(/<main[\s\S]*?<\/main>/i) || [stripped])[0];
  const text = main
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ");
  return text.split(" ").filter((w) => /[a-zA-Z]/.test(w)).length;
}

// Declared labels, read straight from the source of truth.
// Chunked on `slug: "` rather than on line breaks so the parse is unaffected by
// CRLF line endings, which this file uses.
const site = fs.readFileSync(SITE, "utf-8");
const declared = new Map();
for (const chunk of site.split(/slug: "/).slice(1)) {
  const slug = (chunk.match(/^([^"]+)"/) || [])[1];
  const label = (chunk.match(/readingTime: "(\d+) min read"/) || [])[1];
  if (slug && label) declared.set(slug, Number(label));
}

const insightsDir = path.join(PUB, "insights");
if (!fs.existsSync(insightsDir)) {
  console.error("dist/public/insights not found. Run a build first.");
  process.exit(1);
}

const slugs = fs
  .readdirSync(insightsDir, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

let failures = 0;
let checked = 0;
let total = 0;

console.log("declared  actual  delta  slug");
for (const slug of slugs.sort()) {
  const file = path.join(insightsDir, slug, "index.html");
  if (!fs.existsSync(file)) continue;
  const count = words(fs.readFileSync(file, "utf-8"));
  const expected = Math.max(1, Math.round(count / WPM));
  const label = declared.get(slug);
  total += count;
  checked += 1;
  if (label === undefined) {
    console.log(`   --     ${String(expected).padStart(4)}    --    ${slug}   (not in site.ts)`);
    failures += 1;
    continue;
  }
  const delta = label - expected;
  const flag = Math.abs(delta) > TOLERANCE ? "  <-- MISMATCH" : "";
  if (flag) failures += 1;
  console.log(
    `${String(label).padStart(6)}    ${String(expected).padStart(4)}  ${String(delta).padStart(5)}  ${slug}${flag}`,
  );
}

console.log(
  `\n${checked} articles, ${total} words, ${Math.round(total / checked)} average.`,
);
console.log(
  failures === 0
    ? "[reading time] PASS - every label matches the measured length."
    : `[reading time] FAIL - ${failures} label(s) out of step by more than ${TOLERANCE} min.`,
);
process.exit(failures === 0 ? 0 : 1);
