# Action Plan — theweb3wizard.xyz

Ordered by impact-per-hour. Phase 1 is almost entirely configuration and copy — no redesign.

---

## Phase 1: Critical Fixes — Week 1

### 1.1 Make page content visible without JavaScript
**Severity: Critical · Effort: Medium · Impact: Very High**

The shipped HTML contains a ~150-word stub while the React component holds 91 KB of content. Everything below depends on this.

The stub is authored in `vite-plugin-ssg-meta.ts` around line 332 (`const bodyContent`), then injected into `<div id="root">` at line 343.

**Do this:** expand `bodyContent` per route so the static HTML carries the *same* substance as the React page — all section headings as real `<h2>`/`<h3>`, paragraphs, and the project list. React still replaces it in browsers; nothing changes visually.

- Verify each route's stub is 600+ words minimum, 1,000+ for service pages and articles
- Keep the text a faithful summary of the rendered page (mismatched stubs confuse crawlers)
- Confirm with `curl` — the HTML alone should now tell the full story

**How you'll know it worked:** `curl https://www.theweb3wizard.xyz/services/web3-mvp-development/ | grep -c "<h2"` returns more than zero; word count in raw HTML exceeds 600.

---

### 1.2 Add heading structure to every page
**Severity: Critical · Effort: Low · Impact: High**

Current census across 25 pages: `{"h1": 24}` — **zero** subheadings anywhere.

**Do this:**
- Every major section gets an `<h2>`
- Sub-sections get `<h3>`
- Never skip a level (no `h1` → `h3`)
- Phrase headings as questions or claims where natural — these become snippet and AI-Overview extraction targets

**How you'll know it worked:** heading census shows a healthy `h2` and `h3` count on every page.

---

### 1.3 Fix the `/hire-khalid` orphan
**Severity: Critical (commercial) · Effort: Trivial · Impact: High**

`/hire-khalid` is your conversion page and **nothing on the site links to it.** Verified by scanning every `<a href>` across all 25 pages — the only match was the page's own canonical tag.

**Do this:**
- Add "Hire Khalid" to the primary nav (currently `Home | Services | Work | Insights | About | Contact`)
- Add it to the footer nav
- Add a contextual CTA on every `/services/*` page and every `/work/*` case study
- Use descriptive anchor text: "Hire Khalid for an AI agent build" — not "Click here"

**How you'll know it worked:** the next audit reports `/hire-khalid` with inbound links; ideally it becomes one of the most-linked pages on the site.

---

### 1.4 Redirect non-www to www
**Severity: High · Effort: Trivial · Impact: Medium**

`https://theweb3wizard.xyz/about` returns **200**, not a redirect. Both hostnames serve byte-identical content. Add to `vercel.json`:

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

`trailingSlash: false` also collapses the `/about` vs `/about/` duplication (both currently return 200).

**How you'll know it worked:** `curl -I https://theweb3wizard.xyz/about` returns `301` with a `Location` header.

---

### 1.5 Fix over-length titles and descriptions
**Severity: Medium · Effort: Trivial · Impact: Medium**

| URL | Field | Current | Limit |
|---|---|---|---|
| `/hire-khalid` | title | `Hire Khalid Murtala — AI × Web3 Product Engineer \| The Web3 Wizard` (66) | ≤60 |
| `/profile` | title | `Khalid Murtala — AI × Web3 Product Engineer \| The Web3 Wizard` (61) | ≤60 |
| `/ai-agents` | description | 178 chars | ≤160 |
| `/profile` | description | 161 chars | ≤160 |

Suggested rewrites:

```
/hire-khalid  →  Hire Khalid Murtala | AI & Web3 Product Engineer       (48)
/profile      →  Khalid Murtala | AI-Native Web3 Product Engineer      (50)
```

For the descriptions, front-load the value and cut the tail — the first 150 characters are what gets shown, so make those count.

---

## Phase 2: High-Impact Improvements — Weeks 2–3

### 2.1 Deepen the three insight articles
**Severity: High · Effort: High · Impact: Very High**

All three posts ship 167–176 words. These should be your longest pages.

Target 1,500–2,500 words each. Structure per post:
- One clear thesis stated in the first 60 words
- `<h2>` per argument, `<h3>` per sub-point
- A concrete example from your own projects (Valor, WalletLens, Write3, AgentHub, OrderFlow)
- One definitional sentence per key concept ("A Web3 prototype is…") — these get extracted by answer engines
- A closing section that answers "so what should I do?"

Priority order by search intent:
1. `why-a-web3-prototype-can-fail`
2. `scope-a-web3-product-before-spending-money`
3. `use-ai-without-blindly-trusting-it`

---

### 2.2 Deepen service pages for commercial keywords
**Severity: High · Effort: High · Impact: Very High**

Service pages are 146–169 words — too thin to rank for commercial terms.

