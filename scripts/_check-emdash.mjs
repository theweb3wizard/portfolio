/**
 * Em dash gate.
 *
 * The house style bans the em dash (U+2014) from the site because it is one of
 * the clearest tells of machine-written prose, and it reads as a hard stop in
 * short UI copy. The rule is easy to state and easy to break by accident, so it
 * is checked rather than trusted.
 *
 * Scope is the shipped surface: anything that can reach a visitor or a crawler.
 * Internal working documents in theweb3wizard.xyz-audit/ are deliberately
 * excluded, because the ban is a voice rule for the site, not a global habit.
 *
 * One exception mechanism exists, for design glyphs rather than prose: a line
 * containing the token `emdash-ok` is skipped, and the reason has to sit on
 * that same line. There is currently one such line, the gold list marker in
 * index.css. Everything else must hold the rule.
 *
 *   node scripts/_check-emdash.mjs
 *
 * Exit code 1 means at least one em dash was found.
 */
import fs from "node:fs";
import path from "node:path";

const ROOTS = ["client/src", "server", "shared"];
const FILES = ["client/index.html"];
const PUBLIC_DIR = "client/public";

// Text formats served to visitors, plus source files.
const TEXT_EXT = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".html",
  ".css",
  ".json",
  ".md",
  ".txt",
  ".xml",
  ".svg",
]);

// Generated or third-party content that is not authored prose.
const SKIP = [/node_modules/, /\/og\//, /\.png$/, /\.jpg$/, /\.webp$/, /\.ico$/];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (SKIP.some((re) => re.test(full.replace(/\\/g, "/")))) continue;
    if (entry.isDirectory()) walk(full, out);
    else if (TEXT_EXT.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

const files = [...ROOTS.flatMap((r) => walk(r)), ...FILES, ...walk(PUBLIC_DIR)];

const hits = [];
for (const file of files) {
  let text;
  try {
    text = fs.readFileSync(file, "utf-8");
  } catch {
    continue;
  }
  if (!text.includes("\u2014")) continue;
  text.split(/\r?\n/).forEach((line, i) => {
    if (!line.includes("\u2014")) return;
    // A line can opt out, but only with a reason attached to it, so every
    // exception is greppable and justifiable. Used for design glyphs, never
    // for prose.
    if (line.includes("emdash-ok")) return;
    hits.push({ file, line: i + 1, text: line.trim().slice(0, 120) });
  });
}

console.log(`[emdash] scanned ${files.length} shipped text files`);

if (hits.length === 0) {
  console.log("[emdash] PASS - no em dashes (U+2014) anywhere on the shipped surface.");
  process.exit(0);
}

for (const h of hits) {
  console.log(`  ${h.file}:${h.line}`);
  console.log(`      ${h.text}`);
}
console.log(
  `\n[emdash] FAIL - ${hits.length} em dash(es) found. Use a comma, colon, full stop, or brackets.`,
);
process.exit(1);
