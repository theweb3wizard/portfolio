import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050508",
        surface: "#0A0A12",
        card: "#0F0F1A",
        border: "#1A1A2E",
        indigo: {
          DEFAULT: "#6366F1",
          dim: "#4F46E5",
          glow: "#818CF8",
          faint: "#6366F115",
        },
        cyan: {
          DEFAULT: "#06B6D4",
          glow: "#67E8F9",
        },
        emerald: { DEFAULT: "#10B981" },
        rose: { DEFAULT: "#F43F5E" },
        amber: { DEFAULT: "#F59E0B" },
        muted: "#94A3B8",
        subtle: "#252540",
      },
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 8s ease-in-out infinite",
        "fade-up": "fadeUp 0.8s ease forwards",
        flicker: "flicker 3s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
          "75%": { opacity: "0.95" },
        },
      },
    },
  },
  plugins: [],
};
export default config;