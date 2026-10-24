/**
 * client/src/content/insights/definitional.tsx
 *
 * Four short, answer-first posts. Each opens with a one-sentence definition
 * because that is the sentence an AI answer engine is most likely to extract.
 *
 * Targets:
 *   /insights/what-is-an-ai-agent-in-web3
 *   /insights/what-is-a-web3-mvp
 *   /insights/what-is-a-product-discovery-sprint
 *   /insights/what-is-wallet-intelligence
 */
import { Link } from "wouter";

export function WhatIsAnAiAgentInWeb3() {
  return (
    <>
      <p>
        An AI agent in Web3 is a system that takes a defined input, reasons about it using a language
        model, and performs a bounded action against wallets, contracts, or on-chain data, with the
        limits of that action written down and enforced.
      </p>

      <h2>The three parts, and which one people forget</h2>
      <p>
        There are three parts: an input, a reasoning step, and an action. Most conversation about
        agents focuses on the reasoning, because that is the new and interesting part. The part that
        decides whether an agent is usable in Web3 is the action, and specifically how narrow it is.
      </p>
      <p>
        A bounded action means the agent does one defined thing with a defined range of acceptable
        outcomes, and refuses everything else. In most software a wrong action is annoying. In Web3 a
        wrong action can move value that cannot be recovered, which is why the boundary is the
        engineering work and the model is the easy part.
      </p>

      <h2>How an agent differs from a bot</h2>
      <p>
        A bot responds to a trigger with a fixed response. An agent reasons over messy input and
        decides what to do. That difference is real, and it is also smaller than it sounds. Many
        things sold as agents are triggers with extra steps, and many things that genuinely need
        reasoning get built as bots and fail on the inputs nobody anticipated.
      </p>
      <p>
        The practical test is what happens with an input the designer did not expect. A bot does
        something unhelpful and predictable. An agent invents a plausible response, which is either
        the value or the danger depending on how the boundary was set.
      </p>

      <h2>What an AI agent in Web3 is not</h2>
      <ul>
        <li>
          <strong>A chatbot with a personality.</strong> Conversation is an interface, not a
          capability. An agent that chats and does nothing is a support widget.
        </li>
        <li>
          <strong>A smart contract.</strong> Contracts execute deterministic rules on-chain. An
          agent reasons off-chain and may call a contract. They solve different problems.
        </li>
        <li>
          <strong>Autonomous by default.</strong> Autonomy is a design choice you grant, action by
          action. Where an action is irreversible, the correct design is a person approving it.
        </li>
        <li>
          <strong>Something that needs a token.</strong> A token changes the economics and the
          regulatory picture. It does not make the agent work better.
        </li>
      </ul>

      <h2>Where one actually earns its place</h2>
      <p>
        Agents are worth building where a task needs interpretation and happens often enough that a
        human doing it is expensive. In Web3 that tends to be support and community questions,
        monitoring that turns a firehose into a small number of signals, analysis that points at a
        specific next action, and developer or operations tooling that holds context across a long
        task.
      </p>
      <p>
        Two of my projects are working examples.{" "}
        <Link href="/work/valor" className="inline-link">
          Valor
        </Link>{" "}
        runs inside Telegram and is constrained by an explicit system boundary rather than allowed to
        improvise.{" "}
        <Link href="/work/agenthub" className="inline-link">
          AgentHub
        </Link>{" "}
        is the permission layer that decides what an agent is allowed to reach, with human approval
        for high-risk operations.
      </p>
      <h2>The five questions that decide whether it is worth building</h2>
      <p>
        Most agent projects fail at the specification stage rather than the build stage, and the
        specification is usually one paragraph long. These are the five questions I write down before
        anything else.
      </p>
      <ol>
        <li>
          <strong>What triggers it?</strong> If the answer is that a person asks it something, you are
          building a search box with an ongoing bill attached.
        </li>
        <li>
          <strong>What is the one action it takes?</strong> One. An agent with three actions has three
          failure modes and usually no single owner for any of them.
        </li>
        <li>
          <strong>What happens when it is wrong?</strong> If the answer is that value moves and cannot
          be moved back, the design needs a human gate rather than a better prompt.
        </li>
        <li>
          <strong>How often does the task happen?</strong> An agent that runs twice a week has to be
          simpler than one that runs two thousand times a day, because nobody will notice the slow one
          drifting.
        </li>
        <li>
          <strong>What does it cost to run?</strong> Every message it reads and every chain call it
          makes is a line on a bill. If that cost scales with the noisiest thing your users do, the
          economics will decide the product whether or not you do.
        </li>
      </ol>

      <h2>Where the running cost actually goes</h2>
      <p>
        An agent that touches Web3 has two meters running: model calls and chain data. Model calls are
        cheap individually and expensive in volume. Chain reads are cheap individually and expensive
        the moment a provider rate limits you and the retries begin.
      </p>
      <p>
        The design move that matters most is putting cheap logic in front of the expensive step. Valor
        discards the majority of messages using filters written in plain code, before a single model
        call happens. That is not an optimisation added afterwards. It is the reason the economics work
        at all.
      </p>

      <p>
        The design question I start with is not what the agent should do. It is what the agent should
        refuse to do. That reasoning is written up in{" "}
        <Link href="/insights/use-ai-without-blindly-trusting-it" className="inline-link">
          how to use AI in Web3 without blindly trusting it
        </Link>
        .
      </p>
    </>
  );
}

