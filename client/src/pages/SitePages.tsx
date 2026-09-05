import { useMemo, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { ArrowUpRight, Check, ChevronRight, ExternalLink, Github, Loader2 } from "lucide-react";
import { ButtonLink, Faq, PageFrame, PageHero, ProjectCard, SectionHeading } from "@/components/SiteShell";
import { insights, projects, services } from "@/site";
import { trpc } from "@/lib/trpc";
import { getInquiryFormState, getInquirySubmitA11y, shouldBlockInquirySubmit } from "@/inquiryFormState";

// ─── Homepage ─────────────────────────────────────────────────────────────────

const faqItems = [
  {
    question: "What does The Web3 Wizard do?",
    answer: "The Web3 Wizard (The Web3 Wizard Labs) is a founder-led AI-native Web3 product studio. We help early-stage founders and small teams turn problems and product ideas into focused working products: AI agents, Solana applications, dApps, automation tools, and Web3 MVPs."
  },
  {
    question: "Do you build AI agents?",
    answer: "Yes. AI agent development is a core capability. We have built AI agents for Telegram, Web3 workflows, and autonomous data pipelines. Every agent is built to a clear scope with defined behaviour and documented limitations."
  },
  {
    question: "Do you build Solana applications?",
    answer: "Yes. Solana application development is a primary technical focus. The studio has built Solana monitoring tools, wallet intelligence products, and Solana-integrated application layers."
  },
  {
    question: "Do you have client testimonials?",
    answer: "Not yet. The Web3 Wizard Labs is currently opening its first client engagements. The work shown on this site is founder-built personal work, clearly labeled as such. The first engagement is designed to be narrow and transparent so both sides can evaluate the fit responsibly."
  },
  {
    question: "Are the portfolio projects client work?",
    answer: "No. The portfolio shows founder-built personal projects and experiments. Every project is clearly labeled so you can distinguish personal work from future client engagements."
  },
  {
    question: "Do you write smart contracts?",
    answer: "The studio focuses on product experiences, application layers, AI agents, and integrations. Smart-contract auditing is outside scope. Smart-contract integration at the product layer can be discussed for specific engagements."
  },
  {
    question: "Do you use AI to build the products?",
    answer: "Yes. AI helps with research, planning, design, coding, testing, and review. Khalid Murtala directs the work, challenges the output, understands important decisions, tests key behaviour, and remains accountable for what is delivered."
  },
];

export function Home() {
  return (
    <PageFrame>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">AI-NATIVE WEB3 PRODUCT STUDIO</span>
            <h1>Turn Your Web3 Problem Into a Working Product.</h1>
            <p className="hero-copy">
              The Web3 Wizard is a founder-led AI-native product studio helping early-stage Web3
              founders and small teams turn important problems and roadmap milestones into focused,
              working products: AI agents, Solana applications, dApps, automation tools, and Web3 MVPs.
            </p>
            <div className="hero-actions">
              <ButtonLink href="/start">Start a conversation</ButtonLink>
              <ButtonLink href="/work" variant="secondary">See the work</ButtonLink>
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

      {/* What are you trying to do */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="START HERE"
            title="What are you trying to do?"
            children="Start with the situation that sounds most like yours."
          />
          <div className="routing-grid">
            <ProblemCard
              title="I have a problem to solve"
              copy="You know there is a real problem but need help defining the product and scoping what to build first."
              href="/services/product-discovery"
              label="Explore Product Discovery"
            />
            <ProblemCard
              title="I have a product to build"
              copy="You have a validated problem or concept and need a founder-led AI-native studio to build it."
              href="/services/web3-mvp-development"
              label="Explore Web3 Product Build"
            />
            <ProblemCard
              title="I need an AI agent or Solana integration"
              copy="You know the capability you need: an AI agent, Solana integration, or automated Web3 workflow."
              href="/services/ai-agent-solana-engineering"
              label="Explore AI Agent & Solana Engineering"
            />
            <ProblemCard
              title="I am not sure where to start"
              copy="Send the situation in plain English. Khalid will help identify the smallest useful first step."
              href="/start"
              label="Start a conversation"
            />
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section">
        <div className="container capabilities-grid">
          <SectionHeading
            eyebrow="CAPABILITIES"
            title="What I help you build"
            children="The goal is not to build the largest possible system. It is to identify the smallest useful product, make the important decisions clear, and ship something you can learn from."
          />
          <div className="capability-list">
            {[
              "AI agents for Telegram and Web3 workflows",
              "Solana applications and monitoring tools",
              "dApps and Web3 product interfaces",
              "Automation tools and data pipelines",
              "EVM wallet intelligence tools",
              "Web3 content and community tools",
              "AI-powered product features",
              "Focused Web3 MVPs",
            ].map((item) => (
              <div className="capability-item" key={item}>{item}</div>
            ))}
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

      {/* AI method */}
      <section className="section">
        <div className="container split-callout">
          <div className="callout-panel">
            <span className="eyebrow">AI-NATIVE, NOT AI-UNACCOUNTABLE</span>
            <h3>AI helps us move faster. It does not replace judgment.</h3>
            <p className="capability-copy">
              We use AI throughout the work: research, planning, design, coding, testing, and review.
              Khalid Murtala directs every engagement, challenges AI output, understands the important
              decisions, and verifies what gets delivered.
            </p>
          </div>
          <div className="boundary-list">
            <div className="boundary-item">AI-assisted speed without treating output as automatically correct.</div>
            <div className="boundary-item">Human-directed decisions with plain-English explanations.</div>
            <div className="boundary-item">Transparent verification and documented limitations.</div>
            <div className="boundary-item">No inflated claims. No vague capability promises.</div>
          </div>
        </div>
      </section>

      {/* Boundaries */}
      <section className="section">
        <div className="container split-callout">
          <div>
            <SectionHeading
              eyebrow="WHAT WE BUILD AND WHAT WE DON'T"
              title="Focused scope. Honest limits."
              children="We build focused MVPs and product capabilities, not entire companies."
            />
          </div>
          <div className="callout-panel">
            <p className="capability-copy">
              We do not present personal projects as client work, claim to be a generic Web3 agency,
              or promise outcomes we cannot control. Every engagement has visible deliverables,
              a defined scope, and documented limitations.
            </p>
            <div style={{ marginTop: 25, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <ButtonLink href="/services" variant="secondary">View services</ButtonLink>
              <ButtonLink href="/terms" variant="text">Service boundaries</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="FAQ" title="Questions worth answering" align="center" />
          <Faq items={faqItems} />
        </div>
      </section>

      {/* About the founder */}
      <section className="section">
        <div className="container split-callout">
          <div>
            <SectionHeading
              eyebrow="ABOUT THE FOUNDER"
              title="Built and directed by Khalid Murtala."
              children="I am Khalid Murtala, the founder of The Web3 Wizard. I work directly with founders and small teams, from the first conversation through to handover, so the person building your product is the person you talk to."
            />
          </div>
          <div className="callout-panel">
            <p className="capability-copy">
              This is a founder-led operation, not an agency with layers between you and the work.
              AI accelerates the build. I direct it, challenge it, test what matters, and stay
              accountable for what ships.
            </p>
            <div style={{ marginTop: 25, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <ButtonLink href="/about" variant="secondary">More about the studio</ButtonLink>
            </div>
          </div>
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

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <span className="eyebrow">NEXT STEP</span>
          <h2>Have a Web3 problem that needs to become a product?</h2>
          <p>
            Tell us what you are trying to build, where you are stuck, and what
            a working first version needs to do.
          </p>
          <ButtonLink href="/start">Start a conversation</ButtonLink>
        </div>
      </section>
    </PageFrame>
  );
}

function ProblemCard({ title, copy, href, label }: { title: string; copy: string; href: string; label: string }) {
  return (
    <Link href={href} className="problem-card">
      <span className="eyebrow">PATH</span>
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
              <span className="personal-label">Founder-built personal project. Not client work.</span>
              <h1>{project.name}</h1>
              <p className="hero-copy">{project.description}</p>
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
              <h3>Technology stack</h3>
              <p>Built with: {project.stack.join(", ")}.</p>
              <h3>Known limitations</h3>
              <ul>{project.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
              <h3>What this project demonstrates</h3>
              <ul>{project.lessons.map((item) => <li key={item}>{item}</li>)}</ul>
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
        Most early Web3 products fail because they are too large, not because the idea is wrong.
        A founder with a genuine problem builds a product that tries to solve every edge case,
        targets every user, and ships every feature before anyone has validated the core. The result
        is a product nobody can explain, a build that takes six months longer than expected, and a
        team that ran out of runway before they learned anything useful.
      </p>
      <h2>Start with one user in one situation</h2>
      <p>
        The most productive question when scoping a Web3 MVP is not "what should the product do?"
        It is "who is struggling with what, right now?" Pick one user. One situation. One moment
        where they need to take a specific action and currently cannot, or can only do it badly.
        Everything else goes on a list labelled "later."
      </p>
      <p>
        This is harder than it sounds. Founders are close to their ideas and naturally want to show
        their full vision. The job of scoping is to resist that instinct. The first version of the
        product is a learning device, not a complete solution. It needs to be small enough to ship
        quickly and clear enough that a user can tell you whether it solved the right problem.
      </p>
      <h2>The four things an MVP actually needs</h2>
      <p>
        A useful first version needs exactly four things: a user who has the problem you think they
        have, a workflow that solves it (even if imperfectly), a way to observe whether it worked,
        and an honest record of what is not included. Everything else is scope you added because it
        felt necessary, not because evidence said it was.
      </p>
      <p>
        In Web3 specifically, this means being ruthless about wallet integration complexity, chain
        selection, token mechanics, and on-chain versus off-chain decisions. Each of these can double
        build time without adding product value. The question is not "should we support this?" but
        "does this make the core problem easier to solve for the user we are targeting right now?"
      </p>
      <h2>Where AI and Web3 genuinely belong in the MVP</h2>
      <p>
        Before adding AI or blockchain features, ask one question: does this make the product
        meaningfully better for the target user, or does it make the team feel like the product is
        more sophisticated? AI is genuinely useful when it reduces friction in the user's workflow,
        not when it adds a chatbot to a product that would work better as a simple form. Web3 is
        genuinely useful when the decentralised or on-chain nature of the data matters to the user,
        not when it is added to signal credibility.
      </p>
      <p>
        A well-scoped Web3 MVP is one you can explain in two sentences, build in weeks not months,
        and test with real users before you run out of money. That is the kind of product
        The Web3 Wizard is built to help you define and ship.
      </p>
    </>
  ),
  "why-a-web3-prototype-can-fail": (
    <>
      <p>
        A prototype that works in a demo can fail completely when real users touch it. This is not
        a Web3-specific problem, but Web3 makes it worse. The gap between "this works on my machine"
        and "this works for someone who has never seen this product before" is where most early
        Web3 products quietly break down.
      </p>
      <h2>The three gaps that kill Web3 prototypes</h2>
      <p>
        The first gap is the explanation gap. Web3 products often assume a level of user knowledge
        that does not exist. Wallet connection flows, transaction confirmations, gas fees, network
        switching, and token approvals are all routine to a developer and opaque to a new user.
        A prototype that works smoothly for its creator often creates a wall of unfamiliar decisions
        for the first real user who touches it.
      </p>
      <p>
        The second gap is the error-state gap. Prototypes are built for the happy path. Real usage
        is not. When a wallet connection fails, when a transaction reverts, when a user takes an
        unexpected action. These moments determine whether the product is trustworthy. A prototype
        with no error states is a product that communicates failure with silence or with
        developer-facing error messages. Neither builds trust.
      </p>
      <p>
        The third gap is the value gap. A prototype often shows a feature working. It does not
        always communicate why the feature matters to the person using it. Users do not interact with
        products to see features. They interact with products to achieve something. If the product
        makes that something unclear, the feature does not matter.
      </p>
      <h2>What to fix before you put it in front of real users</h2>
      <p>
        Walk through the product as a first-time user who does not understand Web3 conventions.
        At every step, ask: does this screen tell the user what to do next? Does it explain what
        just happened? Does it handle the most likely failure gracefully? If the answer to any of
        those questions is no, that is a higher priority than any new feature.
      </p>
      <p>
        The most valuable thing you can do with a Web3 prototype is watch a real person try to use
        it without your help. You will learn more in one hour of observation than in a week of
        developer review. That is the kind of clarity The Web3 Wizard helps founders build before
        they invest in a larger production build.
      </p>
    </>
  ),
  "use-ai-without-blindly-trusting-it": (
    <>
      <p>
        AI-native development is real and it is genuinely faster. A product that would have taken
        three months to build can now be shipped in weeks. The risk is not that AI makes development
        too slow. The risk is that it makes it too fast to be careful.
      </p>
      <h2>What AI does well and where it fails silently</h2>
      <p>
        AI coding tools are excellent at generating plausible implementations quickly. They are
        unreliable when it comes to security-sensitive logic, complex state management, domain-specific
        edge cases, and anything that requires genuine understanding of the product's purpose rather
        than pattern-matching on syntax. The danger is not that AI produces obviously wrong code.
        The danger is that it produces subtly wrong code that looks correct, passes basic tests, and
        only fails in production under real usage.
      </p>
      <p>
        In Web3 specifically, this matters more than in most domains. A subtly wrong implementation
        of a wallet signing flow, a token approval, or an on-chain transaction can have real financial
        consequences. AI does not know your product's threat model. It does not know which user actions
        are irreversible. It does not know which edge cases your users are most likely to hit.
        You do. Or you need to.
      </p>
      <h2>The discipline of AI-native development</h2>
      <p>
        Productive AI-native development is not "let AI write the code and ship it." It is a discipline
        with four steps. First, direct: give the AI clear context about the goal, the user, and the
        constraints. Second, challenge: read every generated output critically, especially the parts
        that look obvious. Third, test: write tests for the behaviour that matters, not just the happy
        path. Fourth, document: keep a record of what you verified, what you deferred, and what you
        know is incomplete.
      </p>
      <p>
        This is how The Web3 Wizard builds products. AI accelerates the work. Human judgment directs
        it. The result is a product that is fast to build and honest about what it does and does not
        guarantee. That is the only kind of product worth shipping.
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
  const initialType = new URLSearchParams(location.split("?")[1] || "").get("type") || "not-sure";
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
      setErrors({ form: "Something went wrong while sending. Please try again or email theweb3wizard00@gmail.com." });
    }
  };
  return (
    <PageFrame>
      <PageHero
        eyebrow="START A CONVERSATION"
        title="Start a conversation. Let's turn the problem into a product."
        description="You do not need a perfect brief. Tell us what you are trying to build, the problem you are solving, and what a useful first version needs to do."
      />
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
              <a className="inline-link" href="mailto:theweb3wizard00@gmail.com">
                theweb3wizard00@gmail.com <ArrowUpRight size={14} />
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
                    <option value="product-discovery">Product Discovery Sprint</option>
                    <option value="web3-mvp-development">AI-Native Web3 Product Build</option>
                    <option value="ai-agent-solana-engineering">AI Agent & Solana Engineering</option>
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
