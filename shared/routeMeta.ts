/**
 * shared/routeMeta.ts
 *
 * Lightweight client-side route metadata for MetaManager (SPA navigation).
 * This is a subset of server/meta.ts: titles and descriptions only.
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
  /** Canonical URL override: mirrors server/meta.ts. See the "/profile" entry there. */
  canonicalPath?: string;
  /** Explicit Open Graph image. Defaults to the per-route card. See ogImageFor below. */
  ogImage?: string;
};

/**
 * Per-route Open Graph cards live in /og/, named after the route:
 *   "/"           -> /og/home.png
 *   "/work/valor" -> /og/work-valor.png
 *
 * Mirrors ogImageFor() in server/meta.ts: the two must produce identical slugs.
 * verify-seo.mjs asserts that every og:image URL resolves to a real file, so any
 * drift fails the check rather than shipping a broken card.
 */
export function ogImageFor(pathname: string): string {
  const slug =
    pathname === "/"
      ? "home"
      : pathname.replace(/^\//, "").replace(/\/$/, "").replace(/\//g, "-");
  return `${SITE_URL}/og/${slug}.png`;
}

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
    description: "Portfolio of founder-built Web3 projects: AI agents, Solana tools, EVM wallet intelligence, and automation, shipped by Khalid Murtala.",
  },
  "/work/spellbook": {
    title: "Spellbook | Web3 AI Agent Marketplace | The Web3 Wizard",
    description: "Spellbook is a Web3 AI agent marketplace with escrow-protected checkout, custom build commissions, and milestone-tracked handover.",
  },
  "/work/valor": {
    title: "Valor: AI Community Rewards | The Web3 Wizard",
    description: "Valor is a founder-built agent that scores every Telegram message and pays top contributors in USDC on Base. No commands, no voting, no manual review.",
  },
  "/work/walletlens": {
    title: "WalletLens | EVM Wallet Intelligence | The Web3 Wizard",
    description: "WalletLens: AI-powered EVM wallet intelligence for Ethereum, Polygon, BNB, Arbitrum and Base. Paste an address for a risk score and a plain-English read.",
  },
  "/work/write3": {
    title: "Write3 | Compliance-Safe Web3 Content | The Web3 Wizard",
    description: "Write3 learns a founder's voice from their own writing, generates platform-native Web3 content, and flags risky claims before anything is published.",
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
    title: "SolPulse | Solana Whale Tracking | The Web3 Wizard",
    description: "SolPulse is a founder-built Solana whale tracker. It watches Pump.fun and Raydium wallets and sends dust-filtered alerts to Telegram within seconds.",
  },
  "/work/community-signal": {
    title: "Community Signal | The Web3 Wizard",
    description: "Community Signal: building-stage experiment turning Telegram and Discord activity into a clearer next action.",
  },
  "/about": {
    title: "About | Khalid Murtala | The Web3 Wizard",
    description: "Khalid Murtala, founder of The Web3 Wizard Labs, a founder-led AI-native Web3 studio building AI agents, Solana apps, and focused MVPs.",
  },
  "/profile": {
    title: "Khalid Murtala | AI × Web3 Engineer | The Web3 Wizard",
    description: "Profile of Khalid Murtala: AI agents, Web3 applications, wallet intelligence, automation, and focused MVPs. Skills, selected projects, and availability.",
    canonicalPath: "/hire-khalid",
  },
  "/hire-khalid": {
    title: "Hire Khalid Murtala | AI × Web3 Engineer | The Web3 Wizard",
    description: "Work with Khalid Murtala on AI agents, Web3 product engineering, and focused dApp builds. Project-based availability plus contact details.",
  },
  "/ai-agents": {
    title: "AI Agent Development for Web3 | The Web3 Wizard",
    description: "Practical AI agents for Web3: support, wallet intelligence, community ops, treasury monitoring, and controlled on-chain workflows. Founder-built.",
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
  "/insights/what-i-learned-shipping-seven-web3-mvps-solo": {
    title: "Seven Web3 MVPs Solo: What I Learned | The Web3 Wizard",
    description: "Seven founder-built Web3 products, one lesson each. What actually broke, what I would do differently, and why the code was rarely the reason a project failed.",
  },
  "/insights/how-much-does-a-web3-mvp-cost": {
    title: "How Much Does a Web3 MVP Cost? | The Web3 Wizard",
    description: "What a Web3 MVP actually costs, which four decisions move the price up or down, and how to spend less without shipping less. Published starting points included.",
  },
  "/insights/do-i-need-a-smart-contract-audit": {
    title: "Do I Need a Smart Contract Audit? | The Web3 Wizard",
    description: "When a smart contract audit is worth the money, when it is not, and what you still need to do if you skip one. Written by someone who does not sell audits.",
  },
  "/insights/how-to-evaluate-a-web3-developer": {
    title: "How to Evaluate a Web3 Developer | The Web3 Wizard",
    description: "Five things worth checking before you hire a Web3 developer, the questions that reveal more than a portfolio, and the honest weaknesses in my own track record.",
  },
  "/insights/web3-agency-vs-freelancer": {
    title: "Web3 Agency vs Freelancer | The Web3 Wizard",
    description: "An honest comparison of agencies, freelancers, and solo studios for Web3 product work, including the cases where a solo studio like mine is the wrong choice.",
  },
  "/insights/what-is-an-ai-agent-in-web3": {
    title: "What Is an AI Agent in Web3? | The Web3 Wizard",
    description: "A plain definition of an AI agent in Web3, how it differs from a bot or a smart contract, and why the refusal list matters more than the list of capabilities.",
  },
  "/insights/what-is-a-web3-mvp": {
    title: "What Is a Web3 MVP? | The Web3 Wizard",
    description: "What a Web3 MVP is, why the Web3 version needs failure handling in version one, and what belongs in a first build versus what can safely wait.",
  },
  "/insights/what-is-a-product-discovery-sprint": {
    title: "What Is a Product Discovery Sprint? | The Web3 Wizard",
    description: "What a product discovery sprint produces, what it is not, and how to tell whether it is the right purchase for where your product stands right now.",
  },
  "/insights/what-is-wallet-intelligence": {
    title: "What Is Wallet Intelligence? | The Web3 Wizard",
    description: "What wallet intelligence means, the problem it actually solves, and the four things it should never claim to be. Includes a working project example.",
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
