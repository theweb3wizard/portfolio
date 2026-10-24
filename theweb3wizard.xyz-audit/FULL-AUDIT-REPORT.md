# SEO Audit — theweb3wizard.xyz

> **⚠️ CORRECTIONS APPLY — read this alongside `PHASE-1-RESULTS.md`.**
> A follow-up pass that read the actual source (rather than only the built HTML)
> found **six findings below to be false positives**, and identified a single root
> cause behind several others. All Phase 1 fixes have since shipped. Corrected
> findings, the root cause, and before/after measurements are in
> `PHASE-1-RESULTS.md`. Treat that file as authoritative where the two disagree.

**Audited:** 22 Oct 2026
**Scope:** 25 built pages (24 real + 1 Google verification file), plus live-header and live-content verification
**Method:** Static analysis of build output (`dist/public`) + live HTTP verification. Google API credentials, CrUX field data, and Playwright rendering were **not** available, so Performance and field CWV are provisional.
**Site type detected:** Professional service / agency (founder-led product studio)

---

## SEO Health Score: 63 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 78 | 17.2 |
| Content Quality | 23% | 55 | 12.7 |
| On-Page SEO | 20% | 60 | 12.0 |
| Schema / Structured Data | 10% | 85 | 8.5 |
| Performance (CWV) | 10% | 70 *provisional* | 7.0 |
| AI Search Readiness | 10% | 35 | 3.5 |
| Images | 5% | 40 | 2.0 |
| **Total** | | | **62.8** |

---

## Executive Summary

The technical foundation is genuinely good — clean canonicals, a complete and valid sitemap, deliberate AI-crawler policy, rich structured data, and no duplicate titles or descriptions. Whoever built this understood SEO basics.

But there is **one structural problem that caps everything else**, and it is invisible from a browser.

### The single most important finding

Every page ships a **~150-word plain-text stub** inside `<div id="root">`. React then replaces that stub with the real page on load. The real page is large — the component file is **91 KB** of content.

Consequence: anything that does not execute JavaScript sees only the stub.

| Consumer | Executes JS? | Sees |
|---|---|---|
| Human in a browser | Yes | Full page (~1,000+ words, sections, cards) |
| Googlebot | Yes (renders) | Full page, eventually |
| **GPTBot / ClaudeBot / PerplexityBot** | **No** | **~150-word stub** |
| **CCBot (Common Crawl)** | **No** | **~150-word stub** |

Your `robots.txt` explicitly invites all of those AI crawlers in. Right now they arrive and find a stub. That is the gap between "AI-crawler friendly" and "AI-citable."

**Measured word counts in the shipped HTML — every page:**

```
min=120  median=147  max=176  (24 pages)
```

Not one page clears 200 words in the HTML. Meanwhile zero `<h2>` or `<h3>` tags exist sitewide — a census of all headings returns `{"h1": 24}` and nothing else.

### Top 5 critical issues

1. **Content invisible without JS** — median 147 words in HTML vs a 91 KB React component. Blocks AI citation and weakens Google's initial parse.
2. **Zero heading structure** — no `<h2>`/`<h3>` on any page. No passage-level structure for featured snippets or AI Overviews to extract.
3. **`/hire-khalid` is an orphan** — a conversion page with **zero internal links** pointing to it. Confirmed by scanning every `<a href>` on all 25 pages.
4. **No images in HTML at all** — 0 `<img>` tags sitewide, on a portfolio. No image search surface, and `khalid-murtala.webp` (169 KB) sits unused in the markup.
5. **`www` and non-`www` both return 200** — no redirect. Two hostnames serve identical content.

### Top 5 quick wins

1. Add internal links to `/hire-khalid` (nav, footer, and every service page CTA) — pure upside, minutes of work.
2. Fix the two over-length titles and two over-length descriptions (listed below).
3. Add one `<h2>` per major section in the SSG stub so AI crawlers get structure.
4. Redirect non-`www` → `www` in `vercel.json`.
5. Expand the SSG stub to mirror the real page's section headings.

---

## Technical SEO — 78/100

### What works

