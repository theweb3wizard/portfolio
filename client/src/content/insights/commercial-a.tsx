/**
 * client/src/content/insights/commercial-a.tsx
 *
 * Commercial-intent posts, part one.
 *
 *   /insights/how-much-does-a-web3-mvp-cost
 *   /insights/web3-agency-vs-freelancer
 *
 * Cost figures quoted here are the published ones in client/src/commercial.ts and
 * client/public/pricing.md. No industry averages are quoted, because they could
 * not be verified.
 */
import { Link } from "wouter";

export function HowMuchDoesAWeb3MvpCost() {
  return (
    <>
      <p>
        My focused Web3 product builds start at $6,000 and typically run three to eight weeks. A
        single defined capability, such as an AI agent or one integration, starts at $2,500 and runs
        one to two weeks. A discovery sprint that decides what to build starts at $750 and runs three
        to seven days.
      </p>
      <p>
        I am not going to quote an industry average, because I cannot verify one and I would rather
        give you numbers I stand behind. What I can do is tell you exactly which decisions move the
        price, so you can work out where your own project lands before you talk to anyone.
      </p>

      <h2>The published numbers</h2>
      <ul>
        <li>
          <strong>Product and technical discovery: from $750,</strong> three to seven days. You get a
          written direction instead of a build.
        </li>
        <li>
          <strong>AI agent or Web3 integration sprint: from $2,500,</strong> one to two weeks. One
          defined capability, tested and handed over.
        </li>
        <li>
          <strong>Focused dApp or product build: from $6,000,</strong> three to eight weeks.
          Frontend, backend, integrations, deployment, handover.
        </li>
        <li>
          <strong>Embedded product engineering: from $2,000 per month,</strong> for teams that need
          ongoing capacity rather than a one-off build.
        </li>
      </ul>
      <p>
        Those are starting points rather than fixed quotes. Final scope, timeline, integrations, and
        price are confirmed after a fit conversation, and the full breakdown is on{" "}
        <Link href="/pricing.md" className="inline-link">
          the pricing page
        </Link>
        .
      </p>

      <h2>What actually moves the number</h2>
      <p>
        Not how impressive the idea is. Four things decide what a build costs, and all four are
        decisions rather than accidents.
      </p>
      <h3>1. How much happens on-chain</h3>
      <p>
        On-chain state is expensive in every sense. Every write costs the user money, takes time to
        settle, and cannot be undone. Moving a piece of logic on-chain is sometimes essential and
        sometimes a decision inherited from a document nobody questioned. It is the single largest
        swing factor in a Web3 build.
      </p>
      <h3>2. How many chains and integrations</h3>
      <p>
        A second network is not an API key swap. It brings different data shapes, different fee
        behaviour, and different user expectations. I built{" "}
        <Link href="/work/walletlens" className="inline-link">
          WalletLens
        </Link>{" "}
        across five EVM networks and{" "}
        <Link href="/work/orderflow" className="inline-link">
          OrderFlow
        </Link>{" "}
        on one, and the difference in effort was not marginal. Each third-party API is the same
        story: a new thing that can fail, a new rate limit, a new set of edge cases.
      </p>
      <h3>3. How much of the product is in version one</h3>
      <p>
        This is where most budgets go. Onboarding, accounts, billing, admin surfaces, notification
        preferences, and settings are usually the difference between a focused build and a long one.
        None of them are the reason someone came to your product, and most of them can wait.
      </p>
      <h3>4. How much judgement the AI is doing</h3>
      <p>
        An AI feature is cheap when it summarises or classifies. It gets expensive when it makes
        decisions, because decisions need boundaries, escalation, and testing against adversarial
        input. A useful rule: if a deterministic rule would do the job, use the rule. It is cheaper,
        faster, and it does not drift.
      </p>

      <h2>What makes an MVP cost more than expected</h2>
      <ul>
        <li>
          <strong>Two chains in version one.</strong> Almost always scope, rarely necessity.
        </li>
        <li>
          <strong>Custom design work.</strong> Interface clarity is not optional. A bespoke visual
          identity is, and it is a separate budget.
        </li>
        <li>
          <strong>A security review.</strong> If your contracts hold real value, they need a
          dedicated auditor. That is not something I sell, and it is not something to fold into a
          build budget at the end. See{" "}
          <Link href="/insights/do-i-need-a-smart-contract-audit" className="inline-link">
            whether you need a smart contract audit
          </Link>
          .
        </li>
        <li>
          <strong>Scope changes mid-build.</strong> Not the small adjustments, which are normal. The
          new requirement that changes the shape of the product. It gets scoped and priced when it
          arrives, which is what stops a four week build quietly becoming a six month one.
        </li>
        <li>
          <strong>Ongoing maintenance.</strong> Real cost, often forgotten. Integrations break,
          prompts drift, and upstream APIs change. My default is to agree maintenance separately
          after the build rather than hide it in the build price.
        </li>
      </ul>

      <h2>Ways to spend less without getting less</h2>
      <p>
        Three options, in order of how often I recommend them.
      </p>
      <ol>
        <li>
          <strong>Buy discovery first.</strong> It is the cheapest engagement and it is the one that
          prevents the expensive mistake. If it concludes you should build less, it has paid for
          itself several times over.
        </li>
        <li>
          <strong>Prove one capability before building the product.</strong> A $2,500 integration
          sprint that tests the riskiest part of the idea can tell you more than a $6,000 build that
          assumes it works.
        </li>
        <li>
          <strong>Cut chains, not failure states.</strong> The temptation when budget tightens is to
          skip error handling. That is the worst possible thing to cut, because it is exactly what
          real users encounter, and a build that hides failures teaches you the wrong lesson faster.
        </li>
      </ol>

      <h2>What the number should not include</h2>
      <p>
        A guarantee of adoption, growth, or product-market fit. Anyone pricing that in is either
        lying or about to disappoint you. What you are buying is a working product, built to an
        agreed scope, with the limitations written down. The scope reasoning behind those builds is
        in{" "}
        <Link href="/insights/scope-a-web3-product-before-spending-money" className="inline-link">
          how to scope a Web3 MVP before spending money
        </Link>
        .
      </p>
    </>
  );
}

