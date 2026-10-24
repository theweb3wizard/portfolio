import type { ReactNode } from "react";

/**
 * Long-form narratives for each project page.
 *
 * Every claim here is grounded in one of three things: the project's public
 * repository, its live deployment, or a design decision that is visible in the
 * product. No adoption numbers, revenue figures, or client outcomes appear
 * anywhere in this file, because there are none to report yet.
 *
 * House style: British spelling, no em dashes, technology mentioned last.
 */

type Narrative = {
  body: ReactNode;
};

const SPELLBOOK: Narrative = {
  body: (
    <>
      <h2>Why this exists</h2>
      <p>
        The market for Web3 automation sits between two bad options. On one side, an
        agency that will design and build something bespoke, for a price and a timeline
        that assume a company has both. On the other, a repository cloned from a
        tutorial that works in the demo and becomes somebody's weekend problem the
        moment a moderator goes offline.
      </p>
      <p>
        Neither of those is a product. A product tells you what it does, what it refuses
        to do, what it costs, and who fixes it when it breaks. Spellbook is an attempt
        to sell that third thing: a fixed-scope agent with a delivery date and a named
        engineer behind it.
      </p>

      <h2>How it works</h2>
      <p>
        The flow is deliberately short. You browse a catalogue by operational area:
        community operations, customer and developer support, protocol and DeFi, growth
        and operations. You pick one and pay in USDT or USDC. An order workspace is
        created immediately, without an account, and it asks for the exact credentials
        the agent needs and nothing else. Bot tokens, read-only API keys, webhook URLs.
      </p>
      <p>
        Then the clock starts. Forty-eight hours for a managed deployment, seventy-two
        for a complete source handover. What arrives includes staging verification,
        operational runbooks, the configuration files, and thirty days of engineer
        coverage after the handover.
      </p>
      <p>
        The credential model is the part worth dwelling on. Most automation
        marketplaces ask for more access than they need, because asking for less is
        more work for the seller. Spellbook asks for scoped, revocable tokens and states
        plainly that private keys and seed phrases are never requested or stored. That
        constraint shapes the whole architecture. Anything an agent cannot do with a
        scoped token becomes something the buyer owns instead, which makes for a smaller
        product with a much smaller blast radius.
      </p>

      <h2>The decision that shaped the product</h2>
      <p>
        Two service models, one catalogue. A buyer can take the source code and run it
        themselves, or have it managed. Those read like pricing tiers. They are actually
        different products, and a lot of marketplaces blur them because blurring them
        closes more sales.
      </p>
      <p>
        Blurring them produces the worst outcome in this category: a buyer who believes
        they purchased a maintained system and in fact purchased a zip file. So the two
        models are separated at the point of purchase, including the question of who
        pays the ongoing model and RPC bills.
      </p>
      <p>
        That last point matters more here than in most industries. An agent that calls a
        language model and reads a chain has two metered bills attached to it. If the
        seller hides them, the buyer finds them later, and the discovery feels like a
        bait and switch even when it was only an omission.
      </p>

      <h2>What it does not do</h2>
      <p>
        The agents execute inside bounded parameters. They do not give financial advice,
        promise returns, or take any action a human has not already authorised. Buyers
        own their own model and RPC credentials, which means they also own the budget and
        can revoke access whenever they want.
      </p>
      <p>
        This is a founder-built reference implementation, not anonymised client work. The
        catalogue is early, the examples are my own projects, and the early access
        framing is literal rather than a marketing device.
      </p>

      <h2>What to take from this</h2>
      <p>
        If you are buying automation, the questions that matter are not about features.
        What access does it need? Who owns the ongoing cost? What happens when it fails
        at three in the morning? Can any competent engineer take over from here? A vendor
        who cannot answer those four clearly is selling you a demo.
      </p>
    </>
  ),
};