- **`robots.txt` is well-constructed.** Explicit per-crawler allow rules for GPTBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, Googlebot, Bingbot, Applebot. `Sitemap:` declared.
- **Sitemap is complete and valid.** 22 URLs, all returning 200, correctly matching real pages. No phantom entries.
- **Canonicals are consistent and correct.** All 24 real pages point to `https://www.theweb3wizard.xyz/...`, non-trailing-slash form. Zero conflicting canonicals, zero missing (excluding the Google verification file, which correctly has none).
- **No duplicate titles or descriptions** anywhere on the site.
- **HTTPS enforced**, served via Vercel.

### Findings

| # | Severity | Finding | Evidence |
|---|---|---|---|
| T1 | **High** | non-`www` does not redirect to `www` | `https://theweb3wizard.xyz/about` → **200**, no `Location` header. Same for `/`. Both hostnames serve byte-identical content (6,485 bytes). |
| T2 | **Medium** | Trailing-slash variants both return 200 | `/about` and `/about/` both → 200, identical 6,485 bytes. Same for `/services/web3-mvp-development` and `/services/web3-mvp-development/`. |
| T3 | Low | Sitemap `lastmod` dates inconsistent and stale | Values: `2026-09-08`, `2026-09-28`, `2026-10-17`. Homepage claims `2026-09-08`. |
| T4 | Low | `/privacy` and `/terms` excluded from sitemap | Verified absent from all 22 entries. Acceptable, but they are indexable — either include or `noindex` them. |

**Note on T1/T2:** canonical tags mitigate ranking risk, so these are hygiene rather than emergencies. They still split crawl signals and waste crawl budget across four URL variants per page (`www`/non-`www` × slash/no-slash).

**Fix (Vercel, `vercel.json`):**
```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "theweb3wizard.xyz" }],
      "destination": "https://www.theweb3wizard.xyz/:path*",
      "permanent": true
    }
  ],
  "trailingSlash": false
}
```

---

## Content Quality — 55/100

### What works

- E-E-A-T intent is strong and unusually honest. Copy explicitly refuses invented credibility: *"No client logos, no invented metrics, no 'trusted by' claims."*
- Real proof assets: named projects (Valor, WalletLens, Write3, AgentHub, OrderFlow), live public demos, linked GitHub repositories.
- Clear scope boundaries stated per service ("Outside scope: smart-contract audits, unlimited revisions, or guarantees of adoption"). That is exactly the kind of specificity that builds trust signals.

### Findings

| # | Severity | Finding | Evidence |
|---|---|---|---|
| C1 | **Critical** | Actual page content is absent from shipped HTML | Median **147 words** in HTML across 24 pages. Homepage 170, `/hire-khalid` 120, `/about` 164, service pages 146–169, blog articles 167–176. Real content lives in a 91,741-byte React component and is JS-rendered. |
| C2 | **High** | Insight articles are the thinnest valuable asset | All three `/insights/*` posts are **167–176 words** in HTML. For topical authority these need to be the *longest* pages on the site. |
| C3 | Medium | Zero external/outbound citations | Every page: `external=0`. All 12–17 links per page are internal. For a technical-authority blog, citing primary sources (Solana docs, Google specs, papers) is a real E-E-A-T signal. |
| C4 | Medium | Service pages lack depth for commercial terms | `/services/web3-mvp-development` etc. are 146–169 words in HTML. Competitive commercial keywords need 800–1,500 words with proof, process, pricing signals, and objections handled. |

---

## On-Page SEO — 60/100

### Findings

