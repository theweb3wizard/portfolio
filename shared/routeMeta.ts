/**
 * shared/routeMeta.ts
 *
 * Lightweight client-side route metadata for MetaManager (SPA navigation).
 * This is a subset of server/meta.ts — titles and descriptions only.
 * Full schema injection (JSON-LD, canonical, OG) happens server-side via
 * the SSG plugin at build time. This file just keeps <title> and <meta name="description">
 * in sync after client-side navigation.
 *
 * Canonical host: https://www.theweb3wizard.xyz
 */

export const SITE_URL = "https://www.theweb3wizard.xyz";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export type ClientRouteMeta = {
  title: string;
  description: string;
  noindex?: boolean;
};

export const CLIENT_ROUTE_META: Record<string, ClientRouteMeta> = {
  "/": {
    title: "The Web3 Wizard | AI-Native Web3 Product Studio",
    description: "Founder-led AI-native Web3 studio. We turn real problems into working products: AI agents, Solana apps, dApps, automation, and focused Web3 MVPs.",
  },
  "/services": {
    title: "Web3 Product Services | The Web3 Wizard",
    description: "Choose your engagement: Product Discovery Sprint, Web3 MVP build, or AI Agent & Solana engineering. Focused services for Web3 founders.",
  },
  "/services/product-discovery": {
    title: "Product Discovery Sprint | The Web3 Wizard",
    description: "Turn a Web3 idea into a build-ready direction. Define the user, scope the MVP, and decide what to build first with confidence.",
  },
  "/services/web3-mvp-development": {
    title: "Web3 MVP Development | The Web3 Wizard",
    description: "Build a focused Web3 MVP: AI agents, Solana apps, dApps, and automation. Founder-led, AI-native execution from concept to shipped product.",
  },
  "/services/ai-agent-solana-engineering": {
    title: "AI Agent & Solana Engineering | The Web3 Wizard",
    description: "Specialist AI agent & Solana engineering: autonomous workflows, Telegram/Discord bots, Solana integrations, and on-chain data pipelines.",
  },
  "/work": {
    title: "Founder-Built Web3 Projects | The Web3 Wizard",
    description: "Portfolio of founder-built Web3 projects: AI agents, Solana tools, EVM wallet intelligence, and automation — shipped by Khalid Murtala.",
  },
  "/work/valor": {
    title: "Valor — AI Agent for Telegram | The Web3 Wizard",
    description: "Valor is a founder-built AI agent for Telegram. Autonomous conversational help and task execution for Web3 communities.",
  },
  "/work/walletlens": {
    title: "WalletLens | EVM Wallet Intelligence | The Web3 Wizard",
    description: "WalletLens: AI-powered EVM wallet intelligence for Ethereum, Polygon, BNB, Arbitrum & Base. Query wallets in plain English.",
  },
  "/work/write3": {
    title: "Write3 | AI Web3 Content Generator | The Web3 Wizard",
    description: "Write3: AI-powered Web3 content for X, Discord, Telegram, Farcaster, and blogs. Generate platform-ready drafts quickly.",
  },
  "/work/orderflow": {
    title: "OrderFlow | AI Trading Journal | The Web3 Wizard",
    description: "OrderFlow: AI trading journal for Injective. Reads your on-chain history to show where you leak money and what to fix next.",
  },
  "/work/agenthub": {
    title: "AgentHub | Secure AI Agent Access | The Web3 Wizard",
    description: "AgentHub: secure access layer for AI coding assistants. Policy-controlled DB/API access with audit trails and human approval.",
  },
  "/work/solpulse": {
    title: "SolPulse | Solana Wallet Monitoring | The Web3 Wizard",
    description: "SolPulse: Solana wallet monitoring experiment. Turns wallet activity into calmer, readable Telegram alerts.",
  },
  "/work/community-signal": {
    title: "Community Signal | The Web3 Wizard",
    description: "Community Signal: building-stage experiment turning Telegram and Discord activity into a clearer next action.",
  },
  "/about": {
    title: "About | Khalid Murtala | The Web3 Wizard",
    description: "Khalid Murtala, founder of The Web3 Wizard Labs — founder-led AI-native Web3 studio building AI agents, Solana apps, and focused MVPs.",
  },
  "/insights": {
    title: "Web3 Insights | The Web3 Wizard",
    description: "Practical thinking on Web3 product decisions, AI-native development, Solana apps, MVP scoping, and dApps users understand.",
  },
  "/insights/scope-a-web3-product-before-spending-money": {
    title: "How to Scope a Web3 MVP | The Web3 Wizard",
    description: "A practical framework for Web3 founders: define the MVP, cut unnecessary scope, and avoid spending on the wrong features.",
  },
  "/insights/why-a-web3-prototype-can-fail": {
    title: "Why a Web3 Prototype Fails With Real Users | The Web3 Wizard",
    description: "The gap between a working demo and a product real users can navigate. Why Web3 prototypes break under user pressure and how to close that gap before launch.",
  },
  "/insights/use-ai-without-blindly-trusting-it": {
    title: "Using AI in Web3 Without Blind Trust | The Web3 Wizard",
    description: "Practical guide to AI-native Web3 development: direct AI, challenge its output, test what matters, and stay accountable.",
  },
  "/start": {
    title: "Start a Conversation | The Web3 Wizard",
    description: "Tell The Web3 Wizard what you are trying to build. Discuss an AI agent, Solana application, dApp, MVP, or Web3 automation project.",
    noindex: true,
  },
  "/privacy": {
    title: "Privacy Policy | The Web3 Wizard",
    description: "How The Web3 Wizard Labs handles inquiry submissions and personal information. No database. Inquiries are delivered via Telegram notification.",
  },
  "/terms": {
    title: "Terms of Service | The Web3 Wizard",
    description: "Clear boundaries for The Web3 Wizard Labs engagements. Service scope, limitations, and what is explicitly outside scope.",
  },
};
