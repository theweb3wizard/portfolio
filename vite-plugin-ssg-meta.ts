/**
 * vite-plugin-ssg-meta.ts
 *
 * A lightweight Vite build plugin that, after the bundle is emitted, reads
 * dist/public/index.html and writes one fully-formed HTML file per indexable
 * route. Each file gets its own <title>, <meta>, <canonical>, Open Graph tags,
 * Twitter tags, and JSON-LD injected directly into the <head> so crawlers
 * receive meaningful HTML without executing JavaScript.
 *
 * The catch-all rewrite in vercel.json (`/(.*) → /index.html`) continues to
 * handle client-side navigation after the initial page load, so the SPA
 * routing is completely unaffected.
 */

import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import { injectMetaIntoHtml } from "./server/meta.js";

// Every route that should have its own static HTML file.
// /start is intentionally excluded — it carries noindex and does not need SSG.
// /privacy and /terms are included so they get accurate metadata if crawled.
export const SSG_ROUTES = [
  "/",
  "/services",
  "/services/product-discovery",
  "/services/web3-mvp-development",
  "/services/ai-agent-solana-engineering",
  "/work",
  "/work/valor",
  "/work/walletlens",
  "/work/write3",
  "/work/agenthub",
  "/work/solpulse",
  "/work/community-signal",
  "/about",
  "/insights",
  "/insights/scope-a-web3-product-before-spending-money",
  "/insights/why-a-web3-prototype-can-fail",
  "/insights/use-ai-without-blindly-trusting-it",
  "/privacy",
  "/terms",
];

export function ssgMetaPlugin(): Plugin {
  return {
    name: "vite-plugin-ssg-meta",
    enforce: "post",
    apply: "build",
    closeBundle() {
      const outDir = path.resolve(process.cwd(), "dist", "public");
      const indexPath = path.join(outDir, "index.html");

      if (!fs.existsSync(indexPath)) {
        console.warn("[ssg-meta] dist/public/index.html not found — skipping SSG.");
        return;
      }

      const baseHtml = fs.readFileSync(indexPath, "utf-8");

      for (const route of SSG_ROUTES) {
        const injected = injectMetaIntoHtml(baseHtml, route);

        if (route === "/") {
          // Overwrite index.html in place for the root route
          fs.writeFileSync(indexPath, injected, "utf-8");
        } else {
          // Create a directory for the route and write index.html inside it
          const segments = route.split("/").filter(Boolean);
          const routeDir = path.join(outDir, ...segments);
          fs.mkdirSync(routeDir, { recursive: true });
          const routeFile = path.join(routeDir, "index.html");
          fs.writeFileSync(routeFile, injected, "utf-8");
        }
      }

      console.log(`[ssg-meta] Generated ${SSG_ROUTES.length} static HTML files with injected meta.`);
    },
  };
}
