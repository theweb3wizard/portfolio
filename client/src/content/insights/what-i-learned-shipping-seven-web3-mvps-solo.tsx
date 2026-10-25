/**
 * /insights/what-i-learned-shipping-seven-web3-mvps-solo
 *
 * Flagship retrospective and designated link magnet. Targets "web3 mvp lessons".
 *
 * Every lesson here maps to a real project in client/src/site.ts and to the
 * lesson already recorded on that project. Nothing is invented, and the post
 * states that all seven are founder-built rather than client work.
 */
import { Link } from "wouter";

export default function WhatILearnedShippingSevenWeb3MvpsSolo() {
  return (
    <>
      <p>
        I have shipped seven working Web3 products on my own. Personal projects, not client work, and
        every one of them is public with a live demo and a repository you can open. This is the
        honest version of what changed in how I build, with one lesson attached to each project that
        taught it.
      </p>
      <p>
        I am writing it down because the advice I read before starting was mostly about technology
        choice, and technology choice was almost never the thing that decided whether a project
        worked.
      </p>

      <h2>What I expected before I started</h2>
      <p>
        I expected the hard part to be code. I assumed that if I could get the implementation right,
        the rest would follow, and that the difference between a project that worked and one that did
        not would be visible in the repository.
      </p>
      <p>
        It was not. The code was rarely the reason anything failed. What failed was the definition of
        finished, the failure paths nobody built, and the assumptions about what a user would
        understand. Every one of those is a product decision, and none of them show up in a commit
        history.
      </p>

      <h2>1. The hard part is deciding what not to build</h2>
      <p>
        My monitoring experiment{" "}
        <Link href="/work/solpulse" className="inline-link">
          SolPulse
        </Link>{" "}
        works because of what it refuses to do. It does not cover every wallet, it does not issue
        trading signals, and it does not try to explain the whole market. It watches a defined set,
        filters what it sees, and sends a small number of readable alerts to Telegram.
      </p>
      <p>
        The lesson was not that alerts are hard to generate. It was that an alert only matters when
        the person receiving it understands why it matters. That is a product problem, and it is
        easier to solve by narrowing what the product does than by adding intelligence to it. I have
        applied the same reasoning to every scope decision since, which is what{" "}
        <Link href="/insights/scope-a-web3-product-before-spending-money" className="inline-link">
          writing a scope down
        </Link>{" "}
        is actually for.
      </p>

      <h2>2. Every integration is a failure mode, not a feature</h2>
      <p>
        <Link href="/work/walletlens" className="inline-link">
          WalletLens
        </Link>{" "}
        covers five EVM networks.{" "}
        <Link href="/work/orderflow" className="inline-link">
          OrderFlow
        </Link>{" "}
        covers one. The difference in effort was not proportional, and it taught me that adding a
        chain is not an API key swap. Each network brings different data shapes, different fee
        behaviour, and different things that can be slow or missing.
      </p>
      <p>
        So "we support five chains" is not five times the value. It is five times the surface where
        something can be subtly wrong in a way a user cannot detect. I now treat every integration as
        two pieces of work: the feature, and the failure behaviour of that feature. Most builds skip
        the second one because it is invisible in a demo and it is the only part that matters in
        production.
      </p>

      <h2>3. An agent's refusal list matters more than its capabilities</h2>
      <p>
        <Link href="/work/valor" className="inline-link">
          Valor
        </Link>{" "}
        is an AI agent that runs inside Telegram. The design decision that mattered most was not what
        it could answer. It was what it would decline to attempt.
      </p>
      <p>
        An agent with no refusal list is confident about everything, which means a user cannot tell
        the difference between an answer it knows and one it invented. Once that distinction is
        gone, every answer is worth the same amount, which is nothing. The same principle turned into
        the whole design of{" "}
        <Link href="/work/agenthub" className="inline-link">
          AgentHub
        </Link>
        , where the permission boundary is the product and the model is just a caller.
      </p>

      <h2>4. When the data is already public, the interface is the product</h2>
      <p>
        On-chain data is public. That is not the same as usable. Building WalletLens taught me that
        the interface design of a data tool matters as much as the data itself, because a wall of
        accurate numbers is still a wall. The chain data was never the hard part. Deciding what to
        show first, what to summarise, and what to leave out was.
      </p>
      <p>
        That reframed how I think about "data products" generally. If your value proposition is that
        you can read something the user could technically read themselves, then your entire value is
        the interpretation layer. Spending your time on more data sources instead of better
        interpretation is choosing to be unnecessary.
      </p>

      <h2>5. If the output is not actionable, it is not useful</h2>
      <p>
        <Link href="/work/orderflow" className="inline-link">
          OrderFlow
        </Link>{" "}
        reads a trader's on-chain history on Injective and points at where they are losing money. The
        lesson it taught me is that analysis is only useful when it points to a specific,
        evidence-backed action.
      </p>
      <p>
        There is a comfortable version of this kind of product where the output is a rich report that
        is interesting to read and changes nothing. It gets praised and it gets abandoned. Anchoring
        every observation to the user's own recorded activity was the decision that made it a
        product instead of a dashboard.
      </p>

      <h2>6. Boundaries have to be written down to exist</h2>
      <p>
        <Link href="/work/spellbook" className="inline-link">
          Spellbook
        </Link>{" "}
        is a marketplace for Web3 AI agents with USDT or USDC checkout and milestone-tracked
        handover. The most useful thing I learned building it was commercial rather than technical:
        conversions depend on complete transparency about deliverables, operating boundaries, and who
        owns the ongoing API and hosting costs.
      </p>
      <p>
        Vague confidence loses more sales than limits do. A buyer who knows exactly what they are
        getting, and exactly what they are responsible for afterwards, can make a decision. A buyer
        who cannot tell is deciding whether to trust you, and that is a much harder question for them
        to answer.
      </p>
      <p>
        The related lesson came from{" "}
        <Link href="/work/agenthub" className="inline-link">
          AgentHub
        </Link>
        : audit trails are only useful if they are easy to read, not just technically present.
        Boundaries that exist only in a configuration file are not boundaries a human can act on. If
        a person approving an action cannot understand what they are approving, you have built
        ceremony rather than control.
      </p>

      <h2>7. Shipping changes what "done" means</h2>
      <p>
        <Link href="/work/write3" className="inline-link">
          Write3
        </Link>{" "}
        generates Web3-native content for X, Discord, Telegram, Farcaster, and blogs. It taught me
        that AI tools are most useful when they reduce one specific friction rather than replace the
        whole workflow. The platform formatting was non-trivial and worth building explicitly. The
        bigger ambition was not.
      </p>
      <p>
        <Link href="/work/community-signal" className="inline-link">
          Community Signal
        </Link>{" "}
        is still in progress, and it has already taught me something I now apply everywhere:
        community tools work best when they remove a real piece of manual work rather than create a
        new channel. Distribution is not a substitute for product value.
      </p>
      <p>
        Across all seven, the pattern is the same. Before launch, "done" means the feature works.
        After launch, "done" means someone else can use it without you, the credentials are theirs,
        the failure states are handled, and the limitations are written down. Almost everything I
        would now call engineering is in that second definition, and almost none of it gets discussed
        before the first one.
      </p>

      <h2>What I would do differently</h2>
      <ul>
        <li>
          <strong>Write the limitations list before the build, not after.</strong> Every project
          forces you to confront what is unproven. Doing that first changes what you choose to build.
        </li>
        <li>
          <strong>Cut more chains, earlier.</strong> Five was a choice I would now make later, if at
          all. One chain done properly teaches you more.
        </li>
        <li>
          <strong>Spend less time on breadth of features and more on the first thirty seconds.</strong>{" "}
          Users decide whether to trust a product before they complete anything meaningful.
        </li>
        <li>
          <strong>Put the failure path in the first version, every time.</strong> It is the cheapest
          insurance available and the thing I am most tempted to defer when I am running late.
        </li>
      </ul>

      <h2>Why I wrote this down</h2>
      <p>
        Because if you are about to spend money on a Web3 product, the most useful thing I can offer
        is not a tool list. It is the specific reasoning behind decisions that cost me real time, and
        the willingness to say which of them I got wrong.
      </p>
      <p>
        I am early in this business. I do not have client case studies to show you, and I am not
        going to pretend the projects above are anything other than what they are. What I can tell
        you is that each one is running in public, and that every lesson in this post came from
        something I had to fix in a real product rather than something I read.
      </p>
    </>
  );
}
