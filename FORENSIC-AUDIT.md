# Forensic Website Intelligence Audit
## The Web3 Wizard / Web3 Wizard Labs — Baseline Snapshot

| | |
|---|---|
| **Audit date** | 2026-08-18 |
| **Repository** | `github.com/theweb3wizard/portfolio` |
| **Live host** | `https://www.theweb3wizard.xyz` |
| **Method** | Read-only inspection of codebase + live HTTP responses + public profiles |
| **Scope note** | Nothing was modified. This is a current-state snapshot, not a recommendation set. Confirmed facts are kept separate from items that could not be determined (see §15). |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Technology & Architecture](#2-technology--architecture)
3. [Complete Page Inventory](#3-complete-page-inventory)
4. [Current Brand & Messaging Inventory](#4-current-brand--messaging-inventory)
5. [Current SEO Implementation](#5-current-seo-implementation)
6. [Technical SEO Implementation](#6-technical-seo-implementation)
7. [Structured Data & Entity Inventory](#7-structured-data--entity-inventory)
8. [GEO / AI Search Readiness Baseline](#8-geo--ai-search-readiness-baseline)
9. [Existing Content, Projects & Proof Assets](#9-existing-content-projects--proof-assets)
10. [Internal Linking & Information Architecture](#10-internal-linking--information-architecture)
11. [Conversion & Customer Journey](#11-conversion--customer-journey)
12. [Public Web & Search Findings](#12-public-web--search-findings)
13. [Exact File & Component Change Map](#13-exact-file--component-change-map)
14. [Confirmed Problems / Risks](#14-confirmed-problems--risks)
15. [Things That Cannot Yet Be Determined](#15-things-that-cannot-yet-be-determined)
16. [Raw Findings / Important Extracted Content](#16-raw-findings--important-extracted-content)

---

## 1. Executive Summary

Web3 Wizard Labs is a **founder-led Web3 product studio** presented as a solo operation run by "Khalid – The Web3 Wizard." The codebase is a small, clean, modern **Vite + React 19 single-page application (SPA)** with an Express/tRPC backend used only for a contact form (routed to Telegram). Content is entirely hardcoded in TypeScript (no CMS, no database). The site is deliberately, consistently positioned around *honesty and narrow scope*: it repeatedly states it has no clients yet, labels all portfolio work as personal experiments, and disclaims that it does not do smart-contract audits.

**The single most consequential finding is an architecture/deployment mismatch that silently disables nearly all SEO and structured-data work.** The repository contains a well-built server-side meta injector (`server/meta.ts`, 415 lines) that generates per-route titles, descriptions, canonicals, Open Graph/Twitter tags, and JSON-LD (Person, WebSite, Service, Article, FAQ, Breadcrumb schema). **None of it reaches production.** The live Vercel deployment serves a static `index.html` for every route via a catch-all rewrite, so:

- Every page returns the **identical** title and description (the static homepage values).
- The live HTML contains **zero JSON-LD**, **zero Open Graph tags**, and **zero canonical tags** (confirmed by raw fetch — `grep -c` returned 0 for both `ld+json` and `og:`).
- The page body is an empty `<div id="root"></div>` — all content is client-rendered.

**Second major finding: an entity/proof conflict.** The website's portfolio shows four projects (SolPulse, TxPreview, SearchLens, Community Signal) that **do not exist as public GitHub repositories**. Meanwhile, the founder's actual GitHub account (`theweb3wizard`, 22 public repos) contains substantial, unrelated, *shipped* work (Write3, AgentHub, FlowForge, WalletLens, Grant-OS, Valor, etc.) — none of which is referenced on the site. One of those real repos (FlowForge) is explicitly about **smart-contract deployment**, which contradicts the site's "we do not do smart contracts" positioning.

**Other confirmed issues:** apex domain redirects to `www` but the entire codebase hardcodes non-`www` URLs (canonical host mismatch); two broken favicon references (`/favicon-32.png`, `/favicon-16.png` don't exist and resolve to the HTML shell); soft-404s (unknown routes return HTTP 200); `/start` is `Disallow`ed in robots.txt yet listed in the sitemap; sitemap `lastmod` is `2025-07-14` on every URL (stale/inaccurate — the current content was committed 2026-08-13); the privacy policy still describes "Resend" email delivery although production switched to Telegram; a stale, orphaned second 404 component styled for a light theme; and the server-side meta describes SolPulse/TxPreview as a "concept"/"interface concept" while the site data marks them "deployed."

**What is genuinely strong:** messaging discipline and consistency are high; the honesty/anti-hype framing is coherent across every page; the code is clean and typed; robots.txt explicitly welcomes AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended). The problem is not the writing — it is that the machine-readable layer and the proof layer are, respectively, undeployed and disconnected.

---

## 2. Technology & Architecture

### 2.1 Framework, language, rendering

| Item | Finding | Source |
|---|---|---|
| Framework | **Vite 7** (`^7.1.7`) building a **React 19** (`^19.2.1`) app | `package.json`, `vite.config.ts` |
| Language | **TypeScript 5.9** (`strict: true`) | `tsconfig.json` |
| UI routing | **wouter 3.3.5** (client-side router) | `client/src/App.tsx` |
| Rendering | **CSR (client-side rendered SPA)** in production. Content lives in a client bundle; server sends empty `<div id="root">`. | live fetch + `client/index.html` |
| Attempted SSR-lite | A server-side meta injector exists (`server/meta.ts` + `server/vite.ts`) that rewrites `<head>` before sending HTML. **Runs only under the Express server (`npm run dev`/`npm start`), not on Vercel.** | `server/vite.ts`, `vercel.json` |
| SSG / ISR | **None.** No pre-rendering, no static per-route HTML generation. | build config |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) + a large hand-written CSS file (`client/src/index.css`, 185 lines). shadcn/ui "new-york" style configured. | `components.json`, `index.css` |
| State / data | TanStack Query + tRPC v11 client; superjson transformer | `client/src/main.tsx`, `client/src/lib/trpc.ts` |
| Animations | framer-motion (installed; not visibly used in page code) | `package.json` |
| Analytics | **Vercel Analytics** (`@vercel/analytics/react`), mounted in `App.tsx` | `client/src/App.tsx:1,91` |

### 2.2 Backend

- **Express 4** server (`server/index.ts`) mounting tRPC at `/api/trpc`. In dev it attaches Vite middleware; in prod (`serveStatic`) it serves `dist/public`.
- **Vercel serverless function** at `api/trpc.ts` — a separate, minimal Express app that mounts the same tRPC router. This is what actually handles the contact form on Vercel.
- **tRPC router** (`server/routers.ts`): a single procedure `inquiries.create`. Validates with Zod, honeypot-checks the hidden `website` field, then sends a **Telegram** message via the Bot API. **No database. Nothing is persisted.**
- Environment: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (`server/_core/env.ts`, `.env.example`).

### 2.3 Hosting / deployment

- **Vercel** (confirmed by live `Server: Vercel` header, `X-Vercel-Id`, `X-Vercel-Cache: HIT`).
- `vercel.json`:
  - `buildCommand: "pnpm build"` → `outputDirectory: "dist/public"`.
  - **Rewrites:** `/api/trpc/(.*)` → `/api/trpc` (serverless fn); **`/(.*)` → `/index.html`** (this is why every route serves the same static shell and the Express meta injector never runs).
  - **Redirects:** `/og-image.png` → `/og-image.svg` (`permanent: false` → temporary/302).
  - **Security headers** applied to all paths: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin` (all three confirmed live). Plus explicit `Content-Type` headers for `/sitemap.xml` and `/og-image.svg`.
- **Host behavior (confirmed live):** apex `theweb3wizard.xyz` issues **HTTP 308 → `https://www.theweb3wizard.xyz`**. The canonical production host is therefore **`www`**, but all in-code URLs are non-`www` (see §6).

### 2.4 Build configuration

- `vite.config.ts`: root = `client/`, publicDir = `client/public`, output = `dist/public`, aliases `@`→`client/src`, `@shared`→`shared`.
- `package.json` scripts: `dev` (tsx watch server), `build` (`vite build` — client only; the Express server is not bundled for Vercel), `start`, `check` (`tsc --noEmit`), `format`.
- Tests: **vitest** configured (`vitest.config.ts`), Node environment, globs `server/**/*.test.ts` + `client/**/*.test.ts`. Note the vitest alias `@assets`→`attached_assets` points to a **directory that does not exist** in the repo.

### 2.5 Application structure

```
api/trpc.ts                 → Vercel serverless tRPC entry
server/                     → Express + tRPC + SSR meta injector (dev/self-host only)
  index.ts, vite.ts, meta.ts, routers.ts, _core/{env,trpc}.ts
shared/                     → const.ts, types.ts (near-empty), _core/errors.ts
client/
  index.html               → static shell (title/description hardcoded)
  public/                  → robots.txt, sitemap.xml, favicon.svg, og-image.svg
  src/
    App.tsx                → Router + client-side MetaManager
    main.tsx               → React/tRPC/Query bootstrap
    site.ts                → ALL content data (projects, insights, services, nav)
    pages/SitePages.tsx    → ALL page components (home, services, work, about, insights, start, legal, 404)
    pages/NotFound.tsx     → SECOND, orphaned 404 (light theme)
    components/SiteShell.tsx → header, footer, hero, cards, FAQ, buttons
    components/ui/*        → ~50 shadcn/ui primitives (mostly unused by the site)
    contexts/ThemeContext.tsx
    index.css              → all site styling
```

### 2.6 Routing structure (`client/src/App.tsx`)

Client-side `<Switch>` (wouter). All routes render into the SPA shell:

| Route | Component | Type |
|---|---|---|
| `/` | `Home` | static |
| `/services` | `ServicesPage` | static |
| `/services/product-builds` | `ServiceDetailPage type="productBuilds"` | static (hardcoded route, not param) |
| `/services/prototype-refinement` | `ServiceDetailPage type="prototypeRefinement"` | static |
| `/services/community-tools` | `ServiceDetailPage type="communityTools"` | static |
| `/services/application-review` | `ServiceDetailPage type="applicationReview"` | static |
| `/work` | `WorkPage` | static |
| `/work/:slug` | `ProjectDetailPage` | **dynamic** (slug lookup in `projects[]`) |
| `/about` | `AboutPage` | static |
| `/insights` | `InsightsPage` | static |
| `/insights/:slug` | `InsightDetailPage` | **dynamic** (slug lookup in `insights[]`) |
| `/start` | `StartPage` | static (contact form) |
| `/privacy` | `LegalPage kind="privacy"` | static |
| `/terms` | `LegalPage kind="terms"` | static |
| `/404` | `NotFound` (the orphaned light-theme one) | static |
| `*` (fallback) | `NotFoundPage` | catch-all |

- **API routes:** exactly one — `POST /api/trpc/inquiries.create`.
- **Dynamic routes:** `/work/:slug`, `/insights/:slug` (data-driven, not file-based).

### 2.7 Where the SEO/meta machinery lives

| Concern | File(s) | In served production HTML? |
|---|---|---|
| Global static metadata | `client/index.html` (lines 11–12) | ✅ — this is what production actually serves on every route |
| Client-side per-route meta | `client/src/App.tsx` → `MetaManager` (lines 36–88) | ⚠ only after JS hydration |
| Server-side per-route meta | `server/meta.ts` (`ROUTE_META`, `injectMetaIntoHtml`) | ❌ dead code on Vercel |
| robots | `client/public/robots.txt` | ✅ static file |
| sitemap | `client/public/sitemap.xml` | ✅ static, hand-maintained |
| Schema / JSON-LD | `server/meta.ts` (full set) + `client/src/App.tsx` (Person/WebSite/Service subset) | ❌ / ⚠ post-JS only |
| Canonical | `server/meta.ts` (non-www const) + `App.tsx` (`window.location.origin`) | ❌ none in served HTML |
| OG / social | `server/meta.ts` + `App.tsx` + `client/public/og-image.svg` | ❌ / ⚠ post-JS only |

---

## 3. Complete Page Inventory

> **Indexability caveat applies to every row:** because production serves the static shell, the *actual* served title/description for every URL is the homepage's, and page content is only visible after JS executes. The "intended" per-route values below come from `server/meta.ts` / `MetaManager` but are **not present in the served HTML**.

### 3.1 Homepage — `/`

- **Source:** `client/src/pages/SitePages.tsx` → `Home()`
- **Intended title:** `Web3 Wizard Labs | Clearer Web3 products, built by one founder.`
- **Intended description:** "Founder-led Web3 product studio for focused products, prototypes, community tools, and application-layer clarity."
- **H1:** "Clearer Web3 products, built by one founder." (eyebrow: `FOUNDER-LED WEB3 PRODUCT STUDIO`)
- **H2s (in order):** "What are you trying to do?" · "Choose a useful first engagement." · "The kind of work I take on" · "Selected founder-built work" · "The next proof will be earned, not implied." · "A clearer way to build" · "What I will not pretend to be" · "Small by design" · "Questions worth answering" · (CTA band) "Have a Web3 product in your head that needs to become clearer?"
- **Primary CTA:** "Start with your idea" → `/start`. **Secondary CTA:** "See the work" → `/work`.
- **Internal links out:** `/start` (×4+), `/work` (×2), the four `/services/*` detail pages, `/terms`, and featured project detail pages.
- **Purpose:** clear (primary landing + router to services). **Status:** complete, content-rich.

### 3.2 Services index — `/services`

- **Source:** `SitePages.tsx` → `ServicesPage()`
- **Intended title:** `Web3 product services | Web3 Wizard Labs`
- **H1:** "Choose the problem you need solved." (eyebrow `SERVICES`)
- **H2:** "Start with the situation, not the technology."
- **H3s:** the four service labels. **CTAs:** four cards → service detail pages.
- **Purpose:** clear. **Status:** thin-ish but intentional (a hub).

### 3.3–3.6 Service detail pages (×4) — `/services/{slug}`

- **Source:** `SitePages.tsx` → `ServiceDetailPage` + data map `serviceDetail()` + `services` object in `site.ts`
- Shared structure: H1 = service title; H2 "Is this the right engagement?"; H3s "Good fit when" / "What you receive" / "What is outside scope" / "Process" / "Limitations"; sticky aside repeats title + CTA.

| Slug | H1 (title) | Meta description (intended) | CTA text |
|---|---|---|---|
| `product-builds` | "Turn the idea into the smallest useful product." | "For founders and small teams who need a focused Web3 application, dashboard, internal tool, or prototype built without unnecessary agency layers." | "Tell me what you want to build" |
| `prototype-refinement` | "Your prototype should help people understand the product, not make them work for it." | "I help refine rough, confusing, incomplete, or AI-assisted prototypes into clearer product experiences with a more reliable main journey." | "Review my prototype" |
| `community-tools` | "Turn community attention into a useful product experience." | "Build focused Telegram Mini Apps, Discord tools, alerts, wallet utilities, and community workflows that help people take a clear next action." | "Discuss a community tool" |
| `application-review` | "A focused review before you trust your application to real users." | "A narrow application-layer review for fast-built and AI-assisted Web3 applications. Focused on users, access, secrets, configuration, and trust boundaries." | "Request an application review" |

- `application-review` additionally renders a `.scope-alert`: *"This is not a smart-contract audit, penetration test, formal certification, or guarantee that no vulnerabilities exist."*
- CTAs deep-link to `/start?type={query}`. **Purpose:** clear. **Status:** complete, well-differentiated.

### 3.7 Work index — `/work`

- **Source:** `SitePages.tsx` → `WorkPage()`
- **Intended title:** `Founder-built Web3 work | Web3 Wizard Labs`
- **H1:** "Products and experiments, clearly labeled." (eyebrow `FOUNDER-BUILT WORK`)
- **Description copy:** "A selection of Web3 tools and product experiments built by The Web3 Wizard. These are personal projects, not client case studies."
- **Feature:** client-side filter buttons — `all / deployed / building / concept`.
- **Cards:** 4 projects (see §7/§9). **Status:** complete but shows only 4 items; no CTA band.

### 3.8 Project detail (×4) — `/work/:slug`

- **Source:** `SitePages.tsx` → `ProjectDetailPage()`; data in `site.ts` `projects[]`
- **H1:** project name. Label above: "Personal project built and deployed by The Web3 Wizard".
- **H2:** "What it does". **H3s:** "Why it was built" / "Important decisions" / "What was implemented" / "Known limitations" / "What was learned".
- **CTA:** "Discuss something similar" → `/start?project={slug}`; inline link to related service.
- Slugs: `solpulse`, `txpreview`, `searchlens`, `community-signal`.
- **Status:** complete and detailed *as narrative*, but **no screenshots, no live links, no repos, no metrics** — the "What was implemented" section is a generic templated sentence ("The stack includes {stack.join}").

### 3.9 About — `/about`

- **Source:** `SitePages.tsx` → `AboutPage()`
- **Intended title:** `About Web3 Wizard Labs | The Web3 Wizard`
- **H1:** "A founder-led studio for making Web3 products clearer." (eyebrow `ABOUT THE STUDIO`)
- **H2:** "Direct ownership from architecture to handover." **H3s:** aside "Founder, builder, and product guide." / "AI-assisted, not AI-unaccountable" / "An honest starting point" / "What I do not claim". CTA band H2: "Have a situation worth making clearer?"
- **Notable copy:** *"Web3 Wizard Labs is currently opening its first client engagements. There are no client testimonials or client case studies to present yet."*
- **Absent:** the founder's name "Khalid" does **not** appear in the About body prose (only in schema + footer + FAQ/Start). No photo, no location, no bio timeline, no external profile links in-body. **Status:** complete but low on concrete person/entity detail.

### 3.10 Insights index — `/insights`

- **Source:** `SitePages.tsx` → `InsightsPage()`; data `site.ts` `insights[]`
- **H1:** "Clear thinking for people building Web3 products." (eyebrow `INSIGHTS`)
- **3 article cards** (titles in §9). **Status:** complete hub.

### 3.11 Insight detail (×3) — `/insights/:slug`

- **Source:** `SitePages.tsx` → `InsightDetailPage()`
- **H1:** article title. Meta line: "By The Web3 Wizard | Web3 Wizard Labs".
- **⚠ Confirmed duplicate/thin content:** the article body is **identical, hardcoded boilerplate for all three insights**. Only the first paragraph (`{item.description}`) differs. The three H2s are the same on every article: "Start with the decision, not the feature list." / "Make uncertainty visible." / "Keep the first version narrow." There is **no unique article content** — each "post" is ~4 short paragraphs of the same text.
- **No visible dates**; Article schema (with author/publisher, but **no `datePublished`**) exists only in the undeployed `server/meta.ts`. **Status:** placeholder-grade content presented as a blog.

### 3.12 Start / contact — `/start`

- **Source:** `SitePages.tsx` → `StartPage()` + `Field()`; state helpers `client/src/inquiryFormState.ts`
- **H1:** "Start with the situation, not a perfect brief." (eyebrow `START A CONVERSATION`)
- **H2:** "A useful first message is enough."
- **Form fields:** name\*, email\*, company, projectUrl, description\* (min 30 chars), situation (select), stage (select), timeline (select), budget (select), success (textarea), consent\* (checkbox), hidden `website` honeypot.
- **Submit:** tRPC `inquiries.create` → Telegram. Success state replaces form.
- **⚠ Indexability conflict:** `robots.txt` `Disallow: /start`, yet `/start` **is listed in sitemap.xml**.
- **Status:** complete and functional (form logic is unit-tested).

### 3.13 Privacy — `/privacy` & Terms — `/terms`

- **Source:** `SitePages.tsx` → `LegalPage()`
- **Privacy H1:** "A clear explanation of how inquiries are handled." **Terms H1:** "Clear boundaries for the work."
- **⚠ Confirmed content drift:** the privacy copy states *"Inquiry submissions are sent through **Resend**… Resend processes the email delivery…"* — but production uses **Telegram** (`server/routers.ts`). The privacy policy is factually inaccurate about the current pipeline.
- Both pages self-label: *"These pages are implementation placeholders and should receive appropriate legal review before public deployment."*
- **Not in nav, not in sitemap, not in `ROUTE_META`** (footer-linked only). **Status:** placeholder, self-admitted.

### 3.14 404 pages (two of them)

- **Catch-all** (`NotFoundPage`, in `SitePages.tsx`): dark-theme, on-brand. H1 "That page is not here." Used for all unmatched routes.
- **Orphaned** (`NotFound`, `client/src/pages/NotFound.tsx`): **light theme** (`slate-50`, `blue-600` button, `AlertCircle` icon), "Page Not Found." Wired only to the literal `/404` route. Visually inconsistent with the rest of the site, duplicated purpose.
- **⚠ Soft-404 (confirmed):** unknown routes return **HTTP 200**, not 404 (Vercel rewrite serves `index.html`). Search engines see a 200 for nonexistent URLs.

---

## 4. Current Brand & Messaging Inventory

### 4.1 How it describes itself

- "Founder-led Web3 product studio" (meta, homepage eyebrow `FOUNDER-LED WEB3 PRODUCT STUDIO`)
- "A founder-led studio for making Web3 products clearer" (About H1)
- "Clearer Web3 products, built by one founder." (tagline: homepage H1, footer, og-image, static `<title>`)
- "a founder-led studio … built around direct communication, focused scope, and honest explanations" (About)
- "Small by design … a limited number of projects at a time" (homepage)

### 4.2 Taglines / value props (verbatim)

- **Primary tagline:** "Clearer Web3 products, built by one founder."
- **Elevator pitch:** "I help early-stage Web3 teams turn ambitious ideas, rough prototypes, and community needs into focused products people can actually use."
- **Method line (recurs):** "AI helps me move faster. It does not replace judgment." / "AI-assisted, not AI-unaccountable."
- **Anti-hype line:** "What I will not pretend to be" / "Web3 has enough inflated claims already."
- **Proof line:** "The next proof will be earned, not implied."

### 4.3 Services claimed

Four named services (`site.ts`): **Product builds**, **Prototype refinement**, **Community tools**, **Application review** (application-layer, explicitly *not* a smart-contract audit). Three "starter engagements" on the homepage: **Product Clarity Sprint**, **Application Launch-Readiness Review**, **Build the next useful version**.

### 4.4 Who it serves / audiences

"early-stage Web3 teams," "founders and small teams," "pre-seed or seed teams," teams with "a fast-built or AI-assisted application… approaching real users," communities (Telegram/Discord).

### 4.5 Industries / ecosystems

**Web3** (pervasive), **Solana** (named: homepage capabilities; SolPulse project; `/work/solpulse` meta), **Telegram / Discord** (community tools), general "application layer."

### 4.6 Technical capabilities emphasized

"Focused Solana and Web3 applications," "MVPs and product prototypes," "Dashboards and internal tools," "AI-assisted Web3 products," "Telegram Mini Apps and Discord tools," "Community and distribution experiences," "Wallet/API integration."

### 4.7 Outcomes / promises

Deliberately *modest and hedged*: "smallest useful product," "visible deliverables," "clear handover," "documented limitations." Explicit **non-promises**: no guaranteed adoption, no token/financial outcomes, no security certification, no rankings.

### 4.8 Keyword-mention census (user-facing copy)

| Term | Presence | Framing |
|---|---|---|
| **AI** | Heavy — "AI-assisted building," a full insight, method sections on home + about | AI as an accelerant under human accountability, never autonomous |
| **Web3** | Pervasive across every page | Core identity |
| **Solana** | Homepage capability + SolPulse project/meta | Only 1 of 4 portfolio projects is Solana-specific |
| **dApps** | **Not used** as a literal term | Uses "application," "product," "Web3 application" |
| **AI agents** | **Not marketed** as a service | Contrast: founder's GitHub markets Valor + AgentHub |
| **Audits** | Appears mostly to **disclaim** | "not a smart-contract audit"; "application review" is the closest offering |
| **SaaS** | **Not mentioned** | Though several real GitHub projects are SaaS-shaped |
| **Automation** | Light — "community workflows" | Not a headline service |
| **Development services** | Yes — "focused product builds," "implementation sprint" | Core offering |

### 4.9 Consistency vs. conflict (within the site)

- **Consistent:** solo-founder framing; honesty/anti-hype; "no clients yet"; personal-projects-are-labeled; "not a smart-contract audit"; AI-with-accountability. Messaging discipline is unusually high.
- **Minor internal inconsistencies:**
  - FAQ answer says smart contracts are "not presented as part of this **V1** offer" (`SitePages.tsx`), while the schema/meta version drops "V1" (`server/meta.ts:43`).
  - The homepage FAQ has **6** questions; the FAQ schema (`server/meta.ts`) encodes only **4**.
  - Privacy policy names **Resend**; backend uses **Telegram**.
  - `server/meta.ts` describes SolPulse/TxPreview as a "concept"/"interface concept," but `site.ts` marks both `deployed`.
- **No page positions the business as something fundamentally different** — internally coherent. The divergence is **external** (see §12).

---

## 5. Current SEO Implementation

### 5.1 On-page (intended vs. served)

- **Intended (in `server/meta.ts` / `MetaManager`):** unique title + description per route, canonical, full OG/Twitter set, per-page JSON-LD. Titles follow `{Page} | Web3 Wizard Labs`. Descriptions are specific and non-generic.
- **Served in production (confirmed via raw `curl` as Googlebot):**
  - `/` and `/about` both return `<title>Web3 Wizard Labs — Clearer Web3 products, built by one founder.</title>` and the **same** description. Every route = same title/description.
  - **No canonical tag** in served HTML.
  - **No OG tags** (`grep -c 'og:'` → 0). **No Twitter tags.**
  - **No JSON-LD** in served HTML (`grep -c 'ld+json'` → 0).
  - H1/H2/content **absent from initial HTML** (empty `#root`); appear only after JS.
- **Net effect:** duplicate titles/descriptions across the entire site; missing canonical/OG/schema for any crawler that doesn't execute JS; content dependent on client rendering.

### 5.2 Headings

Each page (once rendered) has a single H1 and a sensible H2/H3 hierarchy (via `SectionHeading`→`<h2>`, cards→`<h3>`). Hierarchy quality is good **in the DOM**; the risk is purely that it's client-rendered.

### 5.3 Images / alt text

The site is almost **imageless** — "visuals" are CSS gradient panels with text, not `<img>` elements, so there is little alt-text surface. `BrandMark` uses `aria-label="Web3 Wizard Labs home"`. The only real assets are `favicon.svg` and `og-image.svg`. No content images, no diagrams, no screenshots → **little to optimize, but also no visual proof assets**.

### 5.4 Internal / external linking

Internal linking is dense via shared header/footer (see §10). External outbound links: only the four social profiles + email in the footer (`rel="noreferrer"`, `target="_blank"`). **No outbound links to the founder's actual GitHub projects, live demos, or any third-party corroboration.**

### 5.5 Metadata quality flags

- **Duplicate titles/descriptions:** confirmed site-wide (production).
- **Missing metadata:** canonical, OG, Twitter, JSON-LD all missing in served HTML.
- **Overly generic fallback:** `DEFAULT_META` = title "Web3 Wizard Labs", desc "Founder-led Web3 product studio." — applies to `/privacy`, `/terms`, `/404` in the (undeployed) server path.
- **Programmatic metadata:** yes, but only in the two undeployed/hydration-only code paths.

---

## 6. Technical SEO Implementation

### 6.1 robots.txt (`client/public/robots.txt`) — confirmed live

```
User-agent: *
Allow: /

# AI crawlers — allow indexing for GEO
User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Googlebot
Allow: /

# Block form submission page from being indexed
User-agent: *
Disallow: /start

Sitemap: https://theweb3wizard.xyz/sitemap.xml
```

- **⚠ Structural issue:** two separate `User-agent: *` groups. Per the standard, a crawler uses the most specific matching group; the split `Allow: /` … `Disallow: /start` across two `*` groups is ambiguous and fragile.
- **⚠ Host mismatch:** `Sitemap:` uses **non-www** while the live canonical host is www.
- **⚠ Conflict:** `/start` is disallowed here but present in the sitemap.

### 6.2 sitemap.xml (`client/public/sitemap.xml`) — confirmed live

- 17 URLs, all **non-www**, all `lastmod = 2025-07-14` (identical, stale — current content committed 2026-08-13 per git log; the date is inaccurate and over a year old relative to today, 2026-08-18).
- Includes `/start` (disallowed in robots). Does **not** include `/privacy` or `/terms`.
- `changefreq`/`priority` present.

### 6.3 Canonicalization & host

- **⚠ Host mismatch (confirmed):** production forces **`www`** (apex → 308 → www), but `server/meta.ts` `SITE_URL = "https://theweb3wizard.xyz"` (non-www), sitemap and robots use non-www, and all schema `url`/`sameAs`/canonical values are non-www. `MetaManager` (client) uses `window.location.origin`, which *would* be www at runtime — so client and server canonicals disagree with each other.
- Since no canonical is emitted in served HTML anyway, there is currently **no canonical signal at all** for non-JS crawlers.

### 6.4 HTTP/HTTPS, trailing slash, redirects (confirmed live)

```
GET https://theweb3wizard.xyz/            → 308 → Location: https://www.theweb3wizard.xyz/
GET https://www.theweb3wizard.xyz/        → 200 (X-Vercel-Cache: HIT)
GET https://theweb3wizard.xyz/about/      → 308 → https://www.theweb3wizard.xyz/about/
GET /this-page-does-not-exist-xyz123      → 200   (soft-404)
GET /favicon-32.png                       → 200 Content-Type: text/html   (broken)
GET /favicon-16.png                       → 200 Content-Type: text/html   (broken)
GET /og-image.png                         → 308 → /og-image.svg
Headers: X-Content-Type-Options: nosniff · X-Frame-Options: DENY · Referrer-Policy: strict-origin-when-cross-origin
```

- **Trailing slash:** `/about/` → 308 (host redirect only; the trailing slash is **preserved**, and both `/about` and `/about/` then serve 200 with identical content → potential duplicate-URL variants, harmless without canonicals to contradict).

### 6.5 404 handling

**⚠ Soft-404 (confirmed):** `/this-page-does-not-exist-xyz123` returns **HTTP 200** with the SPA shell. No real 404 status is ever emitted. The in-app `NotFoundPage` renders client-side but the HTTP status stays 200.

### 6.6 noindex / indexability

No `noindex` tags anywhere. `/start` relies solely on the robots `Disallow` (which conflicts with its sitemap entry).

### 6.7 Crawlability / JS-rendering risk (confirmed)

**High JS-rendering dependency:** initial HTML is an empty shell; all content, headings, links, and (intended) schema require JS. Googlebot can often render JS, but AI/retrieval crawlers and social scrapers frequently do **not**. Combined with §5, non-rendering crawlers currently see only: one generic title, one generic description, and no body text.

### 6.8 Favicons (confirmed broken)

`client/index.html` references `/favicon-32.png` and `/favicon-16.png`. **Neither file exists** in `client/public/` (only `favicon.svg`, `og-image.svg`, `robots.txt`, `sitemap.xml`). Live requests for both PNGs return **HTTP 200 with `Content-Type: text/html`** — they resolve to the SPA shell, not an image.

### 6.9 Performance / technical factors (partial — see §15)

- **Fonts:** Google Fonts (`Inter`, `DM Mono`) imported via CSS `@import` (`index.css:1`) — render-blocking, no `preconnect`/`preload`, only `&display=swap` in the URL.
- **Images:** essentially none → no image-weight problem, but also no visual assets.
- **Bundle:** React 19 + TanStack Query + tRPC + framer-motion + ~50 Radix/shadcn UI components; most `components/ui/*` are unused by the actual pages (potential dead weight — unverified without build analysis).
- **CSS:** single hand-written stylesheet (~185 lines) + Tailwind v4.
- **Accessibility (positive):** focus-visible outlines, `prefers-reduced-motion`, aria-labels on nav/menu, focus trap in mobile menu, `aria-live`/`aria-busy` on the form, honeypot. Semantic `<header>/<main>/<footer>/<nav>/<article>/<section>` used correctly.
- **Accessibility (risk):** dark theme forced (`ThemeProvider defaultTheme="dark"`); gold-on-dark and muted-gray text (`--muted: #a4a7ae`) contrast is borderline for small text — unverified numerically.

---

## 7. Structured Data & Entity Inventory

### 7.1 Schema types defined (in code)

| Schema `@type` | Where defined | In served HTML? |
|---|---|---|
| `Person` | `server/meta.ts:57` (`PERSON_SCHEMA`) + `App.tsx:78` | ❌ (server dead; client only post-JS) |
| `WebSite` | `server/meta.ts:75` + `App.tsx:79` | ❌ same |
| `Service` | `server/meta.ts:85` (`serviceSchema`) + `App.tsx:82` | ❌ same |
| `Article` | `server/meta.ts:95` (`articleSchema`) | ❌ (server only; client never emits it) |
| `FAQPage` | `server/meta.ts:18` (`FAQ_SCHEMA`, 4 Q&As) | ❌ (server only) |
| `BreadcrumbList` | `server/meta.ts:111` (`breadcrumb`) | ❌ (server only) |
| `Organization` | **only nested** inside `Person.worksFor` and `Article.publisher` — never a standalone Organization node (no logo, address, founder, or org-level sameAs) | ❌ |
| `WebPage`, `Product`, `SoftwareApplication`, `CreativeWork`/project schema | **not implemented** | — |

### 7.2 Key property values (as coded)

- **Person:** `name: "Khalid - The Web3 Wizard"`, `url: https://theweb3wizard.xyz`, `worksFor: Organization "Web3 Wizard Labs"`, `sameAs:`
  - `https://github.com/THEWEB3WIZARD`
  - `https://www.linkedin.com/in/theweb3wizard00`
  - `https://x.com/theweb3wizard00`
  - `https://t.me/theweb3wizard00`
- **WebSite:** `name: "Web3 Wizard Labs"`, `url`, `description: "Founder-led Web3 product studio for focused products, prototypes, community tools, and application-layer clarity."`, `author: Person`.
- **Service:** `name` = service label, `description` = service description, `provider: Person` (server adds `url`).
- **Article:** `headline`, `description`, `author: Person`, `publisher: Organization "Web3 Wizard Labs"`, `url` — **no `datePublished`/`dateModified`** (freshness gap).
- **Business/Org name:** "Web3 Wizard Labs". **URL:** `https://theweb3wizard.xyz` (non-www). **Logo:** none supplied in schema. **Founder/person:** "Khalid - The Web3 Wizard".

### 7.3 Divergent entity descriptions across the codebase

- Person name string appears as **"Khalid - The Web3 Wizard"** (schema, footer "Built by Khalid - The Web3 Wizard") vs. **"The Web3 Wizard"** (project `builtBy`, article byline "By The Web3 Wizard | Web3 Wizard Labs") vs. **"Khalid"** alone (FAQ/About/Start prose).
- Two independent schema generators (client `App.tsx` vs server `meta.ts`) that don't fully agree (client omits Article/FAQ/Breadcrumb; server Person includes it everywhere).

### 7.4 Brand/entity string census (repo-wide grep)

Files containing "Web3 Wizard / theweb3wizard / Khalid": `SiteShell.tsx`, `App.tsx`, `server/meta.ts`, `robots.txt`, `sitemap.xml`, `og-image.svg`, `index.html`, `routers.ts`, `SitePages.tsx`, `site.test.ts`, `site.ts`, `inquiries.test.ts`, `pnpm-lock.yaml`.

- **Domain string** `theweb3wizard.xyz`: `server/meta.ts` (SITE_URL), `sitemap.xml`, `robots.txt`, `og-image.svg`, `inquiries.test.ts`.
- **Email:** `theweb3wizard00@gmail.com` (Start page, Legal, footer). A different address `inquiries@theweb3wizard.xyz` appears **only in the stale Resend test**.
- **No alternate/old brand name** found in-repo — brand naming is internally singular ("Web3 Wizard Labs" + persona "The Web3 Wizard").

---

## 8. GEO / AI Search Readiness Baseline

Documenting current signals only (no score).

1. **Entity clarity (rendered):** Good conceptually — the studio explains what it is repeatedly. **But for non-JS AI crawlers the served HTML carries essentially no entity information** (one generic title/description, empty body, no schema).
2. **Consistency of description:** Internally strong; weakened by Person-name variants (§7.3) and the site↔GitHub divergence (§12).
3. **Relationship mapping:** Person→worksFor→Organization link exists in schema (undeployed). "The Web3 Wizard" (persona) = "Khalid" (person) = founder of "Web3 Wizard Labs" (studio) stated in prose. **AI/Web3/Solana** clearly associated; **AI agents / dApps / automation / SaaS** are *not* claimed on-site.
4. **Explicit service definitions:** Strong — four services with scope, deliverables, exclusions, process.
5. **Evidence of actual work:** **Weak on-site.** Four narrative project pages with no links, repos, screenshots, demos, or metrics.
6. **Project pages / case studies:** Exist as *personal experiments*; no client case studies (by admission).
7. **Clear authorship:** Byline on insights; Person schema author (undeployed). No author bio block, no `datePublished`.
8. **Dates / freshness signals:** **Poor.** No visible dates; sitemap `lastmod` stale (2025-07-14); Article schema lacks dates.
9. **About/company info:** Present but thin on concrete facts (no founding date, location, team size, legal entity).
10. **Contact info:** Clear — `/start` form + `theweb3wizard00@gmail.com` + social links.
11. **Trust signals:** Honesty framing is itself a signal; but **no testimonials, client logos, third-party references, or metrics** (mostly by admission).
12. **Primary-source evidence:** Minimal on-site; strongest primary sources (GitHub repos, live demos) are off-site and unlinked.
13. **Crawlable textual explanations:** Rich **in the DOM**, invisible in **served HTML**.
14. **Info hidden in visuals/JS:** All substantive info is text (good) but JS-rendered (bad for non-rendering crawlers). The og-image is an **SVG**, which many social platforms (X, LinkedIn, Slack, iMessage) **do not render** as link previews.
15. **Machine-understandable without visuals:** Yes for a JS-executing crawler; **no** for a non-rendering one (empty shell).
16. **Claims supported by specific evidence:** Largely **not** — claims are honest and hedged but unaccompanied by links/screenshots/numbers.

---

## 9. Existing Content, Projects & Proof Assets

### 9.1 On-site portfolio projects (`site.ts` `projects[]`)

| Name | Route | Status label | Category | Substantive evidence? | Measurable result? |
|---|---|---|---|---|---|
| **SolPulse** | `/work/solpulse` | deployed | Monitoring tool (Solana whale alerts) | Narrative only; stack: Solana, React, TypeScript, Telegram | None; "no investment/trading outcome implied" |
| **TxPreview** | `/work/txpreview` | deployed | Wallet utility (tx-intent preview) | Narrative only; stack: React, TS, Wallet APIs | None; "not a security certification" |
| **SearchLens** | `/work/searchlens` | concept | Research tool (AI-search discoverability) | Narrative only; stack: Product research, React, AI workflows | None; "concept build, not finished product" |
| **Community Signal** | `/work/community-signal` | building | Community tool (Telegram/Discord) | Narrative only; stack: Telegram, Discord, React | None; "no adoption result claimed" |

- All four marked `isPersonalProject: true`, `builtBy: "The Web3 Wizard"` (enforced by `site.test.ts`).
- **No `url`/repo/demo/screenshot field exists in the `Project` type** — the data model has no place for a live link or image. Proof cannot currently be attached even if it existed.
- **⚠ Status conflict:** `server/meta.ts` titles call SolPulse a "Solana monitoring concept" and TxPreview an "interface concept," while `site.ts` marks both `deployed`.

### 9.2 Insights (`site.ts` `insights[]`)

| Title | Route | Reading time | Draft? | Unique content? |
|---|---|---|---|---|
| How to scope a Web3 product before spending money | `/insights/scope-a-web3-product-before-spending-money` | "6 min read" | false | **No** — shared boilerplate body |
| Why a Web3 prototype can fail when real users touch it | `/insights/why-a-web3-prototype-can-fail` | "5 min read" | false | **No** — same body |
| How to use AI when building a Web3 product without blindly trusting the output | `/insights/use-ai-without-blindly-trusting-it` | "7 min read" | false | **No** — same body |

- Reading-time labels imply full articles; actual content is ~4 shared paragraphs (§3.11).

### 9.3 Off-site proof assets (NOT referenced on the site) — from public GitHub

Founder GitHub `theweb3wizard` (name "The Web3 Wizard", bio "I Build - I Ship - I Disappear", blog `theweb3wizard00.vercel.app`, created 2025-06-14, **22 public repos**). Selected repos with live homepages:

| Repo | Description (verbatim) | Live homepage |
|---|---|---|
| `portfolio` | "Khalid - The Web3 Wizard" | **`theweb3wizard.xyz`** (this site) |
| `Write3` | AI-powered Web3 content generator for X/Discord/Telegram/Farcaster/blogs | `write3-ai.vercel.app` |
| `AgentHub` | Safe, authenticated access for AI coding assistants to DBs/APIs/infra — policy control, **audit trails**, human approval gates | `agenthub-lyart.vercel.app` |
| `FlowForge` | Deploy/orchestrate **smart-contract systems** on BlockDAG & EVM networks | `flowforge-studio.vercel.app` |
| `walletlens` | AI-powered EVM wallet intelligence (ETH/Polygon/BNB/Arbitrum/Base) | `walletlens-hq.vercel.app` |
| `Grant-OS` | Grant-management CRM for Web3 teams (Optimism/Arbitrum/Base/Solana/Ethereum) | `grantos-hq.vercel.app` |
| `Valor` | "An AI Agent For Telegram." | `valor-tgbot.vercel.app` |
| `Tether-Developers-Cup` | Football-themed global dev competition | `tether-developers-cup.vercel.app` |
| `Sway` | Dark-terminal social swipe trading app | — |
| `Linkdwell` | (no description) | `linkdwell.vercel.app` |
| `Digital-Harvest-Co` | "Home of Digital Products" | `digital-harvest-co.vercel.app` |

- **This is the real proof inventory** — deployed, linkable, substantial — and it is **entirely disconnected** from the marketing site. `theweb3wizard00.vercel.app` (the GitHub "blog"/portfolio link) currently **308-redirects to `www.theweb3wizard.xyz`** (consolidated — good).

### 9.4 Other assets

- **Metrics / testimonials / client work:** none (by admission).
- **External links on-site:** only 4 socials + email (footer).
- **Hackathon/grant references:** none on-site (though `Grant-OS` and `Tether-Developers-Cup` exist on GitHub).
- **Technical docs / research / open-source:** none linked on-site.

---

## 10. Internal Linking & Information Architecture

### 10.1 Navigation (header, `SiteShell.tsx` `navLinks` in `site.ts`)

`Services` (`/services`) · `Work` (`/work`) · `Insights` (`/insights`) · `About` (`/about`) · **CTA** "Start with your idea" (`/start`). Mobile menu mirrors this.

### 10.2 Footer (`SiteShell.tsx` `SiteFooter`)

- **Brand block:** tagline + disclosure "The work shown here is founder-built personal work unless explicitly stated otherwise."
- **Studio:** About, Services, Work, Start a project.
- **Services:** the 4 service detail pages.
- **Connect:** X (`x.com/theweb3wizard00`), Telegram (`t.me/theweb3wizard00`), GitHub (`github.com/THEWEB3WIZARD`), LinkedIn (`linkedin.com/in/theweb3wizard00`), Email (`theweb3wizard00@gmail.com`).
- **Bottom:** "© 2026 Web3 Wizard Labs. Built by Khalid - The Web3 Wizard." + Privacy, Terms.

### 10.3 Graph observations

- **Well-connected:** every page → all nav + footer targets. Service detail pages get links from nav→/services, footer, and homepage routing grid (double-linked).
- **Homepage routing grid links to service *detail* pages directly** (`/services/product-builds` etc.), while nav links to the `/services` index → two parallel paths to services.
- **Weakly connected / orphaned:**
  - `/privacy`, `/terms` — footer-only, not in sitemap, not in nav.
  - `/404` route + `NotFound.tsx` — orphaned, no inbound links.
  - Insight detail pages — inbound only from `/insights`.
- **Concepts with no dedicated page:** "AI agents," "automation," "SaaS," "dApps," a Solana-specific landing. No dedicated founder/personal page beyond `/about`.
- **Competing-purpose pages:** homepage "What are you trying to do?" grid vs `/services`; homepage "starter engagements" vs service pages.

### 10.4 Page → Purpose → Audience → CTA → Key internal links

| Page | Primary purpose | Main audience | Main CTA | Key internal links |
|---|---|---|---|---|
| `/` | Land + route to services | Early-stage Web3 founders | Start with your idea → `/start` | 4 service pages, `/work`, `/start` |
| `/services` | Service hub | Founders choosing a path | (card) → service detail | 4 service detail pages |
| `/services/{slug}` | Sell one service | Buyer with a specific need | `/start?type=…` | `/start`, `/terms` (app-review) |
| `/work` | Show founder-built work | Prospects seeking proof | (card) → project | 4 project pages |
| `/work/{slug}` | Explain one project | Prospect evaluating capability | `/start?project=…` | related service, `/start` |
| `/about` | Establish founder/studio | Prospect assessing trust | Start a conversation → `/start` | `/start` |
| `/insights` | Thought leadership hub | Founders researching | (card) → article | 3 insight pages |
| `/insights/{slug}` | Demonstrate thinking | Researching founder | Explore related service | related service |
| `/start` | Convert (contact) | Ready-to-inquire prospect | Send the inquiry | email fallback |
| `/privacy`, `/terms` | Legal/boundaries | Diligence readers | — | (footer only) |

---

## 11. Conversion & Customer Journey

1. **Landing on `/`:** Strong single H1, one-line pitch, two CTAs ("Start with your idea" / "See the work"). Within one screen a visitor grasps: solo founder, Web3 products, clarity-focused, AI-assisted. **Provided JS renders** — a non-JS visitor/crawler sees a blank shell.
2. **Comprehension speed:** *What it is* — fast. *Who it helps* — "early-stage Web3 teams," fast. *What it builds* — "What are you trying to do?" grid clarifies quickly. *Why care* — honesty/anti-hype angle. *Next action* — unambiguous, "Start with your idea" repeated ~5×.
3. **Where visitors can go:** view work, understand services (4 detail pages + 3 starter offers), understand founder/studio (`/about`), contact (`/start` + email).
4. **Every CTA and destination:**
   - "Start with your idea" (header, hero, CTA bands) → `/start`
   - "See the work" / "View all work" → `/work`
   - 4 ProblemCards → 4 service detail pages
   - "Request a fit check" / "Not sure which path fits?" → `/start`
   - Service CTAs → `/start?type={query}`
   - Project "Discuss something similar" → `/start?project={slug}`
   - Insight "Explore the related service" → related service page
   - Footer "Start a project" → `/start`; social/email → external
   - All roads lead to **`/start`** (single conversion point).
5. **Dead ends / friction:**
   - `/work` and `/work/{slug}` offer **no external validation** (no live demo/repo) → a proof-seeking visitor hits a narrative wall.
   - `/insights/{slug}` delivers identical boilerplate → erodes credibility on a second click.
   - `/start` is `Disallow`ed to crawlers but is the only conversion page (combined with its sitemap listing, inconsistent).
   - `/404` orphan renders a light-theme, off-brand page if ever hit.
6. **Audience segmentation:** Pages consistently aim at **one** audience (early-stage Web3 founders/teams). No conflicting targeting — coherent journey.

---

## 12. Public Web & Search Findings

- **Live vs. repo parity:** The live site **matches the repo's static shell** but **does not reflect the repo's SEO/schema intent** (server injector undeployed). Confirmed: same static `<title>`/description on `/` and `/about`; zero OG/JSON-LD in served HTML.
- **Host:** apex → 308 → `www.theweb3wizard.xyz`. Canonical host = **www** (conflicts with all in-code non-www URLs).
- **Indexation (`site:` search):** Could not be confirmed — WebSearch unavailable on this model; Google returned a consent-wall/AI result set; Bing returned unrelated results. **Indexation status is undetermined** (§15). Given the JS-shell + no-schema situation and a very young deployment (migrated 2026-08-13), rich indexing is unlikely to be established yet.
- **Social/profile links referenced by the site:**
  - **GitHub `THEWEB3WIZARD`/`theweb3wizard`** — **exists, active**, name "The Web3 Wizard," 22 repos, bio "I Build - I Ship - I Disappear." **Content diverges sharply from the marketing site** (different projects; EVM/smart-contract/agent/SaaS work; more prolific, less hedged in tone).
  - **X `x.com/theweb3wizard00`** — could not verify (HTTP 402 to the fetch tool; **undetermined**).
  - **Telegram `t.me/theweb3wizard00`** — fetch content-blocked; **undetermined**.
  - **LinkedIn `linkedin.com/in/theweb3wizard00`** — HTTP **999** (LinkedIn's standard anti-bot response; expected for automated fetches; **undetermined**, not confirmed broken).
  - **Second portfolio `theweb3wizard00.vercel.app`** — now **308-redirects to the main site** (good consolidation).
- **Broken public links (confirmed):** `/favicon-32.png` and `/favicon-16.png` do not exist → serve HTML, not images. `og-image` is SVG-only (`.png` is a temporary redirect to `.svg`) → likely no social preview image on major platforms.
- **Other sites describing the entity differently:** the founder's **GitHub profile and its 22 project READMEs** are the primary alternative description — portraying a broader, EVM/agent/SaaS-oriented builder, contradicting the site's Solana/application-layer/no-smart-contracts framing.

---

## 13. Exact File & Component Change Map

> Reference map of *where* each concern lives, for a future strategist. No changes were made.

### A. Brand messaging
- `client/src/site.ts` — **all** projects, insights, services, nav copy (the content database).
- `client/src/pages/SitePages.tsx` — every page's headings, body copy, FAQ, starter offers, service detail data, legal copy.
- `client/src/components/SiteShell.tsx` — brand mark text, footer tagline + disclosure + copyright, hero/section/card wrappers.
- `client/public/og-image.svg` — brand tagline + services baked into the share image.
- `client/index.html` — static `<title>`/description (lines 11–12) actually served in prod.

### B. SEO metadata
- `server/meta.ts` — `ROUTE_META` (per-route title/description/schema) — **primary but undeployed**.
- `client/src/App.tsx` — `MetaManager` (lines 36–88): client-side title/description/OG/Twitter/canonical + labels map.
- `client/index.html` — served baseline meta.
- `client/public/robots.txt`, `client/public/sitemap.xml` — crawl directives + URL set/lastmod.
- `vercel.json` — the rewrite (`/(.*)`→`/index.html`) that **bypasses** server meta; redirects; headers.

### C. Schema / structured data
- `server/meta.ts` — `FAQ_SCHEMA`, `PERSON_SCHEMA`, `WEBSITE_SCHEMA`, `serviceSchema()`, `articleSchema()`, `breadcrumb()` (full set; undeployed).
- `client/src/App.tsx` — `setSchema` for Person/WebSite/Service (lines 78–85; client-only subset).

### D. Navigation & internal linking
- `client/src/site.ts` — `navLinks`.
- `client/src/components/SiteShell.tsx` — `SiteHeader`, `SiteFooter`, `BrandMark`, `ButtonLink`.
- `client/src/App.tsx` — `Router` route table (lines 12–31).

### E. Homepage content
- `client/src/pages/SitePages.tsx` → `Home()` + `ProblemCard` + `starterOffers` + `faqItems`.

### F. Service pages
- `client/src/site.ts` `services`; `SitePages.tsx` `ServicesPage`, `ServiceDetailPage`, `serviceDetail()`.

### G. Portfolio / project / case-study content
- `client/src/site.ts` `projects[]` + `Project` type.
- `SitePages.tsx` `WorkPage`, `ProjectDetailPage`; `ProjectCard` (in `SiteShell.tsx:50`).
- `client/src/site.test.ts` — enforces every project stays `isPersonalProject`/`builtBy` (guardrail to respect when editing).

### H. Handle carefully (deployment/routing/indexing-critical)
- `vercel.json` — rewrites/redirects/headers; the single biggest lever over what crawlers see; changing the rewrite affects the whole site **and** the tRPC function.
- `server/meta.ts` + `server/vite.ts` + `server/index.ts` — the SSR-meta path; only relevant if the hosting model changes.
- `api/trpc.ts` — the live contact-form function (imports `../server/routers.js`); breaking it kills the only conversion action.
- `server/routers.ts` + `server/_core/env.ts` — Telegram delivery + required env vars.
- `client/public/robots.txt`, `sitemap.xml` — indexing directives; note existing `/start` and host/lastmod inconsistencies.
- `client/index.html` — served title/description + the broken favicon references.
- `tsconfig.json` / `vite.config.ts` / `vitest.config.ts` — build/test wiring (note the dangling `@assets`→`attached_assets` alias).

---

## 14. Confirmed Problems / Risks

**Deployment / indexing (highest impact)**
1. Server-side meta injector (`server/meta.ts`) is **dead code on Vercel**; every route serves identical static title/description with no canonical/OG/JSON-LD in the HTML (raw-fetch confirmed).
2. **Full CSR** — content, headings, links, and (intended) schema require JS; served HTML is an empty shell.
3. **Soft-404** — unknown routes return HTTP 200.
4. **Canonical-host mismatch** — prod forces `www`; all in-code URLs (SITE_URL, sitemap, robots, schema) are non-`www`; client canonical (window.origin) would be `www` → three-way disagreement, and no canonical emitted anyway.

**Structured data / entity**
5. No standalone `Organization` schema (no logo, founding date, address); Article schema lacks dates; FAQ schema is a 4-of-6 subset; two divergent schema generators.
6. **Person-name inconsistency:** "Khalid - The Web3 Wizard" vs "The Web3 Wizard" vs "Khalid."
7. **Site↔GitHub entity divergence** — on-site portfolio (SolPulse/TxPreview/SearchLens/Community Signal) doesn't exist on GitHub; real GitHub work (Write3/AgentHub/FlowForge/WalletLens/Grant-OS/Valor) isn't on the site; FlowForge (smart contracts) contradicts the "no smart contracts" positioning.

**Content**
8. **Insight articles are identical boilerplate** (thin/duplicate) with misleading reading-time labels.
9. **Privacy policy names "Resend"** while production uses Telegram (factual inaccuracy).
10. **Zero on-site proof** — no demo links, repos, screenshots, metrics, or a `url` field in the project data model.
11. **Project status conflict** — `server/meta.ts` calls SolPulse/TxPreview "concept"/"interface concept"; `site.ts` marks them `deployed`.

**Technical hygiene**
12. **Broken favicons** `/favicon-32.png`, `/favicon-16.png` (serve HTML).
13. **OG image is SVG-only** → likely no social link-preview image.
14. **robots.txt** has split `User-agent: *` groups and `Disallow: /start` **conflicting** with `/start` in the sitemap; sitemap URL in robots is non-www.
15. **sitemap `lastmod` = 2025-07-14** on all URLs — stale/inaccurate (content committed 2026-08-13).
16. **Orphaned light-theme `NotFound.tsx`** at `/404` (off-brand, duplicate purpose).
17. Google-Fonts via render-blocking `@import`, no preconnect/preload.
18. Stale test (`server/inquiries.test.ts`) references removed Resend functions (`buildInquiryNotification`, `sendInquiryEmail`) that no longer exist in `routers.ts` → **this test file will fail to import/compile**. Dead vitest alias `@assets`→`attached_assets` (missing dir).

---

## 15. Things That Cannot Yet Be Determined

Require external tools/access not available in this audit environment:

- **Actual Google/Bing indexation and cached versions** of `theweb3wizard.xyz` (WebSearch unavailable; Google consent-wall). Requires Search Console or manual browser search.
- **Whether Googlebot successfully renders the JS** and indexes the client-rendered content (needs URL Inspection / rendered-DOM test).
- **Core Web Vitals / Lighthouse performance, real bundle size, unused-code weight** (needs a build + Lighthouse/PageSpeed).
- **Numeric color-contrast/WCAG pass-fail** for the muted-gray/gold-on-dark palette (needs an a11y auditor).
- **Live status of X, Telegram, LinkedIn profiles** — fetch tools returned 402 / content-blocked / 999 respectively; **not confirmed working or broken**.
- **Whether the Telegram contact pipeline actually delivers** in production (would require submitting a real inquiry / checking env vars on Vercel).
- **Any backlinks, third-party mentions, or brand SERP** beyond the founder's own GitHub.
- **Whether `/api/trpc` deploys and runs correctly on Vercel** (the function imports `../server/routers.js`; not verified live).

---

## 16. Raw Findings / Important Extracted Content

### 16.1 Served HTML `<head>` (production, verbatim, identical on `/` and `/about`)

```html
<title>Web3 Wizard Labs — Clearer Web3 products, built by one founder.</title>
<meta name="description" content="Founder-led Web3 product studio for focused products, prototypes, community tools, and application-layer clarity." />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />   <!-- 404s to HTML -->
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />   <!-- 404s to HTML -->
<meta name="theme-color" content="#0a0a0b" />
<div id="root"></div>   <!-- body content (no SSR) -->
```

- `grep -c 'ld+json'` on served HTML → **0**; `grep -c 'og:'` → **0**.

### 16.2 Live HTTP behavior (verbatim status lines)

```
GET https://theweb3wizard.xyz/            → 308 → Location: https://www.theweb3wizard.xyz/
GET https://www.theweb3wizard.xyz/        → 200 (X-Vercel-Cache: HIT)
GET https://theweb3wizard.xyz/about/      → 308 → https://www.theweb3wizard.xyz/about/
GET /this-page-does-not-exist-xyz123      → 200   (soft-404)
GET /favicon-32.png                       → 200 Content-Type: text/html   (broken)
GET /favicon-16.png                       → 200 Content-Type: text/html   (broken)
GET /og-image.png                         → 308 → /og-image.svg
Headers present: X-Content-Type-Options: nosniff · X-Frame-Options: DENY · Referrer-Policy: strict-origin-when-cross-origin
```

### 16.3 Hero copy (homepage, verbatim)

> Eyebrow: FOUNDER-LED WEB3 PRODUCT STUDIO
> H1: "Clearer Web3 products, built by one founder."
> "I help early-stage Web3 teams turn ambitious ideas, rough prototypes, and community needs into focused products people can actually use."
> Note: "AI helps me move faster. I direct the work, challenge the output, test the important parts, and remain accountable for what gets delivered."

### 16.4 Capabilities list (homepage, verbatim)

Focused Solana and Web3 applications · MVPs and product prototypes · Dashboards and internal tools · AI-assisted Web3 products · Telegram Mini Apps and Discord tools · Community and distribution experiences

### 16.5 Boundaries copy (homepage, verbatim)

> "What I will not pretend to be" — "Web3 has enough inflated claims already." — "I do not present personal projects as client work, call an application review a smart-contract audit, or promise that a product is free of risk."

### 16.6 Homepage FAQ (6 items — verbatim questions)

1. "Do you have client testimonials yet?"
2. "Are the projects in the portfolio client work?"
3. "What happens after I submit an inquiry?"
4. "Do you write smart contracts?" (answer says "not… part of this **V1** offer")
5. "Can you work with an existing prototype?"
6. "Do you use AI to build the products?"

- FAQ schema (`server/meta.ts`) encodes only #1, #2, #4 (without "V1"), #6.

### 16.7 Insight article body (shared boilerplate, verbatim H2s)

"Start with the decision, not the feature list." / "Make uncertainty visible." / "Keep the first version narrow." — closing: "That is the kind of work Web3 Wizard Labs is designed to support." (Byline: "By The Web3 Wizard | Web3 Wizard Labs".)

### 16.8 Privacy policy — Resend reference (verbatim, `SitePages.tsx`)

> "Inquiry submissions are sent through **Resend** to the configured Web3 Wizard Labs notification inbox. The website does not persist inquiry submissions in its project database. Resend processes the email delivery…"

(Production reality: Telegram Bot API, `server/routers.ts`.)

### 16.9 Person schema (as coded, `server/meta.ts` / `App.tsx`)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Khalid - The Web3 Wizard",
  "url": "https://theweb3wizard.xyz",
  "sameAs": [
    "https://github.com/THEWEB3WIZARD",
    "https://www.linkedin.com/in/theweb3wizard00",
    "https://x.com/theweb3wizard00",
    "https://t.me/theweb3wizard00"
  ],
  "worksFor": { "@type": "Organization", "name": "Web3 Wizard Labs", "url": "https://theweb3wizard.xyz" }
}
```

(Not present in served HTML.)

### 16.10 Founder GitHub (public, verbatim)

- Account `theweb3wizard`, name "The Web3 Wizard", bio: "I Build - I Ship - I Disappear\n\nWeb3 tools. AI tools. Sometimes both at once. Always from scratch. Always solving something real.", blog `theweb3wizard00.vercel.app`, created `2025-06-14`, **22 public repos**.
- `portfolio` repo homepage = `theweb3wizard.xyz`, description "Khalid - The Web3 Wizard" → confirms this repo is the deployed site.
- Real deployed projects (unlinked from site): Write3, AgentHub, FlowForge, walletlens, Grant-OS, Valor, Tether-Developers-Cup, Sway, Linkdwell, Digital-Harvest-Co (§9.3).

### 16.11 Repo freshness (git)

- 7 commits total. First relevant: `2026-08-13 feat: migrate Web3 Wizard Labs to Vite and Vercel Serverless`. Latest: `2026-08-16 feat: add all social handles`.
- → **Site is ~5 days live as of audit; sitemap `lastmod` (2025-07-14) is inaccurate.**

---

*End of forensic baseline snapshot. Every finding is grounded in the actual repository files (with paths/line numbers), live HTTP responses, deployment configuration, or public profile data. Confirmed facts are kept separate from the undetermined items in §15. No files were modified in the course of this audit.*