| # | Severity | Finding | Evidence |
|---|---|---|---|
| O1 | **Critical** | No subheadings anywhere | Full heading census across 25 pages: `{"h1": 24}`. Zero `h2`, `h3`, `h4`, `h5`, `h6`. |
| O2 | **High** | `/hire-khalid` orphaned | Scanned every `<a href>` in all 25 built pages. The only occurrence of the string `hire-khalid` is the page's **own** canonical tag. Zero inbound internal links. It *is* in the sitemap, so Google can find it — but it receives no internal link equity and users cannot reach it by clicking. |
| O3 | Medium | Title over 60 chars | `/hire-khalid` — **66** chars: `Hire Khalid Murtala — AI × Web3 Product Engineer | The Web3 Wizard` |
| O4 | Medium | Title over 60 chars | `/profile` — **61** chars: `Khalid Murtala — AI × Web3 Product Engineer | The Web3 Wizard` |
| O5 | Medium | Meta description over 160 chars | `/ai-agents` — **178** chars |
| O6 | Medium | Meta description over 160 chars | `/profile` — **161** chars |
| O7 | Low | Anchor text is bare page names | Nav renders as `Home | Services | Work | Insights | About | Contact`. Descriptive anchors ("Web3 MVP Development" rather than "Services") carry topical relevance. |

**What works:** titles are unique, keyword-front-loaded, and consistently branded. Descriptions are unique, action-oriented, and correctly sized on 22 of 24 pages. `/about` demonstrates the pattern well: `About | Khalid Murtala | The Web3 Wizard` (43 chars).

---

## Schema / Structured Data — 85/100

Strongest category. Coverage across 25 pages:

| Type | Count | Notes |
|---|---|---|
| `Person` | 24 | Excellent — sitewide entity anchoring |
| `BreadcrumbList` | 21 | Good — enables breadcrumb rich results |
| `SoftwareApplication` | 7 | Correct for the project pages |
| `Service` | 4 | Correct for service pages |
| `ProfessionalService` | 3 | Correct business-type signal |
| `Article` | 3 | Correct for insight posts |
| `WebSite` | 1 | Homepage |
| `FAQPage` | 1 | Homepage |

**Validation:** all JSON-LD parsed successfully. **Zero syntax errors** across every block.

**Findings**

| # | Severity | Finding |
|---|---|---|
| S1 | Medium | Only the homepage carries `FAQPage`. FAQ schema on service pages is a direct rich-result and AI-Overview play. |
| S2 | Medium | `Organization` absent. `ProfessionalService` covers the business, but `Organization` + `sameAs` (GitHub, LinkedIn, X) strengthens entity grounding for AI search. |
| S3 | Low | `Article` schema on insight posts should carry `author` (Person `@id` link), `datePublished`, and `dateModified`. |
| S4 | Low | No `Service` → `provider` → `Person` linkage to establish authorship for services. |

---

## Performance (CWV) — 70/100 *provisional*

**Not measurable in this environment.** Playwright was unavailable and no CrUX/PageSpeed credentials were configured, so this score is inferred from payload composition, not measured.

Bundle payload from `dist/public/assets`:

| Asset | Size |
|---|---|
| `vendor-*.js` | 225 KB |
| `index-*.js` | 187 KB |
| `index-*.css` | 127 KB |
| `assets/data-*.js` | 85 KB |
| `SiteSearch-*.js` | 48 KB |
| **Total** | **~672 KB** |

Observations and findings:

| # | Severity | Finding |
|---|---|---|
| P1 | Medium | ~672 KB of JS/CSS to serve a site whose HTML contains ~150 words. Heavy for a content/marketing surface — this is where LCP and INP risk concentrates. |
| P2 | Info | No images in HTML means no image-driven LCP cost. `khalid-murtala.webp` (169 KB) is the only large binary and is not referenced in markup. |
| P3 | Info | `SiteSearch` (48 KB) is loaded as a separate chunk — good, keeps it off the critical path. |
| P4 | **Unmeasured** | LCP / INP / CLS field values unknown. **Run PageSpeed Insights on the live URLs to complete this category.** |

---

## AI Search Readiness (GEO) — 35/100

This is the category with the largest gap between intent and reality.

### What works
- `robots.txt` explicitly allows GPTBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, and more. Deliberate and correct.
- `Person` schema sitewide gives AI systems a stable entity to anchor.
- Copy is specific and quotable in places — good raw material for citation.

### Findings

