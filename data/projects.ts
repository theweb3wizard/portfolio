export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  github?: string;
  stack: string[];
  color: string;
  accentColor: string;
  status: "live" | "building" | "archived";
  featured: boolean;
  category: "AI" | "DeFi" | "Infrastructure" | "Tax" | "Agent";
  year: string;
}

// ============================================================
// EDIT THIS FILE TO ADD, UPDATE, OR REMOVE PRODUCTS
// ============================================================
export const projects: Project[] = [
  {
    id: "walletlens",
    name: "WalletLens",
    tagline: "AI wallet intelligence for any EVM address",
    description:
      "Paste any EVM wallet address and get an instant AI-generated intelligence report. Risk score, portfolio breakdown, NFT holdings, transaction history, behavioral analysis — all in seconds. No wallet connection required.",
    url: "https://walletlens-hq.vercel.app",
    stack: ["Next.js", "Groq AI", "Moralis", "Supabase", "TypeScript"],
    color: "#6366F1",
    accentColor: "#818CF8",
    status: "live",
    featured: true,
    category: "AI",
    year: "2026",
  },
  {
    id: "orderflow",
    name: "OrderFlow",
    tagline: "AI trading coach for on-chain traders",
    description:
      "Connects to your Injective wallet, fetches your complete on-chain trading history from the Injective Exchange Module, and uses Gemini AI to analyze your behavioral patterns — telling you exactly why you're losing money and what you're doing well.",
    url: "https://orderflow-hq.vercel.app",
    stack: ["Next.js", "Gemini AI", "Injective SDK", "TypeScript"],
    color: "#06B6D4",
    accentColor: "#67E8F9",
    status: "live",
    featured: true,
    category: "AI",
    year: "2026",
  },
  {
    id: "valor",
    name: "Valor",
    tagline: "Autonomous on-chain tipping agent for Telegram",
    description:
      "A fully autonomous AI agent living inside Telegram groups. Evaluates every message for genuine contribution quality using Gemini AI. When earned, automatically creates a non-custodial USDT wallet via WDK and sends a real on-chain tip — announcing the Etherscan link in the group. No human in the loop.",
    url: "https://valor-tgbot.vercel.app",
    stack: ["Next.js", "Gemini AI", "Tether WDK", "Telegram Bot API", "Supabase"],
    color: "#10B981",
    accentColor: "#34D399",
    status: "live",
    featured: true,
    category: "Agent",
    year: "2026",
  },
  {
    id: "taxrabbit",
    name: "TaxRabbit",
    tagline: "Fix blank cost basis on IRS Form 1099-DA",
    description:
      "Solves the blank cost basis problem on IRS Form 1099-DA for crypto holders — the silent issue that causes $4,000 to $10,000 in tax overpayment for people who don't know the blank box is their responsibility to fill.",
    url: "https://taxrabbit.xyz",
    stack: ["Next.js", "TypeScript"],
    color: "#F59E0B",
    accentColor: "#FCD34D",
    status: "live",
    featured: false,
    category: "Tax",
    year: "2026",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const allProjects = projects;