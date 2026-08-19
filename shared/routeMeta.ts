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
    description: "Turn your Web3 problem into a working product. The Web3 Wizard is a founder-led AI-native Web3 product studio building AI agents, Solana applications, dApps, automation tools, and focused Web3 MVPs.",
  },
  "/services": {
    title: "Web3 Product Services | The Web3 Wizard",
    description: "Focused Web3 product development services: Product Discovery Sprint, AI-native Web3 product builds, AI agent and Solana engineering. Choose the engagement that fits your situation.",
  },
  "/services/product-discovery": {
    title: "Product Discovery Sprint | Web3 Product Studio | The Web3 Wizard",
    description: "Turn a Web3 problem or idea into a build-ready product direction. Clarify the user, define the MVP scope, and decide what to build first.",
  },
  "/services/web3-mvp-development": {
    title: "AI-Native Web3 Product Build | MVP Development | The Web3 Wizard",
    description: "Build a focused, working Web3 product. AI agents, Solana applications, dApps, automation tools, dashboards, and Web3 MVPs — built by a founder-led AI-native studio.",
  },
  "/services/ai-agent-solana-engineering": {
    title: "AI Agent & Solana Development | Web3 Engineering | The Web3 Wizard",
    description: "Specialist AI agent and Solana engineering for Web3 teams. Autonomous workflows, Telegram bots, Discord tools, Solana integrations, on-chain data pipelines.",
  },
  "/work": {
    title: "Founder-Built Web3 Projects | AI Agents, Solana & dApps | The Web3 Wizard",
    description: "Evidence-driven portfolio of founder-built Web3 projects. AI agents, Solana monitoring tools, EVM wallet intelligence, AI content tools, and Web3 automation.",
  },
  "/work/valor": {
    title: "Valor — AI Agent for Telegram | Web3 AI Agent | The Web3 Wizard",
    description: "Valor is a founder-built AI agent for Telegram. An autonomous conversational agent built for Web3 communities and workflows.",
  },
  "/work/walletlens": {
    title: "WalletLens — AI-Powered EVM Wallet Intelligence | The Web3 Wizard",
    description: "WalletLens is a founder-built AI-powered EVM wallet intelligence tool. Analyse Ethereum, Polygon, BNB Chain, Arbitrum, and Base wallets with natural language AI queries.",
  },
  "/work/write3": {
    title: "Write3 — AI Web3 Content Generator | The Web3 Wizard",
    description: "Write3 is a founder-built AI-powered Web3 content generation tool for X, Discord, Telegram, Farcaster, and blogs.",
  },
  "/work/agenthub": {
    title: "AgentHub — Secure AI Agent Access Layer | The Web3 Wizard",
    description: "AgentHub is a founder-built secure access layer for AI coding assistants. Policy-controlled access to databases, APIs, and infrastructure with audit trails.",
  },
  "/work/solpulse": {
    title: "SolPulse — Solana Wallet Monitoring Tool | The Web3 Wizard",
    description: "SolPulse is a founder-built Solana on-chain monitoring experiment. Turns Solana wallet activity into readable alert signals via Telegram.",
  },
  "/work/community-signal": {
    title: "Community Signal — Web3 Community Action Tool | The Web3 Wizard",
    description: "Community Signal is a building-stage experiment for turning Telegram and Discord community activity into a clearer next action.",
  },
  "/about": {
    title: "About The Web3 Wizard | Khalid Murtala | AI-Native Web3 Studio",
    description: "Khalid Murtala is the founder of The Web3 Wizard (Web3 Wizard Labs) — a founder-led AI-native Web3 product studio.",
  },
  "/insights": {
    title: "Web3 Product Insights | AI Agents, Solana & MVP Development | The Web3 Wizard",
    description: "Practical thinking on Web3 product decisions, AI-native development, Solana applications, MVP scoping, and building dApps that real users can understand.",
  },
  "/insights/scope-a-web3-product-before-spending-money": {
    title: "How to Scope a Web3 MVP Before Spending Money | The Web3 Wizard",
    description: "A practical framework for Web3 founders deciding what to build first. How to define an MVP, cut unnecessary scope, and avoid spending on the wrong features.",
  },
  "/insights/why-a-web3-prototype-can-fail": {
    title: "Why a Web3 Prototype Fails With Real Users | The Web3 Wizard",
    description: "The gap between a working demo and a product real users can navigate. Why Web3 prototypes break under user pressure.",
  },
  "/insights/use-ai-without-blindly-trusting-it": {
    title: "How to Use AI in Web3 Product Development Without Blindly Trusting It | The Web3 Wizard",
    description: "A practical guide to AI-native Web3 product development. How to direct AI, challenge its output, test what matters, and stay accountable.",
  },
  "/start": {
    title: "Start a Conversation | Web3 Wizard Labs",
    description: "Tell The Web3 Wizard what you are trying to build. Discuss an AI agent, Solana application, dApp, MVP, or Web3 automation project.",
    noindex: true,
  },
  "/privacy": {
    title: "Privacy Policy | Web3 Wizard Labs",
    description: "How Web3 Wizard Labs handles inquiry submissions and personal information. No database. Inquiries delivered via Telegram.",
  },
  "/terms": {
    title: "Terms of Service | Web3 Wizard Labs",
    description: "Clear boundaries for Web3 Wizard Labs engagements. Service scope, limitations, and what is explicitly outside scope.",
  },
};
