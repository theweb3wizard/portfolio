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
    name: "Valor",
    slug: "valor",
    summary: "A founder-built AI agent for Telegram: autonomous conversation and task execution for Web3 communities.",
    description: "Valor is an AI agent that operates inside Telegram. It handles conversations, answers questions, and executes tasks autonomously within Web3 community contexts.",
    status: "deployed",
    category: "AI agent",
    builtBy: "The Web3 Wizard",
    isPersonalProject: true,
    problem: "Web3 communities rely heavily on manual moderation and repetitive question-answering. Most bots respond with static replies rather than reasoning about context.",
    whatItDoes: "An autonomous AI agent deployed on Telegram. Valor processes natural language, reasons over context, and executes defined tasks without requiring a human to be present for every interaction.",
    decisions: [
      "Build around conversational context rather than keyword triggers to make the agent genuinely useful.",
      "Define a clear capability boundary so the agent does not pretend to know things it does not.",
      "Keep the deployment model simple. Telegram webhooks, no complex infrastructure.",
    ],
    stack: ["TypeScript", "Node.js", "Telegram Bot API", "OpenAI API", "Vercel"],
    limitations: [
      "This is a founder-built personal project, not a client deployment.",
      "Agent behaviour is bounded by defined system prompts and does not self-modify.",
      "No financial advice, trading signals, or token recommendations are provided.",
    ],
    lessons: [
      "Autonomous agents are only useful when their failure modes are well-defined.",
      "The most important design decision in an agent is what it explicitly refuses to do.",
    ],
    relatedService: "/services/ai-agent-solana-engineering",
    liveUrl: "https://valor-tgbot.vercel.app",
    repoUrl: "https://github.com/theweb3wizard/Valor",
    featured: true,
  },
  {
    name: "WalletLens",
    slug: "walletlens",
    summary: "AI-powered EVM wallet intelligence: query Ethereum, Polygon, BNB, Arbitrum, and Base wallets in plain English.",
    description: "WalletLens turns EVM on-chain data into something a non-technical founder can actually interrogate. Natural language queries replace raw blockchain explorers.",
    status: "deployed",
    category: "Web3 AI tool",
    builtBy: "The Web3 Wizard",
    isPersonalProject: true,
    problem: "EVM wallet data is publicly available but practically inaccessible to founders who are not experienced with blockchain explorers or raw API responses.",
    whatItDoes: "A web application that lets users ask natural language questions about EVM wallet addresses. It fetches on-chain data, interprets it with AI, and returns readable summaries and insights.",
    decisions: [
      "Use natural language as the primary interface to eliminate the learning curve of blockchain data tools.",
      "Support multiple chains (ETH, Polygon, BNB, Arbitrum, Base) from a single query to reduce context switching.",
      "Be explicit about data freshness and what the tool can and cannot verify.",
    ],
    stack: ["TypeScript", "React", "Next.js", "OpenAI API", "Etherscan API", "Vercel"],
    limitations: [
      "This is a founder-built personal project, not a production-grade service.",
      "On-chain data is fetched from third-party APIs and may have rate limits or delays.",
      "No financial advice or investment recommendations are made.",
    ],
    lessons: [
      "The interface design of a data tool matters as much as the data itself.",
      "Chain support requires handling meaningfully different data structures, not just swapping an API key.",
    ],
    relatedService: "/services/web3-mvp-development",
    liveUrl: "https://walletlens-hq.vercel.app",
    repoUrl: "https://github.com/theweb3wizard/walletlens",
    featured: true,
  },
  {
    name: "Write3",
    slug: "write3",
    summary: "AI-powered Web3 content generation for X, Discord, Telegram, Farcaster, and blogs.",
    description: "Write3 is an AI-native content tool designed for Web3 builders and communities. It generates platform-appropriate content across the channels Web3 communities actually use.",
    status: "deployed",
    category: "AI content tool",
    builtBy: "The Web3 Wizard",
    isPersonalProject: true,
    problem: "Web3 founders spend significant time creating content for multiple platforms with different norms. Generic AI writing tools do not understand Web3 context or platform-specific formatting.",
    whatItDoes: "A web application that generates Web3-native content for X (Twitter), Discord, Telegram, Farcaster, and long-form blogs. Users provide context about their project and the tool produces ready-to-use content.",
    decisions: [
      "Build separate output formats for each platform rather than a single generic output.",
      "Train the system prompt on Web3 communication norms to produce content that fits the ecosystem.",
      "Keep the interface minimal so founders can iterate quickly on different content angles.",
    ],
    stack: ["TypeScript", "React", "Next.js", "OpenAI API", "Vercel"],
    limitations: [
      "This is a founder-built personal project.",
      "Generated content requires human review before publishing.",
      "The tool does not post directly to platforms. It generates drafts for human distribution.",
    ],
    lessons: [
      "AI content tools are most useful when they reduce a specific friction, not when they try to replace the entire content workflow.",
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
    whatItDoes: "A policy-controlled access layer that sits between AI coding tools and sensitive resources. It enforces access policies, maintains audit trails, and routes approvals to humans when required.",
    decisions: [
      "Design around least-privilege access. Agents get the minimum access required for each task.",
      "Make audit trails a first-class feature so every action is traceable.",
      "Human approval gates for high-risk operations rather than blocking all sensitive access.",
    ],
    stack: ["TypeScript", "Node.js", "PostgreSQL", "Vercel"],
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
    liveUrl: "https://agenthub-lyart.vercel.app",
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
    stack: ["Next.js", "Gemini AI", "Injective SDK", "TypeScript"],
    limitations: [
      "This is a founder-built personal project, not a production trading service.",
      "It reviews past on-chain activity. It does not provide trading signals, predictions, or financial advice.",
      "Coverage is limited to Injective Protocol trading history.",
    ],
    lessons: [
      "Analysis is only useful when it points to a specific, evidence-backed action.",
      "Reading one chain's data well is more valuable than reading many chains shallowly.",
    ],
    relatedService: "/services/web3-mvp-development",
    liveUrl: "https://orderflow-hq.vercel.app",
    repoUrl: "https://github.com/theweb3wizard/orderflow",
  },
  {
    name: "SolPulse",
    slug: "solpulse",
    summary: "A founder-built Solana on-chain monitoring experiment: whale activity signals delivered via Telegram.",
    description: "SolPulse turns raw Solana on-chain activity into a calmer, more readable monitoring workflow. Meaningful wallet movements delivered as plain-English Telegram alerts.",
    status: "deployed",
    category: "Solana monitoring tool",
    builtBy: "The Web3 Wizard",
    isPersonalProject: true,
    problem: "Raw Solana wallet activity is noisy. The useful question is not whether something happened, but whether it deserves attention. Most monitoring tools do not make that distinction.",
    whatItDoes: "A personal product experiment that filters Solana wallet movements and delivers a smaller set of meaningful signals as readable Telegram notifications.",
    decisions: [
      "Prioritise a small number of meaningful signals over a wall of events.",
      "Keep alert language plain enough to understand without a protocol background.",
      "Treat the product as an experiment and disclose what has not been verified.",
    ],
    stack: ["Solana", "TypeScript", "Node.js", "Telegram Bot API"],
    limitations: [
      "This is personal work, not a client deployment.",
      "Coverage and reliability are limited to the current experiment.",
      "No investment or trading outcome is implied.",
    ],
    lessons: [
      "Alerts are only useful when the user understands why they matter.",
      "A focused monitoring workflow can be more valuable than a larger data surface.",
    ],
    relatedService: "/services/ai-agent-solana-engineering",
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
    title: "How to scope a Web3 MVP before spending money",
    slug: "scope-a-web3-product-before-spending-money",
    description: "A practical framework for Web3 founders deciding what to build first. How to define an MVP, eliminate unnecessary scope, and avoid building the wrong thing.",
    category: "Product strategy",
    readingTime: "6 min read",
    relatedService: "/services/product-discovery",
    datePublished: "2026-08-13",
    draft: false,
  },
  {
    title: "Why a Web3 prototype fails when real users touch it",
    slug: "why-a-web3-prototype-can-fail",
    description: "The gap between a working demo and a product real users can navigate. Why Web3 prototypes break under user pressure and what to fix before launch.",
    category: "Web3 product development",
    readingTime: "5 min read",
    relatedService: "/services/web3-mvp-development",
    datePublished: "2026-08-13",
    draft: false,
  },
  {
    title: "How to use AI in Web3 product development without blindly trusting it",
    slug: "use-ai-without-blindly-trusting-it",
    description: "A practical guide to AI-native Web3 product development. How to direct AI tools, challenge their output, test what matters, and stay accountable for what ships.",
    category: "AI-native development",
    readingTime: "7 min read",
    relatedService: "/services/web3-mvp-development",
    datePublished: "2026-08-13",
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

export const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "AI Agents", href: "/ai-agents" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Profile", href: "/profile" },
];
