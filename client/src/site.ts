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
  featured?: boolean;
};

export type Insight = {
  title: string;
  slug: string;
  description: string;
  category: string;
  readingTime: string;
  relatedService: string;
  draft: boolean;
};

export const projects: Project[] = [
  {
    name: "SolPulse",
    slug: "solpulse",
    summary: "A founder-built Solana monitoring concept for clearer whale activity signals.",
    description: "SolPulse explores how on-chain activity can become a calmer, more useful alerting experience for people who need to understand what changed.",
    status: "deployed",
    category: "Monitoring tool",
    builtBy: "The Web3 Wizard",
    isPersonalProject: true,
    problem: "Raw wallet activity is noisy. The useful question is not whether something happened, but whether it deserves attention.",
    whatItDoes: "A personal product experiment that turns selected Solana wallet movements into a more readable monitoring workflow.",
    decisions: ["Prioritize a small number of meaningful signals instead of a wall of events.", "Keep the alert language plain enough to understand without a protocol background.", "Treat the product as an experiment and disclose what has not been verified."],
    stack: ["Solana", "React", "TypeScript", "Telegram"],
    limitations: ["This is personal work, not a client deployment.", "Coverage and reliability are limited to the current experiment.", "No investment or trading outcome is implied."],
    lessons: ["Alerts are only useful when the user understands why they matter.", "A focused workflow can be more valuable than a larger data surface."],
    relatedService: "/services/community-tools",
    featured: true,
  },
  {
    name: "TxPreview",
    slug: "txpreview",
    summary: "A founder-built interface concept for making transaction intent easier to inspect.",
    description: "TxPreview explores the product experience around pausing before a wallet signature and asking what the action is really going to do.",
    status: "deployed",
    category: "Wallet utility",
    builtBy: "The Web3 Wizard",
    isPersonalProject: true,
    problem: "Wallet prompts often compress important intent into unfamiliar contract data and a final button.",
    whatItDoes: "A personal interface experiment for showing transaction context before a user confirms a wallet action.",
    decisions: ["Explain the action in normal language before showing technical detail.", "Make uncertainty visible rather than pretending the interface can guarantee safety.", "Keep the primary journey short enough to be useful during a real decision."],
    stack: ["React", "TypeScript", "Wallet APIs"],
    limitations: ["This is a founder-built experiment, not a security certification.", "Smart-contract behavior is outside the scope of this product concept.", "The interface does not guarantee a transaction is safe."],
    lessons: ["Clarity is part of product safety, but it is not a substitute for a formal audit.", "A user needs context before controls."],
    relatedService: "/services/prototype-refinement",
    featured: true,
  },
  {
    name: "SearchLens",
    slug: "searchlens",
    summary: "A founder-built concept for helping teams understand how their products appear in AI-assisted search.",
    description: "SearchLens is an independent product experiment focused on turning vague discoverability questions into a more structured review conversation.",
    status: "concept",
    category: "Research tool",
    builtBy: "The Web3 Wizard",
    isPersonalProject: true,
    problem: "Teams want to know how their product is understood by search and AI systems, but the question is often too broad to act on.",
    whatItDoes: "A concept for organizing search prompts, observed answers, and content decisions into a clearer working loop.",
    decisions: ["Focus on questions and evidence instead of vanity rankings.", "Connect observations to content decisions a founder can actually make.", "Keep the concept clearly labeled until the workflow is fully built."],
    stack: ["Product research", "React", "AI-assisted workflows"],
    limitations: ["Concept build; not a finished commercial product.", "No search ranking or lead-generation outcome is promised.", "The workflow remains under refinement."],
    lessons: ["A useful content system begins with a real buyer question.", "A concept should be labeled honestly before it becomes a product claim."],
    relatedService: "/services/product-builds",
    featured: true,
  },
  {
    name: "Community Signal",
    slug: "community-signal",
    summary: "A building-stage experiment for turning community activity into a clearer next action.",
    description: "Community Signal explores how a Telegram or Discord workflow can guide people from attention to a product action without adding unnecessary complexity.",
    status: "building",
    category: "Community tool",
    builtBy: "The Web3 Wizard",
    isPersonalProject: true,
    problem: "Community activity is easy to measure and difficult to turn into a coherent product journey.",
    whatItDoes: "A building-stage experiment in community prompts, lightweight actions, and useful handoffs.",
    decisions: ["Start with one clear action rather than a full community operating system.", "Keep the experience useful without assuming token incentives.", "Document the unknowns before calling the concept complete."],
    stack: ["Telegram", "Discord", "React"],
    limitations: ["Building-stage personal project.", "No community growth or adoption result is claimed.", "The workflow is not currently offered as a ready-made product."],
    lessons: ["Community tools work best when they reduce a real friction point.", "Distribution is not a substitute for product value."],
    relatedService: "/services/community-tools",
  },
];

export const insights: Insight[] = [
  { title: "How to scope a Web3 product before spending money", slug: "scope-a-web3-product-before-spending-money", description: "A plain-English framework for deciding what belongs in a first Web3 product and what should wait.", category: "Product decisions", readingTime: "6 min read", relatedService: "/services/product-builds", draft: false },
  { title: "Why a Web3 prototype can fail when real users touch it", slug: "why-a-web3-prototype-can-fail", description: "The gap between a working demo and a product that explains itself under real user pressure.", category: "Prototype refinement", readingTime: "5 min read", relatedService: "/services/prototype-refinement", draft: false },
  { title: "How to use AI when building a Web3 product without blindly trusting the output", slug: "use-ai-without-blindly-trusting-it", description: "A practical look at directing, challenging, testing, and taking responsibility for AI-assisted product work.", category: "AI-assisted building", readingTime: "7 min read", relatedService: "/services/application-review", draft: false },
];

export const services = {
  productBuilds: { slug: "product-builds", label: "Product builds", eyebrow: "FOCUSED PRODUCT BUILDS", title: "Turn the idea into the smallest useful product.", description: "For founders and small teams who need a focused Web3 application, dashboard, internal tool, or prototype built without unnecessary agency layers.", cta: "Tell me what you want to build", query: "product-builds" },
  prototypeRefinement: { slug: "prototype-refinement", label: "Prototype refinement", eyebrow: "PROTOTYPE REFINEMENT", title: "Your prototype should help people understand the product, not make them work for it.", description: "I help refine rough, confusing, incomplete, or AI-assisted prototypes into clearer product experiences with a more reliable main journey.", cta: "Review my prototype", query: "prototype-refinement" },
  communityTools: { slug: "community-tools", label: "Community tools", eyebrow: "COMMUNITY TOOLS", title: "Turn community attention into a useful product experience.", description: "Build focused Telegram Mini Apps, Discord tools, alerts, wallet utilities, and community workflows that help people take a clear next action.", cta: "Discuss a community tool", query: "community-tools" },
  applicationReview: { slug: "application-review", label: "Application review", eyebrow: "APPLICATION-LAYER REVIEW", title: "A focused review before you trust your application to real users.", description: "A narrow application-layer review for fast-built and AI-assisted Web3 applications. It focuses on users, access, secrets, configuration, and important trust boundaries.", cta: "Request an application review", query: "application-review" },
} as const;

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];