export function WhatIsAWeb3Mvp() {
  return (
    <>
      <p>
        A Web3 MVP is the smallest working version of a product that lets one real user complete the
        single action the product exists for, with every on-chain interaction handled safely enough
        that a mistake does not cost them anything.
      </p>

      <h2>Why the Web3 version is different</h2>
      <p>
        A normal MVP can be rough because mistakes are cheap and reversible. Four properties of Web3
        break that assumption.
      </p>
      <ul>
        <li>
          <strong>Actions are irreversible.</strong> A transfer or approval cannot be rolled back, so
          the failure path has to exist in version one rather than in version two.
        </li>
        <li>
          <strong>The wallet is the identity.</strong> There is no password reset and no support
          ticket that fixes a wrong address. Onboarding has to be designed rather than assumed.
        </li>
        <li>
          <strong>Every action costs money.</strong> Users pay for their own writes. A product that
          quietly wastes fees is a product people stop using.
        </li>
        <li>
          <strong>State is public.</strong> Anything you put on-chain is visible to everyone
          permanently, which is a product decision as much as a technical one.
        </li>
      </ul>
      <p>
        None of that means a Web3 MVP should be bigger. It means the definition of "smallest
        working" has to include the failure behaviour, because the failure behaviour is what users
        remember.
      </p>

      <h2>What belongs in version one</h2>
      <ul>
        <li>One user, one situation, one action they complete.</li>
        <li>The core workflow, working end to end.</li>
        <li>Visible states: loading, pending, failed, done.</li>
        <li>Error messages a non-technical person can understand.</li>
        <li>A visible record of what happened and what it cost.</li>
        <li>A written list of what is deliberately missing.</li>
      </ul>

      <h2>What does not belong in version one</h2>
      <p>
        Second and third chains. Accounts, roles, and team permissions. Analytics dashboards. Token
        mechanics. Settings screens with more than three options. Any feature that only makes sense
        once you have users, which is most of them.
      </p>
      <p>
        The order in which to cut these, and the reasoning behind it, is in{" "}
        <Link href="/insights/scope-a-web3-product-before-spending-money" className="inline-link">
          how to scope a Web3 MVP before spending money
        </Link>
        . The short version is that each one adds a data shape, a failure mode, or a legal cost
        without making the core action any easier.
      </p>

      <h2>The four decisions that set the size of the build</h2>
      <p>
        Scope in a Web3 MVP is not decided by the feature list. It is decided by four things, and each
        one can double the work without making the product any more useful to the person using it.
      </p>
      <ol>
        <li>
          <strong>How many chains.</strong> Every additional chain is a second data shape, a second
          wallet flow, a second set of failure messages, and a second provider to pay. Ship one until a
          real user asks for the second.
        </li>
        <li>
          <strong>Whether money moves.</strong> Reading chain state is a display problem. Moving value
          is a custody, accounting, and irreversibility problem, and it changes what testing means.
        </li>
        <li>
          <strong>Who owns the failure path.</strong> When a transaction fails halfway, does the product
          tell the user something true and offer a next step, or does it go quiet? Answering that
          properly is a feature, not polish.
        </li>
        <li>
          <strong>How much discovery is already done.</strong> A written direction removes the expensive
          part of a build, which is deciding what to build. Without one, the first week of engineering
          becomes a discovery sprint nobody scoped or paid for.
        </li>
      </ol>

      <h2>A worked example of cutting scope</h2>
      <p>
        Valor started as a general community assistant and became one bounded action: score a message,
        pay the contributor. The general version had more features and no defensible failure boundary.
        The narrow version can be described in a single sentence, which means its failure modes can be
        listed in a single paragraph, which means they can actually be tested.
      </p>
      <p>
        Spellbook went the other way. It is a marketplace with checkout, provisioning, and handover, and
        the scope is large on purpose because the workflow is the product. That is a legitimate larger
        build. The point is that its size was chosen rather than accumulated, and the difference shows
        up in how precisely each project can state what it does not do.
      </p>

      <h2>How you know it worked</h2>
      <p>
        A person who was not in the room completes the action without being walked through it. You
        can see that it happened. You know what is unproven, because it is written down. And the next
        version has an obvious starting point, because the limitations list became the backlog.
      </p>
      <p>
        If that standard sounds narrow, it is meant to be. The{" "}
        <Link href="/services/web3-mvp-development" className="inline-link">
          focused product build
        </Link>{" "}
        exists to hit exactly that and nothing wider, because every attempt I have seen to widen it
        early has cost more time without producing more learning.
      </p>
    </>
  );
}