const VALOR: Narrative = {
  body: (
    <>
      <h2>Why this exists</h2>
      <p>
        The people who make a community worth joining are usually the ones paid least for
        it. A contributor writes a genuinely useful answer. A moderator reads it, thinks
        that was good, and keeps scrolling. Nothing happens. The reward, if there is one,
        depends on whether a busy person happened to notice.
      </p>
      <p>
        Every manual reward programme fails the same way. It needs a moderator to read
        every message and a spreadsheet to track payouts, and both of those stop
        happening the week the community gets busy. So rewards either never start, or
        they run for a fortnight and quietly stop.
      </p>
      <p>
        Valor is an attempt to make the reward side of a community run without a human in
        the loop.
      </p>

      <h2>How it works</h2>
      <p>
        A community connects its own Telegram bot, funds a treasury with USDC on Base, and
        then stops thinking about it.
      </p>
      <p>
        Every message in the group passes through a two-stage filter written in plain
        TypeScript. The filters are cheap and they are not clever. They are looking for
        the obvious cases where a model call would be wasted. Roughly nine messages in ten
        are dropped here, before any AI is involved. The survivors go to Gemini, which
        returns a structured score rather than prose, validated against a schema. When
        the score crosses the threshold, the agent transfers USDC to the contributor from
        that community's own treasury. Contributors claim through a signed link.
      </p>
      <p>
        Two details in that pipeline are doing most of the work.
      </p>
      <p>
        The first is that the webhook returns in under fifty milliseconds and the AI and
        on-chain work happen in a signed background job. Telegram retries a webhook that
        does not answer quickly, and a retry on a pipeline that pays money means paying
        twice for the same message. Separating the acknowledgement from the work is not an
        optimisation, it is a correctness requirement.
      </p>
      <p>
        The second is idempotency. Every step assumes it will run more than once. A
        duplicate delivery has to cost nothing and send nothing.
      </p>

      <h2>The decision that shaped the product</h2>
      <p>
        The gate in front of the model.
      </p>
      <p>
        It would be simpler to send every message to Gemini, and the scoring would be
        marginally better. It would also mean paying for a model call on greetings, on
        stickers, and on every message in a group of four thousand people. An agent that
        reads every message in a community has a cost curve that scales with chatter,
        which is the one thing communities produce without limit.
      </p>
      <p>
        So the design pushed the cheap work earlier and the intelligence later. Cost
        control became the binding constraint, and the model only sees what survives it.
      </p>

      <h2>What it does not do</h2>
      <p>
        It scores written contributions. It cannot judge anything that happens outside the
        text of a message, and it will misread sarcasm, in-jokes, and languages it handles
        less well. A wrong score moves real money. Tips are capped and the pipeline is
        idempotent, but an on-chain transfer cannot be reversed, and no amount of care
        changes that.
      </p>
      <p>
        There is no investment advice, no trading signals, and no token recommendations.
        The treasury is non-custodial: each community's wallet is derived deterministically
        from a master key, so one community's budget can never touch another's.
      </p>

      <h2>What to take from this</h2>
      <p>
        Any agent that spends money needs three things before it needs a better model: a
        cheap filter in front of the expensive step, idempotency everywhere, and a hard cap
        on what a single automated decision can spend. Get those wrong and the model's
        accuracy stops mattering, because the failure mode is financial.
      </p>
    </>
  ),
};

