# Migration Progress Tracker — theweb3wizard.xyz

## Session info
- **Plan file**: `~/.claude/plans/snuggly-gathering-eclipse.md`
- **Started**: 2026-09-05
- **Target repo**: `web3-wizard-labs` (Vite/React + wouter + tRPC, live `theweb3wizard.xyz`)
- **Remote**: `https://github.com/theweb3wizard/portfolio.git`

## Locked decisions
1. Services: keep 3 (Product Discovery, AI-Native Web3 Product Build, AI Agent & Solana Engineering). Refine copy so AI-Native Build reads as lead.
2. Audience: "founders and small teams" blend.
3. Voice: founder "I / Khalid" for personal sections; "The Web3 Wizard / the studio" for formal copy.
4. Projects: add OrderFlow now; TaxRabbit deferred.
5. Trust rule: no invented clients, testimonials, revenue, awards, partnerships, security credentials.
6. Footer: add Medium/Substack (URLs TBD — pending user input).

## Phase tracking

### Phase 0 — Brand-name consistency [✅ COMPLETED]
- `ORG_NAME = "The Web3 Wizard Labs"` (added "The")
- `SITE_NAME = PERSONA` added for `og:site_name`
- `og:site_name` → "The Web3 Wizard" (App.tsx)
- Title suffixes `| Web3 Wizard Labs` → `| The Web3 Wizard` (server/meta.ts + shared/routeMeta.ts)
- FAQ_SCHEMA about/client testimonials answers updated with "The"
- Brand mark, copyright, consent text, privacy/terms updated
- **All stragglers fixed**: og-image.svg, routers.ts, inquiries.test.ts, SitePages.tsx legal pages

### Phase 1 — Navigation & CTA [✅ COMPLETED]
- `navLinks` reordered: Work, Services, Insights, About, Contact
- Primary CTA: "Bring us the problem" → "Start a conversation"
- Contact submit: "Send the inquiry" → "Start the conversation"
- Footer Studio CTA: "Start a project" → "Start a conversation" (fixed)

### Phase 2 — Positioning & copy [✅ COMPLETED]
- Home hero: copy refined to name "founders and small teams" + roadmap-milestone promise
- Process section: "Understand → Define → Build → Verify → Ship"
- Capabilities list updated
- About the Founder section added
- Insights teaser section added
- Service copy refined — AI-Native Build reads as lead
- Work page: "concept" filter removed
- About page: voice + audience updated
- Legal pages: "Web3 Wizard Labs" → "The Web3 Wizard Labs"
- Contact page: field rename
- Insight punctuation/grammar cleaned up

### Phase 3 — Add OrderFlow [✅ COMPLETED]
- `site.ts`: OrderFlow project object added
- `server/meta.ts`: `/work/orderflow` ROUTE_META with PERSON_SCHEMA + softwareSchema + breadcrumb
- `shared/routeMeta.ts`: `/work/orderflow` CLIENT_ROUTE_META
- `vite-plugin-ssg-meta.ts`: SSG_ROUTES includes `/work/orderflow`
- `sitemap.xml`: OrderFlow url block added
- Build verified: `dist/public/work/orderflow/index.html` exists ✅

### Phase 3b — TaxRabbit [⏸ DEFERRED]
- Defer until user confirms details/labeling.

### Phase 4 — Technical SEO reconciliation [✅ COMPLETED]
- Client descriptions synced between `shared/routeMeta.ts` and `server/meta.ts`
- `ORGANIZATION_SCHEMA.sameAs` matches `PERSON_SCHEMA.sameAs` (GitHub, LinkedIn, X, Telegram)
- Breadcrumb name for use-ai insight fixed ("Product" added)
- Sitemap `<lastmod>` updated on changed pages
- robots.txt reviewed

### Phase 5 — Footer & final touches [🟡 PARTIALLY COMPLETED]
- ✅ Footer CTA "Start a conversation" verified across all instances
- ✅ Copyright updated to "© 2026 The Web3 Wizard Labs · Founded by Khalid Murtala."
- ⏳ Medium/Substack URLs still blocked — pending user input
- ⏳ Insight copy (all 3 insights share identical body text — known issue from FORENSIC-AUDIT.md §3.11)

### Phase 6 — Verification [✅ COMPLETED]
- ✅ `pnpm check` (tsc `--noEmit`) — passed, no errors
- ✅ `pnpm build` — 20 SSG pages generated successfully
- ✅ `pnpm vitest run` — 17/17 tests passed
- ✅ `dist/public/work/orderflow/index.html` confirmed in build output
- ✅ No bare "Web3 Wizard Labs" remaining in source files

## Blockers
- [BLOCKER] Medium/Substack URLs needed from user for footer edit
- [BLOCKER] Insight copy uniqueness — all 3 insights share identical body text (known issue)

## Last action taken
- All remaining "Web3 Wizard Labs" stragglers fixed in og-image.svg, routers.ts, inquiries.test.ts, SitePages.tsx
- Footer CTA "Start a project" → "Start a conversation" fixed in SiteShell.tsx
- All verification passed: TypeScript check ✅, Build ✅, Tests ✅ (17/17)
- Ready to commit and push

## Git state to remember
- Run `git diff --stat` to check what's already changed
- Run `git status` before each phase to ensure clean state
- Do NOT commit until all phases complete and user approves

## Important files to read during work
- `client/src/site.ts` — projects, insights, services, navLinks (the content database)
- `client/src/pages/SitePages.tsx` — all page components and copy
- `client/src/components/SiteShell.tsx` — header, footer, CTA components
- `server/meta.ts` — per-route SEO meta + schema generation
- `shared/routeMeta.ts` — client-side route metadata
- `vite-plugin-ssg-meta.ts` — SSG route registry
- `client/public/sitemap.xml` — sitemap
- `client/public/robots.txt` — robots.txt
- `client/src/App.tsx` — router + MetaManager
- `vercel.json` — deployment config
