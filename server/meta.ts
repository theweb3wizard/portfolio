/**
 * server/meta.ts
 *
 * Per-route meta injection: title, description, canonical, Open Graph,
 * Twitter cards, and JSON-LD (schema.org).
 *
 * Used by:
 *   • vite-plugin-ssg-meta  → writes static HTML files at build time (Vercel)
 *   • server/vite.ts        → injects meta at request time for local dev
 */

export const SITE_URL = "https://www.theweb3wizard.xyz";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const OG_IMAGE_ALT =
  "The Web3 Wizard: AI-Native Web3 Product Studio. Turn your Web3 problem into a working product.";

const AUTHOR_NAME = "Khalid Murtala";
const PERSONA = "The Web3 Wizard";
const ORG_NAME = "The Web3 Wizard Labs";
// Public brand shown in social cards (og:site_name). The formal entity name
// (ORG_NAME) is reserved for schema.org / legal / publisher fields.
const SITE_NAME = PERSONA;
const STUDIO_DESCRIPTION =
  "The Web3 Wizard is a founder-led AI-native Web3 product studio. We help early-stage Web3 founders and small teams turn real problems and roadmap milestones into focused working products, specialising in AI agents, Solana applications, dApps, automation tools, and Web3 MVPs.";

// ─── Entity schemas ────────────────────────────────────────────────────────────

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: AUTHOR_NAME,
  alternateName: PERSONA,
  url: SITE_URL,
  jobTitle: `Founder of ${PERSONA} / ${ORG_NAME}`,
  sameAs: [
    "https://github.com/theweb3wizard",
    "https://www.linkedin.com/in/theweb3wizard00",
    "https://x.com/theweb3wizard00",
    "https://t.me/theweb3wizard00",
  ],
  worksFor: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: ORG_NAME,
    url: SITE_URL,
  },
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: ORG_NAME,
  alternateName: PERSONA,
  url: SITE_URL,
  description: STUDIO_DESCRIPTION,
  founder: {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: AUTHOR_NAME,
    alternateName: PERSONA,
  },
  knowsAbout: [
    "AI agents",
    "Solana application development",
    "Web3 product development",
    "dApp development",
    "Web3 automation",
    "MVP development",
    "AI-native product development",
  ],
  sameAs: [
    "https://github.com/theweb3wizard",
    "https://www.linkedin.com/in/theweb3wizard00",
    "https://x.com/theweb3wizard00",
    "https://t.me/theweb3wizard00",
  ],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: ORG_NAME,
  alternateName: PERSONA,
  url: SITE_URL,
  description: STUDIO_DESCRIPTION,
  publisher: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: ORG_NAME,
  },
  author: {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: AUTHOR_NAME,
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does The Web3 Wizard do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Web3 Wizard (The Web3 Wizard Labs) is a founder-led AI-native Web3 product studio. We help early-stage founders and small teams turn problems and product ideas into focused working products: AI agents, Solana applications, dApps, automation tools, and Web3 MVPs.",
      },
    },
    {
      "@type": "Question",
      name: "Who is it for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Early-stage Web3 founders and small teams with a validated problem, prototype, product idea, or roadmap milestone, and who need AI agents, AI × Web3 product engineering, or a focused decentralised application built.",
      },
    },
    {
      "@type": "Question",
      name: "What types of projects do you accept?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Focused scopes: AI agents and agentic workflows, Solana and EVM application features, wallet intelligence and on-chain data tools, Telegram and Discord tools, Web3 automation, and focused product MVPs. Open-ended builds are not a fit.",
      },
    },
    {
      "@type": "Question",
      name: "Do you build AI agents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. AI agent development is a core capability. We have built AI agents for Telegram, Web3 workflows, and autonomous data pipelines. Every agent is built to a clear scope with defined behaviour and documented limitations.",
      },
    },
    {
      "@type": "Question",
      name: "Do you build Solana and EVM applications?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Solana and EVM application development are primary technical focuses. The studio has built Solana monitoring tools, EVM wallet intelligence products, and application layers that integrate with both ecosystems.",
      },
    },
    {
      "@type": "Question",
      name: "Do you have client testimonials?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not yet. The Web3 Wizard Labs is currently opening its first client engagements. The work shown on this site is founder-built personal work, clearly labelled as such. The first engagement is designed to be narrow and transparent so both sides can evaluate the fit responsibly.",
      },
    },
    {
      "@type": "Question",
      name: "Are the portfolio projects client work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The portfolio shows founder-built personal projects and experiments. Every project is clearly labelled so you can distinguish personal work from future client engagements.",
      },
    },
    {
      "@type": "Question",
      name: "Do you perform smart-contract audits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The studio does not provide formal smart-contract audits, penetration tests, or security certification. Application-layer reviews and product-layer smart-contract integrations can be discussed for specific engagements.",
      },
    },
    {
      "@type": "Question",
      name: "Do you use AI to build the products?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. AI helps with research, planning, design, coding, testing, and review. Khalid Murtala directs the work, challenges the output, understands important decisions, tests key behaviour, and remains accountable for what is delivered.",
      },
    },
    {
      "@type": "Question",
      name: "How does pricing work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are four starting points: Product and Technical Discovery from $750, AI Agent or Web3 Integration Sprint from $2,500, Focused dApp or Web3 Product Build from $6,000, and Embedded Product Engineering from $2,000/month. Starting prices are indicative. Final scope, timeline, integrations, and price are confirmed after a fit conversation.",
      },
    },
    {
      "@type": "Question",
      name: "What happens after I submit an enquiry?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Khalid Murtala reviews every inquiry personally, typically within two business days, and replies if the project looks like a good fit. If it is not the right fit, he says so clearly. Inquiry data is not stored in a database; it is delivered via Telegram notification.",
      },
    },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function serviceSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: AUTHOR_NAME,
    },
    serviceType: "Web3 Product Development",
    areaServed: "Worldwide",
  };
}