const WALLETLENS: Narrative = {
  body: (
    <>
      <h2>Why this exists</h2>
      <p>
        A wallet address is one of the few things in this industry that everybody can see
        and almost nobody can read. Paste one into an explorer and you get a wall of
        hexadecimal, a list of transfers, and no opinion about any of it.
      </p>
      <p>
        For a developer that is fine. For a founder deciding whether to take a meeting,
        send a payment, or add a counterparty to a treasury, the explorer answers the
        wrong question. The useful question is not what did this wallet do. It is whether
        I should be comfortable with this wallet.
      </p>

      <h2>How it works</h2>
      <p>
        One input, an address. One output, a report.
      </p>
      <p>
        It gathers on-chain data for Ethereum, Polygon, BNB Chain, Arbitrum, and Base, and
        builds four things from it: a risk score from 0 to 100, a portfolio breakdown with
        distribution, NFT holdings, and the last twenty transactions. Then a language model
        writes up what the behaviour looks like in plain English. Every report gets its own
        URL, so it can be shared rather than re-run.
      </p>
      <p>
        It is read-only. It never asks for a wallet connection, a signature, or a private
        key, and it cannot move anything. Free analyses are limited to five per day per
        address, which exists to keep the third-party API bills predictable rather than to
        push anyone toward a paid tier.
      </p>

      <h2>The decision that shaped the product</h2>
      <p>
        Making the address the only input.
      </p>
      <p>
        The obvious alternative was a query box: ask a question about a wallet in natural
        language. That is a better demo and a worse product. A founder who does not know
        which chain a counterparty uses cannot write a good question about it, and a
        natural language interface asks them to be precise about the thing they are least
        sure of.
      </p>
      <p>
        Fixing the input moved all of the uncertainty into the tool, which is where it
        belongs. The only decision left for the user is which address to paste.
      </p>

      <h2>What it does not do</h2>
      <p>
        The risk score is a heuristic built from on-chain behaviour. It is not a fraud
        determination and it should not be treated as one. A wallet with no history and a
        wallet with clean history are not the same thing, and a score cannot fully separate
        them.
      </p>
      <p>
        Chain data comes from a third-party API, so it can lag, rate limit, or have gaps.
        NFT metadata is only as good as that provider. This is a founder-built project
        rather than a service with a support contract behind it.
      </p>

      <h2>What to take from this</h2>
      <p>
        A single number is easier to act on than a dashboard. But a number that hides its
        reasoning invites false confidence, which is why the score sits beside the
        transactions that produced it. If you build decision tools, put the evidence next
        to the conclusion and label the conclusion as an inference rather than a fact.
      </p>
    </>
  ),
};

const WRITE3: Narrative = {
  body: (
    <>
      <h2>Why this exists</h2>
      <p>
        Two problems in one tool.
      </p>
      <p>
        The first is voice. Generic AI writing tools flatten everyone into the same
        register, and Web3 is a small industry where sounding identical to everybody else
        is a real cost. A founder's posts read like everyone's posts, because they were
        written by the same model under the same instructions.
      </p>
      <p>
        The second is worse. Web3 marketing copy drifts into securities language almost by
        default. Phrases like guaranteed returns, passive income, and price prediction are
        not slang in this context. They are the specific words regulators look for. Most
        writing tools will produce them cheerfully, because nothing in the model's
        objective is to protect the person publishing.
      </p>

      <h2>How it works</h2>
      <p>
        A user pastes three to five samples of their own writing. The tool learns tone,
        vocabulary, and sentence patterns from those samples rather than from a style
        preset. From there it produces platform-native drafts: threads, announcements,
        posts, blog drafts, and newsletters, with the formatting each platform expects.
      </p>
      <p>
        Every draft passes through a compliance filter before it is shown. The filter flags
        risky language and the user sees what was flagged and why. Nothing publishes
        itself. The output is a draft for a human to review, which is the correct boundary
        for anything in a regulated industry.
      </p>

      <h2>The decision that shaped the product</h2>
      <p>
        Putting the guardrail inside the generation path rather than beside it.
      </p>
      <p>
        It would have been easier to build the writing tool and offer compliance checking
        as an add-on. That gets a demo built sooner, and it produces a tool whose default
        mode is the dangerous one. When a safety check is a separate step, it gets skipped,
        and it gets skipped most often by the users who need it most.
      </p>
      <p>
        Building the filter into the path means every draft is screened whether or not the
        user asked for it. The cost is that the tool refuses to write some things people
        want. That refusal is the feature.
      </p>

      <h2>What it does not do</h2>
      <p>
        The filter covers language patterns associated with SEC and FCA scrutiny. It is not
        legal advice and it does not replace a lawyer. It catches phrasing, not structure. A
        carefully worded sentence can still be part of a non-compliant offering, and no
        phrase list can see the whole picture.
      </p>
      <p>
        The tool generates drafts. It does not post to platforms, and it expects human
        review before anything goes out. It is a founder-built project rather than a funded
        product with a support team.
      </p>

      <h2>What to take from this</h2>
      <p>
        If you are pointing AI at anything in a regulated industry, decide what it must
        refuse before you decide what it should produce. A tool that writes faster and also
        writes things you cannot legally publish is not a time saving.
      </p>
    </>
  ),
};

