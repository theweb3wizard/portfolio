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
      name: "Do you build AI agents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. AI agent development is a core capability. We have built AI agents for Telegram, Web3 workflows, and autonomous data pipelines. Every agent is built to a clear scope with defined behaviour and documented limitations.",
      },
    },
    {
      "@type": "Question",
      name: "Do you build Solana applications?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Solana application development is a primary technical focus. The studio has built Solana monitoring tools, wallet intelligence products, and Solana-integrated application layers.",
      },
    },
    {
      "@type": "Question",
      name: "Do you have client testimonials?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not yet. The Web3 Wizard Labs is currently opening its first client engagements. The work shown on this site is founder-built personal work, clearly labeled as such. The first engagement is designed to be narrow and transparent so both sides can evaluate the fit responsibly.",
      },
    },
    {
      "@type": "Question",
      name: "Are the portfolio projects client work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The portfolio shows founder-built personal projects and experiments. Every project is clearly labeled so you can distinguish personal work from future client engagements.",
      },
    },
    {
      "@type": "Question",
      name: "Do you write smart contracts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The studio focuses on product experiences, application layers, AI agents, and integrations. Smart-contract auditing is outside scope. Smart-contract integration at the product layer can be discussed for specific engagements.",
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
      "Portfolio of founder-built Web3 projects: AI agents, Solana tools, EVM wallet intelligence, and automation — shipped by Khalid Murtala.",
    schemas: [
      PERSON_SCHEMA,
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Work", url: `${SITE_URL}/work` },
      ]),
    ],
  },

  "/work/valor": {
    title: "Valor — AI Agent for Telegram | The Web3 Wizard",
    description:
      "Valor is a founder-built AI agent for Telegram. Autonomous conversational help and task execution for Web3 communities.",
    schemas: [
      PERSON_SCHEMA,
      softwareSchema(
        "Valor",
        "An AI agent for Telegram. Autonomous conversational agent for Web3 communities.",
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
      "WalletLens: AI-powered EVM wallet intelligence for Ethereum, Polygon, BNB, Arbitrum & Base. Query wallets in plain English.",
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
    title: "Write3 | AI Web3 Content Generator | The Web3 Wizard",
    description:
      "Write3: AI-powered Web3 content for X, Discord, Telegram, Farcaster, and blogs. Generate platform-ready drafts quickly.",
    schemas: [
      PERSON_SCHEMA,
      softwareSchema(
        "Write3",
        "AI-powered Web3 content generator for X, Discord, Telegram, Farcaster, and blogs.",
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
        "https://agenthub-lyart.vercel.app",
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
    title: "SolPulse | Solana Wallet Monitoring | The Web3 Wizard",
    description:
      "SolPulse: Solana wallet monitoring experiment. Turns wallet activity into calmer, readable Telegram alerts.",
    schemas: [
      PERSON_SCHEMA,
      softwareSchema(
        "SolPulse",
        "Founder-built Solana monitoring experiment. On-chain wallet activity signals delivered as readable Telegram alerts.",
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
      "Khalid Murtala, founder of The Web3 Wizard Labs — founder-led AI-native Web3 studio building AI agents, Solana apps, and focused MVPs.",
    schemas: [
      PERSON_SCHEMA,
      ORGANIZATION_SCHEMA,
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "About", url: `${SITE_URL}/about` },
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

export function injectMetaIntoHtml(html: string, pathname: string): string {
  // Normalise pathname — strip query, hash, trailing slash except root
  const clean = pathname.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
  const meta = ROUTE_META[clean] ?? DEFAULT_META;

  const canonical = `${SITE_URL}${clean === "/" ? "" : clean}`;
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
  <meta property="og:image" content="${OG_IMAGE}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${escapeHtml(OG_IMAGE_ALT)}" />
  <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${OG_IMAGE}" />
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
