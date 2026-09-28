// ─── Commercial configuration ─────────────────────────────────────────────────
// Single source of truth for engagement packages, indicative pricing, booking,
// and public contact channels. Khalid can update prices here (plus
// client/public/pricing.md) without touching page components.

export type Engagement = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  forWho: string;
  priceLabel: string;
  duration: string;
  deliverables: string[];
  cta: string;
  /** Value preselected in the /start inquiry form. */
  inquiryType: string;
};

export const PRICE_DISCLAIMER =
  "Starting prices are indicative. Final scope, timeline, integrations, and price are confirmed after a fit conversation.";

export const engagements: Engagement[] = [
  {
    id: "discovery",
    index: "01",
    name: "Product and Technical Discovery",
    tagline: "Clarify what to build first before committing to a build.",
    forWho:
      "For founders with a problem, idea, or rough concept who need to clarify what to build first.",
    priceLabel: "Starting from $750",
    duration: "Typical duration: 3–7 days",
    deliverables: [
      "Problem clarification",
      "User and workflow definition",
      "Technical feasibility",
      "MVP scope",
      "Architecture direction",
      "Risk and limitation review",
      "Build roadmap",
    ],
    cta: "Start with Discovery",
    inquiryType: "discovery",
  },
  {
    id: "integration-sprint",
    index: "02",
    name: "AI Agent or Web3 Integration Sprint",
    tagline: "One defined capability, implemented and handed over.",
    forWho:
      "For teams that know the capability they need and want a focused implementation.",
    priceLabel: "Starting from $2,500",
    duration: "Typical duration: 1–2 weeks",
    deliverables: [
      "One defined AI agent or workflow",
      "API, wallet, blockchain, or platform integration",
      "Basic interface",
      "Core behaviour testing",
      "Documentation",
      "Handover",
    ],
    cta: "Discuss an Integration",
    inquiryType: "integration-sprint",
  },
  {
    id: "product-build",
    index: "03",
    name: "Focused dApp or Web3 Product Build",
    tagline: "A focused working product, shipped with documentation.",
    forWho:
      "For founders with a validated problem, prototype, specification, or clear product direction.",
    priceLabel: "Starting from $6,000",
    duration: "Typical duration: 3–8 weeks depending on scope",
    deliverables: [
      "Focused product scope",
      "Frontend",
      "Backend",
      "AI or Web3 integration where relevant",
      "Wallet or API integration where relevant",
      "Deployment support",
      "Documentation",
      "Known limitations",
      "Handover",
    ],
    cta: "Discuss a Product Build",
    inquiryType: "product-build",
  },
  {
    id: "embedded",
    index: "04",
    name: "Embedded Product Engineering",
    tagline: "Founder-level capacity inside your team.",
    forWho:
      "For a team that needs additional founder-level product engineering capacity.",
    priceLabel: "Starting from $2,000/month",
    duration: "Monthly or milestone-based",
    deliverables: [
      "Feature development",
      "AI integrations",
      "Web3 integrations",
      "Bug fixing",
      "Product prototyping",
      "Code review",
      "Documentation",
      "Technical collaboration",
    ],
    cta: "Work With Khalid",
    inquiryType: "embedded",
  },
];

/** Legacy /start?type= values from service pages, mapped to engagement inquiry types. */
const LEGACY_TYPE_MAP: Record<string, string> = {
  "product-discovery": "discovery",
  "web3-mvp-development": "product-build",
  "ai-agent-solana-engineering": "integration-sprint",
};

export function normalizeInquiryType(raw: string | null): string {
  if (!raw) return "not-sure";
  if (LEGACY_TYPE_MAP[raw]) return LEGACY_TYPE_MAP[raw];
  if (engagements.some((e) => e.inquiryType === raw)) return raw;
  return "not-sure";
}

// ─── Booking ──────────────────────────────────────────────────────────────────
// Configurable fit-call URL. Set VITE_BOOKING_URL in the environment (Vercel:
// Project Settings → Environment Variables). The task spec names this
// NEXT_PUBLIC_BOOKING_URL; both names are accepted — see .env.example.
// When empty, booking CTAs route to /start?intent=fit-call instead of an
// external scheduler, so production never shows a dead link.

function readEnv(key: string): string {
  try {
    const env = (import.meta as unknown as { env?: Record<string, string | undefined> })
      .env;
    return (env?.[key] ?? "").trim();
  } catch {
    return "";
  }
}

export function getBookingUrl(): string {
  return readEnv("VITE_BOOKING_URL") || readEnv("NEXT_PUBLIC_BOOKING_URL");
}

export function getBookingHref(): { href: string; external: boolean } {
  const url = getBookingUrl();
  if (url && /^https?:\/\//i.test(url)) return { href: url, external: true };
  return { href: "/start?intent=fit-call", external: false };
}

// ─── Public identity ──────────────────────────────────────────────────────────

export const CONTACT_EMAIL = "theweb3wizard00@gmail.com";

export const socialLinks = [
  { label: "GitHub", handle: "github.com/theweb3wizard", href: "https://github.com/theweb3wizard" },
  { label: "X (Twitter)", handle: "@theweb3wizard00", href: "https://x.com/theweb3wizard00" },
  { label: "LinkedIn", handle: "Khalid Murtala", href: "https://www.linkedin.com/in/theweb3wizard00" },
  { label: "Telegram", handle: "@theweb3wizard00", href: "https://t.me/theweb3wizard00" },
  { label: "Medium", handle: "@theweb3wizard00", href: "https://medium.com/@theweb3wizard00" },
  { label: "Substack", handle: "@theweb3wizard00", href: "https://substack.com/@theweb3wizard00" },
  { label: "Email", handle: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
];

export const primarySkills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "LLM APIs (OpenAI, Gemini, Groq)",
  "Telegram Bot API",
  "Solana integrations",
  "EVM integrations (ethers, on-chain data APIs)",
  "Supabase / PostgreSQL",
  "Vercel deployment",
];

export const supportingCapabilities = [
  "Solana integrations",
  "EVM integrations",
  "Wallet intelligence",
  "On-chain data",
  "Web3 automation",
  "Telegram and Discord tools",
  "APIs and data pipelines",
  "AI-powered product features",
  "Prototype refinement",
  "Product discovery",
  "Focused MVP development",
  "Technical documentation and handover",
];
