import { useMemo, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { ArrowUpRight, Check, ChevronRight, ExternalLink, Github, Loader2, Printer } from "lucide-react";
import { ButtonLink, Faq, PageFrame, PageHero, ProjectCard, SectionHeading } from "@/components/SiteShell";
import { insights, projects, services } from "@/site";
import {
  CONTACT_EMAIL,
  PRICE_DISCLAIMER,
  engagements,
  getBookingHref,
  normalizeInquiryType,
  primarySkills,
  socialLinks,
  supportingCapabilities,
} from "@/commercial";
import type { Project } from "@/site";
import { trpc } from "@/lib/trpc";
import { getInquiryFormState, getInquirySubmitA11y, shouldBlockInquirySubmit } from "@/inquiryFormState";

// ─── Homepage ─────────────────────────────────────────────────────────────────

const faqItems = [
  {
    question: "What does The Web3 Wizard do?",
    answer: "The Web3 Wizard (The Web3 Wizard Labs) is a founder-led AI-native Web3 product studio. We help early-stage founders and small teams turn problems and product ideas into focused working products: AI agents, Solana applications, dApps, automation tools, and Web3 MVPs."
  },
  {
    question: "Who is it for?",
    answer: "Early-stage Web3 founders and small teams with a validated problem, prototype, product idea, or roadmap milestone — and who need AI agents, AI × Web3 product engineering, or a focused decentralised application built."
  },
  {
    question: "What types of projects do you accept?",
    answer: "Focused scopes: AI agents and agentic workflows, Solana and EVM application features, wallet intelligence and on-chain data tools, Telegram and Discord tools, Web3 automation, and focused product MVPs. If a project needs an open-ended build or an entire company built, it is not a fit."
  },
  {
    question: "Do you build AI agents?",
    answer: "Yes. AI agent development is a core capability. We have built AI agents for Telegram, Web3 workflows, and autonomous data pipelines. Every agent is built to a clear scope with defined behaviour and documented limitations."
  },
  {
    question: "Do you build Solana and EVM applications?",
    answer: "Yes. Solana and EVM application development are primary technical focuses. The studio has built Solana monitoring tools, EVM wallet intelligence products, and application layers that integrate with both ecosystems."
  },
  {
    question: "Are the portfolio projects client work?",
    answer: "No. The portfolio shows founder-built personal projects and experiments. Every project is clearly labeled so you can distinguish personal work from future client engagements."
  },
  {
    question: "Do you have client testimonials?",
    answer: "Not yet. The Web3 Wizard Labs is currently opening its first client engagements. The work shown on this site is founder-built personal work, clearly labeled as such. The first engagement is designed to be narrow and transparent so both sides can evaluate the fit responsibly."
  },
  {
    question: "Do you perform smart-contract audits?",
    answer: "No. The studio does not provide formal smart-contract audits, penetration tests, or security certification. Application-layer reviews and product-layer smart-contract integrations can be discussed for specific engagements."
  },
  {
    question: "Do you use AI to build the products?",
    answer: "Yes. AI helps with research, planning, design, coding, testing, and review. Khalid Murtala directs the work, challenges the output, understands important decisions, tests key behaviour, and remains accountable for what is delivered."
  },
  {
    question: "How does pricing work?",
    answer: "There are four starting points: Product and Technical Discovery from $750, AI Agent or Web3 Integration Sprint from $2,500, Focused dApp or Web3 Product Build from $6,000, and Embedded Product Engineering from $2,000/month. Starting prices are indicative. Final scope, timeline, integrations, and price are confirmed after a fit conversation."
  },
  {
    question: "What happens after I submit an enquiry?",
    answer: "Khalid Murtala reviews every inquiry personally — typically within two business days — and replies if the project looks like a good fit. If it is not the right fit, he says so clearly. Inquiry data is not stored in a database; it is delivered via Telegram notification."
  },
];

// ─── Shared commercial sections ───────────────────────────────────────────────

export function BookFitCallButton({ variant = "secondary" }: { variant?: "primary" | "secondary" | "text" }) {
  const booking = getBookingHref();
  if (booking.external) {
    return (
      <a href={booking.href} target="_blank" rel="noreferrer" className={`button button-${variant}`}>
        Book a fit call <ArrowUpRight size={15} />
      </a>
    );
  }
  return <ButtonLink href={booking.href} variant={variant}>Book a fit call</ButtonLink>;
}

export function EngagementsSection() {
  return (
    <section className="section" id="ways-to-work">
      <div className="container">
        <SectionHeading
          eyebrow="WAYS TO WORK TOGETHER"
          title="Four starting points. One fit conversation."
          children="Indicative starting prices — not fixed quotes. Every engagement is scoped and confirmed after a fit conversation."
        />
        <div className="engagement-grid">
          {engagements.map((engagement) => (
            <div className="engagement-card" key={engagement.id}>
              <span className="engagement-index">{engagement.index}</span>
              <h3>{engagement.name}</h3>
              <p className="engagement-tagline">{engagement.tagline}</p>
              <p className="engagement-for">{engagement.forWho}</p>
              <div className="engagement-price-row">
                <strong className="engagement-price">{engagement.priceLabel}</strong>
                <span className="engagement-duration">{engagement.duration}</span>
              </div>
              <details className="engagement-details" name="engagement-disclosure">
                <summary>What's included ({engagement.deliverables.length})</summary>
                <ul className="engagement-list">
                  {engagement.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </details>
              <div className="engagement-cta">
                <ButtonLink href={`/start?type=${engagement.inquiryType}`}>{engagement.cta}</ButtonLink>
              </div>
            </div>
          ))}
        </div>
        <p className="price-disclaimer">{PRICE_DISCLAIMER}</p>
      </div>
    </section>
  );
}

export function WhatIBuildSection() {
  const primary = [
    {
      title: "AI Agent Development",
      copy: "Practical agents with defined behaviour: Telegram and Discord agents, wallet intelligence, transaction investigation, community operations, and controlled on-chain workflows.",
      href: "/ai-agents",
      label: "Explore AI agents",
    },
    {
      title: "AI × Web3 Product Engineering",
      copy: "AI-powered product features, on-chain data pipelines, wallet integrations, and automation woven into a product real users can navigate.",
      href: "/services/ai-agent-solana-engineering",
      label: "Explore AI × Web3 engineering",
    },
    {
      title: "Decentralised Application Development",
      copy: "Focused dApps and Web3 product interfaces on Solana and EVM: the smallest useful product, shipped with documentation and known limitations.",
      href: "/services/web3-mvp-development",
      label: "Explore product builds",
    },
  ];
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="WHAT I BUILD"
          title="Three primary capabilities."
          children="Founder-led delivery — the person you talk to is the person who builds it."
        />
        <div className="routing-grid three-col">
          {primary.map((item) => (
            <ProblemCard key={item.title} title={item.title} copy={item.copy} href={item.href} label={item.label} eyebrow="CAPABILITY" />
          ))}
        </div>
        <div className="supporting-capabilities">
          <span className="eyebrow">SUPPORTING CAPABILITIES</span>
          <p>{supportingCapabilities.join(" · ")}</p>
        </div>
      </div>
    </section>
  );
}

const proofItems = [
  { title: "Founder-built AI products shipped", detail: "Valor, WalletLens, Write3, AgentHub, and OrderFlow — all with live public demos." },
  { title: "Public GitHub repositories", detail: "Every featured project links to its real repository. Nothing is a mockup." },
  { title: "Multi-chain application work", detail: "Solana monitoring and EVM wallet intelligence across Ethereum, Polygon, BNB, Arbitrum, and Base." },
  { title: "AI-agent implementations", detail: "Autonomous Telegram agents, policy-controlled agent access layers, and AI-triggered data workflows." },
  { title: "On-chain data tools", detail: "Wallet intelligence, transaction investigation, and trading-history analysis in plain English." },
  { title: "Solana and Web3 application experiments", detail: "Monitoring workflows and community automation, each with documented limitations." },
  { title: "Technical documentation and architecture work", detail: "Every project and engagement ships with handover notes and known limitations." },
];

export function ProofSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="PROOF BEYOND CODE"
          title="Verifiable work. No borrowed credibility."
          children="No client logos, no invented metrics, no “trusted by” claims. What follows can be checked: live demos, public repositories, and documented decisions."
        />
        <div className="proof-grid">
          {proofItems.map((item) => (
            <div className="proof-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CurrentFocusSection() {
  return (
    <section className="section">
      <div className="container split-callout">
        <div>
          <SectionHeading
            eyebrow="CURRENT FOCUS"
            title="Building practical AI-native Web3 products."
            children="Khalid is currently focused on AI agents, wallet intelligence, Web3 operations tools, developer support tools, controlled on-chain workflows, and Solana and EVM integrations — and is open to project-based client work and AI/Web3 engineering roles."
          />
        </div>
        <div className="callout-panel">
          <div className="boundary-list">
            <div className="boundary-item">AI agents with defined behaviour and human approval gates.</div>
            <div className="boundary-item">Wallet intelligence and transaction investigation tools.</div>
            <div className="boundary-item">Web3 operations and community automation.</div>
            <div className="boundary-item">Controlled on-chain workflows on Solana and EVM.</div>
          </div>
          <div style={{ marginTop: 25, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <ButtonLink href="/profile" variant="secondary">View profile</ButtonLink>
            <ButtonLink href="/work" variant="text">See the work</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="cta-section">
      <div className="container">
        <span className="eyebrow">NEXT STEP</span>
        <h2>Have a Web3 problem that needs to become a product?</h2>
        <p>
          Tell us what you are trying to build, where you are stuck, and what
          a working first version needs to do.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <ButtonLink href="/start">Start a conversation</ButtonLink>
          <BookFitCallButton />
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <PageFrame>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">AI-NATIVE WEB3 PRODUCT STUDIO</span>
            <h1>Turn Your Web3 Problem Into a Working Product.</h1>
            <p className="hero-identity">Khalid Murtala — AI × Web3 Product Engineer and founder of The Web3 Wizard.</p>
            <p className="hero-copy">
              The Web3 Wizard is a founder-led AI-native product studio helping early-stage Web3
              founders and small teams turn important problems and roadmap milestones into focused,
              working products: AI agents, Solana applications, dApps, automation tools, and Web3 MVPs.
            </p>
            <div className="hero-actions">
              <ButtonLink href="/start">Start a conversation</ButtonLink>
              <ButtonLink href="/work" variant="secondary">See the work</ButtonLink>
            </div>
            <div className="hero-actions hero-tertiary">
              <ButtonLink href="/profile" variant="text">View profile</ButtonLink>
            </div>
            <p className="hero-note">
              AI helps us move faster. Khalid Murtala directs the work, challenges the output,
              tests the important parts, and remains accountable for what gets delivered.
            </p>
          </div>
          <div className="hero-visual" aria-label="AI-native Web3 product studio composition">
            <div className="visual-panel one">
              <span className="eyebrow">DELIVERY MODEL</span>
              <strong>Problem → Product → MVP</strong>
              <span className="visual-line" />
              <span className="visual-line short" />
            </div>
            <div className="visual-panel two">
              <span className="eyebrow">CAPABILITIES</span>
              <strong>AI agents · Solana · dApps</strong>
              <p>Automation · Web3 MVPs · Focused builds</p>
            </div>
            <div className="visual-panel three">
              <span className="eyebrow">FOUNDER-LED</span>
              <strong>Direct. Accountable.</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="FOUNDER-BUILT WORK"
            title="Real projects. Real code. Clearly labeled."
            children="These are founder-built personal projects, not client case studies. Each one demonstrates a real capability."
          />
          <div className="projects-grid">
            {projects.filter((p) => p.featured).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <ButtonLink href="/work" variant="secondary">View all projects</ButtonLink>
          </div>
        </div>
      </section>

      <EngagementsSection />

      <WhatIBuildSection />

      <ProofSection />

      {/* Process */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="HOW IT WORKS" title="Understand → Define → Build → Verify → Ship" />
          <div className="process-grid">
            {[
              { n: "01", t: "Understand", p: "Get clear on the problem, the user, and what actually needs to be built." },
              { n: "02", t: "Define", p: "Scope the smallest useful product. Agree the first meaningful outcome." },
              { n: "03", t: "Build", p: "AI-native execution. Fast without cutting corners on what matters." },
              { n: "04", t: "Verify", p: "Test the important behaviour. Document limitations honestly." },
              { n: "05", t: "Ship", p: "Deployed, handed over, and ready to learn from real usage." },
            ].map((step) => (
              <div className="process-step" key={step.n}>
                <span className="process-number">{step.n}</span>
                <h3>{step.t}</h3>
                <p>{step.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CurrentFocusSection />

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="FAQ" title="Questions worth answering" align="center" />
          <Faq items={faqItems} />
        </div>
      </section>

      {/* Insights teaser */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="INSIGHTS"
            title="Practical thinking for Web3 founders."
            children="Notes on scoping, shipping, and building Web3 products real users can navigate."
          />
          <div className="insight-grid">
            {insights.slice(0, 3).map((item) => (
              <Link href={`/insights/${item.slug}`} className="insight-card" key={item.slug}>
                <span className="eyebrow">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="inline-link">{item.readingTime} <ArrowUpRight size={14} /></span>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <ButtonLink href="/insights" variant="secondary">Read all insights</ButtonLink>
          </div>
        </div>
      </section>

      <FinalCtaSection />
    </PageFrame>
  );
}

function ProblemCard({ title, copy, href, label, eyebrow = "PATH" }: { title: string; copy: string; href: string; label: string; eyebrow?: string }) {
  return (
    <Link href={href} className="problem-card">
      <span className="eyebrow">{eyebrow}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
      <span className="inline-link">{label} <ArrowUpRight size={14} /></span>
    </Link>
  );
}

// ─── Services Page ────────────────────────────────────────────────────────────

export function ServicesPage() {
  const cards = Object.values(services);
  return (
    <PageFrame>
      <PageHero
        eyebrow="SERVICES"
        title="Choose the engagement that fits your situation."
        description="Three focused services built around how early-stage Web3 founders actually work. Start with the path that best matches where you are now."
      />
      <div className="page-content">
        <div className="container">
          <div className="service-grid">
            {cards.map((service) => (
              <Link className="service-card" key={service.slug} href={`/services/${service.slug}`}>
                <span className="eyebrow">{service.eyebrow}</span>
                <h3>{service.label}</h3>
                <p>{service.description}</p>
                <span className="inline-link">Explore this service <ArrowUpRight size={14} /></span>
              </Link>
            ))}
          </div>
          <div className="split-callout" style={{ marginTop: 80 }}>
            <div>
              <SectionHeading
                eyebrow="HOW TO CHOOSE"
                title="Start with the problem, not the technology."
                children="Every engagement begins by clarifying the outcome and reducing scope to something useful. If you are not sure which service fits, describe the situation and we will help identify the right starting point."
              />
            </div>
            <div className="callout-panel">
              <div className="boundary-list">
                <div className="boundary-item">Every engagement has visible, agreed deliverables.</div>
                <div className="boundary-item">Every service page states what is explicitly outside scope.</div>
                <div className="boundary-item">Every engagement starts with a qualified conversation.</div>
                <div className="boundary-item">Khalid Murtala is directly involved in every project.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageFrame>
  );
}

// ─── Service Detail Data ──────────────────────────────────────────────────────

const serviceDetail = (key: keyof typeof services) => ({
  productDiscovery: {
    good: [
      "You have a real problem but are not sure what to build",
      "You have an idea but need to validate the scope before investing in a build",
      "You want to understand what an MVP should and should not include",
      "You need to decide whether AI or Web3 genuinely belong in the product",
      "A decision-maker is available and willing to engage in the discovery process",
    ],
    deliverables: [
      "Defined problem statement and target user",
      "Review of existing alternatives",
      "Core workflow and user journey",
      "MVP scope: what to build and what to defer",
      "Technical feasibility assessment",
      "Where AI or Web3 adds genuine value vs. unnecessary complexity",
      "Build-ready product direction",
    ],
    exclusions: [
      "Exhaustive market research or formal competitive analysis",
      "Guaranteed product-market fit or validation",
      "Investment readiness documents or pitch decks",
      "Full design system or production-ready UI",
      "Unlimited scope expansion",
    ],
    process: ["Understand the situation", "Map alternatives", "Define the user", "Scope the MVP", "Produce direction"],
  },
  web3MvpDevelopment: {
    good: [
      "You have a validated problem or a clear product concept",
      "You have a prototype, specification, or early product that needs focused execution",
      "You need an AI agent, Solana application, dApp, automation tool, or focused MVP",
      "A decision-maker is available throughout the build",
      "You understand this is about the smallest useful product, not an unlimited build",
    ],
    deliverables: [
      "Working product focused on the agreed core workflow",
      "Frontend interface and backend logic where required",
      "AI agent or Solana integration where applicable",
      "Wallet or API integration where required",
      "Deployment support",
      "Handover documentation and known limitations",
    ],
    exclusions: [
      "Smart-contract audit or formal security certification",
      "Unlimited revisions or scope expansion",
      "Guaranteed user adoption or product-market fit",
      "Token economics, financial modelling, or investment advice",
      "Ongoing maintenance without a separate engagement",
    ],
    process: ["Clarify scope", "Agree first outcome", "Build", "Verify", "Hand over"],
  },
  aiAgentSolanaEngineering: {
    good: [
      "You know the specific capability you need: an AI agent, Solana integration, or automated workflow",
      "You have an existing product that needs a new AI or Solana capability",
      "You need a Telegram or Discord AI agent for a Web3 community",
      "You need on-chain data pipelines, wallet monitoring, or Solana application features",
      "A technical decision-maker is available",
    ],
    deliverables: [
      "AI agent with defined capabilities and documented behaviour",
      "Solana integration or application feature",
      "Automation workflow or data pipeline",
      "Telegram or Discord integration where applicable",
      "Technical documentation and handover",
    ],
    exclusions: [
      "Smart-contract audit or formal penetration testing",
      "Fully autonomous agents that self-modify or self-deploy",
      "Guaranteed on-chain transaction outcomes",
      "Ongoing agent maintenance without a separate engagement",
      "Undefined or open-ended capability scope",
    ],
    process: ["Define capability", "Agree scope and boundaries", "Build", "Test behaviour", "Hand over"],
  },
} as const)[key];

// ─── Service Detail Page ──────────────────────────────────────────────────────

export function ServiceDetailPage({ type }: { type: keyof typeof services }) {
  const service = services[type];
  const details = serviceDetail(type);
  const engagementForService: Record<string, (typeof engagements)[number]> = {
    productDiscovery: engagements[0],
    web3MvpDevelopment: engagements[2],
    aiAgentSolanaEngineering: engagements[1],
  };
  const engagement = engagementForService[type];
  return (
    <PageFrame>
      <PageHero eyebrow={service.eyebrow} title={service.title} description={service.description}>
        <ButtonLink href={`/start?type=${service.query}`}>{service.cta}</ButtonLink>
      </PageHero>
      <div className="page-content">
        <div className="container detail-grid">
          <div>
            <h2>Is this the right engagement?</h2>
            <p className="legal-copy">
              This service is designed to stay focused, explainable, and useful. It works best when
              the situation is clear enough to agree on a first meaningful outcome.
            </p>
            <h3>Good fit when</h3>
            <ul>{details.good.map((item) => <li key={item}>{item}</li>)}</ul>
            <h3>What you receive</h3>
            <ul>{details.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
            <h3>What is outside scope</h3>
            <ul>{details.exclusions.map((item) => <li key={item}>{item}</li>)}</ul>
            <h3>Process</h3>
            <ol>{details.process.map((item) => <li key={item}>{item}</li>)}</ol>
            <h3>Limitations</h3>
            <p className="legal-copy">
              The exact scope, timeline, integrations, and handover are agreed before work begins.
              No service on this site guarantees adoption, financial outcomes, rankings, security
              certification, or a result outside the written scope. We build focused MVPs and
              product capabilities, not entire companies.
            </p>
          </div>
          <aside className="side-panel">
            <span className="eyebrow">{service.label}</span>
            <h3>{service.title}</h3>
            <p className="capability-copy">
              The first step is a focused conversation about what you are trying to build or solve.
            </p>
            <p className="offer-fit">
              If the engagement is not the right fit, Khalid will say so clearly rather than
              force a project that does not suit the scope.
            </p>
            <ButtonLink href={`/start?type=${service.query}`}>{service.cta}</ButtonLink>
            {engagement && (
              <p className="engagement-aside-price">
                {engagement.priceLabel} · {engagement.duration}. {PRICE_DISCLAIMER}
              </p>
            )}
            <div className="boundary-list" style={{ marginTop: 25 }}>
              <div className="boundary-item">Direct communication with Khalid Murtala.</div>
              <div className="boundary-item">Agreed scope with visible deliverables.</div>
              <div className="boundary-item">Limitations documented at handover.</div>
            </div>
          </aside>
        </div>
      </div>
    </PageFrame>
  );
}

// ─── Work Page ────────────────────────────────────────────────────────────────

export function WorkPage() {
  const [filter, setFilter] = useState<"all" | import("@/site").ProjectStatus>("all");
  const shown = useMemo(
    () => filter === "all" ? projects : projects.filter((p) => p.status === filter),
    [filter]
  );
  return (
    <PageFrame>
      <PageHero
        eyebrow="FOUNDER-BUILT WORK"
        title="Real projects. Real evidence. Clearly labeled."
        description="A portfolio of founder-built Web3 projects by Khalid Murtala: AI agents, Solana tools, EVM wallet intelligence, and Web3 automation. These are personal projects, not client case studies."
      />
      <div className="page-content">
        <div className="container">
          <div className="work-filter">
            {(["all", "deployed", "building"] as const).map((value) => (
              <button
                key={value}
                className={`filter-button ${filter === value ? "active" : ""}`}
                onClick={() => setFilter(value)}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="projects-grid">
            {shown.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
          <div className="split-callout" style={{ marginTop: 80 }}>
            <div>
              <SectionHeading
                eyebrow="ABOUT THIS WORK"
                title="Founder-built. Not client work."
                children="Every project shown here was built by Khalid Murtala as a personal experiment or independent product. This is the actual technical work that informs the studio's capabilities."
              />
            </div>
            <div className="callout-panel">
              <div className="boundary-list">
                <div className="boundary-item">All projects are labeled with their current status.</div>
                <div className="boundary-item">No personal project is presented as a client case study.</div>
                <div className="boundary-item">Live demos and repositories are linked where they exist.</div>
                <div className="boundary-item">Limitations are documented honestly on each project page.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageFrame>
  );
}

// ─── Project Detail Page ──────────────────────────────────────────────────────

export function ProjectDetailPage() {
  const [, params] = useRoute("/work/:slug");
  const project = projects.find((item) => item.slug === params?.slug);
  if (!project) return <NotFoundPage />;
  return (
    <PageFrame>
      <div className="page-content">
        <div className="container">
          <div className="project-detail-hero">
            <div>
              <span className="personal-label">Founder-built reference implementation. Not client work.</span>
              <h1>{project.name}</h1>
              <p className="hero-copy">{project.description}</p>
              <dl className="project-facts">
                <div>
                  <dt>Category</dt>
                  <dd>{project.category}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{project.status}</dd>
                </div>
                <div>
                  <dt>Role</dt>
                  <dd>Founder · Product Engineer · AI Integration Lead</dd>
                </div>
                <div>
                  <dt>Built with</dt>
                  <dd>{project.stack.join(", ")}</dd>
                </div>
              </dl>
              <div className="card-meta" style={{ marginTop: 25 }}>
                <span className="status-badge">{project.status}</span>
                <span className="tag">{project.category}</span>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-link">
                    Live demo <ExternalLink size={13} />
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noreferrer" className="inline-link">
                    GitHub repository <Github size={13} />
                  </a>
                )}
              </div>
            </div>
            <div className="project-hero-visual">
              <span>{project.name}</span>
            </div>
          </div>
          <div className="detail-grid" style={{ marginTop: 70 }}>
            <div>
              <h2>What it does</h2>
              <p>{project.whatItDoes}</p>
              <h3>The problem it addresses</h3>
              <p>{project.problem}</p>
              <h3>Key decisions</h3>
              <ul>{project.decisions.map((item) => <li key={item}>{item}</li>)}</ul>
              <h3>Built with</h3>
              <p>{project.stack.join(", ")}.</p>
              <div className="stack-chips">
                {project.stack.map((tech) => (
                  <span className="tag" key={tech}>{tech}</span>
                ))}
              </div>
              <h3>Known limitations</h3>
              <ul>{project.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
              <h3>What this demonstrates</h3>
              <ul>{project.lessons.map((item) => <li key={item}>{item}</li>)}</ul>
              <h3>Demo video</h3>
              <div className="demo-placeholder" role="note" aria-label="Demo video placeholder">
                <p>No demo video yet. Explore the live demo or repository to see this project in action.</p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-link">
                      Open live demo <ExternalLink size={13} />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noreferrer" className="inline-link">
                      Open repository <Github size={13} />
                    </a>
                  )}
                </div>
              </div>
            </div>
            <aside className="side-panel">
              <span className="eyebrow">RELATED SERVICE</span>
              <h3>Discuss something similar</h3>
              <p className="capability-copy">
                Tell us what you are trying to build and we can help shape the first useful version.
              </p>
              <ButtonLink href={`/start?project=${project.slug}`}>
                Discuss a similar project
              </ButtonLink>
              <Link href={project.relatedService} className="inline-link" style={{ marginTop: 16, display: "inline-flex" }}>
                Explore related service <ChevronRight size={14} />
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </PageFrame>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────

export function AboutPage() {
  return (
    <PageFrame>
      <PageHero
        eyebrow="ABOUT THE STUDIO"
        title="Khalid Murtala. Founder of The Web3 Wizard."
        description="The Web3 Wizard Labs is a founder-led AI-native Web3 product studio operated by Khalid Murtala. We help early-stage founders and small teams turn real Web3 problems and roadmap milestones into focused, working products."
      />
      <div className="page-content">
        <div className="container about-grid">
          <aside className="about-aside">
            <span className="eyebrow">THE WEB3 WIZARD</span>
            <h3>Khalid Murtala. Founder, builder, product engineer.</h3>
            <p className="about-copy">
              I build Web3 and AI products, with a particular interest in the point where an
              ambitious idea has to become something another person can actually understand and use.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "20px 0" }}>
              <a href="https://github.com/theweb3wizard" target="_blank" rel="noreferrer" className="inline-link">
                GitHub: theweb3wizard <ExternalLink size={13} />
              </a>
              <a href="https://x.com/theweb3wizard00" target="_blank" rel="noreferrer" className="inline-link">
                X: @theweb3wizard00 <ExternalLink size={13} />
              </a>
              <a href="https://www.linkedin.com/in/theweb3wizard00" target="_blank" rel="noreferrer" className="inline-link">
                LinkedIn <ExternalLink size={13} />
              </a>
            </div>
            <ButtonLink href="/start">Start a conversation</ButtonLink>
            <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
              <ButtonLink href="/profile" variant="secondary">View Khalid's profile</ButtonLink>
            </div>
          </aside>
          <div>
            <h2>Direct ownership from architecture to handover.</h2>
            <p className="about-copy">
              Khalid Murtala personally directs architecture, implementation, testing, communication,
              and handover for every engagement. The Web3 Wizard (The Web3 Wizard Labs) is a founder-led
              operation, not an agency with layers between the client and the work.
            </p>
            <h3>AI-native execution with human accountability</h3>
            <p className="about-copy">
              AI is used throughout the work: research, planning, design, coding, testing, and review.
              AI output is not treated as automatically correct. Every important decision is understood,
              challenged, tested, and documented. Khalid remains accountable for what gets delivered.
            </p>
            <h3>What the studio specialises in</h3>
            <p className="about-copy">
              The Web3 Wizard specialises in AI agents, Solana applications, dApps, Web3 automation
              tools, and focused MVP development. The real GitHub portfolio (Valor, WalletLens,
              Write3, AgentHub, OrderFlow, SolPulse) reflects the actual technical capabilities of the studio.
            </p>
            <h3>An honest starting point</h3>
            <p className="about-copy">
              The Web3 Wizard Labs is currently opening its first client engagements. There are no client
              testimonials or client case studies to present yet. The founder-built work in the
              portfolio is a genuine record of what has been built and shipped, clearly labeled as
              personal projects.
            </p>
            <h3>What we do not claim</h3>
            <p className="about-copy">
              We do not present personal projects as client work. We do not guarantee product-market
              fit, user adoption, financial outcomes, or security certifications. We do not build
              entire companies. We build focused products and capabilities that help founders make
              their most important next decision.
            </p>
          </div>
        </div>
      </div>
      <section className="cta-section">
        <div className="container">
          <span className="eyebrow">NEXT STEP</span>
          <h2>Have a Web3 problem worth turning into a product?</h2>
          <ButtonLink href="/start">Start a conversation</ButtonLink>
        </div>
      </section>
    </PageFrame>
  );
}

// ─── Insights Page ────────────────────────────────────────────────────────────

export function InsightsPage() {
  return (
    <PageFrame>
      <PageHero
        eyebrow="INSIGHTS"
        title="Practical thinking for Web3 founders building real products."
        description="Articles on Web3 product decisions, AI-native development, Solana applications, MVP scoping, and building dApps that real users can navigate."
      />
      <div className="page-content">
        <div className="container">
          <div className="insight-grid">
            {insights.map((item) => (
              <Link href={`/insights/${item.slug}`} className="insight-card" key={item.slug}>
                <span className="eyebrow">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                  <span className="inline-link">{item.readingTime} <ArrowUpRight size={14} /></span>
                  <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "'DM Mono', monospace" }}>
                    {item.datePublished}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageFrame>
  );
}

// ─── Insight Detail Page ──────────────────────────────────────────────────────

const insightBodies: Record<string, React.ReactNode> = {
  "scope-a-web3-product-before-spending-money": (
    <>
      <p>
        I have killed products before I finished them. Not because the ideas were bad. Because I
        tried to build everything at once and ran out of time, money, and patience before I could
        learn anything real. Scoping is the part of building nobody wants to spend time on. But it
        is the part that decides whether you ship something or burn six months on something nobody
        asked for.
      </p>
      <h2>One user, one moment</h2>
      <p>
        When I sit down to scope, I ask a different question than most founders do. Instead of
        "what should the product do?", I ask "who is struggling with what, right now, and what
        is the smallest thing I can build to make that struggle a little less painful?"
        You pick one user. One situation. One moment where they need to take an action and
        currently cannot. Everything else goes on a list and stays there.
      </p>
      <p>
        This is harder than it looks. You are close to your idea. You see the whole thing in your
        head. The temptation is to show people the full vision early and hope they get it. But a
        first version is not a solution. It is a learning device. It needs to be small enough to
        ship fast and clear enough that a real person can tell you whether it solved the right
        problem.
      </p>
      <h2>What actually matters in a first version</h2>
      <p>
        You need four things. A user who genuinely has the problem you think they have. A
        workflow that works, even if it is rough. A way to observe whether it worked. And an
        honest note about what is not in it. That is it. Everything else is scope you added because
        it felt necessary, not because someone proved it was.
      </p>
      <p>
        In Web3 this cuts deep. Wallet integration, chain selection, token mechanics, the decision
        to put things on-chain versus off. Each one can double your build time without adding value
        for the person using the product. The question is not "should we support this chain" or
        "should we add a token." The question is "does this make the core problem easier to solve
        for the person who needs it right now?" If it does not, leave it out.
      </p>
      <p>
        A well-scoped product is one you can explain in two sentences, build in weeks not months,
        and test with real people before the money runs out. That is the standard I work to, and
        it is what I help founders get to.
      </p>
    </>
  ),
  "why-a-web3-prototype-can-fail": (
    <>
      <p>
        I have shipped prototypes that worked perfectly on my machine and fell apart the moment
        someone else tried them. Web3 makes this worse than most domains because the user is
        expected to know things that most people have never heard of. A prototype that works on
        your screen often creates a wall of confusion for the first real person who touches it.
      </p>
      <h2>Where prototypes actually break</h2>
      <p>
        The first thing that breaks is the assumption that the user knows what you know. A wallet
        connection flow, a transaction confirmation, gas fees, network switching, token approvals.
        These are routine to someone who builds in Web3 every day. To everyone else, they are a
        chain of unfamiliar decisions with no clear answer. When your prototype assumes knowledge
        your user does not have, the product feels broken even when it works.
      </p>
      <p>
        The second thing that breaks is error handling. Prototypes are built for the path that
        works. Real usage is not. When a wallet refuses to connect, when a transaction reverts,
        when a user clicks something unexpected. These moments determine whether the product feels
        trustworthy or frustrating. A prototype that has no error states communicates failure with
        silence or with technical text that scares the user away. Neither builds confidence.
      </p>
      <p>
        The third thing that breaks is purpose. A prototype shows a feature working. It does not
        always explain why that feature matters. Users do not interact with products to admire
        features. They interact with products to accomplish something. If the product does not make
        the purpose obvious, the feature does not matter no matter how well it works.
      </p>
      <h2>What to fix before real users see it</h2>
      <p>
        Walk through your product as if you are someone who has never heard of Web3 before. At
        every step, ask: does this screen tell me what to do next? Does it explain what just
        happened? Does it handle the most likely failure in a way I can understand? If the answer
        to any of those is no, that is more important than any new feature you want to add.
      </p>
      <p>
        The single most useful thing you can do with a prototype is watch someone try to use it
        without helping them. You will learn more in an hour of watching than in a week of reviewing
        yourself. That is the kind of clarity I want to help founders build before they commit to
        a larger build.
      </p>
    </>
  ),
  "use-ai-without-blindly-trusting-it": (
    <>
      <p>
        I use AI to build things now. It is faster than it used to be, and the difference is real.
        A product that would have taken months now takes weeks. The danger is not that AI is too
        slow. The danger is that it is too fast, and you do not catch the things that matter until
        they are already in production.
      </p>
      <h2>Where AI is genuinely useful and where it is not</h2>
      <p>
        AI tools are excellent at producing plausible code quickly. They are unreliable when it
        comes to things that matter. Security-sensitive logic, complex state, edge cases that only
        appear in real usage. AI does not understand why your product exists. It does not know
        which user action is irreversible. It does not know what your threat model is. It is
        pattern-matching, not thinking. The risk is not that it produces obviously wrong code. The
        risk is that it produces code that looks right, passes basic tests, and fails in production.
      </p>
      <p>
        In Web3 this cuts deeper than in most domains. A wrong implementation of a wallet signing
        flow, a token approval that grants more access than intended, a transaction that behaves
        differently than the user expected. These are not bugs you can patch after launch. They are
        things that can cost users real value. You need to be the person who catches them before
        they ship, not the person who reads about them in a support ticket.
      </p>
      <h2>How I actually use it</h2>
      <p>
        I use AI as a starting point, not a finishing point. I give it clear context about what I
        am building, who it is for, and what the limits are. Then I read everything it produces
        critically, especially the parts that look too easy. I test the behaviour that matters, not
        just the path that works. And I keep notes on what I verified, what I am not sure about,
        and what I have deferred. That is the whole discipline. It is not complicated, but it does
        require you to stay in the loop.
      </p>
      <p>
        The honest version of building with AI is that it makes you faster and it does not make you
        less responsible. You still own the product. You still need to know what is in it and why.
        That is how I build, and that is what I expect from the work I do for others.
      </p>
    </>
  ),
};

export function InsightDetailPage() {
  const [, params] = useRoute("/insights/:slug");
  const item = insights.find((insight) => insight.slug === params?.slug);
  if (!item) return <NotFoundPage />;
  const body = insightBodies[item.slug];
  return (
    <PageFrame>
      <div className="page-content">
        <article className="article">
          <span className="eyebrow">{item.category} • {item.readingTime}</span>
          <h1>{item.title}</h1>
          <div className="article-meta">
            By Khalid Murtala · The Web3 Wizard | The Web3 Wizard Labs &nbsp;·&nbsp; {item.datePublished}
          </div>
          <div className="article-body">
            {body ?? <p>{item.description}</p>}
          </div>
          <div style={{ marginTop: 48, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <ButtonLink href={item.relatedService}>Explore the related service</ButtonLink>
            <ButtonLink href="/work" variant="secondary">View founder-built projects</ButtonLink>
          </div>
        </article>
      </div>
    </PageFrame>
  );
}

// ─── Start / Contact Page ─────────────────────────────────────────────────────

export function StartPage() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split("?")[1] || "");
  const initialType = normalizeInquiryType(params.get("type"));
  const projectParam = params.get("project") || "";
  const isFitCall = params.get("intent") === "fit-call";
  const projectContext = projects.find((item) => item.slug === projectParam);
  const booking = getBookingHref();
  const mutation = trpc.inquiries.create.useMutation();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", company: "", projectUrl: "", description: "",
    situation: initialType, stage: "idea", timeline: "", budget: "",
    success: "", consent: false, website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formState = getInquiryFormState(mutation.isPending, sent);
  const submitA11y = getInquirySubmitA11y(formState);
  const update = (key: string, value: string | boolean) =>
    setForm((current) => ({ ...current, [key]: value }));
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (shouldBlockInquirySubmit(formState)) return;
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Please add your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please add a valid email.";
    if (form.description.trim().length < 30) next.description = "Please share at least 30 characters about the situation.";
    if (!form.consent) next.consent = "Consent is required so we can reply.";
    setErrors(next);
    if (Object.keys(next).length) return;
    try {
      await mutation.mutateAsync(form);
      setSent(true);
    } catch {
      setErrors({ form: `Something went wrong while sending. Please try again or email ${CONTACT_EMAIL}.` });
    }
  };
  return (
    <PageFrame>
      <PageHero
        eyebrow="START A CONVERSATION"
        title={isFitCall ? "Book a fit call. Start with a message." : "Start a conversation. Let's turn the problem into a product."}
        description="You do not need a perfect brief. Tell us what you are trying to build, the problem you are solving, and what a useful first version needs to do."
      >
        {isFitCall && !booking.external && (
          <p className="fit-call-note">
            Online scheduling is not configured yet — send the form below and Khalid will reply
            personally to arrange a fit call. Prefer email?{" "}
            <a className="inline-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        )}
        {isFitCall && booking.external && (
          <p className="fit-call-note">
            <a href={booking.href} target="_blank" rel="noreferrer" className="inline-link">
              Prefer to pick a time directly? Open the scheduler <ArrowUpRight size={14} />
            </a>
          </p>
        )}
        {projectContext && (
          <p className="fit-call-note">
            You are asking about something similar to <strong>{projectContext.name}</strong> —
            a founder-built reference implementation, not client work. Mention what you would
            want done differently in the form below.
          </p>
        )}
      </PageHero>
      <div className="page-content">
        <div className="container form-shell">
          <div>
            <SectionHeading
              eyebrow="WHAT HAPPENS NEXT"
              title="A useful first message is enough."
              children="Khalid Murtala reviews every inquiry personally and replies if the project looks like a good fit. No pitch deck required. If it is not the right fit, he will say so clearly."
            />
            <div className="boundary-list">
              <div className="boundary-item">Describe the problem or product in plain English.</div>
              <div className="boundary-item">Select the type of engagement that best fits.</div>
              <div className="boundary-item">Share what a successful first version would look like.</div>
            </div>
            <div className="fit-check-panel">
              <strong>Prefer to ask one question first?</strong>
              <p>Email directly if you want to check fit before completing the form.</p>
              <a className="inline-link" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL} <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
          <div className="form-card">
            {formState === "success" ? (
              <div className="form-success" role="status" aria-live="polite">
                <div className="success-icon" aria-hidden="true"><Check size={22} strokeWidth={2.5} /></div>
                <div className="success-copy">
                  <strong>Your message is in.</strong>
                  <p>Khalid will review the details and reply if the project looks like a good fit.</p>
                  <span>Thank you for reaching out.</span>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="form-grid">
                  <Field label="Full name" name="name" value={form.name} onChange={update} error={errors.name} required />
                  <Field label="Email address" name="email" type="email" value={form.email} onChange={update} error={errors.email} required />
                  <Field label="Company or project name" name="company" value={form.company} onChange={update} />
                  <Field label="Project URL (if you have one)" name="projectUrl" value={form.projectUrl} onChange={update} />
                  <Field label="Describe the problem or product" name="description" as="textarea" value={form.description} onChange={update} error={errors.description} required className="full" hint="What problem are you solving? What does a useful first version need to do? Minimum 30 characters." />
                  <Field label="Type of engagement" name="situation" as="select" value={form.situation} onChange={update} className="full">
                    <option value="not-sure">Not sure yet, help me figure it out</option>
                    <option value="discovery">Product and Technical Discovery (from $750)</option>
                    <option value="integration-sprint">AI Agent or Web3 Integration Sprint (from $2,500)</option>
                    <option value="product-build">Focused dApp or Web3 Product Build (from $6,000)</option>
                    <option value="embedded">Embedded Product Engineering (from $2,000/month)</option>
                    <option value="product-discovery">Product Discovery Sprint (service page)</option>
                    <option value="web3-mvp-development">AI-Native Web3 Product Build (service page)</option>
                    <option value="ai-agent-solana-engineering">AI Agent & Solana Engineering (service page)</option>
                  </Field>
                  <Field label="Where are you in the process?" name="stage" as="select" value={form.stage} onChange={update}>
                    <option value="idea">I have an idea or problem</option>
                    <option value="prototype">I have a rough prototype</option>
                    <option value="spec">I have a specification or detailed concept</option>
                    <option value="early-product">I have an early product that needs work</option>
                  </Field>
                  <Field label="Ideal timeline" name="timeline" as="select" value={form.timeline} onChange={update}>
                    <option value="">Not sure</option>
                    <option value="asap">As soon as possible</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="1-3-months">1 to 3 months</option>
                    <option value="3-plus-months">3+ months</option>
                  </Field>
                  <Field label="Rough budget range" name="budget" as="select" value={form.budget} onChange={update}>
                    <option value="">Prefer not to say yet</option>
                    <option value="under-2k">Under $2,000</option>
                    <option value="2k-10k">$2,000 – $10,000</option>
                    <option value="10k-25k">$10,000 – $25,000</option>
                    <option value="25k-plus">$25,000+</option>
                  </Field>
                  <Field label="What is the most important milestone or what's stuck?" name="success" as="textarea" value={form.success} onChange={update} className="full" hint="Optional: the roadmap milestone you need to hit, or where you are currently stuck." />
                  <div className="field full">
                    <label>
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => update("consent", e.target.checked)}
                        style={{ marginRight: 8 }}
                      />
                      I consent to The Web3 Wizard Labs receiving this inquiry and using the provided
                      details to respond. I understand this data is not stored in a database and is
                      delivered via Telegram notification to Khalid Murtala.
                    </label>
                    {errors.consent && <span className="form-error">{errors.consent}</span>}
                  </div>
                  <input type="text" name="website" value={form.website} onChange={(e) => update("website", e.target.value)} style={{ display: "none" }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  {errors.form && <p className="form-error full">{errors.form}</p>}
                  <div className="full">
                    <button
                      type="submit"
                      className="button button-primary"
                      disabled={submitA11y.disabled}
                      aria-busy={submitA11y.busy}
                      aria-live="polite"
                    >
                      {formState === "submitting" ? (
                        <><Loader2 size={15} className="submit-spinner" /> Sending…</>
                      ) : "Start the conversation"}
                    </button>
                    <p className="form-note" style={{ marginTop: 12 }}>
                      Typically reviewed within two business days. No automated responses.
                    </p>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageFrame>
  );
}

// ─── Field component ──────────────────────────────────────────────────────────

function Field({
  label, name, value, onChange, error, required, type = "text",
  as, children, className, hint,
}: {
  label: string; name: string; value: string; onChange: (k: string, v: string | boolean) => void;
  error?: string; required?: boolean; type?: string; as?: "textarea" | "select";
  children?: React.ReactNode; className?: string; hint?: string;
}) {
  const id = `field-${name}`;
  return (
    <div className={`field${className ? ` ${className}` : ""}`}>
      <label htmlFor={id}>{label}{required && " *"}</label>
      {as === "textarea" ? (
        <textarea id={id} name={name} value={value} onChange={(e) => onChange(name, e.target.value)} required={required} />
      ) : as === "select" ? (
        <select id={id} name={name} value={value} onChange={(e) => onChange(name, e.target.value)}>
          {children}
        </select>
      ) : (
        <input id={id} name={name} type={type} value={value} onChange={(e) => onChange(name, e.target.value)} required={required} />
      )}
      {hint && <small>{hint}</small>}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

// ─── Profile / Hire Khalid Page ───────────────────────────────────────────────

export function ProfilePage() {
  const selectedWork = projects.filter((p) => p.featured);
  return (
    <PageFrame>
      <div className="profile-printable">
        <PageHero
          eyebrow="PROFILE — KHALID MURTALA"
          title="Khalid Murtala — AI × Web3 Product Engineer"
          description="I build AI agents, Web3 applications, wallet intelligence tools, automation systems, and focused product MVPs. My work combines TypeScript, React, Next.js, Node.js, LLM APIs, blockchain data, Solana, EVM integrations, and human-controlled agent workflows."
        >
          <div className="hero-actions">
            <ButtonLink href="/start">Start a Conversation</ButtonLink>
            <BookFitCallButton />
          </div>
          <div className="hero-actions hero-tertiary no-print">
            <button type="button" className="button button-text" onClick={() => window.print()}>
              <Printer size={15} /> Print or save this profile as PDF
            </button>
          </div>
        </PageHero>
        <div className="page-content">
          <div className="container detail-grid">
            <div>
              <h2>Professional summary</h2>
              <p>
                Founder of The Web3 Wizard / The Web3 Wizard Labs — a founder-led AI-native Web3
                product studio. I turn real problems and roadmap milestones into focused working
                products: AI agents, Solana applications, dApps, automation tools, and Web3 MVPs.
                AI accelerates the work; I remain accountable for what ships.
              </p>
              <h3>What I build</h3>
              <ul>
                <li>AI agents for Telegram, Discord, and Web3 workflows</li>
                <li>AI × Web3 product features and agentic pipelines</li>
                <li>Decentralised applications on Solana and EVM chains</li>
                <li>Wallet intelligence and on-chain data tools</li>
                <li>Web3 automation and community operations tools</li>
                <li>Focused product MVPs for early-stage founders</li>
              </ul>
              <h3>Primary technical skills</h3>
              <div className="stack-chips">
                {primarySkills.map((skill) => (
                  <span className="tag" key={skill}>{skill}</span>
                ))}
              </div>
              <h3>Selected projects</h3>
              <p>
                All projects below are founder-built reference implementations — not client work.
                Each links to a live demo and public repository where available.
              </p>
              <ul>
                {projects.map((project) => (
                  <li key={project.slug}>
                    <Link href={`/work/${project.slug}`} className="inline-link" style={{ marginTop: 0 }}>
                      {project.name}
                    </Link>
                    {" "}— {project.summary}
                    {project.liveUrl && (
                      <>
                        {" "}<a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-link" style={{ marginTop: 0 }}>Live</a>
                      </>
                    )}
                    {project.repoUrl && (
                      <>
                        {" "}<a href={project.repoUrl} target="_blank" rel="noreferrer" className="inline-link" style={{ marginTop: 0 }}>GitHub</a>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              <h3>Current focus</h3>
              <p>
                Practical AI-native Web3 products: AI agents, wallet intelligence, Web3 operations
                tools, developer support tools, controlled on-chain workflows, and Solana and EVM
                integrations.
              </p>
              <h3>Availability</h3>
              <ul>
                <li>Project-based client work: open — starting with a fit conversation.</li>
                <li>AI/Web3 engineering roles: open to credible inbound opportunities.</li>
                <li>Reviews every inquiry personally, typically within two business days.</li>
              </ul>
            </div>
            <aside className="side-panel">
              <span className="eyebrow">CONTACT & LINKS</span>
              <h3>Work with Khalid</h3>
              <div className="profile-links">
                {socialLinks.map((link) => (
                  <a key={link.label} href={link.href} target={link.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer" className="inline-link">
                    {link.label}: {link.handle} <ArrowUpRight size={13} />
                  </a>
                ))}
              </div>
              <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
                <ButtonLink href="/work">View the work</ButtonLink>
                <ButtonLink href="/services" variant="secondary">View services</ButtonLink>
                <ButtonLink href="/start" variant="secondary">Start a conversation</ButtonLink>
              </div>
              <p className="engagement-aside-price" style={{ marginTop: 20 }}>
                Engagements start from $750 (discovery). {PRICE_DISCLAIMER}
              </p>
            </aside>
          </div>
          <div className="container" style={{ marginTop: 60 }}>
            <SectionHeading
              eyebrow="SELECTED WORK"
              title="Evidence, not claims."
              children="The same founder-built projects shown across this site."
            />
            <div className="projects-grid">
              {selectedWork.map((project: Project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <FinalCtaSection />
    </PageFrame>
  );
}

// ─── AI Agents Landing Page ───────────────────────────────────────────────────

const agentUseCases = [
  {
    title: "Documentation and support agents",
    problem: "Web3 products bury answers in docs, Discord threads, and scattered announcements.",
    who: "Founders and small teams drowning in repeat support questions.",
    does: "Answers from defined sources, escalates what it cannot verify, and logs every conversation.",
    doesNot: "It does not invent policy, promise outcomes, or replace human support for sensitive cases.",
    clientAngle: "As a client project: a support agent scoped to your docs, with escalation rules you approve.",
  },
  {
    title: "Wallet intelligence agents",
    problem: "On-chain wallet data is public but unreadable to non-technical stakeholders.",
    who: "Founders, analysts, and teams doing diligence on counterparties or users.",
    does: "Turns wallet history into plain-English behaviour summaries, portfolio breakdowns, and risk signals.",
    doesNot: "It does not give financial advice or certify that a wallet is safe.",
    clientAngle: "As a client project: a wallet-intelligence workflow scoped to your chains and questions. Reference: WalletLens.",
  },
  {
    title: "Transaction investigation assistants",
    problem: "A confusing transaction can take hours to unpack across explorers and logs.",
    who: "Operators and developers triaging failed or unexpected on-chain behaviour.",
    does: "Walks through transaction history step by step and explains what happened in readable language.",
    doesNot: "It does not reverse transactions or guarantee it catches every edge case.",
    clientAngle: "As a client project: an investigation assistant scoped to your protocol or chain.",
  },
  {
    title: "Web3 community operations agents",
    problem: "Community channels need constant moderation and repetitive question-answering.",
    who: "Community-led projects on Telegram and Discord.",
    does: "Reasons over conversation context, answers within defined boundaries, and can trigger defined on-chain actions such as tipping contributors.",
    doesNot: "It does not self-modify, invent permissions, or act outside its approved capability set.",
    clientAngle: "As a client project: a community agent with capabilities and refusal rules you define. Reference: Valor.",
  },
  {
    title: "Treasury monitoring agents",
    problem: "Treasury movements go unnoticed until someone asks uncomfortable questions.",
    who: "DAOs, protocols, and small teams managing shared funds.",
    does: "Watches defined wallets and delivers plain-English alerts when meaningful movements occur.",
    doesNot: "It does not move funds, approve spending, or replace multisig controls.",
    clientAngle: "As a client project: a monitoring workflow scoped to your wallets, thresholds, and alert channels.",
  },
  {
    title: "Developer support agents",
    problem: "Developers integrating your product hit the same integration questions repeatedly.",
    who: "Infrastructure and protocol teams with external builders.",
    does: "Answers integration questions from your docs and examples, with code pointers and escalation paths.",
    doesNot: "It does not debug private codebases or guarantee integration outcomes.",
    clientAngle: "As a client project: a developer assistant grounded in your documentation.",
  },
  {
    title: "Research and intelligence workflows",
    problem: "Grant programs, ecosystems, and analysts need structured reads on noisy activity.",
    who: "Ecosystem teams and researchers tracking builders, grants, or governance.",
    does: "Collects defined signals, summarises them on a schedule, and cites its sources.",
    doesNot: "It does not make funding decisions or verify off-chain claims.",
    clientAngle: "As a client project: a research pipeline scoped to your sources and output format.",
  },
  {
    title: "Controlled on-chain workflows",
    problem: "Some operations should happen automatically — but only within strict limits.",
    who: "Teams that need automation without giving an agent the keys to everything.",
    does: "Executes pre-approved actions within policy limits, with audit trails and human approval gates for anything sensitive.",
    doesNot: "It does not self-deploy, expand its own permissions, or act without a trace.",
    clientAngle: "As a client project: an automation scoped to approved actions, with you holding the approval keys. Reference: AgentHub.",
  },
];

export function AiAgentsPage() {
  return (
    <PageFrame>
      <PageHero
        eyebrow="AI AGENTS"
        title="Practical AI agents for real Web3 workflows."
        description="Not hype demos. Defined capabilities, explicit boundaries, audit trails, and human approval where it matters. Every example below is grounded in founder-built reference implementations — clearly labeled, never presented as client deployments."
      >
        <div className="hero-actions">
          <ButtonLink href="/start?type=integration-sprint">Discuss an Integration</ButtonLink>
          <ButtonLink href="/work/valor" variant="secondary">See Valor in action</ButtonLink>
        </div>
      </PageHero>
      <div className="page-content">
        <div className="container">
          <SectionHeading
            eyebrow="EVIDENCE FIRST"
            title="Built, shipped, and labeled honestly."
            children="These reference implementations show what the agent work actually looks like."
          />
          <div className="projects-grid">
            {projects
              .filter((p) => ["valor", "agenthub", "walletlens"].includes(p.slug))
              .map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
          </div>
          <div style={{ marginTop: 80 }}>
            <SectionHeading
              eyebrow="USE CASES"
              title="Where an agent earns its place — and where it does not."
              children="Not every problem needs an agent. Each category below states the problem, who feels it, what the agent does, what it refuses to do, and how it could become a scoped client project."
            />
            <div className="usecase-grid">
              {agentUseCases.map((useCase) => (
                <article className="usecase-card" key={useCase.title}>
                  <h3>{useCase.title}</h3>
                  <p><strong>The problem:</strong> {useCase.problem}</p>
                  <p><strong>Who feels it:</strong> {useCase.who}</p>
                  <p><strong>What the agent does:</strong> {useCase.does}</p>
                  <p><strong>What it does not do:</strong> {useCase.doesNot}</p>
                  <p className="offer-fit">{useCase.clientAngle}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="split-callout" style={{ marginTop: 80 }}>
            <div>
              <SectionHeading
                eyebrow="ENGAGEMENT"
                title="One agent. Defined scope. Documented behaviour."
                children="Agent work ships as an Integration Sprint: starting from $2,500, typically 1–2 weeks, with behaviour testing, documentation, and handover."
              />
            </div>
            <div className="callout-panel">
              <p className="capability-copy">
                {PRICE_DISCLAIMER}
              </p>
              <div style={{ marginTop: 25, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <ButtonLink href="/start?type=integration-sprint">Discuss an Integration</ButtonLink>
                <BookFitCallButton />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FinalCtaSection />
    </PageFrame>
  );
}

// ─── Legal Pages ──────────────────────────────────────────────────────────────

export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  if (kind === "privacy") {
    return (
      <PageFrame>
        <PageHero
          eyebrow="PRIVACY"
          title="How inquiries and personal information are handled."
          description="A clear explanation of what happens when you submit an inquiry to The Web3 Wizard Labs."
        />
        <div className="page-content">
          <div className="container">
            <div className="legal-copy">
              <h2>What information is collected</h2>
              <p>
                When you submit an inquiry through the contact form on this website, the following
                information is collected: your name, email address, company or project name (optional),
                project URL (optional), a description of your project or problem, your selected
                engagement type, stage, timeline, budget (all optional), and your message about what
                success looks like (optional).
              </p>
              <h2>How inquiry data is handled</h2>
              <p>
                Inquiry submissions are delivered to Khalid Murtala via Telegram notification using
                the Telegram Bot API. <strong>No inquiry data is stored in a database.</strong> The
                submission is transmitted directly from the server to Telegram and is not persisted
                by this website.
              </p>
              <h2>No tracking or analytics beyond Vercel Analytics</h2>
              <p>
                This website uses Vercel Analytics for aggregate, privacy-respecting traffic
                measurement. No advertising trackers, third-party cookies, or behavioural profiling
                tools are used.
              </p>
              <h2>Data retention</h2>
              <p>
                Because inquiry data is not stored in a database on this website, there is no
                structured data retention period. Inquiry data exists only in the Telegram
                notification received by Khalid Murtala.
              </p>
              <h2>Contact</h2>
              <p>
                If you have questions about how your information is handled, contact Khalid Murtala
                directly at{" "}
                <a href="mailto:theweb3wizard00@gmail.com" className="inline-link">
                  theweb3wizard00@gmail.com
                </a>.
              </p>
              <p style={{ marginTop: 32, color: "var(--muted)", fontSize: 13 }}>
                This privacy notice describes the actual data handling of this website as of
                2026-08-19. It should receive appropriate legal review before being relied upon as
                a formal legal document.
              </p>
            </div>
          </div>
        </div>
      </PageFrame>
    );
  }
  return (
    <PageFrame>
      <PageHero
        eyebrow="TERMS"
        title="Clear boundaries for every engagement."
        description="What The Web3 Wizard Labs does, what it does not do, and what every engagement includes and excludes."
      />
      <div className="page-content">
        <div className="container">
          <div className="legal-copy">
            <h2>What these terms cover</h2>
            <p>
              These terms apply to all engagements between The Web3 Wizard Labs (operated by Khalid
              Murtala) and clients or prospective clients. They describe the nature of the work,
              what is explicitly outside scope, and the honest limitations of every engagement.
            </p>
            <h2>What The Web3 Wizard Labs builds</h2>
            <p>
              The Web3 Wizard Labs builds focused MVPs and product capabilities. This includes AI agents,
              Solana applications, dApps, automation tools, Web3 product interfaces, and related
              digital products. The studio does not build entire companies and does not take on
              open-ended or undefined scopes.
            </p>
            <h2>What is explicitly outside scope</h2>
            <p>The following are not services offered by The Web3 Wizard Labs under any engagement:</p>
            <ul>
              <li>Smart-contract security audits or formal security certifications</li>
              <li>Formal penetration testing</li>
              <li>Financial, legal, or investment advice</li>
              <li>Token economics design or financial modelling</li>
              <li>Guarantees of user adoption, product-market fit, or revenue</li>
              <li>Ongoing maintenance without a separately agreed support engagement</li>
              <li>Unlimited revisions or scope expansion beyond agreed deliverables</li>
            </ul>
            <h2>Engagement scope and deliverables</h2>
            <p>
              The specific scope, deliverables, timeline, and fees for each engagement are agreed
              in writing before work begins. No work is started on the basis of a verbal agreement
              alone. Known limitations are documented and communicated at handover.
            </p>
            <h2>Personal projects in the portfolio</h2>
            <p>
              The projects shown in the Work section of this website are founder-built personal
              projects by Khalid Murtala. They are not client case studies. No personal project is
              presented as evidence of a client engagement.
            </p>
            <p style={{ marginTop: 32, color: "var(--muted)", fontSize: 13 }}>
              These terms describe the operating principles of The Web3 Wizard Labs as of 2026-08-19.
              They should receive appropriate legal review before being relied upon as a formal
              contractual document.
            </p>
          </div>
        </div>
      </div>
    </PageFrame>
  );
}

// ─── 404 Not Found Page ───────────────────────────────────────────────────────

export function NotFoundPage() {
  return (
    <PageFrame>
      <div className="page-content">
        <div className="container" style={{ textAlign: "center", paddingTop: 80, paddingBottom: 80 }}>
          <span className="eyebrow">404</span>
          <h1 style={{ fontSize: "clamp(3rem, 7vw, 6rem)", letterSpacing: "-.08em", margin: "18px 0" }}>
            That page is not here.
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 18, lineHeight: 1.7, maxWidth: 500, margin: "0 auto 32px" }}>
            The page you were looking for does not exist or may have moved.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <ButtonLink href="/">Go home</ButtonLink>
            <ButtonLink href="/work" variant="secondary">View the work</ButtonLink>
          </div>
        </div>
      </div>
    </PageFrame>
  );
}
