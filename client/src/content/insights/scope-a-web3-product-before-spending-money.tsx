/**
 * /insights/scope-a-web3-product-before-spending-money
 *
 * Hub article for the MVP-scoping cluster. Targets "how to scope a web3 mvp"
 * and "web3 mvp cost".
 *
 * Voice: first person, plain, no em dashes. Every claim about a project refers
 * to something real in client/src/site.ts. No invented clients or metrics.
 */
import { Link } from "wouter";

export default function ScopeAWeb3ProductBeforeSpendingMoney() {
  return (
    <>
      <p>
        I have killed products before I finished them. Not because the ideas were bad. Because I
        tried to build everything at once and ran out of time, money, and patience before I could
        learn anything real. Scoping is the part of building nobody wants to spend time on. But it
        is the part that decides whether you ship something or burn six months on something nobody
        asked for.
      </p>

      <h2>What "scoped" actually means</h2>
      <p>
        A scoped Web3 product is one where you can name the single user, the single situation, and
        the single action they need to complete, and you can explain it in two sentences without
        describing a roadmap.
      </p>
      <p>
        That definition is deliberately narrow. Scoping is not prioritising a feature list. It is
        deciding what the product is for, and accepting that everything else waits. Most scope
        documents I have seen are actually wish lists with dates attached, which is why they fall
        apart the first time a real user behaves unexpectedly.
      </p>

      <h2>One user, one moment</h2>
      <p>
        When I sit down to scope, I ask a different question than most founders do. Instead of
        "what should the product do?", I ask "who is struggling with what, right now, and what is
        the smallest thing I can build to make that struggle a little less painful?"
      </p>
      <p>
        You pick one user. One situation. One moment where they need to take an action and
        currently cannot. Everything else goes on a list and stays there.
      </p>
      <p>
        This is harder than it looks. You are close to your idea. You see the whole thing in your
        head. The temptation is to show people the full vision early and hope they get it. But a
        first version is not a solution. It is a learning device. It needs to be small enough to
        ship fast and clear enough that a real person can tell you whether it solved the right
        problem.
      </p>

      <h2>The five decisions that define scope</h2>
      <p>
        In practice, scope is decided by five questions. Everything else is downstream of these.
      </p>
      <ol>
        <li>
          <strong>Who is the one user?</strong> Not a persona. A specific person doing a specific
          job. "A founder checking whether a wallet is worth paying attention to" is a user. "Web3
          users" is not.
        </li>
        <li>
          <strong>What is the one action they complete?</strong> The product exists to move someone
          from a state they are stuck in to a state they want. If you cannot name that transition,
          the build has no finish line.
        </li>
        <li>
          <strong>What runs on-chain, and what does not?</strong> This is the most expensive
          decision in Web3 and the one most often made by default rather than on purpose. Every
          piece of state you put on-chain adds cost, latency, and failure modes that cannot be
          rolled back.
        </li>
        <li>
          <strong>How many chains and integrations are in version one?</strong> Each additional
          network or third-party API is a new data shape, new failure behaviour, and new edge cases.
        </li>
        <li>
          <strong>What decides whether it worked?</strong> Not a feeling. Something you can observe.
          A user completed the action, or they did not, and you can see which.
        </li>
      </ol>
      <p>
        Notice what is not on that list: features, screens, timelines, and technology choices.
        Those come after, and they are much easier once the five answers above exist.
      </p>

      <h2>What actually matters in a first version</h2>
      <p>
        You need four things. A user who genuinely has the problem you think they have. A workflow
        that works, even if it is rough. A way to observe whether it worked. And an honest note
        about what is not in it. That is it. Everything else is scope you added because it felt
        necessary, not because someone proved it was.
      </p>
      <p>
        In Web3 this cuts deep. Wallet integration, chain selection, token mechanics, the decision
        to put things on-chain versus off. Each one can double your build time without adding value
        for the person using the product. The question is not "should we support this chain" or
        "should we add a token." The question is "does this make the core problem easier to solve
        for the person who needs it right now?" If it does not, leave it out.
      </p>

      <h2>What to cut first when the budget is tight</h2>
      <p>
        When money is limited, the order matters. This is the order I would cut in, based on how
        much each item costs against how little it changes whether the product works.
      </p>
      <ol>
        <li>
          <strong>Second and third chains.</strong> Supporting a second network is not an API key
          swap. It changes data shapes, fee behaviour, and what users expect to happen. I built{" "}
          <Link href="/work/walletlens" className="inline-link">
            WalletLens
          </Link>{" "}
          across five EVM networks and{" "}
          <Link href="/work/orderflow" className="inline-link">
            OrderFlow
          </Link>{" "}
          on a single chain on purpose. Reading one chain well beats reading five shallowly.
        </li>
        <li>
          <strong>Accounts, roles, and permissions.</strong> Team features, admin panels, and
          multi-user access are almost never what proves the idea. They are what a mature product
          needs, and you are not there yet.
        </li>
        <li>
          <strong>The dashboard nobody asked for.</strong> Every roadmap has one. If the core action
          does not require a chart, the chart can wait until someone requests it.
        </li>
        <li>
          <strong>Token mechanics.</strong> A token is not a product feature. It is an economic
          system, and it comes with legal, regulatory, and trust costs that do not belong in a first
          version.
        </li>
        <li>
          <strong>Polished visual design.</strong> Interface clarity matters enormously, and I would
          never cut it. Decorative polish is different. Legible and plain beats beautiful and late.
        </li>
      </ol>
      <p>
        The one thing I would not cut is the failure path. Products lose users in the moments
        something goes wrong, and a first version with no error handling just teaches you the wrong
        lesson faster.
      </p>

      <h2>What a Web3 MVP costs</h2>
      <p>
        Real numbers, not ranges designed to sound safe. My published starting points are{" "}
        <Link href="/pricing.md" className="inline-link">
          listed in full on the pricing page
        </Link>{" "}
        and they break down like this:
      </p>
      <ul>
        <li>
          <strong>Product and technical discovery: from $750.</strong> Usually three to seven days.
          You get a written direction instead of a build.
        </li>
        <li>
          <strong>A focused AI agent or integration: from $2,500.</strong> Usually one to two weeks.
          One defined capability, built and handed over.
        </li>
        <li>
          <strong>A focused product build: from $6,000.</strong> Usually three to eight weeks.
          Frontend, backend, integrations, deployment, handover.
        </li>
        <li>
          <strong>Embedded capacity: from $2,000 per month.</strong> For teams that need ongoing
          engineering rather than a one-off build.
        </li>
      </ul>
      <p>
        Those are starting points. What actually moves the number is the five decisions above, not
        how impressive the idea is. A product with one workflow, one chain, and one integration sits
        at the low end. Add a second network, an admin surface, and a multi-step onboarding flow and
        you have doubled it without making the core action any better.
      </p>
      <p>
        The cheapest useful thing you can buy is clarity about what to build. That is also the
        purchase most founders skip, because it does not feel like progress.
      </p>

      <h2>Red flags in a scope document</h2>
      <p>
        I have watched scopes blow up, including some of my own. These are the patterns that
        predicted it.
      </p>
      <ul>
        <li>
          <strong>"And then the user can..."</strong> repeated more than twice. Scope creep rarely
          announces itself. It arrives as a sequence of reasonable next steps.
        </li>
        <li>
          <strong>No named user.</strong> If the document describes "users" or "people" or "the
          community" rather than one person in one situation, nothing in it can be validated.
        </li>
        <li>
          <strong>A timeline with no acceptance criteria.</strong> If nobody wrote down what done
          looks like, the build ends when someone gets tired, which is usually after the budget.
        </li>
        <li>
          <strong>Features that only make sense after launch.</strong> Analytics dashboards,
          referral systems, and notification preferences are all things you need after you have
          users, not before.
        </li>
        <li>
          <strong>Any sentence beginning "it will be easy to add later."</strong> Sometimes true.
          Usually the thing that is easy to add later is the thing that should have been added
          later. Say it out loud and then actually defer it.
        </li>
        <li>
          <strong>No stated non-goals.</strong> A scope with no exclusions is not a scope. It is an
          agreement to argue later.
        </li>
      </ul>

      <h2>A worked example: deciding what SolPulse was not</h2>
      <p>
        <Link href="/work/solpulse" className="inline-link">
          SolPulse
        </Link>{" "}
        is a Solana monitoring experiment. Raw wallet activity on Solana is noisy, and the useful
        question is not whether something happened. It is whether it deserves attention. Most
        monitoring tools do not make that distinction, so they hand you more noise than you started
        with.
      </p>
      <p>
        The scope decision that made it buildable was choosing what it would not do. It would not
        support every wallet. It would not give trading signals. It would not try to explain the
        whole market. It would watch a defined set of wallets, filter what it saw, and send a small
        number of readable alerts to Telegram.
      </p>
      <p>
        Three of the decisions in that build are the same three I would make again on any monitoring
        product. Prefer a small number of meaningful signals over a wall of events. Keep the alert
        language plain enough to understand without a protocol background. And treat the thing as an
        experiment, which means writing down what has not been verified instead of implying that it
        has.
      </p>
      <p>
        The build also taught me something that shaped how I scope everything since. The lesson was
        not that alerts are hard to generate. It was that an alert is only useful when the person
        receiving it understands why it matters. That is a product problem, not a data problem, and
        it is exactly the kind of thing a scope document should surface before anyone writes code.
      </p>

      <h2>The standard I work to</h2>
      <p>
        A well-scoped product is one you can explain in two sentences, build in weeks not months,
        and test with real people before the money runs out. That is the standard I work to, and it
        is what I help founders get to.
      </p>
      <p>
        If you want to see what the reasoning looks like when it turns into a written direction,{" "}
        <Link href="/services/product-discovery" className="inline-link">
          the discovery engagement
        </Link>{" "}
        is where that happens. If you already know what you are building and just want it built,
        the scoping choices above are still the ones worth arguing about before anyone starts.
      </p>
    </>
  );
}