export function Web3AgencyVsFreelancer() {
  return (
    <>
      <p>
        The honest answer is that the right choice depends on the shape of your project rather than
        which model is better in general. An agency buys capacity and process. A freelancer buys
        direct access and a lower price. Most early-stage Web3 products need the second and assume
        they need the first.
      </p>
      <p>
        I am a solo studio, so I am not neutral here. I will tell you where I am the wrong choice
        first, because that is more useful than a list of agency weaknesses.
      </p>

      <h2>When you should hire an agency instead of me</h2>
      <ul>
        <li>
          <strong>You need several workstreams at once.</strong> Design, contracts, frontend,
          backend, and infrastructure running in parallel. One person cannot do that in the same
          week, regardless of tooling.
        </li>
        <li>
          <strong>You need a name to point at in a procurement process.</strong> Some buyers need a
          company with insurance, a legal entity of a certain size, and a contract template their
          finance team recognises. That is a real constraint and it is not about skill.
        </li>
        <li>
          <strong>You need 24/7 coverage.</strong> If the requirement is someone on call around the
          clock, one person is the wrong shape.
        </li>
        <li>
          <strong>The scope is genuinely undecided and large.</strong> A long, exploratory programme
          of work benefits from a team that can absorb change without renegotiating a single
          person's calendar.
        </li>
      </ul>

      <h2>What an agency is actually good at</h2>
      <p>
        Structure. An established agency has process for discovery, estimation, QA, and handover,
        and that process exists because it has been wrong in those places before. It also has bench
        depth, which means one person being unavailable does not stop delivery.
      </p>
      <p>
        The trade is cost and distance. You pay for the process and the capacity, and you usually
        talk to an account manager rather than the person writing the code. For a large programme that
        is a reasonable trade. For a four week MVP it often means paying for overhead you cannot use,
        and losing the one advantage a small build depends on: fast, direct decisions.
      </p>

      <h2>What a freelancer is actually good at</h2>
      <p>
        Speed of decision and direct access. There is no translation layer between your problem and
        the person solving it. Change requests that would go through a ticket queue become a
        conversation. You also pay for work rather than for a structure around the work.
      </p>
      <p>
        The risk is single point of failure. If one person is ill, on another project, or simply
        wrong about an approach, there is no second opinion unless you build one in.
      </p>

      <h2>What a solo studio means in practice</h2>
      <p>
        I am one person working with AI as leverage. That makes me faster than a solo freelancer
        working without it, and it does not make me a team. So I hold myself to the parts of the
        agency model that actually protect the client, and I say no to the work that needs a team.
      </p>
      <ul>
        <li>
          <strong>Written scope before any building.</strong> Including what is explicitly not
          included.
        </li>
        <li>
          <strong>Documented limitations at handover.</strong> You should know what is unproven
          rather than discover it in production.
        </li>
        <li>
          <strong>No claim I cannot evidence.</strong> All my portfolio work is founder-built and
          labelled as such. I do not present it as client case studies.
        </li>
        <li>
          <strong>Clear nos.</strong> If the project needs a team, or a formal smart-contract audit,
          or a guarantee of adoption, I will say so rather than take the work and hope.
        </li>
      </ul>
      <p>
        The mitigation for single point of failure is unglamorous: everything is written down, the
        code is yours, and the credentials are yours. If I disappear, you are not stuck. That is the
        trade I can actually offer, and it is the one worth checking for with any individual you
        hire.
      </p>

      <h2>How to decide in about five minutes</h2>
      <ol>
        <li>
          <strong>Count your workstreams.</strong> One or two means an individual or small studio is
          enough. Four or more running in parallel means you need a team.
        </li>
        <li>
          <strong>Check whether your buyer needs a legal entity.</strong> If finance or legal
          requires a company of a certain size, that decides it.
        </li>
        <li>
          <strong>Ask what happens if the person you are talking to leaves.</strong> Agency: probably
          fine. Individual: only fine if the work is documented and the code is yours. Ask to see
          that before you sign.
        </li>
        <li>
          <strong>Ask who writes the code.</strong> At an agency this is worth asking directly,
          because the answer is sometimes "not the people in this meeting."
        </li>
        <li>
          <strong>Decide what you are buying.</strong> If it is a focused first version that proves
          one thing, buy the smaller option. If it is a programme of work, buy the bigger one.
        </li>
      </ol>
      <p>
        None of that is about which model is better. It is about matching structure to the problem in
        front of you, which is the same reasoning I apply to the products themselves. If you want to
        see how I evaluate a specific individual, including me, the criteria are in{" "}
        <Link href="/insights/how-to-evaluate-a-web3-developer" className="inline-link">
          how to evaluate a Web3 developer
        </Link>
        .
      </p>
    </>
  );
}