export function WhatIsAProductDiscoverySprint() {
  return (
    <>
      <p>
        A product discovery sprint is a short, fixed piece of work that turns a problem, idea, or
        rough requirement into a written product direction: the user, the core workflow, the MVP
        boundary, and an honest assessment of what is technically feasible.
      </p>

      <h2>What it produces</h2>
      <ul>
        <li>A defined problem statement and the one user it is for.</li>
        <li>The core workflow, described as the sequence a person actually goes through.</li>
        <li>What to build first, and what to defer, with reasons.</li>
        <li>Where on-chain behaviour is genuinely required and where it is not.</li>
        <li>A feasibility assessment and the risks worth knowing before anyone writes code.</li>
      </ul>
      <p>
        It is written down, and you keep it whether or not you build with me afterwards. That matters
        more than it sounds. A direction that lives only in a conversation cannot be reviewed, argued
        with, or handed to an engineer.
      </p>

      <h2>What it is not</h2>
      <ul>
        <li>
          <strong>A consultation call.</strong> Calls produce opinions. A sprint produces a document
          with specific decisions in it.
        </li>
        <li>
          <strong>Market research or a competitive analysis.</strong> Useful work, but it is not what
          this is.
        </li>
        <li>
          <strong>A guarantee of product-market fit.</strong> Nobody can sell you that honestly, and
          anyone who does is selling you something else.
        </li>
        <li>
          <strong>Design work.</strong> Interface clarity gets discussed because it affects scope. A
          production design system is a separate purchase.
        </li>
        <li>
          <strong>A pitch deck.</strong> If you need investor materials, that is a different
          engagement.
        </li>
      </ul>

      <h2>What the days actually look like</h2>
      <p>
        A sprint runs three to seven days depending on how much is already decided. The shape is
        consistent, and it is deliberately front-loaded on understanding rather than on producing
        documents.
      </p>
      <ul>
        <li>
          <strong>Days one and two: understand the situation.</strong> What the product is for, who the
          user is, what they do today instead, and what has already been tried and abandoned.
        </li>
        <li>
          <strong>Day three: map the alternatives.</strong> Including the ones that do not involve
          software, because some of those are cheaper and better.
        </li>
        <li>
          <strong>Day four: define the user and the workflow.</strong> One user, one action, described
          as a sequence rather than as a feature list.
        </li>
        <li>
          <strong>Days five to seven: scope, assess, write it down.</strong> The version one boundary,
          the technical unknowns, the risks, and a recommendation.
        </li>
      </ul>

      <h2>How to judge the document you get back</h2>
      <p>
        A useful direction document has three properties. It names a single user rather than a market
        segment. It contains at least one decision you disagree with, because a document nobody can
        argue with was not making decisions. And it states plainly what it does not know, which is the
        part that tells you whether the author was honest with you.
      </p>
      <p>
        If it reads like a proposal for the build that would follow it, you were sold a pitch rather
        than discovery. That is the failure mode worth watching for, and it is the reason the sprint is
        written to stand on its own whether or not you build with me afterwards.
      </p>

      <h2>When it is the wrong purchase</h2>
      <p>
        If you already know exactly what you are building and why, discovery is an expensive way to
        hear it back. Go build. The value here comes from genuine uncertainty about what the first
        version should be, or from a disagreement inside the team that nobody has resolved because
        there was nothing concrete to argue about.
      </p>

      <h2>When it pays for itself</h2>
      <p>
        It pays for itself the first time it stops you building a feature that would have taken weeks
        and changed nothing. In practice that happens often enough that I treat discovery as the
        default starting point rather than an upsell. My published starting point is $750 for three
        to seven days, which is a fraction of the smallest product build, and it is{" "}
        <Link href="/pricing.md" className="inline-link">
          listed with the other engagements
        </Link>
        .
      </p>
      <p>
        The full detail on what is included, what is not, and the questions I ask is on{" "}
        <Link href="/services/product-discovery" className="inline-link">
          the product discovery sprint page
        </Link>
        .
      </p>
    </>
  );
}

