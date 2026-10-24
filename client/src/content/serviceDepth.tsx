/**
 * client/src/content/serviceDepth.tsx
 *
 * Long-form editorial depth for the three service pages.
 *
 * Why this is separate from SitePages.tsx:
 *   The service pages were bullet lists (~450 words). Competitive commercial
 *   terms need prose that handles process, cost, exclusions and objections,
 *   with real outbound citations. Keeping that copy here means SitePages.tsx
 *   stays a layout file rather than becoming a content dump.
 *
 * House style for everything in this file:
 *   First person, answer-first, plain language, no em dashes, no hype words.
 *   Every factual claim is either about work Khalid actually built (see
 *   client/src/site.ts) or cites a primary source that was link-checked.
 */

import type { ReactNode } from "react";
import { Link } from "wouter";
import type { ServiceKey } from "@shared/serviceFaqs";

/** Outbound citation. Kept as a component so rel/target cannot be forgotten. */
function Cite({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-link">
      {children}
    </a>
  );
}

const productDiscovery = (
  <>
    <p>
      A product discovery sprint is a short, fixed piece of work that turns a problem,
      idea, or rough requirement into a build-ready product direction. It answers three
      questions in writing: what should be built first, what should deliberately not be
      built yet, and what the first working version actually looks like.
    </p>

    <h2>The problem discovery actually solves</h2>
    <p>
      Most early-stage products do not fail because the engineering was too slow. They fail
      because the wrong thing got built carefully. Someone had a real problem, translated it
      into a feature list under pressure, and months later shipped something users could not
      finish using.
    </p>
    <p>
      I have made that mistake myself. I built out features that felt obviously necessary and
      watched the thing sit unused, because I had never decided which single action the product
      existed to make easier. Discovery exists to make that decision before it costs a build.
    </p>
    <p>
      In Web3 the risk is sharper than usual. Wallet connection, chain selection, token
      mechanics, and on-chain versus off-chain decisions can each double the work without
      making the product more useful to the person holding it. Those are scope decisions
      disguised as technical ones, and they are easiest to get right before there is code.
    </p>

    <h2>How the sprint runs</h2>
    <p>
      The shape below is typical for a five day engagement. It is a sequence, not a rigid
      calendar. What matters is that each step happens before the next one depends on it.
    </p>
    <h3>Days one and two: understand the situation</h3>
    <p>
      I want to know what you are trying to accomplish, how you handle it today, where it
      becomes painful, and how often it happens. I also want to know what happens if nothing
      changes, because that is usually where the real priority is hiding. If there is an
      existing product or prototype, I will use it rather than take a description of it.
    </p>
    <h3>Day three: map the alternatives</h3>
    <p>
      Before proposing software, I check whether software is the answer. Sometimes the honest
      recommendation is a process change, a better interface on something you already own, or
      no software change at all. Discovery is allowed to conclude that, and it should.
    </p>
    <h3>Day four: define the user and the workflow</h3>
    <p>
      One user, one situation, one moment where they need to take an action and currently
      cannot. Everything else becomes a list of things you are not building yet. This is the
      step clients tell me was most useful afterwards, and it is the one they were least
      expecting.
    </p>
    <h3>Days five to seven: scope, assess, write it down</h3>
    <p>
      A written direction covering the problem statement, the target user, the core workflow,
      the MVP boundary, a technical feasibility assessment, and the risks worth knowing about
      before anyone opens an editor. You keep it whether or not we work together afterwards.
    </p>

    <h2>What decides the cost and the length</h2>
    <p>
      Discovery starts from $750 and typically runs three to seven days. Three things move
      the number:
    </p>
    <ul>
      <li>
        <strong>How much is already known.</strong> A founder who has spoken to twenty users
        starts further along than one working from a hunch.
      </li>
      <li>
        <strong>How many people have to be involved.</strong> A solo founder can do this in a
        few conversations. A team with a technical lead, a product owner, and an external
        stakeholder needs more.
      </li>
      <li>
        <strong>Whether there is existing code to read.</strong> Reviewing a real repository
        takes longer than discussing a greenfield idea, but it produces a much more specific
        answer.
      </li>
    </ul>
    <p>
      Scope and price are agreed in writing before anything starts. The{" "}
      <Link href="/pricing.md" className="inline-link">
        published pricing page
      </Link>{" "}
      lists the same figures.
    </p>

    <h2>What is explicitly not included</h2>
    <ul>
      <li>Formal market research or a full competitive analysis.</li>
      <li>A guarantee of product-market fit. Nobody can sell you that honestly.</li>
      <li>Investor materials, pitch decks, or financial modelling.</li>
      <li>A production design system, or a polished interface.</li>
      <li>An open-ended engagement. The scope is fixed on purpose.</li>
    </ul>
    <p>
      If what you actually need is a finished product, discovery is the wrong purchase. It is
      the cheaper purchase, which is exactly why it comes first.
    </p>

    <h2>How to tell whether it worked</h2>
    <p>
      You should be able to explain what you are building in two sentences, name the person it
      is for, and describe the first action they take. You should be able to say what you are
      deliberately not building and why. And you should know which parts of the idea rest on
      assumptions nobody has tested yet, rather than discovering that during the build.
    </p>
    <p>
      If those three things are clear at the end, the sprint did its job. A worked example of
      the same reasoning applied to a live product is in{" "}
      <Link href="/insights/scope-a-web3-product-before-spending-money" className="inline-link">
        how to scope a Web3 MVP
      </Link>
      .
    </p>
  </>
);