Target 800–1,500 words per service page. Include:
- What the engagement actually is, step by step
- Who it's for and who it isn't (you already do this well — expand it)
- A typical timeline and what you need from the client
- Concrete proof: link each named project
- Objection handling: cost drivers, timelines, what happens if scope changes
- FAQ block with `FAQPage` schema (see 3.1)

---

### 2.3 Add images — and use them
**Severity: High · Effort: Medium · Impact: High**

Zero `<img>` tags sitewide, on a portfolio. This forfeits image-search traffic entirely.

**Do this:**
- Add real screenshots to every `/work/*` case study (`khalid-murtala.webp` already exists and is unused)
- Descriptive `alt` text naming the project and what's shown — not "screenshot"
- Always set `width` and `height` (prevents CLS)
- `loading="lazy"` below the fold; `fetchpriority="high"` on the hero
- Serve WebP or AVIF; add `srcset` for responsive sizes
- Add a professional photo to `/about` and `/profile`

**How you'll know it worked:** next audit reports non-zero image counts with alt text on all of them.

---

### 2.4 Per-page OG images
**Severity: Medium · Effort: Medium · Impact: Medium**

All 24 pages share one 20 KB `og-image.png`. Every `/work/*` and `/insights/*` page should have its own social card — this directly affects click-through when your links get shared on X, LinkedIn, and in Discord/Telegram communities.

---

### 2.5 Add outbound citations
**Severity: Medium · Effort: Low · Impact: Medium**

Every page currently has `external=0` — zero outbound links anywhere.

For a technical-authority site, linking to primary sources (Solana docs, Google Search Central, relevant papers, project repos you admire) is a genuine E-E-A-T signal. It shows you're part of the discourse rather than asserting into a vacuum.

**Rule:** link to primary sources only, 2–4 per article, and never to direct competitors.

---

## Phase 3: Schema & Entity Depth — Month 2

### 3.1 Add `FAQPage` to service pages
**Severity: Medium · Effort: Low · Impact: High**

Only the homepage has `FAQPage` today. Adding a 4–6 question FAQ to each `/services/*` page is the highest-leverage schema change available — it targets rich results and AI Overviews simultaneously, and gives you structured content to write anyway.

### 3.2 Add `Organization` + `sameAs`
**Severity: Medium · Effort: Low · Impact: Medium**

Currently `Person` sitewide, no `Organization`. Add an `Organization` node with `sameAs` pointing to GitHub, LinkedIn, and X. This lets AI systems resolve "The Web3 Wizard" as a stable entity rather than inferring it from page text.

### 3.3 Strengthen `Article` schema
**Severity: Low · Effort: Low · Impact: Medium**

Add `author` (linked to the `Person` `@id`), `datePublished`, and `dateModified` to all three insight posts. Wire `Service` → `provider` → `Person` on service pages to establish authorship.

### 3.4 Consider `llms.txt`
**Severity: Low · Effort: Trivial · Impact: Low–Medium**

Add `/llms.txt` listing your key pages and a one-line description of each. Cheap, and it gives AI systems a curated entry point. Treat it as a bonus, not a substitute for 1.1.

---

## Phase 4: Measurement & Monitoring — Ongoing

### 4.1 Complete the Performance category
The audit scored Performance as **provisional (70)** because no browser or CrUX data was available.

**Do this:**
- Run PageSpeed Insights on `/`, `/services/web3-mvp-development`, `/hire-khalid` (free, no API key needed for the web UI)
- Record real LCP / INP / CLS
- If PSI is poor, the ~672 KB JS bundle is the first suspect

### 4.2 Set up drift monitoring
The `seo-drift` skill captures a baseline of SEO-critical elements and diffs against it later. Run it now, before making changes, so Phase 1–3 work is provably attributable.

```
@seo-drift baseline https://www.theweb3wizard.xyz
```

### 4.3 Re-audit after Phase 1
Re-run this audit after Phase 1 lands. Expected movement:

| Category | Now | After Phase 1 |
|---|---|---|
| Content Quality | 55 | 70 |
| On-Page SEO | 60 | 80 |
| AI Search Readiness | 35 | 60 |
| Technical SEO | 78 | 88 |
| **Overall** | **63** | **~75** |

Phase 2 is what moves the needle on rankings; Phase 1 is what stops the current ceiling.

---

## Do Not Do

These are **not** findings — do not spend time on them:

- `/googlea2084a1162bab0e0/` missing title, canonical, and OG tags. It is a **Google Search Console verification file**. Expected behaviour.
- `/privacy` and `/terms` missing from the sitemap. Normal and often intentional.
- Missing `keywords` meta tag. Obsolete since 2009; Google ignores it.
- Adding an `AMP` version. No ranking benefit, and Google stopped favouring it.
- Any paid SEO tooling. Everything in Phase 1–3 is doable with free tooling and writing time.