const AGENTHUB: Narrative = {
  body: (
    <>
      <h2>Why this exists</h2>
      <p>
        AI coding assistants became useful the moment they could touch real systems. That
        is also the moment they became a security problem.
      </p>
      <p>
        Under the{" "}
        <a href="https://modelcontextprotocol.io" target="_blank" rel="noreferrer">
          Model Context Protocol
        </a>
        , each tool an assistant can use runs as its own server, typically on a local port,
        usually with no authentication, no access control, and no record of what was
        called. When an assistant can run a database write, delete a file, or make an
        outbound API call, no record stops being an inconvenience. You cannot answer who
        approved this, or whether anyone agreed to it in advance.
      </p>

      <h2>How it works</h2>
      <p>
        AgentHub sits between the AI client and the tool servers as a reverse proxy. Every
        call passes through four things in order: authentication, a policy engine, a
        security boundary, and an audit logger.
      </p>
      <p>
        Policies are set per tool and there are four levels: allow, block, read-only, and
        require-approval. Read-only is the interesting one, because it detects write
        operations by naming convention and blocks them without needing a hand-written
        rule for every tool in the catalogue.
      </p>
      <p>
        The security boundary blocks request forgery attempts at the point where they
        matter. Private IP ranges, cloud metadata endpoints, internal hostnames, and shell
        metacharacters in tool arguments.
      </p>
      <p>
        When a tool is set to require approval, the request pauses, a pending record is
        created, the approver is notified with the tool name and the arguments, and the call
        waits. If nobody answers inside five minutes, it does not run.
      </p>
      <p>
        The audit log records the user, the tool, the arguments, the response status, the
        caller's address, and which administrator approved it.
      </p>

      <h2>The decision that shaped the product</h2>
      <p>
        Making approval a gate rather than a wall.
      </p>
      <p>
        The secure default in this category is to deny everything sensitive, which is safe
        and useless. A developer whose assistant cannot read the staging database gets no
        value, turns the gateway off, and a security tool that gets turned off protects
        nothing.
      </p>
      <p>
        So high-risk operations pause instead of failing. The assistant keeps working, a
        human gets a decision they can make in ten seconds, and the access stays narrow.
        Reviewability mattered as much as enforcement. An audit trail that only a security
        engineer can parse gets opened once, during an incident. An audit trail that reads
        like a log gets looked at.
      </p>

      <h2>What it does not do</h2>
      <p>
        Enforcement covers the integrations currently supported, not every tool server that
        exists. The security properties have not been formally audited. This is a
        founder-built project rather than a product with a compliance certificate attached
        to it.
      </p>

      <h2>What to take from this</h2>
      <p>
        If you give an agent access to production, the useful questions are what it can
        reach, what it can do once it gets there, and who finds out afterwards. Least
        privilege is the easy part. Knowing what happened is the part that gets skipped.
      </p>
    </>
  ),
};

