// ─── Types ────────────────────────────────────────────────────────────────────

export type ProjectStatus = "deployed" | "building" | "concept";

export type Project = {
  name: string;
  slug: string;
  summary: string;
  description: string;
  status: ProjectStatus;
  category: string;
  builtBy: "The Web3 Wizard";
  isPersonalProject: true;
  problem: string;
  whatItDoes: string;
  decisions: string[];
  stack: string[];
  limitations: string[];
  lessons: string[];
  relatedService: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
};

export type Insight = {
  title: string;
  slug: string;
  description: string;
  category: string;
  readingTime: string;
  relatedService: string;
  datePublished: string;
  draft: boolean;
};

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    name: "Spellbook",
    slug: "spellbook",
    summary: "Autonomous Web3 AI agent marketplace: instant fixed-scope deployments, custom commissions, and milestone-tracked delivery.",
    description: "Spellbook is a production marketplace and workflow hub for Web3 AI agents. Founders and operators can purchase pre-configured autonomous agents or commission a custom agent architecture, with USDT or USDC checkout, milestone-tracked delivery, and a full source handover option.",
    status: "deployed",
    category: "AI agent marketplace",
    builtBy: "The Web3 Wizard",
    isPersonalProject: true,
    problem: "Deploying AI agents for Web3 operations is either slow and expensive through custom agencies or brittle using unvetted open-source scripts without clear operating boundaries or support.",
    whatItDoes: "A curated Web3 AI agent marketplace covering Telegram, Discord, DeFi, and on-chain intelligence. Includes instant USDT/USDC crypto checkout, automated workspace provisioning, customer setup forms, real-time Telegram operator alerts, and milestone-tracked handover.",
    decisions: [
      "Implement deterministic customer workspace provisioning with live milestones and encrypted setup credential intake.",
      "Enforce explicit boundaries, service-model differences (One-off source code vs Managed hosting), and transparent API cost ownership.",
      "Integrate operator Telegram dispatch for instant order, messaging, and review alerts.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "TRON / TRC-20", "Telegram Bot API", "Resend"],
    limitations: [
      "Marketplace products provide autonomous execution within bounded parameters; they do not provide financial advice or guaranteed returns.",
      "Customer owns their respective LLM (OpenAI/Anthropic) and RPC infrastructure credentials.",
    ],
    lessons: [
      "Marketplace conversions require complete transparency around deliverables, boundaries, and ongoing API/hosting ownership before purchase.",
      "An integrated customer order portal with interactive messaging converts skeptical buyers into confident partners.",
    ],
    relatedService: "/services/ai-agent-solana-engineering",
    liveUrl: "https://spellbook.theweb3wizard.xyz",
    featured: true,
  },
  {
    name: "Valor",
    slug: "valor",
    summary: "A founder-built autonomous agent that pays Telegram contributors in USDC on Base. AI scores every message; the best ones get tipped automatically.",
    description: "Valor reads every message in a Telegram community, scores the contribution, and pays the best ones automatically in USDC on Base. No commands, no voting, no moderator reading a spreadsheet.",
    status: "deployed",
    category: "Autonomous rewards agent",
    builtBy: "The Web3 Wizard",
    isPersonalProject: true,
    problem: "The people who make a community worth joining are usually paid nothing for it. Manual reward programs need a moderator to read every message and a spreadsheet to track payouts, so most communities either skip rewards or run them inconsistently.",
    whatItDoes: "A serverless agent attached to a Telegram bot webhook. Each message passes a cheap filter, survivors are scored by Gemini against a structured schema, and high-scoring contributions trigger an automatic USDC transfer from that community's own treasury. Contributors claim through an HMAC-signed link.",
    decisions: [
      "Put pure-TypeScript filters in front of the model so 90% or more of messages never reach an AI call. If an agent reads every message in a group, cost control is the binding constraint, not quality.",
      "Return the Telegram webhook in under 50ms and move the AI and on-chain work into a signed background job. Telegram retries a slow webhook, which means paying twice for the same message.",
      "Derive each community's treasury wallet deterministically from a master key so funds stay non-custodial and one community's budget can never spend another's.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Neon", "Drizzle ORM", "Auth.js", "viem", "Base", "Upstash QStash", "Gemini 2.5 Flash", "Telegram Bot API"],
    limitations: [
      "This is a founder-built personal project, not a client deployment.",
      "The agent scores written contributions. It cannot judge anything that happens outside the text of a message.",
      "A wrong score moves real money. Tips are capped and every step is idempotent, but an on-chain transfer cannot be reversed.",
      "No financial advice, trading signals, or token recommendations are provided.",
    ],
    lessons: [
      "In an agent that spends money, the gate in front of the model matters more than the model.",
      "Autonomous payments need idempotency, not retry logic. Assume every step runs twice and design so the second run costs nothing.",
    ],
    relatedService: "/services/ai-agent-solana-engineering",
    liveUrl: "https://valor-tgbot.vercel.app",
    repoUrl: "https://github.com/theweb3wizard/Valor",
    featured: true,
  },
  {
    name: "WalletLens",
    slug: "walletlens",
    summary: "AI-powered EVM wallet intelligence: paste any Ethereum, Polygon, BNB, Arbitrum, or Base address for a risk score, portfolio breakdown, and a plain-English read.",
    description: "WalletLens turns an EVM wallet address into a report a non-technical founder can actually read: a 0 to 100 risk score, portfolio breakdown, NFT holdings, recent transactions, and a behavioural summary written in plain English.",
    status: "deployed",
    category: "Web3 AI tool",
    builtBy: "The Web3 Wizard",
    isPersonalProject: true,
    problem: "EVM wallet data is public but practically unreadable. A founder checking whether a counterparty is worth dealing with gets a wall of hexadecimal and no opinion, and the tools that do explain it assume you already know what you are looking at.",
    whatItDoes: "A web application that takes a wallet address and returns a full report in about ten seconds. It pulls on-chain data across five chains, computes a 0 to 100 risk score, and asks a language model to describe what the wallet's behaviour actually looks like. Read-only, no wallet connection, and every report gets its own shareable URL.",
    decisions: [
      "Make the address the only input. One field, no setup, no wallet connection, because every extra step is a reason a non-technical user closes the tab.",
      "Support Ethereum, Polygon, BNB Chain, Arbitrum, and Base from a single query so the user does not have to know which chain matters before asking.",
      "Be explicit about data freshness and about the difference between what the tool can verify and what it is inferring.",
    ],
    stack: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Moralis API", "Groq (Llama 3.3 70B)", "Supabase", "Recharts", "Vercel"],
    limitations: [
      "This is a founder-built personal project, not a production-grade service.",
      "On-chain data is fetched from third-party APIs and may have rate limits or delays.",
      "The risk score is a heuristic built from on-chain behaviour. It is not a fraud determination and should not be treated as one.",
      "Free analyses are rate limited to five per day per IP address.",
      "No financial advice or investment recommendations are made.",
    ],
    lessons: [
      "The interface design of a data tool matters as much as the data itself.",
      "Chain support requires handling meaningfully different data structures, not just swapping an API key.",
      "A single score is easier to act on than a dashboard, but a score that hides its reasoning invites false confidence.",
    ],
    relatedService: "/services/web3-mvp-development",
    liveUrl: "https://walletlens-hq.vercel.app",
    repoUrl: "https://github.com/theweb3wizard/walletlens",
    featured: true,
  },
  {
    name: "Write3",
    slug: "write3",
    summary: "A compliance-safe AI voice clone for Web3 content: it learns how you write and flags risky claims before you publish.",
    description: "Write3 learns a founder's voice from samples of their own writing, generates platform-native content, and flags the language that gets Web3 projects into regulatory trouble before anything is published.",
    status: "deployed",
    category: "AI content tool",
    builtBy: "The Web3 Wizard",
    isPersonalProject: true,
    problem: "Web3 founders publish across five channels that all have different norms, and generic AI writing tools flatten everyone into the same voice. Worse, Web3 marketing copy runs into securities language constantly, and most tools will happily generate language that creates real legal exposure.",
    whatItDoes: "A web application where a user pastes a few samples of their own writing, and the tool learns their tone and vocabulary. It then generates platform-native content for Twitter, Discord, Reddit, Telegram, Farcaster, blogs, and newsletters, and runs every draft through a compliance filter that flags phrases like guaranteed returns, passive income, or price prediction before anything is published.",
    decisions: [
      "Build a guardrail that removes rather than rewards. A content tool for this industry that will not flag risky language is a liability, not a convenience.",
      "Train on the user's own samples instead of offering style presets, because a voice that sounds like nobody in particular is exactly the problem being solved.",
      "Keep the output as drafts for human review. Nothing publishes itself.",
    ],
    stack: ["Next.js 16", "TypeScript", "Supabase", "OpenRouter", "Tailwind CSS", "Vercel"],
    limitations: [
      "This is a founder-built personal project.",
      "The compliance filter covers language patterns associated with SEC and FCA scrutiny. It is not legal advice and does not replace a lawyer.",
      "Generated content requires human review before publishing.",
      "The tool does not post directly to platforms. It generates drafts for human distribution.",
    ],
    lessons: [
      "AI content tools are most useful when they remove one specific friction, not when they try to replace the entire content workflow.",
      "The most defensible feature in a content tool is the thing it refuses to write.",
      "Platform-specific formatting is non-trivial and worth building explicitly.",
    ],
    relatedService: "/services/web3-mvp-development",
    liveUrl: "https://write3-ai.vercel.app",
    repoUrl: "https://github.com/theweb3wizard/Write3",
  },
  {
    name: "AgentHub",
    slug: "agenthub",
    summary: "A secure access layer for AI coding assistants: policy-controlled access to databases, APIs, and infrastructure.",
    description: "AgentHub solves a real problem in AI-native development: how do you give an AI coding assistant access to production resources without losing control of what it can do?",
    status: "deployed",
    category: "AI infrastructure tool",
    builtBy: "The Web3 Wizard",
    isPersonalProject: true,
    problem: "AI coding assistants need access to databases, APIs, and infrastructure to be genuinely useful. Giving them broad access creates real security and compliance risks.",
    whatItDoes: "A reverse proxy that sits between AI coding clients and Model Context Protocol servers. Every tool call passes through authentication, a policy engine, an SSRF firewall, and an audit logger. Policies are set per tool as allow, block, read-only, or require-approval, and approval requests go out over Slack with a five-minute window.",
    decisions: [
      "Design around least-privilege access. Agents get the minimum access required for each task.",
      "Make audit trails a first-class feature so every action is traceable.",
      "Human approval gates for high-risk operations rather than blocking all sensitive access.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Clerk", "Supabase", "Model Context Protocol"],
    limitations: [
      "This is a founder-built personal project, not a production enterprise tool.",
      "Policy enforcement is limited to the integrations currently supported.",
      "Security properties have not been formally audited.",
    ],
    lessons: [
      "The hardest part of secure agent design is defining the right granularity of access policies.",
      "Audit trails are only useful if they are easy to read, not just technically present.",
    ],
    relatedService: "/services/ai-agent-solana-engineering",
    liveUrl: "https://agenthub-hq.vercel.app",
    repoUrl: "https://github.com/theweb3wizard/AgentHub",
    featured: true,
  },
  {
    name: "OrderFlow",
    slug: "orderflow",
    summary: "A founder-built AI trading journal that reads on-chain history from Injective and shows a trader exactly where they are leaking money.",
    description: "OrderFlow is an AI-powered trading journal for Injective Protocol. It reads your on-chain trading history and turns it into specific, evidence-based feedback: where you are leaking money, what you are doing well, and what to fix next.",
    status: "deployed",
    category: "AI trading analytics",
    builtBy: "The Web3 Wizard",
    isPersonalProject: true,
    problem: "Most traders review their performance from memory or scattered screenshots. Their on-chain history holds the real story, but it is hard to read and even harder to turn into a concrete change in behaviour.",
    whatItDoes: "A web application that pulls a trader's on-chain history from Injective Protocol and analyses it with AI. It surfaces patterns across the trades, highlights where money is being lost, points out what is working, and gives specific suggestions drawn from the trader's own activity.",
    decisions: [
      "Anchor every insight to real on-chain evidence from the user's own trades rather than generic trading advice.",
      "Use AI to interpret patterns, but frame the output as review and reflection, not signals or predictions.",
      "Focus on a single chain (Injective) to read its data accurately rather than covering many chains shallowly.",
    ],
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Injective SDK", "Google Gemini", "Supabase"],
    limitations: [
      "This is a founder-built personal project, not a production trading service.",
      "It reviews past on-chain activity. It does not provide trading signals, predictions, or financial advice.",
      "Coverage is limited to Injective Protocol trading history.",
    ],
    lessons: [
      "Analysis is only useful when it points to a specific, evidence-backed action.",
      "Reading one chain's data well is more valuable than reading many chains shallowly.",
      "An AI report is only as good as the statistics you pre-compute for it. Hand a model raw JSON and it gives you generic advice back.",
    ],
    relatedService: "/services/web3-mvp-development",
    liveUrl: "https://orderflow-hq.vercel.app",
    repoUrl: "https://github.com/theweb3wizard/orderflow",
  },
  {
    name: "SolPulse",
    slug: "solpulse",
    summary: "A Solana whale tracker: it watches Pump.fun and Raydium wallets and sends dust-filtered alerts to Telegram in seconds.",
    description: "SolPulse watches Solana whale wallets on Pump.fun and Raydium and pushes the movements that matter to Telegram. Dust is filtered out before it ever reaches the user.",
    status: "deployed",
    category: "Solana monitoring tool",
    builtBy: "The Web3 Wizard",
    isPersonalProject: true,
    problem: "Raw Solana wallet activity is noisy. The useful question is not whether something happened, but whether it deserves attention. Most monitoring tools do not make that distinction, so people either mute them or stop reading them.",
    whatItDoes: "A tracker that watches labelled whale wallets on Pump.fun and Raydium through a single Helius webhook, prices each swap through DexScreener, discards anything under a dust threshold, and delivers the remainder as readable Telegram alerts with Solscan and DexScreener links. Read-only, no wallet connection, no signing.",
    decisions: [
      "Prioritise a small number of meaningful signals over a wall of events.",
      "Keep alert language plain enough to understand without a protocol background.",
      "Register one global webhook for every user's wallets rather than one per wallet, which keeps the integration O(1) as the user base grows instead of O(n).",
      "Treat the product as an experiment and disclose what has not been verified.",
    ],
    stack: ["Solana", "TypeScript", "Neon", "Drizzle ORM", "Helius", "DexScreener", "Telegram Bot API"],
    limitations: [
      "This is personal work, not a client deployment.",
      "Coverage and reliability are limited to the current experiment.",
      "Alerts depend on third-party webhook and pricing APIs, so delivery can be delayed or missed.",
      "No investment or trading outcome is implied.",
    ],
    lessons: [
      "Alerts are only useful when the user understands why they matter.",
      "A focused monitoring workflow can be more valuable than a larger data surface.",
      "Deduplication is a product feature, not a database detail. At-least-once delivery is fine as long as the second delivery is invisible.",
    ],
    relatedService: "/services/ai-agent-solana-engineering",
    liveUrl: "https://solpulse-hq.vercel.app",
  },
  {
    name: "Community Signal",
    slug: "community-signal",
    summary: "A building-stage experiment for turning Telegram and Discord community activity into a clearer next action.",
    description: "Community Signal explores how a Telegram or Discord workflow can guide people from community attention to a product action without unnecessary complexity.",
    status: "building",
    category: "Community automation",
    builtBy: "The Web3 Wizard",
    isPersonalProject: true,
    problem: "Community activity is easy to measure and difficult to turn into a coherent product journey. Most community bots add noise rather than reduce friction.",
    whatItDoes: "A building-stage experiment in community prompts, lightweight action flows, and useful handoffs between community interaction and product engagement.",
    decisions: [
      "Start with one clear action rather than a full community operating system.",
      "Keep the experience useful without assuming token incentives.",
      "Document the unknowns before calling the concept complete.",
    ],
    stack: ["TypeScript", "Telegram Bot API", "Discord API", "Node.js"],
    limitations: [
      "Building-stage personal project. Not yet offered as a product.",
      "No community growth or adoption result is claimed.",
      "The workflow is under active development.",
    ],
    lessons: [
      "Community tools work best when they reduce a real friction point rather than create a new channel.",
      "Distribution is not a substitute for product value.",
    ],
    relatedService: "/services/ai-agent-solana-engineering",
  },
];

