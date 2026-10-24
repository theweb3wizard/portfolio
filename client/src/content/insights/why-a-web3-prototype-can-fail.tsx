/**
 * /insights/why-a-web3-prototype-can-fail
 *
 * Hub article for the prototype-failure cluster. Targets "why web3 prototypes fail".
 *
 * Honesty constraint: the failure modes below are drawn from Khalid's own
 * founder-built projects (see client/src/site.ts) because he has no client
 * engagements to anonymise yet. The article says so plainly rather than
 * inventing anonymous clients.
 */
import { Link } from "wouter";

export default function WhyAWeb3PrototypeCanFail() {
  return (
    <>
      <p>
        I have shipped prototypes that worked perfectly on my machine and fell apart the moment
        someone else tried them. Web3 makes this worse than most domains because the user is
        expected to know things that most people have never heard of. A prototype that works on your
        screen often creates a wall of confusion for the first real person who touches it.
      </p>

      <h2>What "failed" actually means</h2>
      <p>
        A Web3 prototype fails when the first person who did not build it cannot complete the core
        action without being talked through it. Not when it crashes. Not when a test goes red.
        Crash, red test, and broken build are all easy to find because the machine tells you. The
        failure that kills prototypes is silent: the user stops, gets confused, and leaves without
        saying anything.
      </p>
      <p>
        That definition matters because it changes what you test. If success means "the happy path
        works," you will test the happy path and pass. If success means "a stranger can finish the
        task," you have to put a stranger in front of it, and that is a much more uncomfortable
        afternoon.
      </p>

      <h2>The moment it usually goes wrong</h2>
      <p>
        The failure almost never happens at the moment you notice it. By the time a user is stuck,
        the decision that stranded them was made weeks earlier, quietly, while you were solving a
        different problem.
      </p>
      <p>
        The pattern is consistent. A decision gets made about what happens when everything works,
        and no matching decision gets made about what happens when it does not. The wallet connects,
        so the connected state gets designed. The transaction confirms, so the pending state gets
        skipped. The API responds, so the timeout path never exists. Each of those is a reasonable
        local decision. Together they produce a product with one path through it, and that path
        requires everything to go right.
      </p>
      <p>
        In Web3 the "everything goes right" assumption is much weaker than usual. Wallets reject
        requests. Users sit on the wrong network. Transactions revert. Approval amounts get set to
        values the user did not intend. None of these are rare, and all of them are invisible to
        someone testing their own build, because the builder instinctively avoids the states they
        know are unfinished.
      </p>

      <h2>The failure modes I have actually seen</h2>
      <p>
        A note on sourcing, because it matters. I am early in this business and I do not have client
        engagements to anonymise. So everything below comes from my own builds: seven deployed
        projects and a few experiments. I would rather give you real observations from my own work
        than invent client stories I cannot stand behind.
      </p>
      <h3>Assuming the user knows what you know</h3>
      <p>
        The first thing that breaks is the assumption that the user knows what you know. A wallet
        connection flow, a transaction confirmation, gas fees, network switching, token approvals.
        These are routine to someone who builds in Web3 every day. To everyone else, they are a
        chain of unfamiliar decisions with no clear answer.
      </p>
      <p>
        When your prototype assumes knowledge your user does not have, the product feels broken even
        when it works. The wallet interface that wallets implement is a published standard rather
        than a secret, but published and obvious are not the same thing. A user who has connected a
        wallet once and been burned by an approval prompt does not read your flow as progress. They
        read it as risk.
      </p>
      <h3>The interface being harder than the data</h3>
      <p>
        Building{" "}
        <Link href="/work/walletlens" className="inline-link">
          WalletLens
        </Link>{" "}
        taught me that the interface design of a data tool matters as much as the data itself. The
        on-chain data was never the hard part. It is public. The hard part was deciding what to show
        first, what to summarise, and what to leave out, because a wall of accurate numbers is still
        a wall.
      </p>
      <p>
        The same lesson showed up again in{" "}
        <Link href="/work/orderflow" className="inline-link">
          OrderFlow
        </Link>
        . An analysis product fails when it produces an interesting readout instead of a specific
        next action. If the output is not tied to something the person can do differently, they will
        agree that it is insightful and then change nothing.
      </p>
      <h3>An agent with no defined refusal</h3>
      <p>
        I built{" "}
        <Link href="/work/valor" className="inline-link">
          Valor
        </Link>{" "}
        as an AI agent running inside Telegram. The lesson that stuck was not about prompting. It
        was that the most important design decision in an agent is what it explicitly refuses to do.
      </p>
      <p>
        An agent with no refusal list is confident about everything. That is not a feature. It means
        the user cannot tell the difference between an answer it knows and an answer it invented,
        which makes every answer worthless. Autonomous agents are only useful when their failure
        modes are well defined, and defining those failure modes is slower, less fun work than
        making the happy path impressive.
      </p>
      <h3>Audit trails that exist but cannot be read</h3>
      <p>
        <Link href="/work/agenthub" className="inline-link">
          AgentHub
        </Link>{" "}
        is a policy layer for giving an AI assistant controlled access to real systems. Building it
        taught me that audit trails are only useful if they are easy to read, not just technically
        present. Logging every action satisfies a checklist and helps nobody. A trail that shows a
        human what happened and why, in order, in language they can act on, is what actually makes
        an agent safe to operate.
      </p>
      <h3>Tools that create a new channel instead of removing friction</h3>
      <p>
        <Link href="/work/community-signal" className="inline-link">
          Community Signal
        </Link>{" "}
        is a building-stage experiment in community automation, and the lesson arrived early enough
        to stop me going further. Community tools work best when they reduce a real friction point
        rather than create a new channel. Adding a bot that posts more often is easy. Removing a
        piece of manual work is much harder, and it is the only version that survives.
      </p>

      <h2>Test earlier than feels comfortable</h2>
      <p>
        The single most useful thing you can do with a prototype is watch someone try to use it
        without helping them. You will learn more in an hour of watching than in a week of reviewing
        yourself.
      </p>
      <p>
        The discomfort is the point. There is a moment in every session where the user hesitates,
        and your instinct is to explain. If you explain, you have learned nothing, because you
        cannot be in the room forever. Let the silence sit. What they do in that silence is the
        actual finding.
      </p>
      <p>
        Three rules make those sessions worth the discomfort. Watch, do not guide. Use someone who
        is not in your industry, because your colleagues have absorbed the same assumptions you
        have. And test the ugly states on purpose, which means asking them to attempt something you
        know is not finished, just to see what the product tells them.
      </p>

      <h2>What to measure</h2>
      <p>
        Concrete signals, in the order they tend to matter:
      </p>
      <ul>
        <li>
          <strong>Time to first hesitation.</strong> How long before the user stops and thinks? A
          short time to hesitation means the interface is not explaining itself.
        </li>
        <li>
          <strong>Where they stop.</strong> Not how many stopped, but where. One repeated stall
          point is worth more than a percentage.
        </li>
        <li>
          <strong>Whether they finish without help.</strong> A single number, and the only one that
          maps directly to the definition of failure above.
        </li>
        <li>
          <strong>What they say they were trying to do.</strong> Users describe the task in their
          words. That description is the copy your product should use.
        </li>
        <li>
          <strong>Whether they come back without being asked.</strong> The clearest signal that
          something worked, and the one that cannot be faked by a good demo.
        </li>
      </ul>
      <p>
        What not to measure: page views, session length, and anything that goes up when someone is
        lost. A user spending four minutes on a screen that should take twenty seconds is not
        engaged. They are stuck.
      </p>

      <h2>What to fix before real users see it</h2>
      <p>
        Walk through your product as if you are someone who has never heard of Web3 before. At every
        step, ask: does this screen tell me what to do next? Does it explain what just happened? Does
        it handle the most likely failure in a way I can understand? If the answer to any of those
        is no, that is more important than any new feature you want to add.
      </p>
      <p>
        The order matters. Fix the states that exist before adding states that do not. Plain language
        before more features. A visible history of what happened and what it cost before a chart
        showing trends. Those are not polish items. They are the difference between a prototype that
        survives contact with a user and one that quietly teaches you the wrong lesson.
      </p>
      <p>
        That is the kind of clarity I want to help founders build before they commit to a larger
        build, and the reasoning behind it is the same reasoning in{" "}
        <Link href="/insights/scope-a-web3-product-before-spending-money" className="inline-link">
          how to scope a Web3 MVP before spending money
        </Link>
        .
      </p>
    </>
  );
}