export function WhatIsWalletIntelligence() {
  return (
    <>
      <p>
        Wallet intelligence is the practice of turning raw on-chain wallet activity into a readable
        answer about what an address has been doing, what it holds, and whether any of it deserves
        attention.
      </p>

      <h2>The problem it solves</h2>
      <p>
        On-chain data is public. That does not make it usable. A block explorer will show you every
        transaction an address has made, in order, with contract calls and token movements listed as
        separate events. That is accurate and it is close to unreadable for anyone who is not already
        fluent in reading it.
      </p>
      <p>
        The gap is interpretation. A founder who wants to know whether a wallet is worth paying
        attention to does not need a transaction list. They need an answer, with the evidence
        attached.
      </p>

      <h2>What it looks like in practice</h2>
      <p>
        <Link href="/work/walletlens" className="inline-link">
          WalletLens
        </Link>{" "}
        is my working example. You paste an address and get back a report: a risk score from 0 to 100,
        a portfolio breakdown, NFT holdings, the last twenty transactions, and a summary of what the
        behaviour looks like. It covers Ethereum, Polygon, BNB Chain, Arbitrum, and Base, because
        opening five different explorers to answer one question is exactly the friction the tool exists
        to remove.
      </p>
      <p>
        It is read-only. There is no wallet connection, no signature, and no key, which means the tool
        cannot move anything even if it wanted to. The input is deliberately a single address rather
        than a question box, because a founder who does not know which chain a counterparty uses cannot
        write a good question about it.
      </p>
      <p>
        Building it taught me that the interface matters as much as the data. The chain data was
        never the hard part, since it is public. The hard part was deciding what to show first, what
        to summarise, and what to leave out. A wall of accurate numbers is still a wall.
      </p>
      <p>
        The same lesson appeared again in{" "}
        <Link href="/work/orderflow" className="inline-link">
          OrderFlow
        </Link>
        , which reads on-chain trading history and points at specific patterns rather than producing a
        general report. Analysis is only useful when it points to something a person can act on.
      </p>

      <h2>What it is not</h2>
      <ul>
        <li>
          <strong>Not surveillance of private people.</strong> It reads public chain data. If
          something is not on-chain, it is not in the answer.
        </li>
        <li>
          <strong>Not deanonymisation.</strong> Connecting an address to a real-world identity is a
          different activity, and not one I build for.
        </li>
        <li>
          <strong>Not financial advice.</strong> It describes what happened and what is held. It does
          not tell anyone what to buy, sell, or hold.
        </li>
        <li>
          <strong>Not real-time settlement truth.</strong> Data comes from third-party indexers and
          explorer APIs, so it can lag or be rate limited. A tool that hides that will eventually be
          confidently wrong.
        </li>
      </ul>

      <h2>What makes a read like this trustworthy</h2>
      <p>
        Three things separate a useful wallet report from a confident-sounding guess.
      </p>
      <p>
        The first is putting the evidence next to the conclusion. A risk score on its own is a number
        nobody can check. A risk score beside the transactions that produced it can be argued with,
        which is the entire point of showing it.
      </p>
      <p>
        The second is labelling inference as inference. "This wallet has moved funds through three
        contracts that other tools have flagged" is a fact. "This wallet is untrustworthy" is a
        judgement, and it should be presented as one rather than as a finding.
      </p>
      <p>
        The third is admitting what the data cannot show. A wallet with no history and a wallet with a
        clean history look similar and are not the same thing. A tool that does not say so is
        manufacturing confidence it has not earned, and the person acting on it will eventually be
        surprised.
      </p>
      <p>
        That is also the boundary between a report and advice. Describing what an address has done is a
        data problem and one I am happy to solve. Telling somebody what to do about it is a different
        service, and not one I provide.
      </p>

      <h2>Where it is heading</h2>
      <p>
        The useful direction is the same one the whole domain is moving in: less data, more meaning.
        Filtering ten thousand events into the three that matter is a product decision, and it is
        harder than showing all ten thousand. My{" "}
        <Link href="/work/solpulse" className="inline-link">
          SolPulse
        </Link>{" "}
        experiment applied the same reasoning to Solana wallet monitoring, on the theory that a
        focused monitoring workflow beats a larger data surface.
      </p>
      <p>
        If you are building something in this space, the failure modes to design against are in{" "}
        <Link href="/insights/why-a-web3-prototype-can-fail" className="inline-link">
          why a Web3 prototype fails when real users touch it
        </Link>
        .
      </p>
    </>
  );
}
