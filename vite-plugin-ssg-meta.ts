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
//
// /start IS included even though it is noindex. Excluding it would leave the
// catch-all rewrite in vercel.json serving it the homepage HTML — which is
// indexable and canonicalises to "/". Crawlers would then treat the site's most
// heavily linked page (59 inbound internal links) as a homepage duplicate, and
// would never receive its noindex directive. A noindex route needs its own HTML
// file precisely so the noindex can be delivered.
//
// /privacy and /terms are included so they get accurate metadata if crawled.
export const SSG_ROUTES = [
  "/",
  "/services",
  "/services/product-discovery",
  "/services/web3-mvp-development",
  "/services/ai-agent-solana-engineering",
  "/work",
  "/work/spellbook",
  "/work/valor",
  "/work/walletlens",
  "/work/write3",
  "/work/agenthub",
  "/work/orderflow",
  "/work/solpulse",
  "/work/community-signal",
  "/about",
  "/profile",
  "/hire-khalid",
  "/ai-agents",
  "/insights",
  "/insights/what-i-learned-shipping-seven-web3-mvps-solo",
  "/insights/scope-a-web3-product-before-spending-money",
  "/insights/why-a-web3-prototype-can-fail",
  "/insights/use-ai-without-blindly-trusting-it",
  "/insights/how-much-does-a-web3-mvp-cost",
  "/insights/do-i-need-a-smart-contract-audit",
  "/insights/how-to-evaluate-a-web3-developer",
  "/insights/web3-agency-vs-freelancer",
  "/insights/what-is-an-ai-agent-in-web3",
  "/insights/what-is-a-web3-mvp",
  "/insights/what-is-a-product-discovery-sprint",
  "/insights/what-is-wallet-intelligence",
  "/privacy",
  "/terms",
  // noindex — included so the noindex directive actually ships. See note above.
  "/start",
];