const web3MvpDevelopment = (
  <>
    <p>
      A Web3 MVP is the smallest working version of a product that lets one real user complete
      the single action the product exists for. Not a demo, not a clickable prototype, and not
      a reduced version of your roadmap. One action, working properly, in front of real people.
    </p>

    <h2>Why scope decides the outcome</h2>
    <p>
      Most Web3 builds I have seen go wrong did not go wrong in the code. They went wrong in
      the definition of finished. The team agreed on a feature list instead of an outcome, so
      there was no point at which anyone could say the work was done.
    </p>
    <p>
      That definition matters more in Web3 than in most software because the failure states
      are expensive and unfamiliar. A user who is confused by network switching does not file
      a bug report, they leave. A transaction that reverts without a readable message does not
      look like an error, it looks like your product is broken. A token approval that grants
      broader access than the user intended is not a bug you patch after launch.
    </p>
    <p>
      The Ethereum provider interface that wallets implement is documented, and the approval
      mechanism is a standard part of it, but that does not make either of them obvious to a
      first time user. The <Cite href="https://eips.ethereum.org/EIPS/eip-1193">EIP-1193 provider specification</Cite>{" "}
      and the <Cite href="https://eips.ethereum.org/EIPS/eip-20">ERC-20 approval model</Cite>{" "}
      are the primary references for both. A build that treats them as an implementation
      detail rather than a user-experience problem will lose users who work perfectly fine
      everywhere else.
    </p>

    <h2>How a build actually runs</h2>
    <p>
      Weeks overlap in practice. This is the sequence of work, not a promise about a calendar,
      and every build gets its own schedule before it starts.
    </p>
    <h3>Week one: lock the scope and stand up the skeleton</h3>
    <p>
      We agree the one action, the one user, and the boundary in writing. Then I put the
      skeleton in place: the app shell, the data model, the deployment pipeline. Something
      deployable exists early so we are never guessing about whether it can ship.
    </p>
    <h3>Weeks two and three: build the core workflow</h3>
    <p>
      This is the part that must work. Not the surrounding features, not the settings screen.
      The single path a user takes to complete the action. I would rather have one workflow
      that holds up under a distracted user than five that work when nothing goes wrong.
    </p>
    <h3>Weeks four and five: integrations</h3>
    <p>
      Wallet connection, on-chain reads and writes, AI features, notifications, third-party
      APIs. Each integration is treated as a source of failure, not just a source of
      functionality, which means the failure path gets built at the same time as the happy
      path.
    </p>
    <h3>Weeks six and seven: states, errors, and the unglamorous parts</h3>
    <p>
      Loading, empty, pending, failed, retrying, done. Plain-language error messages. A
      visible record of what happened and what it cost. This is the work that separates a
      product from a demo and the work most builds skip when they are running late.
    </p>
    <h3>Week eight: deployment and handover</h3>
    <p>
      Deployment support, documentation, credential ownership transferred to you, and a
      written list of known limitations. You should finish the engagement knowing exactly what
      you own and what remains unproven.
    </p>

    <h2>The four decisions that decide the cost</h2>
    <ul>
      <li>
        <strong>On-chain or off-chain.</strong> Every piece of state you move on-chain adds
        cost, latency, and irreversible failure modes. Some of it is essential. Some of it is
        a decision someone made before the product was understood.
      </li>
      <li>
        <strong>How many chains.</strong> Supporting a second chain is not an API key swap. It
        changes data shapes, fee behaviour, and user expectations, which is why{" "}
        <Link href="/work/walletlens" className="inline-link">
          WalletLens
        </Link>{" "}
        handles five EVM networks and why reading one chain properly was the deliberate choice
        behind{" "}
        <Link href="/work/orderflow" className="inline-link">
          OrderFlow
        </Link>
        .
      </li>
      <li>
        <strong>How much of the user journey is in version one.</strong> Onboarding, accounts,
        billing, and admin surfaces are usually the difference between a focused build and a
        long one.
      </li>
      <li>
        <strong>Where AI genuinely helps.</strong> AI belongs where a task needs
        interpretation, extraction, or judgement. It does not belong where a deterministic
        rule would do the job more reliably and more cheaply.
      </li>
    </ul>

    <h2>Cost and timeline, stated plainly</h2>
    <p>
      Focused product builds start from $6,000 and typically run three to eight weeks. A
      narrow product with one workflow and one integration sits at the short end. Multiple
      chains, complex wallet flows, several user roles, or a substantial AI component sit at
      the long end.
    </p>
    <p>
      The full range across engagements, including smaller starting points, is on the{" "}
      <Link href="/pricing.md" className="inline-link">
        pricing page
      </Link>
      . Prices are indicative starting points. The written scope comes before any number is
      treated as final.
    </p>

    <h2>What is explicitly not included</h2>
    <ul>
      <li>
        Smart-contract audits, penetration testing, or security certification. If your
        contract holds real value, it needs a dedicated auditor. See{" "}
        <Link href="/insights/do-i-need-a-smart-contract-audit" className="inline-link">
          whether you need a smart contract audit
        </Link>
        .
      </li>
      <li>A guarantee of adoption, growth, or product-market fit.</li>
      <li>Token economics, financial modelling, or investment advice.</li>
      <li>Unlimited revisions or open-ended scope expansion.</li>
      <li>
        Ongoing maintenance as a default. It is available as a separate engagement, agreed
        after the build.
      </li>
    </ul>

    <h2>How to tell whether it worked</h2>
    <p>
      A real person who was not in the room can complete the core action without help. You own
      the code and the credentials. You know what is not finished, because it is written down
      rather than implied. And the next version has an obvious starting point because the
      limitations list became the backlog.
    </p>
  </>
);