// ─── Insights ─────────────────────────────────────────────────────────────────

export const insights: Insight[] = [
  {
    title: "What I Learned Shipping Seven Web3 MVPs Solo",
    slug: "what-i-learned-shipping-seven-web3-mvps-solo",
    description: "Seven founder-built Web3 products, one lesson each. What actually broke, what I would do differently, and why the code was rarely the reason.",
    category: "Building in public",
    readingTime: "7 min read",
    relatedService: "/services/web3-mvp-development",
    datePublished: "2026-10-24",
    draft: false,
  },
  {
    title: "How to scope a Web3 MVP before spending money",
    slug: "scope-a-web3-product-before-spending-money",
    description: "A practical framework for Web3 founders deciding what to build first. How to define an MVP, eliminate unnecessary scope, and avoid building the wrong thing.",
    category: "Product strategy",
    readingTime: "8 min read",
    relatedService: "/services/product-discovery",
    datePublished: "2026-08-13",
    draft: false,
  },
  {
    title: "Why a Web3 prototype fails when real users touch it",
    slug: "why-a-web3-prototype-can-fail",
    description: "The gap between a working demo and a product real users can navigate. Why Web3 prototypes break under user pressure and what to fix before launch.",
    category: "Web3 product development",
    readingTime: "7 min read",
    relatedService: "/services/web3-mvp-development",
    datePublished: "2026-08-13",
    draft: false,
  },
  {
    title: "How to use AI in Web3 product development without blindly trusting it",
    slug: "use-ai-without-blindly-trusting-it",
    description: "A practical guide to AI-native Web3 product development. How to direct AI tools, challenge their output, test what matters, and stay accountable for what ships.",
    category: "AI-native development",
    readingTime: "8 min read",
    relatedService: "/services/web3-mvp-development",
    datePublished: "2026-08-13",
    draft: false,
  },
  {
    title: "How Much Does a Web3 MVP Cost?",
    slug: "how-much-does-a-web3-mvp-cost",
    description: "What a Web3 MVP actually costs, which four decisions move the price, and how to spend less without shipping less. Published starting points included.",
    category: "Pricing and scope",
    readingTime: "4 min read",
    relatedService: "/services/web3-mvp-development",
    datePublished: "2026-10-24",
    draft: false,
  },
  {
    title: "Do I Need a Smart Contract Audit?",
    slug: "do-i-need-a-smart-contract-audit",
    description: "When a smart contract audit is worth the money, when it is not, and what you still need to do if you skip one. Written by someone who does not sell audits.",
    category: "Security and risk",
    readingTime: "5 min read",
    relatedService: "/services/web3-mvp-development",
    datePublished: "2026-10-24",
    draft: false,
  },
  {
    title: "How to Evaluate a Web3 Developer",
    slug: "how-to-evaluate-a-web3-developer",
    description: "Five things worth checking before you hire a Web3 developer, the questions that reveal more than a portfolio, and where I honestly fall short myself.",
    category: "Hiring",
    readingTime: "4 min read",
    relatedService: "/services/product-discovery",
    datePublished: "2026-10-24",
    draft: false,
  },
  {
    title: "Web3 Agency vs Freelancer: How to Choose",
    slug: "web3-agency-vs-freelancer",
    description: "An honest comparison of agencies, freelancers, and solo studios for Web3 work, including the cases where a solo studio like mine is the wrong choice.",
    category: "Hiring",
    readingTime: "4 min read",
    relatedService: "/services/web3-mvp-development",
    datePublished: "2026-10-24",
    draft: false,
  },
  {
    title: "What Is an AI Agent in Web3?",
    slug: "what-is-an-ai-agent-in-web3",
    description: "A plain definition of an AI agent in Web3, how it differs from a bot or a smart contract, and why the refusal list matters more than the capabilities.",
    category: "Definitions",
    readingTime: "4 min read",
    relatedService: "/services/ai-agent-solana-engineering",
    datePublished: "2026-10-24",
    draft: false,
  },
  {
    title: "What Is a Web3 MVP?",
    slug: "what-is-a-web3-mvp",
    description: "What a Web3 MVP is, why the Web3 version needs failure handling in version one, and what belongs in a first version versus what can wait.",
    category: "Definitions",
    readingTime: "4 min read",
    relatedService: "/services/web3-mvp-development",
    datePublished: "2026-10-24",
    draft: false,
  },
  {
    title: "What Is a Product Discovery Sprint?",
    slug: "what-is-a-product-discovery-sprint",
    description: "What a product discovery sprint produces, what it is not, and how to tell whether it is the right purchase for where your product is right now.",
    category: "Definitions",
    readingTime: "3 min read",
    relatedService: "/services/product-discovery",
    datePublished: "2026-10-24",
    draft: false,
  },
  {
    title: "What Is Wallet Intelligence?",
    slug: "what-is-wallet-intelligence",
    description: "What wallet intelligence means, the problem it actually solves, and the four things it should never claim to be. Includes a working example.",
    category: "Definitions",
    readingTime: "4 min read",
    relatedService: "/services/ai-agent-solana-engineering",
    datePublished: "2026-10-24",
    draft: false,
  },
];

