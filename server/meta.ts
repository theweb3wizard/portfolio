/**
 * Server-side meta injection for SEO / GEO.
 * Injects title, description, canonical, og:*, twitter:*, and JSON-LD
 * into the raw index.html before it is sent to crawlers.
 * The React MetaManager keeps client-side navigation in sync after hydration.
 */

const SITE_URL = "https://theweb3wizard.xyz";
const OG_IMAGE = `${SITE_URL}/og-image.svg`;
const AUTHOR = "Khalid - The Web3 Wizard";

type RouteMeta = {
  title: string;
  description: string;
  schemas?: object[];
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do you have client testimonials yet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not yet. Web3 Wizard Labs is currently opening its first client engagements. The work shown on this site is founder-built personal work, clearly labeled as such.",
      },
    },
    {
      "@type": "Question",
      name: "Are the projects in the portfolio client work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The portfolio currently shows personal products and experiments built by The Web3 Wizard. Every project is labeled clearly so you can distinguish founder-built work from future client work.",
      },
    },
    {
      "@type": "Question",
      name: "Do you write smart contracts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The studio focuses on product experiences, application layers, tools, and integrations. Smart-contract work and formal smart-contract audits are not presented as part of this offer.",
      },
    },
    {
      "@type": "Question",
      name: "Do you use AI to build the products?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. AI helps with research, planning, design, coding, testing, and review. Khalid directs the work, challenges the output, understands important decisions, tests key behavior, and remains accountable for what is delivered.",
      },
    },
  ],
};

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR,
  url: SITE_URL,
  sameAs: [
    "https://github.com/THEWEB3WIZARD",
    "https://www.linkedin.com/in/theweb3wizard00",
    "https://x.com/theweb3wizard00",
    "https://t.me/theweb3wizard00",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Web3 Wizard Labs",
    url: SITE_URL,
  },
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Web3 Wizard Labs",
  url: SITE_URL,
  description:
    "Founder-led Web3 product studio for focused products, prototypes, community tools, and application-layer clarity.",
  author: { "@type": "Person", name: AUTHOR },
};

function serviceSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@type": "Person", name: AUTHOR, url: SITE_URL },
  };
}

