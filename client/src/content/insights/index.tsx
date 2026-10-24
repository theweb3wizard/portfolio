/**
 * client/src/content/insights/index.tsx
 *
 * Registry of insight article bodies, keyed by slug.
 *
 * Adding an article touches four places:
 *   1. this file (the body component)
 *   2. client/src/site.ts (the `insights` array: title, description, category, reading time)
 *   3. server/meta.ts and shared/routeMeta.ts (title, description, schema)
 *   4. vite-plugin-ssg-meta.ts SSG_ROUTES, client/public/sitemap.xml, client/public/llms.txt
 *
 * The prerender step fails the build if a page in SSG_ROUTES renders fewer than
 * 60 words, so an empty or forgotten body cannot ship silently.
 */
import type { ComponentType } from "react";

import ScopeAWeb3ProductBeforeSpendingMoney from "./scope-a-web3-product-before-spending-money";
import WhyAWeb3PrototypeCanFail from "./why-a-web3-prototype-can-fail";
import UseAiWithoutBlindlyTrustingIt from "./use-ai-without-blindly-trusting-it";
import WhatILearnedShippingSevenWeb3MvpsSolo from "./what-i-learned-shipping-seven-web3-mvps-solo";

import {
  WhatIsAnAiAgentInWeb3,
  WhatIsAWeb3Mvp,
  WhatIsAProductDiscoverySprint,
  WhatIsWalletIntelligence,
} from "./definitional";

import { HowMuchDoesAWeb3MvpCost, Web3AgencyVsFreelancer } from "./commercial-a";
import { DoINeedASmartContractAudit, HowToEvaluateAWeb3Developer } from "./commercial-b";

export const INSIGHT_BODIES: Record<string, ComponentType> = {
  // ── Hub articles ────────────────────────────────────────────────────────────
  "scope-a-web3-product-before-spending-money": ScopeAWeb3ProductBeforeSpendingMoney,
  "why-a-web3-prototype-can-fail": WhyAWeb3PrototypeCanFail,
  "use-ai-without-blindly-trusting-it": UseAiWithoutBlindlyTrustingIt,
  "what-i-learned-shipping-seven-web3-mvps-solo": WhatILearnedShippingSevenWeb3MvpsSolo,

  // ── Definitional posts ──────────────────────────────────────────────────────
  "what-is-an-ai-agent-in-web3": WhatIsAnAiAgentInWeb3,
  "what-is-a-web3-mvp": WhatIsAWeb3Mvp,
  "what-is-a-product-discovery-sprint": WhatIsAProductDiscoverySprint,
  "what-is-wallet-intelligence": WhatIsWalletIntelligence,

  // ── Commercial-intent posts ─────────────────────────────────────────────────
  "how-much-does-a-web3-mvp-cost": HowMuchDoesAWeb3MvpCost,
  "web3-agency-vs-freelancer": Web3AgencyVsFreelancer,
  "do-i-need-a-smart-contract-audit": DoINeedASmartContractAudit,
  "how-to-evaluate-a-web3-developer": HowToEvaluateAWeb3Developer,
};

/** Slugs in publication order, newest first. Used by the insights index and nav. */
export const INSIGHT_SLUGS = Object.keys(INSIGHT_BODIES);

export function hasInsightBody(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(INSIGHT_BODIES, slug);
}
