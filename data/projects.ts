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
    id: "solpulse",
    name: "SolPulse",
    tagline: "Real-time Solana memecoin whale tracker with Telegram alerts.",
    description:
      "Tracks whale moves on Pump.fun and Raydium in real-time via Helius Enhanced Webhooks. Sends instant Telegram alerts for every whale transaction. Features a watchlist manager with custom labels, tiered plans with crypto-native payments via NowPayments, and a terminal-inspired dashboard. Independently architected from data pipeline to responsive UI.",
    url: "https://solpulse-hq.vercel.app",
    github: "https://github.com/theweb3wizard/solpulse",
    stack: ["Next.js", "Supabase", "Helius Webhooks", "Telegram Bot API", "NowPayments"],
    color: "#14F195",
    accentColor: "#6EE7B7",
    status: "live",
    featured: true,
    category: "Agent",
    year: "2026",
  },
  {
    id: "valor",
    name: "Valor",
    tagline: "Low-latency AI agents for on-chain trading execution.",
    description:
      "A multi-agent framework deploying specialized AI agents that monitor, analyze, and execute on-chain strategies in real-time. Built with WebSocket-native architecture for sub-second decision loops across Solana and EVM chains. Features dynamic risk adjustment, cross-agent coordination, and a battle-tested fallback pipeline.",
    url: "https://github.com/theweb3wizard/valor",
    github: "https://github.com/theweb3wizard/valor",
    stack: ["Next.js", "TypeScript", "WebSocket", "Helius", "Gemini AI", "Solana"],
    color: "#10B981",
    accentColor: "#6EE7B7",
    status: "live",
    featured: true,
    category: "Agent",
    year: "2026",
  },
  {
    id: "txpreview",
    name: "TxPreview",
    tagline: "On-chain transaction security previewer. Simulate before you sign.",
    description:
      "A simulation-first transaction preview tool that decodes, simulates, and flags malicious calldata before users sign. Integrates with EVM and Solana wallets to provide human-readable transaction outcomes, state diff analysis, and threat scoring — catching rug pulls, approval scams, and hidden mints before execution.",
    url: "https://github.com/theweb3wizard/txpreview",
    github: "https://github.com/theweb3wizard/txpreview",
    stack: ["Next.js", "TypeScript", "Ethers.js", "Solana Web3.js", "Tailwind CSS"],
    color: "#F59E0B",
    accentColor: "#FCD34D",
    status: "live",
    featured: true,
    category: "Infrastructure",
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
    featured: false,
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
    featured: false,
    category: "AI",
    year: "2026",
  },
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
    featured: false,
    category: "Agent",
    year: "2026",
  },
  {
    id: "flowforge",
    name: "FlowForge",
    tagline: "AI-powered Solidity playground + smart contract deployment workflows.",
    description:
      "A browser-based smart contract development environment with two core capabilities: an AI-powered Solidity playground that generates production-ready contracts from plain English, and a Recipe Builder that chains multi-step deployment workflows across 9 EVM chains. Features live compilation via solc-js, AI-powered security auditing, contract interaction, and a RAG-backed template library — all without leaving the browser.",
    url: "https://flowforge-studio.vercel.app",
    github: "https://github.com/theweb3wizard/FlowForge",
    stack: ["Next.js", "TypeScript", "Supabase", "OpenRouter AI", "wagmi", "viem", "Zustand", "TanStack Query"],
    color: "#FF6B35",
    accentColor: "#F97316",
    status: "live",
    featured: false,
    category: "Infrastructure",
    year: "2026",
  },
  {
    id: "grant-os",
    name: "Grant-OS",
    tagline: "Full-featured grant management CRM for Web3 teams.",
    description:
      "A purpose-built grant management CRM for teams navigating Optimism, Arbitrum, Base, Solana, and Ethereum grant programs. Replaces spreadsheets with a full grant lifecycle interface — from discovery through application to reporting. Features a Kanban application tracker, AI draft generator via Groq API, milestone manager, and a grant calendar covering active programs across 5+ ecosystems.",
    url: "https://grantos-hq.vercel.app",
    github: "https://github.com/theweb3wizard/Grant-OS",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Groq AI", "Lucide React"],
    color: "#06B6D4",
    accentColor: "#67E8F9",
    status: "live",
    featured: false,
    category: "Infrastructure",
    year: "2026",
  },
  {
    id: "chaincard",
    name: "ChainCard",
    tagline: "Turn any Ethereum wallet into a living 3D identity universe.",
    description:
      "A procedural 3D wallet identity explorer powered by React Three Fiber. Paste any Ethereum address and discover its on-chain archetype (Diamond Hand, DeFi Farmer, NFT Degen, Whale, etc.) through a uniquely generated 3D world with custom GLSL shaders. Analyzes wallets across 7 chains, computes a 0-100 legitimacy DNA score across 7 weighted dimensions, and offers an interactive timeline scrubbing through the wallet's entire on-chain history. Zero backend — 100% client-side and privacy-first.",
    url: "https://chaincard-nu.vercel.app",
    github: "https://github.com/theweb3wizard/chaincard",
    stack: ["React", "Three.js", "React Three Fiber", "TypeScript", "viem", "Zustand", "Tailwind CSS"],
    color: "#FF6B9D",
    accentColor: "#F472B6",
    status: "live",
    featured: false,
    category: "Infrastructure",
    year: "2026",
  },
  {
    id: "walletlens",
    name: "WalletLens",
    tagline: "AI-powered EVM wallet intelligence. Paste any address, get a full breakdown.",
    description:
      "An AI wallet intelligence tool that generates instant behavioral analysis reports for any EVM wallet across 5 chains. Paste an address to get AI-generated behavioral insights via Groq (Llama 3.3 70B), a 0-100 risk score, portfolio breakdown with token holdings and USD values, NFT holdings grid, transaction history, and shareable reports with unique URLs. No wallet connection required — read-only, free, and rate-limited to 5 analyses per day per IP.",
    url: "https://walletlens-one.vercel.app",
    github: "https://github.com/theweb3wizard/walletlens",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Moralis API", "Groq AI", "Supabase", "Recharts"],
    color: "#818CF8",
    accentColor: "#A78BFA",
    status: "live",
    featured: false,
    category: "AI",
    year: "2026",
  },
  {
    id: "orderflow",
    name: "OrderFlow",
    tagline: "AI behavioral trading journal for Injective. Know your patterns.",
    description:
      "An AI trading journal that connects to your Injective wallet, fetches complete on-chain trading history from the Injective Exchange Module, and uses Gemini AI to analyze your behavioral patterns. Pre-computes 12 behavioral metrics before the AI generates a 4-section behavioral report with data-grounded insights. Features wallet connection (MetaMask/Keplr), streaming AI output, shareable reports, and demo mode. Built for the Injective Africa Buildathon 2026.",
    url: "https://orderflow-hq.vercel.app",
    github: "https://github.com/theweb3wizard/orderflow",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Gemini AI", "Injective SDK", "Supabase"],
    color: "#34D399",
    accentColor: "#6EE7B7",
    status: "live",
    featured: false,
    category: "Agent",
    year: "2026",
  },
  {
    id: "solvflow",
    name: "SolvFlow",
    tagline: "Precision Web3 escrow — gasless micro-tasking on Base Sepolia.",
    description:
      "A full-stack Web3 escrow platform bridging real-time database state with on-chain smart contract guarantees. Enables trustless, milestone-based payments between clients and freelancers via a decentralized gig marketplace. Pairs Firebase Firestore (fast UI sync, real-time listeners) with a deployed Solidity escrow contract on Base Sepolia for final settlement, dispute resolution, and fund custody. Features marketplace discovery, milestone stepper, on-chain arbitration, and a dashboard tracking live TVL, active escrows, and gas deflected.",
    url: "https://solv-flow.vercel.app",
    github: "https://github.com/theweb3wizard/SolvFlow",
    stack: ["Next.js", "TypeScript", "Solidity", "Firebase", "ethers.js", "Tailwind CSS", "Hardhat", "Base Sepolia"],
    color: "#00D4AA",
    accentColor: "#20C997",
    status: "live",
    featured: false,
    category: "Infrastructure",
    year: "2026",
  },
  {
    id: "zenith",
    name: "Zenith",
    tagline: "Crypto forecasting terminal — draw where price goes next.",
    description:
      "A prediction terminal where users draw price trajectories directly on a live BTC/USD candlestick chart, receive AI-powered confidence scores via OpenRouter, and immutably commit their forecasts to a smart contract on Base Sepolia. Features real-time Binance WebSocket price feed, freehand drawing overlay with TradingView lightweight-charts, 4-step AI fallback chain, on-chain commitment tracking, wallet-connected portfolio history, and a global leaderboard. Zero API keys required — pure ethers.js + MetaMask injection.",
    url: "https://zenith-prediction-terminal.vercel.app",
    github: "https://github.com/theweb3wizard/Zenith",
    stack: ["Next.js", "TypeScript", "Solidity", "Firebase", "ethers.js", "OpenRouter AI", "Tailwind CSS", "Binance WebSocket"],
    color: "#FF8A1E",
    accentColor: "#FF9F3D",
    status: "live",
    featured: false,
    category: "AI",
    year: "2026",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const allProjects = projects;
