import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import { ssgMetaPlugin } from "./vite-plugin-ssg-meta.js";

export default defineConfig({
  plugins: [react(), tailwindcss(), ssgMetaPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Build-only code splitting: framework + data libs get their own
        // cached chunks (parallel fetch, better repeat-visit cache).
        // No route, markup, or behavior change.
        manualChunks(id: string) {
          if (!id.includes("node_modules")) return undefined;
          if (
            id.includes("/react-dom/") ||
            id.includes("/react/") ||
            id.includes("/scheduler/") ||
            id.includes("/wouter/")
          )
            return "vendor";
          if (
            id.includes("/@tanstack/") ||
            id.includes("/@trpc/") ||
            id.includes("/superjson/")
          )
            return "data";
          return undefined;
        },
      },
    },
  },
  server: {
    host: true,
  },
});
