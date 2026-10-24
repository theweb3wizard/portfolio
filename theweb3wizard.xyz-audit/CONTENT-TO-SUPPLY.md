# Content Spec — what to write, and where it goes

**For:** Khalid
**Written:** 23 Oct 2026
**Purpose:** you said you'd supply the content. This tells you exactly what's needed, in priority order, so I can drop it in without guesswork.

Everything technical is already done (`PHASE-1-RESULTS.md`). From here, **content depth and backlinks are the only two things standing between you and ranking** (`RANKING-PLAN.md`).

---

## How to hand content to me

For each page, any of these works:

1. **Paste it into chat** with the page path as a heading
2. **A markdown file** in `theweb3wizard.xyz-audit/content/` named after the route (e.g. `insights-scope-a-web3-product.md`)
3. **Rough bullets** — I'll shape them into prose and keep your voice

**Always include H2/H3 headings** where you want them. That's what generates the passage structure AI answer engines extract.

Don't worry about word count precision, keyword placement, or meta descriptions — I'll handle those.

---

## P0 — Do these first (biggest ranking unlock)

Your three existing insight articles are now 558–576 words. For topical authority they should be the **longest** pages on the site. Each of the three below becomes a hub for a content cluster.

### 1. `/insights/scope-a-web3-product-before-spending-money`

**Target:** 1,200–1,800 words · **Keywords:** `how to scope a web3 mvp`, `web3 mvp cost`

| Section (H2) | What needs to be in it |
|---|---|
| What "scoped" actually means | One plain definition sentence. Answer engines extract this. |
| The five decisions that define scope | Your real list — what must be decided before building |
| What to cut first when budget is tight | Specific, opinionated, ranked |
| What a Web3 MVP costs | Real ranges. Refer to your own `/pricing.md` figures. |
| Red flags in a scope document | Signs a scope will blow up — from experience |
| A worked example | Walk through one of your seven projects as the example |

> **Needs from you:** your actual price ranges, and one real project used as the worked example.

### 2. `/insights/why-a-web3-prototype-can-fail`

**Target:** 1,200–1,800 words · **Keyword:** `why web3 prototypes fail`

| Section (H2) | What needs to be in it |
|---|---|
| The failure modes I've actually seen | Real, specific, ideally anonymised examples |
| The moment it usually goes wrong | The pattern, not the symptom |
| Test earlier than feels comfortable | What you'd do differently |
| What to measure | Concrete signals, not vanity metrics |
| Definitional sentence | "A Web3 prototype fails when…" |

> **Needs from you:** genuine (anonymised) war stories. This is your strongest E-E-A-T asset and nobody else can write it.

### 3. `/insights/use-ai-without-blindly-trusting-it`

**Target:** 1,200–1,800 words · **Keywords:** `ai agent guardrails`, `human in the loop ai agent`

| Section (H2) | What needs to be in it |
|---|---|
| Where AI goes wrong in Web3 | Specific failure classes — irreversible transactions, hallucinated addresses |
| The control points | Where a human must approve |
| Approval patterns that work | Tie to what you built in AgentHub |
| What to log and why | Observable agent behaviour |
| Definitional sentence | "Human-in-the-loop means…" |

> **Needs from you:** how AgentHub actually implements this — it's live proof, so link it.

### 4. Service pages — add depth **and** FAQs

Currently 405–496 words. Competitive commercial terms want 800–1,500 with proof, process, and objections handled.

| Page | Target words | Must include |
|---|---|---|
| `/services/web3-mvp-development` | 900–1,400 | Who it's for · week-by-week process · deliverables · price range · what it does **not** include · 4–6 FAQs |
| `/services/product-discovery` | 800–1,200 | Same structure · 4–6 FAQs |
| `/services/ai-agent-solana-engineering` | 800–1,200 | Same structure · 4–6 FAQs |

**The FAQs are a two-for-one:** they add depth *and* unlock `FAQPage` schema on those pages (the only remaining schema gap — the pattern already exists on your homepage).