function articleSchema(title: string, description: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: { "@type": "Person", name: AUTHOR, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Web3 Wizard Labs",
      url: SITE_URL,
    },
    url: `${SITE_URL}/insights/${slug}`,
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

const ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    title: "Web3 Wizard Labs | Clearer Web3 products, built by one founder.",
    description:
      "Founder-led Web3 product studio for focused products, prototypes, community tools, and application-layer clarity.",
    schemas: [WEBSITE_SCHEMA, PERSON_SCHEMA, FAQ_SCHEMA],
  },
  "/services": {
    title: "Web3 product services | Web3 Wizard Labs",
    description:
      "Focused Web3 product builds, prototype refinement, community tools, and bounded application-layer review.",
    schemas: [
      PERSON_SCHEMA,
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Services", url: `${SITE_URL}/services` },
      ]),
    ],
  },
  "/services/product-builds": {
    title: "Product builds | Web3 Wizard Labs",
    description:
      "For founders and small teams who need a focused Web3 application, dashboard, internal tool, or prototype built without unnecessary agency layers.",
    schemas: [
      PERSON_SCHEMA,
      serviceSchema(
        "Product builds",
        "For founders and small teams who need a focused Web3 application, dashboard, internal tool, or prototype built without unnecessary agency layers."
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Services", url: `${SITE_URL}/services` },
        { name: "Product builds", url: `${SITE_URL}/services/product-builds` },
      ]),
    ],
  },
  "/services/prototype-refinement": {
    title: "Prototype refinement | Web3 Wizard Labs",
    description:
      "I help refine rough, confusing, incomplete, or AI-assisted prototypes into clearer product experiences with a more reliable main journey.",
    schemas: [
      PERSON_SCHEMA,
      serviceSchema(
        "Prototype refinement",
        "I help refine rough, confusing, incomplete, or AI-assisted prototypes into clearer product experiences with a more reliable main journey."
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Services", url: `${SITE_URL}/services` },
        { name: "Prototype refinement", url: `${SITE_URL}/services/prototype-refinement` },
      ]),
    ],
  },
  "/services/community-tools": {
    title: "Community tools | Web3 Wizard Labs",
    description:
      "Build focused Telegram Mini Apps, Discord tools, alerts, wallet utilities, and community workflows that help people take a clear next action.",
    schemas: [
      PERSON_SCHEMA,
      serviceSchema(
        "Community tools",
        "Build focused Telegram Mini Apps, Discord tools, alerts, wallet utilities, and community workflows that help people take a clear next action."
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Services", url: `${SITE_URL}/services` },
        { name: "Community tools", url: `${SITE_URL}/services/community-tools` },
      ]),
    ],
  },
  "/services/application-review": {
    title: "Application review | Web3 Wizard Labs",
    description:
      "A narrow application-layer review for fast-built and AI-assisted Web3 applications. Focused on users, access, secrets, configuration, and trust boundaries.",
    schemas: [
      PERSON_SCHEMA,
      serviceSchema(
        "Application review",
        "A narrow application-layer review for fast-built and AI-assisted Web3 applications. Focused on users, access, secrets, configuration, and trust boundaries."
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Services", url: `${SITE_URL}/services` },
        { name: "Application review", url: `${SITE_URL}/services/application-review` },
      ]),
    ],
  },
  "/work": {
    title: "Founder-built Web3 work | Web3 Wizard Labs",
    description:
      "Personal Web3 products and experiments built by The Web3 Wizard, clearly labeled and honestly documented.",
    schemas: [
      PERSON_SCHEMA,
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Work", url: `${SITE_URL}/work` },
      ]),
    ],
  },
  "/work/solpulse": {
    title: "SolPulse — Solana monitoring concept | Web3 Wizard Labs",
    description:
      "A founder-built Solana monitoring concept for clearer whale activity signals. Turns on-chain activity into a calmer, more useful alerting experience.",
    schemas: [
      PERSON_SCHEMA,
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Work", url: `${SITE_URL}/work` },
        { name: "SolPulse", url: `${SITE_URL}/work/solpulse` },
      ]),
    ],
  },
  "/work/txpreview": {
    title: "TxPreview — transaction intent interface | Web3 Wizard Labs",
    description:
      "A founder-built interface concept for making transaction intent easier to inspect before a wallet signature.",
    schemas: [
      PERSON_SCHEMA,
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Work", url: `${SITE_URL}/work` },
        { name: "TxPreview", url: `${SITE_URL}/work/txpreview` },
      ]),
    ],
  },
  "/work/searchlens": {
    title: "SearchLens — AI discoverability research tool | Web3 Wizard Labs",
    description:
      "A founder-built concept for helping teams understand how their products appear in AI-assisted search.",
    schemas: [
      PERSON_SCHEMA,
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Work", url: `${SITE_URL}/work` },
        { name: "SearchLens", url: `${SITE_URL}/work/searchlens` },
      ]),
    ],
  },
  "/work/community-signal": {
    title: "Community Signal — community activity tool | Web3 Wizard Labs",
    description:
      "A building-stage experiment for turning community activity into a clearer next action using Telegram and Discord workflows.",
    schemas: [
      PERSON_SCHEMA,
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Work", url: `${SITE_URL}/work` },
        { name: "Community Signal", url: `${SITE_URL}/work/community-signal` },
      ]),
    ],
  },
  "/about": {
    title: "About Web3 Wizard Labs | The Web3 Wizard",
    description:
      "A founder-led studio for making Web3 products clearer through focused scope and direct ownership.",
    schemas: [
      PERSON_SCHEMA,
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "About", url: `${SITE_URL}/about` },
      ]),
    ],
  },
  "/insights": {
    title: "Web3 product insights | Web3 Wizard Labs",
    description:
      "Plain-English thinking about Web3 products, AI-assisted building, scope, and user experience.",
    schemas: [
      PERSON_SCHEMA,
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Insights", url: `${SITE_URL}/insights` },
      ]),
    ],
  },
  "/insights/scope-a-web3-product-before-spending-money": {
    title: "How to scope a Web3 product before spending money | Web3 Wizard Labs",
    description:
      "A plain-English framework for deciding what belongs in a first Web3 product and what should wait.",
    schemas: [
      PERSON_SCHEMA,
      articleSchema(
        "How to scope a Web3 product before spending money",
        "A plain-English framework for deciding what belongs in a first Web3 product and what should wait.",
        "scope-a-web3-product-before-spending-money"
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Insights", url: `${SITE_URL}/insights` },
        { name: "How to scope a Web3 product before spending money", url: `${SITE_URL}/insights/scope-a-web3-product-before-spending-money` },
      ]),
    ],
  },
  "/insights/why-a-web3-prototype-can-fail": {
    title: "Why a Web3 prototype can fail when real users touch it | Web3 Wizard Labs",
    description:
      "The gap between a working demo and a product that explains itself under real user pressure.",
    schemas: [
      PERSON_SCHEMA,
      articleSchema(
        "Why a Web3 prototype can fail when real users touch it",
        "The gap between a working demo and a product that explains itself under real user pressure.",
        "why-a-web3-prototype-can-fail"
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Insights", url: `${SITE_URL}/insights` },
        { name: "Why a Web3 prototype can fail", url: `${SITE_URL}/insights/why-a-web3-prototype-can-fail` },
      ]),
    ],
  },
  "/insights/use-ai-without-blindly-trusting-it": {
    title: "How to use AI when building a Web3 product without blindly trusting the output | Web3 Wizard Labs",
    description:
      "A practical look at directing, challenging, testing, and taking responsibility for AI-assisted product work.",
    schemas: [
      PERSON_SCHEMA,
      articleSchema(
        "How to use AI when building a Web3 product without blindly trusting the output",
        "A practical look at directing, challenging, testing, and taking responsibility for AI-assisted product work.",
        "use-ai-without-blindly-trusting-it"
      ),
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Insights", url: `${SITE_URL}/insights` },
        { name: "How to use AI without blindly trusting the output", url: `${SITE_URL}/insights/use-ai-without-blindly-trusting-it` },
      ]),
    ],
  },
  "/start": {
    title: "Start with your idea | Web3 Wizard Labs",
    description:
      "Tell The Web3 Wizard what you are trying to build, where you are stuck, and what a useful first version should do.",
    schemas: [PERSON_SCHEMA],
  },
};

const DEFAULT_META: RouteMeta = {
  title: "Web3 Wizard Labs",
  description: "Founder-led Web3 product studio.",
  schemas: [PERSON_SCHEMA],
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function injectMetaIntoHtml(html: string, pathname: string): string {
  // Normalise pathname — strip query + hash, trailing slash except root
  const clean = pathname.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
  const meta = ROUTE_META[clean] ?? DEFAULT_META;

  const canonical = `${SITE_URL}${clean}`;
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);

  const schemaBlocks = (meta.schemas ?? [])
    .map(
      (s) =>
        `<script type="application/ld+json">${JSON.stringify(s)}</script>`
    )
    .join("\n  ");

  const metaBlock = `
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${OG_IMAGE}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Web3 Wizard Labs — Clearer Web3 products, built by one founder." />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${OG_IMAGE}" />
  <meta name="twitter:image:alt" content="Web3 Wizard Labs — Clearer Web3 products, built by one founder." />
  ${schemaBlocks}`;

  // Replace the static title in index.html and inject all meta before </head>
  return html
    .replace(/<title>[^<]*<\/title>/, "")
    .replace("</head>", `${metaBlock}\n</head>`);
}
