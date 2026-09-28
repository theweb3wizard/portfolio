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
// /start is intentionally excluded — it carries noindex and does not need SSG.
// /privacy and /terms are included so they get accurate metadata if crawled.
export const SSG_ROUTES = [
  "/",
  "/services",
  "/services/product-discovery",
  "/services/web3-mvp-development",
  "/services/ai-agent-solana-engineering",
  "/work",
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
  "/insights/scope-a-web3-product-before-spending-money",
  "/insights/why-a-web3-prototype-can-fail",
  "/insights/use-ai-without-blindly-trusting-it",
  "/privacy",
  "/terms",
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
    h1: "Real projects. Real evidence. Clearly labeled.",
    intro: "A portfolio of founder-built Web3 projects by Khalid Murtala: AI agents, Solana tools, EVM wallet intelligence, and Web3 automation. These are personal projects, not client case studies, clearly labeled with status, stack, decisions, limitations, and lessons. Each demonstrates a real capability with live demos and repositories where available.",
    extra: "Projects include Valor (AI agent for Telegram), WalletLens (EVM wallet intelligence), Write3 (Web3 content tool), AgentHub (secure AI access layer), OrderFlow (Injective trading journal), SolPulse (Solana monitoring), and Community Signal (community action experiment). All projects show what was built, why, and what was learned.",
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
  "/work/valor": {
    h1: "Valor — AI Agent for Telegram",
    intro: "Valor is a founder-built AI agent that operates inside Telegram. It handles conversations, answers questions, and executes tasks autonomously within Web3 community contexts. Built around conversational context rather than keyword triggers, with clear capability boundaries and simple Telegram webhook deployment.",
    extra: "Stack: TypeScript, Node.js, Telegram Bot API, OpenAI API, Vercel. Limitations: founder-built personal project, bounded by system prompts, no financial advice. Live demo at valor-tgbot.vercel.app and GitHub at github.com/theweb3wizard/Valor. Related service: AI Agent & Solana Engineering.",
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
    intro: "WalletLens turns EVM on-chain data into something a non-technical founder can interrogate. Natural language queries replace raw blockchain explorers. Supports Ethereum, Polygon, BNB, Arbitrum, and Base from a single query, with explicit data freshness and verification limits.",
    extra: "Stack: TypeScript, React, Next.js, OpenAI API, Etherscan API, Vercel. Founder-built personal project with live demo at walletlens-hq.vercel.app and GitHub at github.com/theweb3wizard/walletlens. Demonstrates interface design for data tools and multi-chain handling. Related service: Web3 MVP Development.",
    links: [
      { href: "/work", label: "All Work" },
      { href: "/work/write3", label: "Next: Write3" },
      { href: "/services/web3-mvp-development", label: "Web3 MVP Development" },
      { href: "https://walletlens-hq.vercel.app", label: "Live Demo" },
      { href: "https://github.com/theweb3wizard/walletlens", label: "GitHub Repo" },
    ],
  },
  "/work/write3": {
    h1: "Write3 — AI Web3 Content Generator",
    intro: "Write3 is an AI-native content tool for Web3 builders and communities. It generates platform-appropriate content for X, Discord, Telegram, Farcaster, and blogs. Users provide project context and receive ready-to-use drafts, with separate output formats per platform and Web3-native prompts.",
    extra: "Stack: TypeScript, React, Next.js, OpenAI API, Vercel. Live demo at write3-ai.vercel.app and GitHub at github.com/theweb3wizard/Write3. Demonstrates platform-specific formatting and AI content workflows. Related service: Web3 MVP Development.",
    links: [
      { href: "/work", label: "All Work" },
      { href: "/work/agenthub", label: "Next: AgentHub" },
      { href: "/services/web3-mvp-development", label: "Web3 MVP Development" },
      { href: "https://write3-ai.vercel.app", label: "Live Demo" },
    ],
  },
  "/work/agenthub": {
    h1: "AgentHub — Secure AI Agent Access Layer",
    intro: "AgentHub solves secure access for AI coding assistants: policy-controlled access to databases, APIs, and infrastructure. It enforces least-privilege, maintains audit trails, and routes approvals to humans for high-risk operations. Designed for AI-native development where assistants need production access without losing control.",
    extra: "Stack: TypeScript, Node.js, PostgreSQL, Vercel. Founder-built personal project with live demo at agenthub-lyart.vercel.app and GitHub at github.com/theweb3wizard/AgentHub. Related service: AI Agent & Solana Engineering.",
    links: [
      { href: "/work", label: "All Work" },
      { href: "/work/orderflow", label: "Next: OrderFlow" },
      { href: "/services/ai-agent-solana-engineering", label: "AI Agent & Solana Engineering" },
      { href: "https://agenthub-lyart.vercel.app", label: "Live Demo" },
    ],
  },
  "/work/orderflow": {
    h1: "OrderFlow — AI Trading Journal on Injective",
    intro: "OrderFlow is an AI-powered trading journal for Injective Protocol. It pulls your on-chain trading history and turns it into specific, evidence-based feedback: where you are leaking money, what is working, and what to fix next. Every insight is anchored to real on-chain evidence, not generic advice.",
    extra: "Stack: Next.js, Gemini AI, Injective SDK, TypeScript. Founder-built personal project focused on one chain for accuracy. Live demo at orderflow-hq.vercel.app and GitHub at github.com/theweb3wizard/orderflow. Reviews past activity, no signals or financial advice. Related service: Web3 MVP Development.",
    links: [
      { href: "/work", label: "All Work" },
      { href: "/work/solpulse", label: "Next: SolPulse" },
      { href: "/services/web3-mvp-development", label: "Web3 MVP Development" },
      { href: "https://orderflow-hq.vercel.app", label: "Live Demo" },
    ],
  },
  "/work/solpulse": {
    h1: "SolPulse — Solana Wallet Monitoring",
    intro: "SolPulse turns raw Solana on-chain activity into a calmer, readable monitoring workflow. It filters wallet movements and delivers meaningful signals as plain-English Telegram alerts, prioritising a small number of meaningful events over a wall of noise.",
    extra: "Stack: Solana, TypeScript, Node.js, Telegram Bot API. Personal experiment, not a production service, with limited coverage. Related service: AI Agent & Solana Engineering. Demonstrates focused alert design and Solana data handling.",
    links: [
      { href: "/work", label: "All Work" },
      { href: "/work/community-signal", label: "Next: Community Signal" },
      { href: "/services/ai-agent-solana-engineering", label: "AI Agent & Solana Engineering" },
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
    extra: "Selected founder-built projects include Valor (Telegram AI agent), WalletLens (EVM wallet intelligence), and AgentHub (secure agent access layer), each with live demos and public repositories. Contact via the start page, email, GitHub, X, LinkedIn, or Telegram. Print or save the profile page as PDF for applications.",
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
    extra: "Reference implementations include Valor (autonomous Telegram agent), AgentHub (policy-controlled agent access layer), and WalletLens (EVM wallet intelligence) — all founder-built and clearly labeled. Agent work ships as an Integration Sprint from $2,500. Starting prices are indicative and confirmed after a fit conversation.",
    links: [
      { href: "/work/valor", label: "See Valor" },
      { href: "/work/agenthub", label: "See AgentHub" },
      { href: "/services/ai-agent-solana-engineering", label: "AI Agent & Solana Engineering" },
      { href: "/start?type=integration-sprint", label: "Discuss an Integration" },
    ],
  },
  "/insights": {
    h1: "Practical thinking for Web3 founders building real products.",
    intro: "Articles on Web3 product decisions, AI-native development, Solana applications, MVP scoping, and building dApps that real users can navigate. Practical, founder-written notes on scoping, shipping, and building products people understand.",
    extra: "Three insights: How to scope a Web3 MVP before spending money, Why a Web3 prototype fails with real users, and How to use AI without blindly trusting it. Each links to related services and founder-built projects. More insights are planned as the studio ships more products.",
    links: [
      { href: "/insights/scope-a-web3-product-before-spending-money", label: "How to Scope a Web3 MVP" },
      { href: "/insights/why-a-web3-prototype-can-fail", label: "Why Prototypes Fail" },
      { href: "/insights/use-ai-without-blindly-trusting-it", label: "Using AI Without Blind Trust" },
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
};

function injectStaticBody(html: string, route: string): string {
  const data = STATIC_BODY[route];
  if (!data) return html;
  const relatedLinks = data.links.map((l) => `<a href="${l.href}">${l.label}</a>`).join(" | ");
  const siteNav = `<header><nav aria-label="Primary"><a href="/">Home</a> | <a href="/services">Services</a> | <a href="/work">Work</a> | <a href="/insights">Insights</a> | <a href="/about">About</a> | <a href="/start">Contact</a></nav></header>`;
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
  if (html.includes('<div id="root"></div>')) {
    return html.replace('<div id="root"></div>', `<div id="root">${bodyContent}</div>`);
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