> **Needs from you:** the FAQs. Real questions prospects ask you. Give me the question and a 2–4 sentence answer each.

---

## P1 — New pages (rank fast, low competition)

Short, answer-first posts. 400–700 words each. Lead with a one-sentence definition.

### Definitional posts — cheap to write, disproportionately likely to be quoted by AI answer engines

| Suggested URL | Definition to open with |
|---|---|
| `/insights/what-is-an-ai-agent-in-web3` | "An AI agent in Web3 is…" |
| `/insights/what-is-a-web3-mvp` | "A Web3 MVP is…" |
| `/insights/what-is-a-product-discovery-sprint` | "A product discovery sprint is…" |
| `/insights/what-is-wallet-intelligence` | "Wallet intelligence is…" |

### Commercial-intent posts

| Suggested URL | Why it's winnable |
|---|---|
| `/insights/how-much-does-a-web3-mvp-cost` | High-intent question, thin competition. You already have the numbers. |
| `/insights/web3-agency-vs-freelancer` | Comparison content ranks well; positions your solo-studio model honestly |
| `/insights/do-i-need-a-smart-contract-audit` | You already answer this in your FAQ |
| `/insights/how-to-evaluate-a-web3-developer` | Buyer-intent; naturally funnels to `/hire-khalid` |

---

## P2 — Project breakdowns (your link magnet)

**This is the highest-leverage content you can write, and nobody else can write it.** Each published product becomes a technical post that ranks for the product name *and* the stack terms, earns links from developers, and proves capability better than any testimonial.

One post per project, 1,200–2,000 words. Structure: the problem → the approach → the decisions and trade-offs → what I'd change.

| Working title | Also ranks for |
|---|---|
| Building a Telegram AI agent with TypeScript and the OpenAI API | `telegram ai agent typescript` |
| Querying EVM wallets in natural language | `evm wallet intelligence api` |
| Designing least-privilege access for AI coding agents | `ai agent database permissions` |
| Building an AI trading journal on Injective | `injective trading journal` |
| Filtering Solana wallet noise into useful signals | `solana wallet alerts telegram` |
| **What I learned shipping seven Web3 MVPs solo** | `web3 mvp lessons` ← **write this one first; it's the link magnet** |

> **Needs from you:** the technical narrative. Raw notes are fine.

---

## Global improvements (apply across existing pages)

These are small but they compound:

| Item | What's needed |
|---|---|
| **Definitional sentences** | Every page gets one clear `"X is…"` sentence near the top. Answer engines extract definitions. |
| **Editorial citations** | When you make a technical claim, link to the primary source — Solana docs, an EIP, a paper. You already have 275 outbound links, but they're social/navigational, not editorial. |
| **Real project screenshots** | `/work/*` pages use inline SVG art, so image search gets nothing. Real screenshots with descriptive filenames and alt text. Even 2–3 per project helps. |
| **Nav anchor text** *(optional)* | Nav currently reads `Work | Services | AI Agents | Insights | About | Hire Khalid`. Descriptive anchors carry more topical relevance. Tell me the wording if you want it changed. |

---

## Priority order if you're short on time

If you can only do a few things, do these in order:

1. **The FAQs on the three service pages** — smallest effort, unlocks FAQPage schema, adds ~300 words each
2. **`/insights/scope-a-web3-product-before-spending-money`** — deepest existing hub
3. **The four definitional posts** — 400 words each, highest AI-citation payoff
4. **"What I learned shipping seven Web3 MVPs solo"** — your single best link-earning asset
5. Everything else

---

## While you write: build authority

Content gets you indexed. **Links get you ranked.** Running in parallel, not after:

1. **Every project repo gets a README link** back to its `/work/*` page — free, permanent, on-topic
2. **Answer real questions** in Solana/Injective Discords, Superteam, r/solana, r/ethdev. Link only when genuinely relevant.
3. **Free directories:** Crunchbase, F6S, Product Hunt (launch Spellbook properly)
4. **Web3 developer newsletters** accept guest posts far more readily than Google-focused blogs

One genuine link from a real Web3 developer resource beats fifty directory listings.