const aiAgentSolanaEngineering = (
  <>
    <p>
      An AI agent in Web3 is a system that takes a defined input, reasons about it, and
      performs a bounded action, with the boundary written down and enforced. The reasoning is
      the new part. The boundary is what makes it safe to put near anything that matters.
    </p>

    <h2>Start with what the agent is not allowed to do</h2>
    <p>
      The most important design decision in an agent is its refusal list. A system that
      confidently invents an answer is more dangerous than one that says it does not know,
      because the failure is invisible until someone acts on it. Every agent I build has a
      written capability boundary, and that boundary is tested rather than assumed.
    </p>
    <p>
      This is not a stylistic preference. The{" "}
      <Cite href="https://genai.owasp.org/llm-top-10/">OWASP Top 10 for LLM Applications</Cite>{" "}
      names prompt injection and excessive agency among the most serious risks in systems built
      on language models, and both are boundary problems. The{" "}
      <Cite href="https://www.nist.gov/itl/ai-risk-management-framework">NIST AI Risk Management Framework</Cite>{" "}
      frames the same concern as a governance question: who is accountable when the system
      acts, and how is that accountability made real. In a domain where an action can move
      irreversible value, "the model decided" is not an acceptable answer.
    </p>

    <h2>Human in the loop, in practice</h2>
    <p>
      Human in the loop means a person authorises any action that cannot be undone. In
      practice that is not one pattern, it is a small set of them, and the right one depends
      on how bad the worst case is.
    </p>
    <ul>
      <li>
        <strong>Pre-approval.</strong> The agent proposes, a human confirms, then it executes.
        Correct for transfers, approvals, and contract calls.
      </li>
      <li>
        <strong>Spend and rate limits.</strong> The agent acts freely inside a hard ceiling and
        escalates above it. Correct for high frequency, low value operations.
      </li>
      <li>
        <strong>Dry runs.</strong> The agent produces the exact action it would take without
        taking it, so the output can be inspected before it is trusted.
      </li>
      <li>
        <strong>Escalation.</strong> The agent recognises uncertainty and hands the decision to
        a person instead of choosing. Correct whenever the cost of a wrong guess is high.
      </li>
    </ul>
    <p>
      I built these patterns into{" "}
      <Link href="/work/agenthub" className="inline-link">
        AgentHub
      </Link>
      , an access layer that sits between an AI coding assistant and the databases, APIs, and
      infrastructure it needs to touch. It enforces least-privilege access, keeps an audit
      trail of what the agent did, and routes high-risk operations to a human for approval
      rather than blocking all sensitive access. That trade-off is the whole point: an agent
      with no access is useless, and an agent with unrestricted access is a liability.
    </p>
    <p>
      A working example of a bounded agent in production is{" "}
      <Link href="/work/valor" className="inline-link">
        Valor
      </Link>
      , which runs inside Telegram and is constrained by an explicit system boundary rather
      than left to improvise.
    </p>

    <h2>Where agents genuinely earn their place</h2>
    <p>
      Agents are worth building where a task requires interpretation and happens often enough
      that a human doing it is expensive. In Web3 that tends to be four areas:
    </p>
    <ul>
      <li>
        <strong>Support and community.</strong> Answering the same thirty questions in
        different words, at whatever hour they arrive.{" "}
        <Cite href="https://core.telegram.org/bots/api">Telegram</Cite> and Discord are usually
        where this workload lives.
      </li>
      <li>
        <strong>Monitoring and signal.</strong> Turning a firehose of on-chain events into a
        small number of things worth a human's attention.{" "}
        <Link href="/work/solpulse" className="inline-link">
          SolPulse
        </Link>{" "}
        is a deliberately narrow version of this: filtering Solana wallet activity down to
        readable alerts instead of a wall of transactions.
      </li>
      <li>
        <strong>Analysis and review.</strong> Reading history and pointing at something
        specific.{" "}
        <Link href="/work/orderflow" className="inline-link">
          OrderFlow
        </Link>{" "}
        does this on Injective, anchoring every observation to the trader's own on-chain
        record rather than generic advice.
      </li>
      <li>
        <strong>Developer and operational tooling.</strong> Agents that hold context across a
        long task, reach the systems involved, and produce something reviewable. This is the
        gap the{" "}
        <Cite href="https://modelcontextprotocol.io/">Model Context Protocol</Cite> addresses
        for tool access, and the gap AgentHub addresses for permissions.
      </li>
    </ul>
    <p>
      One thing that is deliberately not on that list: financial advice, trading signals, and
      price prediction. Not because it is technically difficult, but because an agent that
      sounds confident about a market outcome is producing harm with extra steps.
    </p>

    <h2>How the engagement runs</h2>
    <p>
      A defined capability, typically one to two weeks, starting from $2,500.
    </p>
    <ol>
      <li>
        <strong>Define the capability.</strong> The task, the input, the expected output, and
        the conditions under which it must refuse.
      </li>
      <li>
        <strong>Agree the boundary.</strong> What it can reach, what it can spend, what
        requires approval, and what is logged.
      </li>
      <li>
        <strong>Build.</strong> The agent itself, plus the interface it appears in and the
        integration it depends on.
      </li>
      <li>
        <strong>Test behaviour, not just output.</strong> What it does with an ambiguous input,
        a malformed input, an adversarial input, and an upstream failure.
      </li>
      <li>
        <strong>Hand over.</strong> Documentation, the capability boundary, the refusal list,
        and credentials you own.
      </li>
    </ol>
    <p>
      On the chain side, integration work covers Solana and EVM networks. Solana has its own
      model for how a transaction is considered final, which is settlement-commitment
      dependent rather than a simple confirmed flag, and it is documented in the{" "}
      <Cite href="https://solana.com/developers/cookbook/transactions/confirmation">
        Solana confirmation guide
      </Cite>
      . Getting that wrong produces a product that tells users a transaction is done when it
      is not, which is the kind of error that costs trust permanently.
    </p>

    <h2>What is explicitly not included</h2>
    <ul>
      <li>Smart-contract audits, penetration testing, or security certification.</li>
      <li>
        Self-modifying or self-deploying agents. An agent that can rewrite its own boundaries
        has no boundaries.
      </li>
      <li>Guaranteed on-chain transaction outcomes. Network conditions are not yours to promise.</li>
      <li>Ongoing agent maintenance without a separate engagement.</li>
      <li>Undefined or open-ended capability scope.</li>
    </ul>

    <h2>How to tell whether it worked</h2>
    <p>
      The agent handles its defined task and refuses everything outside it, visibly and
      consistently. Anything irreversible still requires a person. You can reconstruct what it
      did and why from the logs. And when something upstream changes, the failure is legible
      rather than silent.
    </p>
    <p>
      The reasoning behind the approval patterns above is written up in{" "}
      <Link href="/insights/use-ai-without-blindly-trusting-it" className="inline-link">
        how to use AI in Web3 without blindly trusting it
      </Link>
      .
    </p>
  </>
);

export const SERVICE_DEPTH: Record<ServiceKey, ReactNode> = {
  productDiscovery,
  web3MvpDevelopment,
  aiAgentSolanaEngineering,
};
