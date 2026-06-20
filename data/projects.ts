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
    id: "conviction-collapse-detector",
    name: "Conviction Collapse Detector",
    tagline: "Exit before the crash. Detects when social hype diverges from price.",
    description:
      "An AI signal detector that identifies when social sentiment is dying while price is still high — and signals exit 1–7 days before sentiment-driven collapses. Backtested with 67.6% win rate, 2.29 Sharpe, and 37.9% total return over 71 trades on 100 micro-cap tokens.",
    url: "https://github.com/theweb3wizard/Conviction-Collapse-Detector",
    github: "https://github.com/theweb3wizard/Conviction-Collapse-Detector",
    stack: ["Python", "Pandas", "NumPy", "Matplotlib"],
    color: "#EF4444",
    accentColor: "#FCA5A5",
    status: "live",
    featured: true,
    category: "Agent",
    year: "2026",
  },
  {
    id: "searchlens",
    name: "SearchLens",
    tagline: "AI Overview Search Interception Scanner for SEO agencies.",
    description:
      "A premium SaaS platform that automates client SEO report building by importing Google Search Console data and running an anomaly-detection algorithm to isolate keywords whose clicks are being intercepted by Google's AI Overviews (SGE). White-label portals, Paddle billing, cron-scheduled monthly alerts.",
    url: "https://searchlens-io.vercel.app",
    github: "https://github.com/theweb3wizard/searchlens",
    stack: ["Next.js", "Supabase", "Google Search Console API", "Paddle", "Tailwind CSS"],
    color: "#4F9EFF",
    accentColor: "#93C5FD",
    status: "live",
    featured: true,
    category: "AI",
    year: "2026",
  },
  {
    id: "write3",
    name: "Write3",
    tagline: "AI-powered Web3 content generator for crypto communities.",
    description:
      "Generates authentic, platform-native content for Twitter/X, Discord, Telegram, Farcaster, blogs, and newsletters — purpose-built for DAOs, NFT projects, and DeFi protocols. Features voice training, tone control, multi-model AI routing (Gemini, Claude, GPT-4o, DeepSeek), and subscription billing via Paddle.",
    url: "https://write3-ai.vercel.app",
    github: "https://github.com/theweb3wizard/Write3",
    stack: ["Next.js", "Supabase", "OpenRouter AI", "Paddle", "Upstash Redis"],
    color: "#8B5CF6",
    accentColor: "#A78BFA",
    status: "live",
    featured: true,
    category: "AI",
    year: "2026",
  },
  {
    id: "solpulse",
    name: "SolPulse",
    tagline: "Real-time Solana memecoin whale tracker with Telegram alerts.",
    description:
      "Tracks whale moves on Pump.fun and Raydium in real-time via Helius Enhanced Webhooks. Sends instant Telegram alerts for every whale transaction. Features a watchlist manager with custom labels, tiered plans with crypto-native payments via NowPayments, and a terminal-inspired dashboard.",
    url: "https://solpulse-hq.vercel.app",
    github: "https://github.com/theweb3wizard/solpulse",
    stack: ["Next.js", "Supabase", "Helius Webhooks", "Telegram Bot API", "NowPayments"],
    color: "#14F195",
    accentColor: "#6EE7B7",
    status: "live",
    featured: false,
    category: "Agent",
    year: "2026",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const allProjects = projects;
