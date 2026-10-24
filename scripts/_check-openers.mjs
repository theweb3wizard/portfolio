/**
 * Prints the opening text of each key page from the build output.
 *
 * The purpose is to check, by eye, whether each page states plainly what it is
 * in the first sentence or two. That sentence is the one an answer engine is
 * most likely to quote, so it should not be marketing copy.
 *
 *   node scripts/_check-openers.mjs
 */
import fs from "node:fs";
import path from "node:path";

const PUB = path.join(process.cwd(), "dist", "public");

const ROUTES = [
  "/",
  "/services",
  "/services/product-discovery",
  "/services/web3-mvp-development",
  "/services/ai-agent-solana-engineering",
  "/work",
  "/about",
  "/hire-khalid",
  "/ai-agents",
  "/insights",
];

function opener(html) {
  const main = (html.match(/<main[\s\S]*?<\/main>/i) || [html])[0];
  const text = main
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&amp;/g, "&")
    .replace(/&[a-z]+;/gi, " ")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 60);
  return text.slice(0, 3);
}

for (const route of ROUTES) {
  const file =
    route === "/"
      ? path.join(PUB, "index.html")
      : path.join(PUB, ...route.split("/").filter(Boolean), "index.html");
  if (!fs.existsSync(file)) {
    console.log(`\n=== ${route}\n    (no built file)`);
    continue;
  }
  console.log(`\n=== ${route}`);
  for (const para of opener(fs.readFileSync(file, "utf-8"))) {
    console.log(`    ${para.slice(0, 200)}`);
  }
}