function softwareSchema(
  name: string,
  description: string,
  url?: string,
  repoUrl?: string,
) {
  const obj: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: AUTHOR_NAME,
    },
    applicationCategory: "Web3 Application",
  };
  if (url) obj.url = url;
  if (repoUrl) obj.codeRepository = repoUrl;
  return obj;
}

function articleSchema(
  title: string,
  description: string,
  slug: string,
  datePublished: string,
  dateModified?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: AUTHOR_NAME,
      alternateName: PERSONA,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: ORG_NAME,
      url: SITE_URL,
    },
    url: `${SITE_URL}/insights/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/insights/${slug}`,
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: ORG_NAME,
    },
  };
}

function breadcrumb(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── Route metadata registry ──────────────────────────────────────────────────

type RouteMeta = {
  title: string;
  description: string;
  noindex?: boolean;
  /**
   * Canonical URL override, used when two routes serve identical content and one
   * must consolidate its signals into the other. See "/profile" below.
   */
  canonicalPath?: string;
  /**
   * Explicit Open Graph image. By default every route gets its own card from
   * /og/ — see ogImageFor() below. Only set this to override that convention.
   */
  ogImage?: string;
  schemas?: object[];
};

export const ROUTE_META: Record<string, RouteMeta> = {
  // ── Home ──────────────────────────────────────────────────────────────────
  "/": {
    title: "The Web3 Wizard | AI-Native Web3 Product Studio",
    description:
      "Founder-led AI-native Web3 studio. We turn real problems into working products: AI agents, Solana apps, dApps, automation, and focused Web3 MVPs.",
    schemas: [WEBSITE_SCHEMA, ORGANIZATION_SCHEMA, PERSON_SCHEMA, FAQ_SCHEMA],
  },

  // ── Services ──────────────────────────────────────────────────────────────
  "/services": {
    title: "Web3 Product Services | The Web3 Wizard",
    description:
      "Choose your engagement: Product Discovery Sprint, Web3 MVP build, or AI Agent & Solana engineering. Focused services for Web3 founders.",
    schemas: [
      PERSON_SCHEMA,
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Services", url: `${SITE_URL}/services` },
      ]),
    ],
  },

  "/services/product-discovery": {
    title: "Product Discovery Sprint | The Web3 Wizard",
    description:
      "Turn a Web3 idea into a build-ready direction. Define the user, scope the MVP, and decide what to build first with confidence.",
    schemas: [
      PERSON_SCHEMA,
      serviceSchema(
        "Product Discovery Sprint",
        "A focused engagement for Web3 founders who have a real problem or product idea but need clarity before committing to a build. Covers problem definition, target user, MVP scope, and build-ready product direction.",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Services", url: `${SITE_URL}/services` },
        { name: "Product Discovery Sprint", url: `${SITE_URL}/services/product-discovery` },
      ]),
    ],
  },

  "/services/web3-mvp-development": {
    title: "Web3 MVP Development | The Web3 Wizard",
    description:
      "Build a focused Web3 MVP: AI agents, Solana apps, dApps, and automation. Founder-led, AI-native execution from concept to shipped product.",
    schemas: [
      PERSON_SCHEMA,
      serviceSchema(
        "AI-Native Web3 Product Build",
        "For founders with a validated problem, product concept, prototype, or specification. Builds focused Web3 products including AI agents, Solana applications, dApps, automation tools, and MVPs.",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Services", url: `${SITE_URL}/services` },
        { name: "AI-Native Web3 Product Build", url: `${SITE_URL}/services/web3-mvp-development` },
      ]),
    ],
  },

  "/services/ai-agent-solana-engineering": {
    title: "AI Agent & Solana Engineering | The Web3 Wizard",
    description:
      "Specialist AI agent & Solana engineering: autonomous workflows, Telegram/Discord bots, Solana integrations, and on-chain data pipelines.",
    schemas: [
      PERSON_SCHEMA,
      serviceSchema(
        "AI Agent & Solana Product Engineering",
        "For teams that need specialist AI agent or Solana engineering. Covers autonomous workflows, Telegram and Discord AI agents, Solana integrations, on-chain data pipelines, and AI-powered Web3 product features.",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Services", url: `${SITE_URL}/services` },
        { name: "AI Agent & Solana Engineering", url: `${SITE_URL}/services/ai-agent-solana-engineering` },
      ]),
    ],
  },

  // ── Work ──────────────────────────────────────────────────────────────────
  "/work": {
    title: "Founder-Built Web3 Projects | The Web3 Wizard",
    description:
      "Portfolio of founder-built Web3 projects: AI agents, Solana tools, EVM wallet intelligence, and automation, shipped by Khalid Murtala.",
    schemas: [
      PERSON_SCHEMA,
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Work", url: `${SITE_URL}/work` },
      ]),
    ],
  },

  "/work/spellbook": {
    title: "Spellbook | Web3 AI Agent Marketplace | The Web3 Wizard",
    description:
      "Spellbook: Autonomous Web3 AI agent marketplace. Browse and deploy production-ready AI agents or commission custom architectures with escrow-protected delivery.",
    schemas: [
      PERSON_SCHEMA,
      softwareSchema(
        "Spellbook",
        "Autonomous Web3 AI agent marketplace and workflow hub. Curated agents with escrow checkout, custom commission requests, and live milestone delivery.",
        "https://spellbook.theweb3wizard.xyz",
        "https://github.com/theweb3wizard/spellbook",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Work", url: `${SITE_URL}/work` },
        { name: "Spellbook", url: `${SITE_URL}/work/spellbook` },
      ]),
    ],
  },

  "/work/valor": {
    title: "Valor: AI Community Rewards | The Web3 Wizard",
    description:
      "Valor is a founder-built agent that scores every Telegram message and pays top contributors in USDC on Base. No commands, no voting, no manual review.",
    schemas: [
      PERSON_SCHEMA,
      softwareSchema(
        "Valor",
        "Autonomous community rewards agent. Scores Telegram contributions with AI and pays top contributors in USDC on Base.",
        "https://valor-tgbot.vercel.app",
        "https://github.com/theweb3wizard/Valor",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Work", url: `${SITE_URL}/work` },
        { name: "Valor", url: `${SITE_URL}/work/valor` },
      ]),
    ],
  },

  "/work/walletlens": {
    title: "WalletLens | EVM Wallet Intelligence | The Web3 Wizard",
    description:
      "WalletLens: AI-powered EVM wallet intelligence for Ethereum, Polygon, BNB, Arbitrum and Base. Paste an address for a risk score and a plain-English read.",
    schemas: [
      PERSON_SCHEMA,
      softwareSchema(
        "WalletLens",
        "AI-powered EVM wallet intelligence. Analyse ETH, Polygon, BNB, Arbitrum, and Base wallets.",
        "https://walletlens-hq.vercel.app",
        "https://github.com/theweb3wizard/walletlens",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Work", url: `${SITE_URL}/work` },
        { name: "WalletLens", url: `${SITE_URL}/work/walletlens` },
      ]),
    ],
  },

  "/work/write3": {
    title: "Write3 | Compliance-Safe Web3 Content | The Web3 Wizard",
    description:
      "Write3 learns a founder's voice from their own writing, generates platform-native Web3 content, and flags risky claims before anything is published.",
    schemas: [
      PERSON_SCHEMA,
      softwareSchema(
        "Write3",
        "Compliance-safe AI voice clone for Web3 content. Generates platform-native drafts and flags language that attracts regulatory scrutiny.",
        "https://write3-ai.vercel.app",
        "https://github.com/theweb3wizard/Write3",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Work", url: `${SITE_URL}/work` },
        { name: "Write3", url: `${SITE_URL}/work/write3` },
      ]),
    ],
  },

  "/work/agenthub": {
    title: "AgentHub | Secure AI Agent Access | The Web3 Wizard",
    description:
      "AgentHub: secure access layer for AI coding assistants. Policy-controlled DB/API access with audit trails and human approval.",
    schemas: [
      PERSON_SCHEMA,
      softwareSchema(
        "AgentHub",
        "Secure, authenticated access for AI coding assistants to databases, APIs, and infrastructure with policy control, audit trails, and human approval gates.",
        "https://agenthub-hq.vercel.app",
        "https://github.com/theweb3wizard/AgentHub",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Work", url: `${SITE_URL}/work` },
        { name: "AgentHub", url: `${SITE_URL}/work/agenthub` },
      ]),
    ],
  },

  "/work/orderflow": {
    title: "OrderFlow | AI Trading Journal | The Web3 Wizard",
    description:
      "OrderFlow: AI trading journal for Injective. Reads your on-chain history to show where you leak money and what to fix next.",
    schemas: [
      PERSON_SCHEMA,
      softwareSchema(
        "OrderFlow",
        "AI-powered trading journal for Injective Protocol. Analyses on-chain trading history and turns it into specific, evidence-based feedback.",
        "https://orderflow-hq.vercel.app",
        "https://github.com/theweb3wizard/orderflow",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Work", url: `${SITE_URL}/work` },
        { name: "OrderFlow", url: `${SITE_URL}/work/orderflow` },
      ]),
    ],
  },

  "/work/solpulse": {
    title: "SolPulse | Solana Whale Tracking | The Web3 Wizard",
    description:
      "SolPulse is a founder-built Solana whale tracker. It watches Pump.fun and Raydium wallets and sends dust-filtered alerts to Telegram within seconds.",
    schemas: [
      PERSON_SCHEMA,
      softwareSchema(
        "SolPulse",
        "Solana whale tracker. Watches Pump.fun and Raydium wallets and delivers dust-filtered movement alerts to Telegram and a live dashboard.",
        "https://solpulse-hq.vercel.app",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Work", url: `${SITE_URL}/work` },
        { name: "SolPulse", url: `${SITE_URL}/work/solpulse` },
      ]),
    ],
  },

  "/work/community-signal": {
    title: "Community Signal | The Web3 Wizard",
    description:
      "Community Signal: building-stage experiment turning Telegram and Discord activity into a clearer next action.",
    schemas: [
      PERSON_SCHEMA,
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Work", url: `${SITE_URL}/work` },
        { name: "Community Signal", url: `${SITE_URL}/work/community-signal` },
      ]),
    ],
  },

  // ── About ─────────────────────────────────────────────────────────────────
  "/about": {
    title: "About | Khalid Murtala | The Web3 Wizard",
    description:
      "Khalid Murtala, founder of The Web3 Wizard Labs, a founder-led AI-native Web3 studio building AI agents, Solana apps, and focused MVPs.",
    schemas: [
      PERSON_SCHEMA,
      ORGANIZATION_SCHEMA,
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "About", url: `${SITE_URL}/about` },
      ]),
    ],
  },

  // ── Profile / hire ────────────────────────────────────────────────────────
  // NOTE: /profile and /hire-khalid both render ProfilePage (see client/src/App.tsx),
  // so they are byte-identical in content. /profile therefore declares /hire-khalid
  // as its canonical, so the two consolidate rather than compete as duplicates.
  // If these pages are ever given distinct content: delete canonicalPath below and
  // re-add /profile to client/public/sitemap.xml.
  "/profile": {
    title: "Khalid Murtala | AI × Web3 Engineer | The Web3 Wizard",
    description:
      "Profile of Khalid Murtala: AI agents, Web3 applications, wallet intelligence, automation, and focused MVPs. Skills, selected projects, and availability.",
    canonicalPath: "/hire-khalid",
    schemas: [
      PERSON_SCHEMA,
      ORGANIZATION_SCHEMA,
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Profile", url: `${SITE_URL}/profile` },
      ]),
    ],
  },

  "/hire-khalid": {
    title: "Hire Khalid Murtala | AI × Web3 Engineer | The Web3 Wizard",
    description:
      "Work with Khalid Murtala on AI agents, Web3 product engineering, and focused dApp builds. Project-based availability plus contact details.",
    schemas: [
      PERSON_SCHEMA,
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Hire Khalid", url: `${SITE_URL}/hire-khalid` },
      ]),
    ],
  },

  // ── AI agents ─────────────────────────────────────────────────────────────
  "/ai-agents": {
    title: "AI Agent Development for Web3 | The Web3 Wizard",
    description:
      "Practical AI agents for Web3: support, wallet intelligence, community ops, treasury monitoring, and controlled on-chain workflows. Founder-built.",
    schemas: [
      PERSON_SCHEMA,
      serviceSchema(
        "AI Agent Development",
        "Practical AI agents for Web3 workflows: documentation and support, wallet intelligence, community operations, treasury monitoring, developer support, research, and controlled on-chain workflows. Defined capabilities, explicit boundaries, and human approval gates.",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "AI Agents", url: `${SITE_URL}/ai-agents` },
      ]),
    ],
  },

  // ── Insights ──────────────────────────────────────────────────────────────
  "/insights": {
    title: "Web3 Insights | The Web3 Wizard",
    description:
      "Practical thinking on Web3 product decisions, AI-native development, Solana apps, MVP scoping, and dApps users understand.",
    schemas: [
      PERSON_SCHEMA,
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Insights", url: `${SITE_URL}/insights` },
      ]),
    ],
  },

  "/insights/scope-a-web3-product-before-spending-money": {
    title: "How to Scope a Web3 MVP | The Web3 Wizard",
    description:
      "A practical framework for Web3 founders: define the MVP, cut unnecessary scope, and avoid spending on the wrong features.",
    schemas: [
      PERSON_SCHEMA,
      articleSchema(
        "How to Scope a Web3 MVP Before Spending Money",
        "A practical framework for Web3 founders deciding what to build first. How to define an MVP, cut unnecessary scope, and avoid spending on the wrong features.",
        "scope-a-web3-product-before-spending-money",
        "2026-08-13",
        "2026-08-19",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Insights", url: `${SITE_URL}/insights` },
        {
          name: "How to Scope a Web3 MVP Before Spending Money",
          url: `${SITE_URL}/insights/scope-a-web3-product-before-spending-money`,
        },
      ]),
    ],
  },

  "/insights/why-a-web3-prototype-can-fail": {
    title: "Why a Web3 Prototype Fails With Real Users | The Web3 Wizard",
    description:
      "The gap between a working demo and a product real users can navigate. Why Web3 prototypes break under user pressure and how to close that gap before launch.",
    schemas: [
      PERSON_SCHEMA,
      articleSchema(
        "Why a Web3 Prototype Fails With Real Users",
        "The gap between a working demo and a product real users can navigate. Why Web3 prototypes break under user pressure and how to close that gap before launch.",
        "why-a-web3-prototype-can-fail",
        "2026-08-13",
        "2026-08-19",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Insights", url: `${SITE_URL}/insights` },
        {
          name: "Why a Web3 Prototype Fails With Real Users",
          url: `${SITE_URL}/insights/why-a-web3-prototype-can-fail`,
        },
      ]),
    ],
  },

  "/insights/use-ai-without-blindly-trusting-it": {
    title: "Using AI in Web3 Without Blind Trust | The Web3 Wizard",
    description:
      "Practical guide to AI-native Web3 development: direct AI, challenge its output, test what matters, and stay accountable.",
    schemas: [
      PERSON_SCHEMA,
      articleSchema(
        "How to Use AI in Web3 Product Development Without Blindly Trusting It",
        "A practical guide to AI-native Web3 product development. How to direct AI, challenge its output, test what matters, and stay accountable for what gets shipped.",
        "use-ai-without-blindly-trusting-it",
        "2026-08-13",
        "2026-08-19",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Insights", url: `${SITE_URL}/insights` },
        {
          name: "How to Use AI in Web3 Product Development Without Blindly Trusting It",
          url: `${SITE_URL}/insights/use-ai-without-blindly-trusting-it`,
        },
      ]),
    ],
  },

  "/insights/what-i-learned-shipping-seven-web3-mvps-solo": {
    title: "Seven Web3 MVPs Solo: What I Learned | The Web3 Wizard",
    description:
      "Seven founder-built Web3 products, one lesson each. What actually broke, what I would do differently, and why the code was rarely the reason a project failed.",
    schemas: [
      PERSON_SCHEMA,
      articleSchema(
        "What I Learned Shipping Seven Web3 MVPs Solo",
        "Seven founder-built Web3 products and the lesson each one taught: scope, integrations, agent boundaries, interface as product, actionable output, documented limits, and what shipping changes about the definition of done.",
        "what-i-learned-shipping-seven-web3-mvps-solo",
        "2026-10-24",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Insights", url: `${SITE_URL}/insights` },
        {
          name: "What I Learned Shipping Seven Web3 MVPs Solo",
          url: `${SITE_URL}/insights/what-i-learned-shipping-seven-web3-mvps-solo`,
        },
      ]),
    ],
  },

  "/insights/how-much-does-a-web3-mvp-cost": {
    title: "How Much Does a Web3 MVP Cost? | The Web3 Wizard",
    description:
      "What a Web3 MVP actually costs, which four decisions move the price up or down, and how to spend less without shipping less. Published starting points included.",
    schemas: [
      PERSON_SCHEMA,
      articleSchema(
        "How Much Does a Web3 MVP Cost?",
        "Published starting points for a Web3 MVP, the four decisions that move the price, what makes a build cost more than expected, and how to spend less without cutting the failure paths that protect users.",
        "how-much-does-a-web3-mvp-cost",
        "2026-10-24",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Insights", url: `${SITE_URL}/insights` },
        {
          name: "How Much Does a Web3 MVP Cost?",
          url: `${SITE_URL}/insights/how-much-does-a-web3-mvp-cost`,
        },
      ]),
    ],
  },

  "/insights/do-i-need-a-smart-contract-audit": {
    title: "Do I Need a Smart Contract Audit? | The Web3 Wizard",
    description:
      "When a smart contract audit is worth the money, when it is not, and what you still need to do if you skip one. Written by someone who does not sell audits.",
    schemas: [
      PERSON_SCHEMA,
      articleSchema(
        "Do I Need a Smart Contract Audit?",
        "What a smart contract audit actually provides, when it is genuinely necessary, when it is not the next thing your budget should buy, and the testing and disclosure discipline you still need either way.",
        "do-i-need-a-smart-contract-audit",
        "2026-10-24",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Insights", url: `${SITE_URL}/insights` },
        {
          name: "Do I Need a Smart Contract Audit?",
          url: `${SITE_URL}/insights/do-i-need-a-smart-contract-audit`,
        },
      ]),
    ],
  },

  "/insights/how-to-evaluate-a-web3-developer": {
    title: "How to Evaluate a Web3 Developer | The Web3 Wizard",
    description:
      "Five things worth checking before you hire a Web3 developer, the questions that reveal more than a portfolio, and the honest weaknesses in my own track record.",
    schemas: [
      PERSON_SCHEMA,
      articleSchema(
        "How to Evaluate a Web3 Developer",
        "The five criteria worth checking before hiring a Web3 developer, questions that reveal more than a portfolio, common red flags, and an honest self-assessment against the same standard.",
        "how-to-evaluate-a-web3-developer",
        "2026-10-24",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Insights", url: `${SITE_URL}/insights` },
        {
          name: "How to Evaluate a Web3 Developer",
          url: `${SITE_URL}/insights/how-to-evaluate-a-web3-developer`,
        },
      ]),
    ],
  },

  "/insights/web3-agency-vs-freelancer": {
    title: "Web3 Agency vs Freelancer | The Web3 Wizard",
    description:
      "An honest comparison of agencies, freelancers, and solo studios for Web3 product work, including the cases where a solo studio like mine is the wrong choice.",
    schemas: [
      PERSON_SCHEMA,
      articleSchema(
        "Web3 Agency vs Freelancer: How to Choose",
        "When an agency is the right call, when an individual is, what a solo studio can and cannot offer, and a five-minute method for matching structure to the shape of your project.",
        "web3-agency-vs-freelancer",
        "2026-10-24",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Insights", url: `${SITE_URL}/insights` },
        {
          name: "Web3 Agency vs Freelancer: How to Choose",
          url: `${SITE_URL}/insights/web3-agency-vs-freelancer`,
        },
      ]),
    ],
  },

  "/insights/what-is-an-ai-agent-in-web3": {
    title: "What Is an AI Agent in Web3? | The Web3 Wizard",
    description:
      "A plain definition of an AI agent in Web3, how it differs from a bot or a smart contract, and why the refusal list matters more than the list of capabilities.",
    schemas: [
      PERSON_SCHEMA,
      articleSchema(
        "What Is an AI Agent in Web3?",
        "A plain-language definition of an AI agent in Web3: the input, the reasoning step, and the bounded action, plus what an agent is not and where one genuinely earns its place.",
        "what-is-an-ai-agent-in-web3",
        "2026-10-24",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Insights", url: `${SITE_URL}/insights` },
        {
          name: "What Is an AI Agent in Web3?",
          url: `${SITE_URL}/insights/what-is-an-ai-agent-in-web3`,
        },
      ]),
    ],
  },

  "/insights/what-is-a-web3-mvp": {
    title: "What Is a Web3 MVP? | The Web3 Wizard",
    description:
      "What a Web3 MVP is, why the Web3 version needs failure handling in version one, and what belongs in a first build versus what can safely wait.",
    schemas: [
      PERSON_SCHEMA,
      articleSchema(
        "What Is a Web3 MVP?",
        "What a Web3 MVP is, the four properties of Web3 that change what a minimum viable product has to include, and the difference between what belongs in version one and what does not.",
        "what-is-a-web3-mvp",
        "2026-10-24",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Insights", url: `${SITE_URL}/insights` },
        {
          name: "What Is a Web3 MVP?",
          url: `${SITE_URL}/insights/what-is-a-web3-mvp`,
        },
      ]),
    ],
  },

  "/insights/what-is-a-product-discovery-sprint": {
    title: "What Is a Product Discovery Sprint? | The Web3 Wizard",
    description:
      "What a product discovery sprint produces, what it is not, and how to tell whether it is the right purchase for where your product stands right now.",
    schemas: [
      PERSON_SCHEMA,
      articleSchema(
        "What Is a Product Discovery Sprint?",
        "What a product discovery sprint produces, what it is not, when it is the wrong purchase, and how a short written direction prevents the expensive build mistakes it exists to catch.",
        "what-is-a-product-discovery-sprint",
        "2026-10-24",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Insights", url: `${SITE_URL}/insights` },
        {
          name: "What Is a Product Discovery Sprint?",
          url: `${SITE_URL}/insights/what-is-a-product-discovery-sprint`,
        },
      ]),
    ],
  },

  "/insights/what-is-wallet-intelligence": {
    title: "What Is Wallet Intelligence? | The Web3 Wizard",
    description:
      "What wallet intelligence means, the problem it actually solves, and the four things it should never claim to be. Includes a working project example.",
    schemas: [
      PERSON_SCHEMA,
      articleSchema(
        "What Is Wallet Intelligence?",
        "What wallet intelligence means in practice, the interpretation gap it exists to close, the four things it should never claim to be, and a working example from a founder-built project.",
        "what-is-wallet-intelligence",
        "2026-10-24",
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Insights", url: `${SITE_URL}/insights` },
        {
          name: "What Is Wallet Intelligence?",
          url: `${SITE_URL}/insights/what-is-wallet-intelligence`,
        },
      ]),
    ],
  },

  // ── Start / contact (noindex) ─────────────────────────────────────────────
  "/start": {
    title: "Start a Conversation | The Web3 Wizard",
    description:
      "Tell The Web3 Wizard what you are trying to build. Discuss an AI agent, Solana application, dApp, MVP, or Web3 automation project.",
    noindex: true,
    schemas: [PERSON_SCHEMA],
  },

  // ── Legal ─────────────────────────────────────────────────────────────────
  "/privacy": {
    title: "Privacy Policy | The Web3 Wizard",
    description:
      "How The Web3 Wizard Labs handles inquiry submissions and personal information. No database. Inquiries are delivered via Telegram notification.",
    schemas: [PERSON_SCHEMA],
  },

  "/terms": {
    title: "Terms of Service | The Web3 Wizard",
    description:
      "Clear boundaries for The Web3 Wizard Labs engagements. Service scope, limitations, and what is explicitly outside scope.",
    schemas: [PERSON_SCHEMA],
  },
};