| # | Severity | Finding | Evidence |
|---|---|---|---|
| G1 | **Critical** | Permitted AI crawlers receive a stub | Crawlers that do not execute JS (GPTBot, ClaudeBot, PerplexityBot, CCBot) receive the ~150-word `<div id="root">` fallback, not the real page. The robots.txt invitation is therefore largely unrealised. |
| G2 | **High** | No `llms.txt` | `/llms.txt` not present. The site's own `seo-geo` reference covers the evidence for this; treat as optional but cheap. |
| G3 | **High** | No extractable passage structure | Zero `h2`/`h3` means no passage boundaries. AI Overviews and answer engines extract at passage granularity — flat pages are hard to quote. |
| G4 | Medium | No `Organization` entity or `sameAs` graph | AI systems resolve brands through entity links. `Person` alone is weaker than `Person` + `Organization` + `sameAs` to GitHub/LinkedIn/X. |
| G5 | Medium | Insight content too thin to be citation-worthy | 167–176 words in HTML. AI systems preferentially cite pages with developed, specific claims. |
| G6 | Low | Definition-style sentences absent | Answer engines reward extractable definitions ("X is…"). Current copy is benefit-led rather than definitional. |

---

## Images — 40/100

| # | Severity | Finding | Evidence |
|---|---|---|---|
| I1 | **High** | Zero `<img>` elements sitewide | Programmatic scan of all 25 pages: **0 images, 0 alt attributes, 0 srcset, 0 lazy-loading**. On a *portfolio*, this forfeits all image-search traffic. |
| I2 | **High** | One shared OG image for all 24 pages | Every page points `og:image` and `twitter:image` at the same `https://www.theweb3wizard.xyz/og-image.png` (20 KB). Per-project OG images would materially improve social CTR — especially for `/work/*`. |
| I3 | Medium | `khalid-murtala.webp` (169 KB) unused in markup | Present at `/images/khalid-murtala.webp` but referenced by no `<img>` tag. |
| I4 | Low | OG image is a 20 KB PNG | Likely below the 1200×630px ideal for large social cards. Consider WebP/AVIF and verify dimensions. |

---

## Addendum — Tool-Verified Checks

After the main analysis, the `claude-seo` runtime was brought online and its own scripts run against the live site.

**`sitemap_discovery.py`** — confirmed:
- `robots.txt` declares exactly one sitemap: `https://www.theweb3wizard.xyz/sitemap.xml`
- That sitemap is reachable (200), is a valid `urlset`, and passes validation
- Common-fallback probes (`/sitemap_index.xml` etc.) correctly 404

**`agentic_check.py`** — agent-readiness surface:

| Check | Priority | Result |
|---|---|---|
| Unknown URLs return a real 404 | P1 | ✅ **Pass** — `/claude-seo-404-probe-*` returns 404, no catch-all 200 |
| `llms.txt` | P1 | ❌ **Fail** — absent (confirms finding G2) |
| Markdown delivery | P1 | ℹ️ Info — no `text/markdown` negotiation, no `.md` sibling |
| `ai-catalog.json` (ARD) | P3 | ➖ N/A — only needed if publishing agent resources |
| OAuth / A2A / UCP well-known files | P2–P3 | ➖ N/A — not operating those services |

**Caveat:** several checks returned connect/read timeouts. Independent verification showed the site responding normally, so those are **environmental false negatives** from this machine's constrained outbound network, not site faults. Notably:

- `page-reachable` (P0) reported a timeout — **the site is reachable** (verified repeatedly via the fetch tooling, ~2s responses)
- `robots-reachable` (P0) reported a read timeout — **robots.txt is served correctly** with HTTP 200 (verified)

The genuine new signal is the **confirmed absence of `llms.txt`** and the lack of any Markdown delivery path.

---

## Scoring Method Notes

- Category scores are judgement-weighted against the evidence above, not machine-measured.
- **Performance is provisional** — no browser, no CrUX. Treat 70 as a placeholder until PageSpeed Insights is run.
- Business type detected as Professional Service; `seo-local` and `seo-ecommerce` checks were deliberately skipped as not applicable (no storefront, no physical location targeting).
- The `/googlea2084a1162bab0e0/` page is a **Google Search Console verification artifact**, not a content page. Its "thin content", missing title, and missing canonical are expected and are **not** findings.