// ─── Services ─────────────────────────────────────────────────────────────────

export const services = {
  productDiscovery: {
    slug: "product-discovery",
    label: "Product Discovery Sprint",
    eyebrow: "PRODUCT DISCOVERY SPRINT",
    title: "Turn your Web3 problem into a build-ready product direction.",
    description: "Start here if you are not yet sure what to build. For founders and small teams with a real problem or promising idea, we define the user, scope the MVP, and produce a direction you can act on with confidence.",
    cta: "Start with your problem",
    query: "product-discovery",
  },
  web3MvpDevelopment: {
    slug: "web3-mvp-development",
    label: "AI-Native Web3 Product Build",
    eyebrow: "AI-NATIVE WEB3 PRODUCT BUILD",
    title: "Build the smallest useful Web3 product and ship it.",
    description: "The core engagement. For founders and small teams with a validated problem, concept, prototype, or spec, we build and ship a focused product: AI agents, Solana applications, dApps, automation tools, and Web3 MVPs.",
    cta: "Discuss your product",
    query: "web3-mvp-development",
  },
  aiAgentSolanaEngineering: {
    slug: "ai-agent-solana-engineering",
    label: "AI Agent & Solana Engineering",
    eyebrow: "AI AGENT & SOLANA ENGINEERING",
    title: "Specialist AI agent and Solana engineering for Web3 teams.",
    description: "A specialist capability for teams that already know what they need. AI agents, autonomous workflows, Telegram and Discord tools, Solana integrations, on-chain data pipelines, and AI-powered product features.",
    cta: "Discuss the capability",
    query: "ai-agent-solana-engineering",
  },
} as const;

// ─── Navigation ───────────────────────────────────────────────────────────────

export type NavLinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const navLinks: NavLinkItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "AI Agents", href: "/ai-agents" },
  { label: "Spellbook ↗", href: "https://spellbook.theweb3wizard.xyz", external: true },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Hire Khalid", href: "/hire-khalid" },
];
