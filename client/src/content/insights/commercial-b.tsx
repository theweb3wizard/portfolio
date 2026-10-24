/**
 * client/src/content/insights/commercial-b.tsx
 *
 * Commercial-intent posts, part two.
 *
 *   /insights/do-i-need-a-smart-contract-audit
 *   /insights/how-to-evaluate-a-web3-developer
 *
 * Both posts draw a hard line around what Khalid sells. He does not perform
 * audits or security certification, so neither post may imply otherwise.
 */
import { Link } from "wouter";

export function DoINeedASmartContractAudit() {
  return (
    <>
      <p>
        You need a smart contract audit when your contract will hold or move value that you cannot
        afford to lose, and it is doing something specific to your product rather than being a
        well-worn standard. If neither of those is true, an audit is probably not the next thing your
        money should buy.
      </p>
      <p>
        I do not perform audits, so treat this as an impartial answer rather than a pitch. Half the
        reason people ask me this question is that they have been told they need one without being
        told what it would actually give them.
      </p>

      <h2>What an audit actually is</h2>
      <p>
        An audit is a structured review of your contract's code by a specialist, looking for ways it
        can be made to behave differently than you intend. It produces findings with severities, and
        usually a report you can show to users, partners, or an exchange.
      </p>
      <p>
        What it is not is a guarantee. An audit says a specific team looked carefully at a specific
        version of the code on a specific date and found these issues. It does not say the contract is
        safe. Contracts that passed audits have still been drained, often because the flaw was in how
        the contract was used, or in a dependency, or in something that changed after the audit.
      </p>

      <h2>When you genuinely need one</h2>
      <ul>
        <li>
          <strong>The contract custodies user funds.</strong> A vault, a bridge, a staking pool, an
          escrow. If a bug means users lose money, you need a specialist review before that money is
          there.
        </li>
        <li>
          <strong>The logic is custom and non-trivial.</strong> Novel pricing, novel incentive
          mechanics, upgradeable proxies with unusual patterns. Anything where a small mistake in
          arithmetic or access control is expensive.
        </li>
        <li>
          <strong>An exchange, partner, or institutional user requires it.</strong> Sometimes the
          commercial requirement is the whole reason. That is a legitimate reason.
        </li>
        <li>
          <strong>The contract has been changed since the last audit.</strong> An audit of a previous
          version does not transfer. This is where a lot of projects quietly lose their coverage.
        </li>
      </ul>

      <h2>When you probably do not</h2>
      <ul>
        <li>
          <strong>Your contract holds no value.</strong> A registry that writes non-financial data is
          a different risk class from a vault holding user deposits.
        </li>
        <li>
          <strong>You are pre-product and the contract may not survive.</strong> Auditing a contract
          you are about to rewrite is an expensive way to learn that.
        </li>
        <li>
          <strong>You are using a widely deployed, unmodified standard.</strong> A plain token
          implementation that has been deployed thousands of times has a known risk profile. Your
          integration around it is where your risk actually lives.
        </li>
        <li>
          <strong>You have not tested it at all yet.</strong> An auditor reviewing code that fails its
          own basic tests is being paid to find things you could have found for free.
        </li>
      </ul>

      <h2>What you need even if you skip the audit</h2>
      <p>
        Skipping an audit does not mean shipping untested. It means the specialist review is not your
        next dollar. Everything below is still worth doing, and it is cheap relative to a remediation
        cycle after launch.
      </p>
      <ul>
        <li>
          <strong>Tests that check invariants, not just outputs.</strong> A test that asserts "calling
          this returns 5" is weak. A test that asserts "the sum of all balances always equals the
          total deposited" catches a whole class of bugs at once.
        </li>
        <li>
          <strong>Hostile input testing.</strong> Reentrancy, unexpected callbacks, zero values,
          maximum values, and callers who are not who you expect. Most exploited contracts failed
          here first.
        </li>
        <li>
          <strong>A staged rollout with limits.</strong> Caps on value, caps on volume, and a pause
          mechanism. If something does go wrong, the size of the loss is a design decision you made
          in advance.
        </li>
        <li>
          <strong>Monitoring after launch.</strong> An alert on unexpected withdrawal patterns costs
          almost nothing and shortens the window between a problem starting and someone noticing.
        </li>
        <li>
          <strong>A written disclosure of what has not been reviewed.</strong> If your contract has
          not been audited, say so, in the same place you describe the product. Users who are told
          what they are taking on can make a decision. Users who assume coverage exists and later
          find out it did not will not forgive it.
        </li>
      </ul>

      <h2>What I do and do not do</h2>
      <p>
        I build application-layer products and Web3 integrations. That includes straightforward
        contracts where the product needs one, and everything around them: frontend, backend, wallet
        flows, on-chain reads, deployment, and handover.
      </p>
      <p>
        What I do not offer is a formal smart-contract audit, penetration testing, or security
        certification. If your product depends on a contract holding real value, that work belongs
        with a dedicated auditor, and I will say that clearly rather than quietly skip past it to win
        the build. It is one of the questions I answer plainly on{" "}
        <Link href="/services/web3-mvp-development" className="inline-link">
          the product build page
        </Link>
        , and it is the same line I hold on{" "}
        <Link href="/work/agenthub" className="inline-link">
          AgentHub
        </Link>
        , where the honest limitation is written down: the security properties of that project have
        not been formally audited.
      </p>

      <h2>The uncomfortable part</h2>
      <p>
        Most projects that skip an audit do it quietly, because writing down "we have not been
        reviewed" feels like a weakness. I think it is the opposite. A project that states its
        unverified surface is telling you it knows where its risk is, which is a better signal than a
        badge nobody can see the scope of.
      </p>
      <p>
        Where the line sits between "not audited" and "not tested" is the question worth being honest
        with yourself about. If you want to talk through which of the two you are actually in, the
        reasoning in{" "}
        <Link href="/insights/use-ai-without-blindly-trusting-it" className="inline-link">
          how to use AI in Web3 without blindly trusting it
        </Link>{" "}
        covers how I handle the parts of a build that cannot be undone.
      </p>
    </>
  );
}