// Static body content per route — provides crawlable H1, copy, and internal links
// so non-JS crawlers (audit tools) see headings, outgoing links, and word count.
const STATIC_BODY: Record<string, { h1: string; intro: string; extra: string; links: { href: string; label: string }[] }> = {
  "/": {
    h1: "Turn Your Web3 Problem Into a Working Product.",
    intro: "The Web3 Wizard is a founder-led AI-native product studio helping early-stage Web3 founders and small teams turn real problems and roadmap milestones into focused, working products: AI agents, Solana applications, dApps, automation tools, and Web3 MVPs. AI helps us move faster. Khalid Murtala directs the work, challenges the output, tests the important parts, and remains accountable for what gets delivered.",
    extra: "We focus on the smallest useful product — not the largest system. Start with the problem, define the user, scope the MVP, and ship something you can learn from. Our process is Understand, Define, Build, Verify, Ship. Every engagement has visible deliverables, documented limitations, and direct communication with the founder.",
    links: [
      { href: "/services", label: "View Services" },
      { href: "/work", label: "See the Work" },
      { href: "/insights", label: "Read Insights" },
      { href: "/about", label: "About the Studio" },
      { href: "/start", label: "Start a Conversation" },
    ],
  },
  "/services": {
    h1: "Choose the engagement that fits your situation.",
    intro: "Three focused services built around how early-stage Web3 founders actually work. Product Discovery Sprint for defining the product, AI-native Web3 product builds for shipping MVPs, and AI agent & Solana engineering for specialist capabilities. Start with the path that best matches where you are now.",
    extra: "Every engagement begins by clarifying the outcome and reducing scope to something useful. If you are not sure which service fits, describe the situation and we will help identify the right starting point. Each service states what is inside scope, what is explicitly outside scope, and what you receive.",
    links: [
      { href: "/services/product-discovery", label: "Product Discovery Sprint" },
      { href: "/services/web3-mvp-development", label: "Web3 MVP Development" },
      { href: "/services/ai-agent-solana-engineering", label: "AI Agent & Solana Engineering" },
      { href: "/work", label: "View Work" },
      { href: "/about", label: "About" },
    ],
  },
  "/services/product-discovery": {
    h1: "Turn your Web3 problem into a build-ready product direction.",
    intro: "Start here if you are not yet sure what to build. For founders and small teams with a real problem or promising idea, we define the user, scope the MVP, and produce a direction you can act on with confidence. Covers problem definition, target user, alternatives, workflow, technical feasibility, and where Web3 or AI adds genuine value.",
    extra: "Good fit when you have a real problem but need scope clarity, want to validate before investing in a build, or need to decide whether Web3 genuinely belongs. You receive a defined problem statement, core workflow, MVP scope, and build-ready direction. Outside scope: exhaustive market research, guaranteed product-market fit, pitch decks, or unlimited scope expansion.",
    links: [
      { href: "/services", label: "All Services" },
      { href: "/services/web3-mvp-development", label: "Web3 MVP Build" },
      { href: "/work", label: "See Work" },
      { href: "/start?type=product-discovery", label: "Start with Product Discovery" },
    ],
  },
  "/services/web3-mvp-development": {
    h1: "Build the smallest useful Web3 product and ship it.",
    intro: "The core engagement. For founders and small teams with a validated problem, concept, prototype, or spec, we build and ship a focused product: AI agents, Solana applications, dApps, automation tools, and Web3 MVPs. Founder-led, AI-native execution from concept to deployment and handover.",
    extra: "Good fit when you have a validated problem or clear concept and need a focused build. Deliverables include working product, frontend and backend where required, AI or Solana integration, wallet or API integration, deployment support, and handover documentation with known limitations. Outside scope: smart-contract audits, unlimited revisions, or guarantees of adoption.",
    links: [
      { href: "/services", label: "All Services" },
      { href: "/work", label: "View Work" },
      { href: "/insights/scope-a-web3-product-before-spending-money", label: "How to Scope an MVP" },
      { href: "/start?type=web3-mvp-development", label: "Discuss Your Product" },
    ],
  },
  "/services/ai-agent-solana-engineering": {
    h1: "Specialist AI agent and Solana engineering for Web3 teams.",
    intro: "A specialist capability for teams that already know what they need. AI agents, autonomous workflows, Telegram and Discord tools, Solana integrations, on-chain data pipelines, and AI-powered product features. Specialist execution for a defined capability, not an open-ended build.",
    extra: "Good fit when you need a specific AI agent, Solana integration, or automated workflow, or an existing product needs a new AI or Solana capability. Deliverables include AI agent with documented behaviour, Solana integration, automation workflow, and technical documentation. Outside scope: formal penetration testing, self-modifying autonomous agents, or undefined scopes.",
    links: [
      { href: "/services", label: "All Services" },
      { href: "/work/valor", label: "See Valor AI Agent" },
      { href: "/work/solpulse", label: "See SolPulse" },
      { href: "/start?type=ai-agent-solana-engineering", label: "Discuss Capability" },
    ],
  },
  "/work": {
    h1: "Real projects. Real evidence. Clearly labelled.",
    intro: "A portfolio of founder-built Web3 projects by Khalid Murtala: AI agents, Solana tools, EVM wallet intelligence, and Web3 automation. These are personal projects, not client case studies, clearly labelled with status, stack, decisions, limitations, and lessons. Each demonstrates a real capability with live demos and repositories where available.",
    extra: "Projects include Spellbook (Web3 AI agent marketplace), Valor (autonomous USDC community rewards on Base), WalletLens (EVM wallet intelligence across five chains), Write3 (compliance-safe Web3 content), AgentHub (secure MCP gateway for AI coding assistants), OrderFlow (Injective behavioural trading journal), SolPulse (Solana whale tracker), and Community Signal (community action experiment, still building). Every project links to its live deployment, and to a public repository where the code is open.",
    links: [
      { href: "/work/valor", label: "Valor" },
      { href: "/work/walletlens", label: "WalletLens" },
      { href: "/work/write3", label: "Write3" },
      { href: "/work/agenthub", label: "AgentHub" },
      { href: "/work/orderflow", label: "OrderFlow" },
      { href: "/work/solpulse", label: "SolPulse" },
      { href: "/about", label: "About the Founder" },
    ],
  },
  "/work/spellbook": {
    h1: "Spellbook — Web3 AI Agent Marketplace",
    intro: "Spellbook is a marketplace and workflow hub for Web3 AI agents. Founders and operators can buy pre-configured agents by operational area or commission a custom agent architecture, with USDT or USDC checkout, an order workspace created immediately without an account, and milestone-tracked delivery. Managed deployments carry a forty-eight hour delivery target and include runbooks, configuration files, and thirty days of engineer coverage after handover.",
    extra: "The credential model is the deliberate constraint: buyers provide scoped, revocable tokens only. No private keys and no seed phrases are ever requested or stored, and buyers own their own model and RPC credentials so they also control the ongoing cost. Categories cover community operations, customer and developer support, protocol and DeFi, and growth and operations. Stack: Next.js, TypeScript, Supabase, Tailwind CSS, TRC-20, Telegram Bot API, Resend. Live at spellbook.theweb3wizard.xyz. Related service: AI Agent & Solana Engineering.",
    links: [
      { href: "/work", label: "All Work" },
      { href: "/ai-agents", label: "AI Agents Capability" },
      { href: "/services/ai-agent-solana-engineering", label: "AI Agent & Solana Engineering" },
      { href: "https://spellbook.theweb3wizard.xyz", label: "Visit Spellbook Marketplace" },
      { href: "https://spellbook.theweb3wizard.xyz/agents", label: "Browse Agent Catalogue" },
    ],
  },
  "/work/valor": {
    h1: "Valor — Autonomous USDC Rewards for Telegram",
    intro: "Valor is a founder-built agent that reads every message in a Telegram community, scores the contribution with AI, and pays the best ones automatically in USDC on Base. No commands, no voting, no moderator reading a spreadsheet. A cheap filter drops most messages before any model call, and the webhook returns in under fifty milliseconds so Telegram never retries a payment.",
    extra: "Stack: Next.js, TypeScript, Neon, Drizzle ORM, viem, Base, Upstash QStash, Gemini, Telegram Bot API. Every community has its own treasury wallet, derived deterministically, so budgets are isolated per community, though the server holds the master key that signs every transfer. Limitations: founder-built personal project, scoring covers written contributions only, tips are capped and idempotent but on-chain transfers cannot be reversed, and no financial advice is provided. Live demo at valor-tgbot.vercel.app with the repository at github.com/theweb3wizard/Valor. Related service: AI Agent & Solana Engineering.",
    links: [
      { href: "/work", label: "All Work" },
      { href: "/work/walletlens", label: "Next: WalletLens" },
      { href: "/services/ai-agent-solana-engineering", label: "AI Agent & Solana Engineering" },
      { href: "https://valor-tgbot.vercel.app", label: "Live Demo" },
      { href: "https://github.com/theweb3wizard/Valor", label: "GitHub Repo" },
    ],
  },
  "/work/walletlens": {
    h1: "WalletLens — EVM Wallet Intelligence",
    intro: "WalletLens turns an EVM wallet address into a report a non-technical founder can read: a risk score from 0 to 100, a portfolio breakdown, NFT holdings, the last twenty transactions, and a behavioural summary written in plain English. It covers Ethereum, Polygon, BNB Chain, Arbitrum, and Base from a single input, and every report gets its own shareable URL.",
    extra: "Stack: Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Moralis for chain data, Groq for analysis, Supabase for rate limiting, Recharts. Read-only and free, with no wallet connection and no keys, limited to five analyses per day per address. Limitations: the risk score is a heuristic and not a fraud determination, third-party data can lag or rate limit, and this is a founder-built project rather than a supported service. Live demo at walletlens-hq.vercel.app and repository at github.com/theweb3wizard/walletlens. Related service: Web3 MVP Development.",
    links: [
      { href: "/work", label: "All Work" },
      { href: "/work/write3", label: "Next: Write3" },
      { href: "/services/web3-mvp-development", label: "Web3 MVP Development" },
      { href: "https://walletlens-hq.vercel.app", label: "Live Demo" },
      { href: "https://github.com/theweb3wizard/walletlens", label: "GitHub Repo" },
    ],
  },
  "/work/write3": {
    h1: "Write3 — Compliance-Safe Web3 Content in Your Own Voice",
    intro: "Write3 learns a founder's voice from three to five samples of their own writing, then generates platform-native content for Twitter, Discord, Reddit, Telegram, Farcaster, blogs, and newsletters. Every draft passes through a compliance filter that flags language associated with SEC and FCA scrutiny, including phrases like guaranteed returns, passive income, and price prediction, before anything is published.",
    extra: "Stack: Next.js, TypeScript, Supabase, OpenRouter, Tailwind CSS. The guardrail sits inside the generation path rather than beside it, so no draft is written without being screened. Limitations: the filter is not legal advice and catches phrasing rather than structure, output is a draft for human review, and the tool does not post to platforms directly. Live demo at write3-ai.vercel.app and repository at github.com/theweb3wizard/Write3. Related service: Web3 MVP Development.",
    links: [
      { href: "/work", label: "All Work" },
      { href: "/work/agenthub", label: "Next: AgentHub" },
      { href: "/services/web3-mvp-development", label: "Web3 MVP Development" },
      { href: "https://write3-ai.vercel.app", label: "Live Demo" },
    ],
  },
  "/work/agenthub": {
    h1: "AgentHub — The Secure MCP Gateway and Workspace",
    intro: "AgentHub sits between AI coding assistants and the tools they call as a reverse proxy. Every Model Context Protocol tool call passes through authentication, a policy engine, a security boundary, and an audit logger. Policies are set per tool as allow, block, read-only, or require-approval, and the security boundary blocks private IP ranges, cloud metadata endpoints, internal hostnames, and shell metacharacters in tool arguments.",
    extra: "Stack: Next.js, TypeScript, Tailwind CSS, Clerk for authentication, Supabase, Model Context Protocol. High-risk calls pause for human approval rather than failing, with the approver notified and a five-minute window before the call is dropped. The audit log records the user, tool, arguments, response status, caller address, and approving administrator. Limitations: enforcement covers the supported integrations only, security properties have not been formally audited, and this is a founder-built project. Live demo at agenthub-hq.vercel.app and repository at github.com/theweb3wizard/AgentHub. Related service: AI Agent & Solana Engineering.",
    links: [
      { href: "/work", label: "All Work" },
      { href: "/work/orderflow", label: "Next: OrderFlow" },
      { href: "/services/ai-agent-solana-engineering", label: "AI Agent & Solana Engineering" },
      { href: "https://agenthub-hq.vercel.app", label: "Live Demo" },
      { href: "https://github.com/theweb3wizard/AgentHub", label: "GitHub Repo" },
    ],
  },
  "/work/orderflow": {
    h1: "OrderFlow — AI Behavioural Trading Journal on Injective",
    intro: "OrderFlow is an AI-powered trading journal for Injective Protocol. It pulls on-chain trading history from Injective's live indexer, covers both spot and derivatives, and turns it into specific, evidence-based feedback: where money is leaking, what is working, and what to fix next. The key architectural decision is that the model receives pre-computed statistics rather than raw trade data, which produces specific findings instead of generic advice.",
    extra: "Stack: Next.js 15, TypeScript, Tailwind CSS, Injective SDK, Google Gemini, Supabase. Every trade row links to Injective Explorer so any claim in the report can be checked against the chain. Injective is the only chain supported, deliberately, because its exchange module exposes spot and derivatives through a single unified indexer. Limitations: reviews past activity only, no signals or predictions, founder-built project. Live demo at orderflow-hq.vercel.app and repository at github.com/theweb3wizard/orderflow. Related service: Web3 MVP Development.",
    links: [
      { href: "/work", label: "All Work" },
      { href: "/work/solpulse", label: "Next: SolPulse" },
      { href: "/services/web3-mvp-development", label: "Web3 MVP Development" },
      { href: "https://orderflow-hq.vercel.app", label: "Live Demo" },
    ],
  },
  "/work/solpulse": {
    h1: "SolPulse — Solana Whale Tracker",
    intro: "SolPulse watches Solana whale wallets on Pump.fun and Raydium and pushes the movements that matter to Telegram within seconds, with links to Solscan and DexScreener. Dust is filtered before it becomes an alert, one global webhook serves every user's wallets, and duplicate deliveries are absorbed at the database level so the same movement never arrives twice.",
    extra: "Stack: Solana, TypeScript, Neon, Drizzle ORM, Helius webhooks, DexScreener pricing, Telegram Bot API. Read-only, with no wallet connection and no keys. Limitations: coverage is limited to Pump.fun and Raydium swaps, small movements are deliberately invisible, alerts depend on third-party webhook and pricing APIs, and no investment or trading outcome is implied. Live at solpulse-hq.vercel.app. Related service: AI Agent & Solana Engineering.",
    links: [
      { href: "/work", label: "All Work" },
      { href: "/work/community-signal", label: "Next: Community Signal" },
      { href: "/services/ai-agent-solana-engineering", label: "AI Agent & Solana Engineering" },
      { href: "https://solpulse-hq.vercel.app", label: "Live Demo" },
    ],
  },
  "/work/community-signal": {
    h1: "Community Signal — Web3 Community Action Tool",
    intro: "Community Signal explores how Telegram or Discord workflows can guide people from community attention to a product action without unnecessary complexity. Building-stage experiment in community prompts, lightweight action flows, and useful handoffs between community interaction and product engagement.",
    extra: "Stack: TypeScript, Telegram Bot API, Discord API, Node.js. Building-stage personal project, no adoption claims, under active development. Related service: AI Agent & Solana Engineering. Start with one clear action, keep it useful without token incentives.",
    links: [
      { href: "/work", label: "All Work" },
      { href: "/services/ai-agent-solana-engineering", label: "AI Agent & Solana Engineering" },
      { href: "/insights", label: "Read Insights" },
    ],
  },
  "/about": {
    h1: "Khalid Murtala. Founder of The Web3 Wizard.",
    intro: "The Web3 Wizard Labs is a founder-led AI-native Web3 product studio operated by Khalid Murtala. We help early-stage founders and small teams turn real Web3 problems and roadmap milestones into focused, working products. Direct ownership from architecture to handover — the person you talk to is the person building your product.",    extra: "AI-native execution with human accountability: AI is used throughout research, planning, design, coding, testing, and review, but output is challenged, tested, and documented. Specialises in AI agents, Solana applications, dApps, automation, and focused MVPs. Currently opening first client engagements, with founder-built personal work as genuine proof. Connect via GitHub, X, LinkedIn, Telegram, and email.",
    links: [
      { href: "/work", label: "View Work" },
      { href: "/services", label: "View Services" },
      { href: "/insights", label: "Read Insights" },
      { href: "/start", label: "Start a Conversation" },
      { href: "https://github.com/theweb3wizard", label: "GitHub" },
      { href: "https://x.com/theweb3wizard00", label: "X (Twitter)" },
    ],
  },
  "/profile": {
    h1: "Khalid Murtala — AI × Web3 Product Engineer",
    intro: "Profile of Khalid Murtala, founder of The Web3 Wizard Labs. Builds AI agents, Web3 applications, wallet intelligence tools, automation systems, and focused product MVPs with TypeScript, React, Next.js, Node.js, LLM APIs, Solana, and EVM integrations. Open to project-based client work and AI/Web3 engineering roles.",
    extra: "Selected founder-built projects include Valor (autonomous USDC community rewards on Base), WalletLens (EVM wallet intelligence across five chains), AgentHub (a policy-controlled MCP gateway for AI coding assistants), OrderFlow (a behavioural trading journal on Injective), and SolPulse (a Solana whale tracker), each with live demos and public repositories where the code is open. Contact via the start page, email, GitHub, X, LinkedIn, or Telegram. Print or save the profile page as PDF for applications.",
    links: [
      { href: "/work", label: "View Work" },
      { href: "/services", label: "View Services" },
      { href: "/ai-agents", label: "AI Agents" },
      { href: "/start", label: "Start a Conversation" },
      { href: "https://github.com/theweb3wizard", label: "GitHub" },
    ],
  },
  "/hire-khalid": {
    h1: "Hire Khalid Murtala — AI × Web3 Product Engineer",
    intro: "Work with Khalid Murtala on AI agents, AI × Web3 product engineering, and focused dApp builds. Project-based client engagements start from $750 (discovery), with integration sprints from $2,500 and product builds from $6,000. Starting prices are indicative and confirmed after a fit conversation.",
    extra: "Also open to credible AI/Web3 engineering roles. See the full profile for skills, selected projects, availability, and contact channels.",
    links: [
      { href: "/profile", label: "Full Profile" },
      { href: "/work", label: "View Work" },
      { href: "/start", label: "Start a Conversation" },
    ],
  },
  "/ai-agents": {
    h1: "Practical AI agents for real Web3 workflows.",
    intro: "Khalid Murtala builds practical AI agents for Web3: documentation and support, wallet intelligence, transaction investigation, community operations, treasury monitoring, developer support, research, and controlled on-chain workflows. Defined capabilities, explicit boundaries, audit trails, and human approval where it matters.",
    extra: "Explore Spellbook, a dedicated Web3 AI agent marketplace with USDT or USDC checkout, custom commissions, and managed hosting, where buyers supply scoped, revocable tokens and never a private key. Reference implementations include Valor (autonomous USDC community rewards on Base), AgentHub (a policy-controlled MCP gateway for AI coding assistants), SolPulse (a Solana whale tracker), and WalletLens (EVM wallet intelligence), all founder-built and clearly labelled. Agent work ships as an integration sprint from $2,500. Starting prices are indicative and confirmed after a fit conversation.",
    links: [
      { href: "https://spellbook.theweb3wizard.xyz", label: "Spellbook Marketplace" },
      { href: "https://spellbook.theweb3wizard.xyz/agents", label: "Browse the Agent Catalogue" },
      { href: "https://spellbook.theweb3wizard.xyz/requests/new", label: "Commission Custom Agent" },
      { href: "/work/spellbook", label: "Spellbook Overview" },
      { href: "/work/valor", label: "See Valor" },
      { href: "/work/agenthub", label: "See AgentHub" },
      { href: "/services/ai-agent-solana-engineering", label: "AI Agent & Solana Engineering" },
      { href: "/start?type=integration-sprint", label: "Discuss an Integration" },
    ],
  },
  "/insights": {
    h1: "Practical thinking for Web3 founders building real products.",
    intro: "Twelve articles on Web3 product decisions, AI-native development, Solana applications, MVP scoping, hiring, and building products real users can navigate. Practical founder-written notes on scoping, pricing, shipping, and using AI without losing accountability.",
    extra: "Topics include what a Web3 MVP is, how to scope one before spending money, what a Web3 MVP costs, whether a smart contract audit is worth buying, how to evaluate a Web3 developer, agencies against freelancers against solo studios, why prototypes fail with real users, using AI without blindly trusting it, and seven lessons from shipping seven Web3 products alone. Each article links to a related service and to founder-built projects where the work is inspectable.",
    links: [
      { href: "/insights/what-i-learned-shipping-seven-web3-mvps-solo", label: "Seven Web3 MVPs Solo" },
      { href: "/insights/scope-a-web3-product-before-spending-money", label: "How to Scope a Web3 MVP" },
      { href: "/insights/how-much-does-a-web3-mvp-cost", label: "What a Web3 MVP Costs" },
      { href: "/insights/why-a-web3-prototype-can-fail", label: "Why Prototypes Fail" },
      { href: "/insights/how-to-evaluate-a-web3-developer", label: "Evaluating a Web3 Developer" },
      { href: "/services", label: "Explore Services" },
    ],
  },
  "/insights/scope-a-web3-product-before-spending-money": {
    h1: "How to Scope a Web3 MVP Before Spending Money",
    intro: "A practical framework for Web3 founders deciding what to build first. How to define an MVP, cut unnecessary scope, and avoid building the wrong thing. Focus on one user, one moment, and the smallest thing that makes their struggle less painful.",
    extra: "A first version needs four things: a user with the real problem, a workflow that works even if rough, a way to observe whether it worked, and an honest note about what is not in it. In Web3, wallet integration, chain selection, and token mechanics can double build time without adding value. A well-scoped product can be explained in two sentences, built in weeks, and tested before money runs out. Related service: Product Discovery Sprint.",
    links: [
      { href: "/insights", label: "All Insights" },
      { href: "/insights/why-a-web3-prototype-can-fail", label: "Next: Why Prototypes Fail" },
      { href: "/services/product-discovery", label: "Product Discovery Sprint" },
      { href: "/work", label: "View Work" },
    ],
  },
  "/insights/why-a-web3-prototype-can-fail": {
    h1: "Why a Web3 Prototype Fails With Real Users",
    intro: "The gap between a working demo and a product real users can navigate. Why Web3 prototypes break under user pressure and what to fix before launch. The first thing that breaks is the assumption that users know what you know — wallet connections, transaction confirmations, gas fees, and network switching confuse newcomers.",
    extra: "The second break is error handling — prototypes handle the happy path, real usage does not. The third is purpose — features without clear why. Fix by walking through as a newcomer, ensuring every screen explains what to do next, handles failures understandably, and watching someone use it without help. Related service: Web3 MVP Development.",
    links: [
      { href: "/insights", label: "All Insights" },
      { href: "/insights/use-ai-without-blindly-trusting-it", label: "Next: Using AI Without Blind Trust" },
      { href: "/services/web3-mvp-development", label: "Web3 MVP Development" },
    ],
  },
  "/insights/use-ai-without-blindly-trusting-it": {
    h1: "How to Use AI in Web3 Product Development Without Blindly Trusting It",
    intro: "A practical guide to AI-native Web3 product development. How to direct AI tools, challenge their output, test what matters, and stay accountable for what ships. AI is excellent at plausible code quickly, but unreliable for security-sensitive logic, complex state, and edge cases that only appear in real usage.",
    extra: "In Web3, wrong wallet signing flows or excessive token approvals can cost users real value and cannot be patched post-launch. Use AI as a starting point, give clear context, read every output critically, test the behaviour that matters, and keep notes on what was verified. AI makes you faster, not less responsible. Related service: Web3 MVP Development.",
    links: [
      { href: "/insights", label: "All Insights" },
      { href: "/services/ai-agent-solana-engineering", label: "AI Agent & Solana Engineering" },
      { href: "/about", label: "About the Studio" },
    ],
  },
  "/insights/what-i-learned-shipping-seven-web3-mvps-solo": {
    h1: "Seven Web3 MVPs Shipped Solo: What I Learned",
    intro: "Seven founder-built Web3 products, one lesson each. What actually broke, what I would do differently, and why the code was rarely the reason a project failed. Drawn from Spellbook, Valor, WalletLens, Write3, AgentHub, OrderFlow, and SolPulse.",
    extra: "Each project produced one durable lesson: scope drifts through integrations rather than features, an autonomous agent is defined by what it refuses to do, interface design is product design in data tools, a compliance guardrail has to sit inside the writing path rather than beside it, an audit trail nobody can read is not an audit trail, pre-computed statistics make an AI report specific instead of generic, and an alert threshold is the product. Every example comes from founder-built work rather than client engagements, and the lessons are reported as they happened.",
    links: [
      { href: "/insights", label: "All Insights" },
      { href: "/work", label: "See All Projects" },
      { href: "/services/web3-mvp-development", label: "Web3 MVP Development" },
      { href: "/about", label: "About the Founder" },
    ],
  },
  "/insights/how-much-does-a-web3-mvp-cost": {
    h1: "How Much Does a Web3 MVP Cost?",
    intro: "What a Web3 MVP actually costs, which four decisions move the price up or down, and how to spend less without shipping less. Published starting points included.",
    extra: "Published starting prices are a Product Discovery Sprint from $750, an integration sprint from $2,500, a product build from $6,000, and embedded engineering from $2,000 per month. Four decisions do most of the work: how many chains and integrations are in version one, whether money moves, who owns the failure paths, and how much discovery has already been done. Cutting failure handling is the most expensive saving available, because it moves cost from the build to production. Related service: Web3 MVP Development.",
    links: [
      { href: "/insights", label: "All Insights" },
      { href: "/services/web3-mvp-development", label: "Web3 MVP Development" },
      { href: "/hire-khalid", label: "Hire Khalid" },
      { href: "/start?type=web3-mvp-development", label: "Discuss Your Product" },
    ],
  },
  "/insights/do-i-need-a-smart-contract-audit": {
    h1: "Do I Need a Smart Contract Audit?",
    intro: "When a smart contract audit is worth the money, when it is not, and what you still need to do if you skip one. Written by someone who does not sell audits.",
    extra: "An audit buys an independent read of code by someone who did not write it, plus a report you can show to others. It does not cover economic design flaws, front-end or key-management failures, or upgrade and governance risk. If a contract holds other people's money, an audit is part of the cost of shipping and should be budgeted from the start. If it is an experiment with no user funds, testing, disclosure, and a way to pause matter more than a report. Related service: Web3 MVP Development.",
    links: [
      { href: "/insights", label: "All Insights" },
      { href: "/services/web3-mvp-development", label: "Web3 MVP Development" },
      { href: "/work", label: "View Work" },
      { href: "/about", label: "About the Founder" },
    ],
  },
  "/insights/how-to-evaluate-a-web3-developer": {
    h1: "How to Evaluate a Web3 Developer",
    intro: "Five things worth checking before you hire a Web3 developer, the questions that reveal more than a portfolio, and the honest weaknesses in my own track record.",
    extra: "Check whether they can explain a failure they caused and what they changed afterwards, whether they separate what they verified from what they assumed, whether they read code they did not write, whether they can describe the limits of the last thing they shipped, and whether you can reach them directly. Ask what they would refuse to build and what they would test first. The article applies the same five checks to my own work rather than only to other people. Related service: Product Discovery Sprint.",
    links: [
      { href: "/insights", label: "All Insights" },
      { href: "/work", label: "View Work" },
      { href: "/hire-khalid", label: "Hire Khalid" },
      { href: "/services/product-discovery", label: "Product Discovery Sprint" },
    ],
  },
  "/insights/web3-agency-vs-freelancer": {
    h1: "Web3 Agency vs Freelancer: How to Choose",
    intro: "An honest comparison of agencies, freelancers, and solo studios for Web3 product work, including the cases where a solo studio like mine is the wrong choice.",
    extra: "An agency offers capacity, process, and cover across several disciplines, at a higher cost and a slower start. A freelancer offers speed and low overhead, with variable reliability and nobody to cover an absence. A solo studio sits between the two: one accountable engineer working to a written scope. Choose an agency when you need three functions at once, a freelancer for a single well-defined task, and expect to own the roadmap whichever route you take. Related service: Web3 MVP Development.",
    links: [
      { href: "/insights", label: "All Insights" },
      { href: "/hire-khalid", label: "Hire Khalid" },
      { href: "/services", label: "View Services" },
      { href: "/work", label: "View Work" },
    ],
  },
  "/insights/what-is-an-ai-agent-in-web3": {
    h1: "What Is an AI Agent in Web3?",
    intro: "A plain definition of an AI agent in Web3, how it differs from a bot or a smart contract, and why the refusal list matters more than the list of capabilities.",
    extra: "An agent reads an input, reasons about it, and takes a bounded action without a human in the loop. A bot matches triggers against responses. A smart contract executes deterministic code on-chain. An agent decides, which is why the useful specification is not what it can do but what it will not do, who can stop it, and what happens when it is wrong. Working examples include Valor, which scores and pays community contributions, and SolPulse, which tracks Solana whale wallets. Related service: AI Agent & Solana Engineering.",
    links: [
      { href: "/insights", label: "All Insights" },
      { href: "/services/ai-agent-solana-engineering", label: "AI Agent & Solana Engineering" },
      { href: "/work/valor", label: "See Valor" },
      { href: "/ai-agents", label: "AI Agents Capability" },
    ],
  },
  "/insights/what-is-a-web3-mvp": {
    h1: "What Is a Web3 MVP?",
    intro: "What a Web3 MVP is, why the Web3 version needs failure handling in version one, and what belongs in a first version versus what can safely wait.",
    extra: "An MVP is the smallest version that lets a real user complete one meaningful action and lets you observe whether it worked. Web3 adds four properties that change the calculation: irreversible transactions, user funds moving on-chain, public code, and wallet friction. Failure paths therefore belong in version one rather than version two. Governance tokens, multi-chain support, admin dashboards, and referral systems can almost always wait. Related service: Web3 MVP Development.",
    links: [
      { href: "/insights", label: "All Insights" },
      { href: "/services/web3-mvp-development", label: "Web3 MVP Development" },
      { href: "/services/product-discovery", label: "Product Discovery Sprint" },
      { href: "/work", label: "View Work" },
    ],
  },
  "/insights/what-is-a-product-discovery-sprint": {
    h1: "What Is a Product Discovery Sprint?",
    intro: "What a product discovery sprint produces, what it is not, and how to tell whether it is the right purchase for where your product stands right now.",
    extra: "A discovery sprint produces a written direction: the user, the problem, the workflow, the scope of the first build, the technical unknowns, and a recommendation that is allowed to conclude software is not the answer. It is not market research, a business plan, a pitch deck, or an audit, and it does not replace a lawyer or an accountant. If you already know exactly what to build and who it is for, skip discovery and build instead. Related service: Product Discovery Sprint.",
    links: [
      { href: "/insights", label: "All Insights" },
      { href: "/services/product-discovery", label: "Product Discovery Sprint" },
      { href: "/hire-khalid", label: "Hire Khalid" },
      { href: "/start?type=product-discovery", label: "Start with Discovery" },
    ],
  },
  "/insights/what-is-wallet-intelligence": {
    h1: "What Is Wallet Intelligence?",
    intro: "What wallet intelligence means, the problem it actually solves, and the four things it should never claim to be. Includes a working project example.",
    extra: "Wallet intelligence is the step between raw on-chain data and a decision: reading a wallet's history, holdings, and behaviour, then stating plainly what that pattern suggests. It should never claim to be a fraud determination, a credit score, investment advice, or a complete picture, because a wallet's history is not a person. WalletLens is a working example that covers five EVM chains and states its confidence limits on every report. Related service: AI Agent & Solana Engineering.",
    links: [
      { href: "/insights", label: "All Insights" },
      { href: "/work/walletlens", label: "See WalletLens" },
      { href: "/services/ai-agent-solana-engineering", label: "AI Agent & Solana Engineering" },
      { href: "/work", label: "View Work" },
    ],
  },
  "/privacy": {
    h1: "How inquiries and personal information are handled.",
    intro: "A clear explanation of what happens when you submit an inquiry to The Web3 Wizard Labs. Inquiry data is delivered via Telegram notification to Khalid Murtala and is not stored in a database. No advertising trackers or behavioural profiling tools are used beyond privacy-respecting Vercel Analytics.",
    extra: "Collected: name, email, company, project URL, description, engagement type, stage, timeline, budget, success criteria, and consent. No structured retention — data exists only in the Telegram notification. Contact Khalid Murtala at theweb3wizard00@gmail.com with questions. This notice should receive legal review before being relied upon formally.",
    links: [
      { href: "/", label: "Home" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/start", label: "Start a Conversation" },
    ],
  },
  "/terms": {
    h1: "Clear boundaries for every engagement.",
    intro: "What The Web3 Wizard Labs does, what it does not do, and what every engagement includes and excludes. Builds focused MVPs and product capabilities — AI agents, Solana apps, dApps, automation — not entire companies, not open-ended scopes, and not smart-contract audits or formal security certifications.",
    extra: "Scope, deliverables, timeline, and fees are agreed in writing before work begins. Known limitations are documented at handover. Personal projects in the Work section are founder-built, not client case studies. These terms describe operating principles as of 2026-08-19 and should receive legal review before being relied upon contractually.",
    links: [
      { href: "/", label: "Home" },
      { href: "/privacy", label: "Privacy" },
      { href: "/services", label: "View Services" },
    ],
  },
  // Fallback stub only — /start is noindex, so this exists purely so the page is
  // never an empty <div id="root"> if prerendering is ever skipped. Real markup
  // is supplied by the prerender step.
  "/start": {
    h1: "Start a conversation about your Web3 product.",
    intro: "Tell The Web3 Wizard what you are trying to build. Discuss an AI agent, Solana application, dApp, MVP, or Web3 automation project. One founder reads every inquiry and replies directly.",
    extra: "Project-based client engagements start from $750 for a Product Discovery Sprint, with integration sprints from $2,500 and product builds from $6,000. Starting prices are indicative and confirmed after a fit conversation.",
    links: [
      { href: "/services", label: "View Services" },
      { href: "/hire-khalid", label: "Hire Khalid" },
      { href: "/work", label: "See Work" },
      { href: "/insights", label: "Read Insights" },
    ],
  },
};

// Sentinels wrapped around the crawlable body so scripts/prerender.tsx can swap
// the fallback stub for the real server-rendered page without fragile HTML parsing.
// If prerendering is ever skipped, the stub between these markers is what ships.
export const SSG_BODY_START = "<!--ssg-body:start-->";
export const SSG_BODY_END = "<!--ssg-body:end-->";

export function injectStaticBody(html: string, route: string): string {
  const data = STATIC_BODY[route];
  if (!data) return html;
  const relatedLinks = data.links.map((l) => `<a href="${l.href}">${l.label}</a>`).join(" | ");
  const siteNav = `<header><nav aria-label="Primary"><a href="/">Home</a> | <a href="/work">Work</a> | <a href="/services">Services</a> | <a href="/ai-agents">AI Agents</a> | <a href="/insights">Insights</a> | <a href="/about">About</a> | <a href="/hire-khalid">Hire Khalid</a> | <a href="/start">Contact</a></nav></header>`;
  const bodyContent = `
${siteNav}
<main>
  <h1>${data.h1}</h1>
  <p>${data.intro}</p>
  <p>${data.extra}</p>
  <nav aria-label="Related">${relatedLinks}</nav>
</main>
<footer><nav><a href="/privacy">Privacy</a> | <a href="/terms">Terms</a> | <a href="/sitemap.xml">Sitemap</a></nav><p>© 2026 The Web3 Wizard Labs · Founded by Khalid Murtala.</p></footer>
`;
  const wrapped = `${SSG_BODY_START}${bodyContent}${SSG_BODY_END}`;
  if (html.includes('<div id="root"></div>')) {
    return html.replace('<div id="root"></div>', `<div id="root">${wrapped}</div>`);
  }
  return html.replace("</body>", `${bodyContent}</body>`);
}

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
        let injected = injectMetaIntoHtml(baseHtml, route);
        injected = injectStaticBody(injected, route);

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

      console.log(`[ssg-meta] Generated ${SSG_ROUTES.length} static HTML files with injected meta and body.`);
    },
  };
}