const ORDERFLOW: Narrative = {
  body: (
    <>
      <h2>Why this exists</h2>
      <p>
        Traders review their performance from memory. The memory is unreliable, and it is
        unreliable in a flattering direction. The losses were bad luck, the wins were
        skill, and the pattern in between stays invisible.
      </p>
      <p>
        The pattern is in the data. It has been there the whole time, sitting in on-chain
        history that is public, complete, and almost unreadable.
      </p>

      <h2>How it works</h2>
      <p>
        Connect an Injective wallet. OrderFlow pulls recent trades from Injective's live
        indexer, covering both spot and derivatives, then computes behavioural statistics
        across them. Size relative to plan. Performance by time of day. What happens after
        a loss. Limit orders against market orders. Which markets carry the edge.
      </p>
      <p>
        Those statistics go to a language model, which writes a structured report pointing
        at specific findings with the numbers attached. Every row in the trade list links
        to Injective Explorer, so any claim in the report can be checked against the chain
        rather than taken on trust.
      </p>

      <h2>Why one chain</h2>
      <p>
        This started as a general idea and became an Injective product for reasons that are
        technical rather than sentimental. Injective's{" "}
        <a href="https://docs.injective.network" target="_blank" rel="noreferrer">
          exchange module
        </a>{" "}
        exposes spot and derivatives trading through a single unified indexer. On Ethereum
        the same analysis would mean reconciling trades across dozens of venues with no
        shared data layer. Injective's order book is fully on-chain, so limit orders, market
        orders, and fills are all indexed and verifiable, which is what makes a statement
        like your limit orders outperform your market orders a claim about real behaviour
        rather than an impression.
      </p>
      <p>
        Comparative analysis needs comparable data. Three hundred trades from one chain
        where every order is visible is worth more than a thin slice from five.
      </p>

      <h2>The decision that shaped the product</h2>
      <p>
        Sending the model statistics instead of trades.
      </p>
      <p>
        The straightforward build hands raw trade data to the model and asks for insight.
        The output is fluent, plausible, and generic, because the model is doing arithmetic
        in its head over data it cannot reliably count.
      </p>
      <p>
        Pre-computing the statistics in code and passing those along changes what the model
        is for. It stops calculating and starts interpreting, and the finding it reports is
        one that code already established. A win rate on limit orders against market
        entries is a computed number, not a generated impression.
      </p>

      <h2>What it does not do</h2>
      <p>
        It reviews the past. It does not predict, signal, or recommend a trade, and it makes
        no claim about future performance. Coverage is Injective only. This is a
        founder-built project rather than a trading service, and nothing it produces is
        financial advice.
      </p>
      <p>
        People will read a report like this as an instruction anyway. That is worth saying
        out loud rather than discovering later.
      </p>

      <h2>What to take from this</h2>
      <p>
        If you are putting AI in front of data, decide whether the model's job is to count
        or to interpret, and make it do only one. Models are good at the second and
        unreliable at the first. Every number in an AI feature should come from code that
        can be checked.
      </p>
    </>
  ),
};