const DEFAULT_META: RouteMeta = {
  title: "The Web3 Wizard | AI-Native Web3 Product Studio",
  description:
    "Founder-led AI-native Web3 product studio. AI agents, Solana applications, dApps, automation, and focused Web3 MVPs.",
  schemas: [PERSON_SCHEMA],
};

// ─── HTML injection ────────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Per-route Open Graph cards live in /og/, named after the route:
 *   "/"            -> /og/home.png
 *   "/work/valor"  -> /og/work-valor.png
 *
 * Generated by theweb3wizard.xyz-audit/generate-og-images.py.
 * The original /og-image.png remains the sitewide fallback.
 */
export function ogImageFor(pathname: string): string {
  const slug =
    pathname === "/"
      ? "home"
      : pathname.replace(/^\//, "").replace(/\/$/, "").replace(/\//g, "-");
  return `${SITE_URL}/og/${slug}.png`;
}

export function injectMetaIntoHtml(html: string, pathname: string): string {
  // Normalise pathname — strip query, hash, trailing slash except root
  const clean = pathname.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
  const meta = ROUTE_META[clean] ?? DEFAULT_META;

  const canonicalTarget = meta.canonicalPath ?? clean;
  const canonical = `${SITE_URL}${canonicalTarget === "/" ? "" : canonicalTarget}`;
  const ogImage = meta.ogImage ?? ogImageFor(clean);
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const noindex = meta.noindex ? '\n  <meta name="robots" content="noindex, nofollow" />' : "";

  const schemaBlocks = (meta.schemas ?? [])
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join("\n  ");

  const metaBlock = `
  <title>${title}</title>
  <meta name="description" content="${description}" />${noindex}
  <link rel="canonical" href="${canonical}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${escapeHtml(OG_IMAGE_ALT)}" />
  <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${ogImage}" />
  <meta name="twitter:image:alt" content="${escapeHtml(OG_IMAGE_ALT)}" />
  <meta name="twitter:site" content="@theweb3wizard00" />
  ${schemaBlocks}`;

  return html
    .replace(/<title>[^<]*<\/title>/, "")
    .replace(/<meta name="description"[^>]*>/, "")
    .replace(/<link rel="canonical"[^>]*>/, "")
    .replace(/<meta property="og:[^>]*>/g, "")
    .replace(/<meta name="twitter:[^>]*>/g, "")
    .replace("</head>", `${metaBlock}\n</head>`);
}