export function HowToEvaluateAWeb3Developer() {
  return (
    <>
      <p>
        The most useful way to evaluate a Web3 developer is to ask them to explain a decision they
        made, what it cost, and what they would do differently. Anyone can show you a project list.
        Very few people can tell you honestly why a specific choice was wrong.
      </p>
      <p>
        I am going to write this as the criteria I would be measured against, including the parts
        where I do not score well yet. That seems more useful than a list of warnings with me
        conveniently exempt from all of them.
      </p>

      <h2>The five things worth checking</h2>
      <h3>1. Can they explain a trade-off, including what it cost?</h3>
      <p>
        Listen for a specific decision and a specific consequence. "I chose to read one chain instead
        of five because supporting five shallowly would have produced answers nobody could trust" is
        a trade-off. "I use best practices" is not. The best answer includes something they gave up.
      </p>
      <h3>2. Can they show you something running?</h3>
      <p>
        A live URL and a public repository tell you more than any description. Open them. Check
        whether the live thing matches the claim. Check whether the repository has real history
        rather than a single commit. Check whether the failure states were built, not just the happy
        path.
      </p>
      <h3>3. Do they tell you when you do not need them?</h3>
      <p>
        This is the single strongest signal, and it is the easiest to test. Describe your situation
        and see whether they narrow it. If every conversation ends in a proposal, you are not being
        advised, you are being sold to. Someone who says "you should not build this yet" has just
        saved you more than their hourly rate.
      </p>
      <h3>4. How do they handle the failure paths?</h3>
      <p>
        Ask what happens when a transaction reverts, when a wallet rejects, when an API times out, and
        when a user does something unexpected. In Web3 this is not a detail. It is where products lose
        users, and where irreversible mistakes happen. A developer who has not thought about it will
        answer in generalities.
      </p>
      <h3>5. Do you own everything at the end?</h3>
      <p>
        Code, credentials, deployment, and documentation. Ask directly. If the answer involves them
        hosting it indefinitely, or their own API keys sitting in your production environment, or
        access you cannot revoke, you are renting your product rather than owning it.
      </p>

      <h2>Questions that reveal more than a portfolio</h2>
      <ul>
        <li>"Tell me about a decision you would reverse." A refusal to answer is an answer.</li>
        <li>"What will this not do when you hand it over?" Anyone who claims nothing is hiding it.</li>
        <li>"What is the riskiest part of this build, and how will we find out early?"</li>
        <li>"Who writes the code?" Relevant for studios and agencies as much as individuals.</li>
        <li>"What happens if you are unavailable for two weeks?"</li>
        <li>"Which parts of this should not use AI?" A good answer distinguishes judgement from determinism.</li>
      </ul>

      <h2>Red flags</h2>
      <ul>
        <li>
          <strong>Tool lists instead of outcomes.</strong> Nobody's product ever got better because
          the developer knew Rust.
        </li>
        <li>
          <strong>Guarantees about adoption, growth, or price.</strong> Not in anyone's control. A
          promise here tells you what you are dealing with.
        </li>
        <li>
          <strong>Case studies you cannot verify.</strong> Especially in a domain where the work is
          often confidential. Ask what part of it they can substantiate.
        </li>
        <li>
          <strong>Scope that never gets narrower.</strong> If every conversation adds work, the
          estimate is not an estimate.
        </li>
        <li>
          <strong>No documented limitations.</strong> Every real build has them. A handover with
          nothing listed is a handover that has not been thought about.
        </li>
      </ul>

      <h2>What to ignore</h2>
      <p>
        Years of experience as a headline number. Tool and framework badges. Logo walls you cannot
        verify. Claimed metrics with no described measurement. None of it correlates reliably with
        whether someone can take a fuzzy problem and turn it into working software.
      </p>

      <h2>How I would score myself against this</h2>
      <p>
        Fair is fair, so here is the same assessment applied to me.
      </p>
      <ul>
        <li>
          <strong>Evidence you can check:</strong> seven deployed personal projects, all with public
          demos and repositories, all labelled as founder-built rather than client work.
        </li>
        <li>
          <strong>Written boundaries:</strong> every service page states what is outside scope, and
          every project lists its known limitations.
        </li>
        <li>
          <strong>Clear nos:</strong> no audits, no guaranteed outcomes, no token or equity-only work,
          and I will say when a project needs a team instead of me.
        </li>
        <li>
          <strong>Honest weakness:</strong> I am early. I have no client case studies yet, because I
          have not completed client engagements to write up. I would rather tell you that than
          invent them.
        </li>
        <li>
          <strong>Honest weakness:</strong> I am one person. I cannot run several workstreams in
          parallel, and any project that needs that should go to a team.
        </li>
      </ul>
      <p>
        If those weaknesses are disqualifying, the criteria above just saved us both a month. If they
        are not, the detail is on{" "}
        <Link href="/hire-khalid" className="inline-link">
          my profile page
        </Link>
        , and the trade-offs between hiring an individual and an agency are in{" "}
        <Link href="/insights/web3-agency-vs-freelancer" className="inline-link">
          Web3 agency versus freelancer
        </Link>
        .
      </p>
    </>
  );
}