const SOLPULSE: Narrative = {
  body: (
    <>
      <h2>Why this exists</h2>
      <p>
        Solana produces more events per minute than anyone can read. The tooling that
        answers this does so by sending you everything, which replaces one problem with a
        slower one.
      </p>
      <p>
        The useful question is not whether something happened. It is whether this particular
        thing deserves your attention. Almost no monitoring tool asks that question, so
        people mute the channel and go back to watching charts.
      </p>

      <h2>How it works</h2>
      <p>
        Add a whale wallet with a label. SolPulse watches it for swaps on Pump.fun and
        Raydium, prices each movement, and sends a Telegram alert with links to Solscan and
        DexScreener. A dashboard holds the recent feed.
      </p>
      <p>
        Three decisions do most of the filtering. Anything under a dust threshold is
        discarded before it becomes an alert. A single webhook serves every user's wallets
        rather than one webhook per wallet, which keeps the integration constant in cost as
        the user base grows instead of growing with it. And duplicate deliveries are
        absorbed at the database level, so the same movement cannot arrive twice.
      </p>
      <p>
        It is read-only. No wallet connection, no signatures, no keys.
      </p>

      <h2>The decision that shaped the product</h2>
      <p>
        Treating deduplication as a product feature rather than a database detail.
      </p>
      <p>
        Webhook delivery is at-least-once in practice. That is not a bug, it is the
        contract. But a duplicate alert is a small betrayal. The user sees activity that
        already moved, checks a price that has already shifted, and starts to distrust the
        feed. Two alerts for one event is enough to make a monitoring tool feel unreliable,
        and a monitoring tool the user does not trust is a muted channel.
      </p>
      <p>
        The fix is unglamorous. A uniqueness constraint across the transaction and the user,
        and an insert that does nothing when the row already exists. It is invisible when it
        works, which is the entire point.
      </p>

      <h2>What it does not do</h2>
      <p>
        Coverage is limited to the current experiment: Pump.fun and Raydium swaps on Solana,
        focused on whale-sized movement. Anything small is deliberately invisible, which
        means this is not a tool for tracking activity in a token's first minutes. Alerts
        depend on third-party webhook and pricing APIs, so a delay at the provider becomes a
        delay for the user. No investment or trading outcome is implied, and this is
        personal work rather than a client deployment.
      </p>

      <h2>What to take from this</h2>
      <p>
        Monitoring products fail through noise, not through missing data. If you are building
        alerts, spend your effort on what to suppress. The threshold you choose is the
        product.
      </p>
    </>
  ),
};

const COMMUNITY_SIGNAL: Narrative = {
  body: (
    <>
      <h2>Why this exists</h2>
      <p>
        Community activity and product adoption are usually measured with the same number
        and have almost nothing to do with each other. A group can be busy all day and
        produce no user. The activity is real. The direction is missing.
      </p>
      <p>
        The usual fix is another bot in another channel. That adds surface area without
        reducing friction, and it gives the community one more place to ignore.
      </p>

      <h2>What it is</h2>
      <p>
        A building-stage experiment in turning community activity into a next action.
      </p>
      <p>
        The premise is deliberately narrow. Pick one action that matters to the product, and
        work out what a community prompt looks like when it leads there honestly, without
        token incentives and without gamified noise.
      </p>
      <p>
        Most of the open questions are about what to measure. Message volume and member count
        are easy and misleading. Something closer to how many people took one real action
        after a conversation is harder to instrument and far more useful.
      </p>

      <h2>Why it is not finished</h2>
      <p>
        Because the honest version of this depends on answers I do not have yet.
      </p>
      <p>
        Whether a community prompt works depends on the community, the product, and what the
        person is being asked to do, and none of that is knowable from a build alone. The
        decisions so far have been to start with a single action rather than a full community
        operating system, to avoid assuming token incentives, and to write the unknowns down
        before calling the concept complete.
      </p>
      <p>
        It is not offered as a product, and no adoption or growth result is claimed for it.
        I would rather leave this page short and accurate than pad it with a roadmap I cannot
        deliver against yet.
      </p>

      <h2>What to take from this</h2>
      <p>
        Distribution is not a substitute for product value, and community tooling is where
        that gets forgotten most often. If a community workflow cannot name the specific
        action it exists to produce, it is a channel rather than a tool.
      </p>
    </>
  ),
};

export const PROJECT_NARRATIVES: Record<string, Narrative> = {
  spellbook: SPELLBOOK,
  valor: VALOR,
  walletlens: WALLETLENS,
  write3: WRITE3,
  agenthub: AGENTHUB,
  orderflow: ORDERFLOW,
  solpulse: SOLPULSE,
  "community-signal": COMMUNITY_SIGNAL,
};

export function projectNarrative(slug: string): ReactNode | null {
  return PROJECT_NARRATIVES[slug]?.body ?? null;
}
