/**
 * /insights/use-ai-without-blindly-trusting-it
 *
 * Hub article for the AI guardrails cluster. Targets "ai agent guardrails" and
 * "human in the loop ai agent".
 *
 * All outbound citations were link-checked before shipping.
 */
import { Link } from "wouter";

export default function UseAiWithoutBlindlyTrustingIt() {
  return (
    <>
      <p>
        I use AI to build things now. It is faster than it used to be, and the difference is real.
        A product that would have taken months now takes weeks. The danger is not that AI is too
        slow. The danger is that it is too fast, and you do not catch the things that matter until
        they are already in production.
      </p>

      <h2>What human in the loop actually means</h2>
      <p>
        Human in the loop means a person authorises any action the system takes that cannot be
        undone, and that authorisation is enforced by the system rather than assumed from good
        intentions.
      </p>
      <p>
        The second half of that sentence is the part people skip. Reviewing an agent's output
        occasionally is not human in the loop. It is human nearby. A real control means the action
        cannot complete until a person approves it, and the approval is recorded somewhere you can
        look at later.
      </p>

      <h2>Where AI goes wrong in Web3</h2>
      <p>
        Generic advice about AI risk tends to stay abstract. In Web3 the failure classes are
        specific, and several of them cost money the moment they happen.
      </p>
      <ul>
        <li>
          <strong>Irreversible transactions.</strong> A transfer, an approval, or a contract call
          cannot be rolled back because the agent was having a bad day. Most software mistakes are
          recoverable. These are not, which is why they need a different class of control.
        </li>
        <li>
          <strong>Addresses that look right.</strong> A language model asked to produce, complete,
          or correct a wallet address can produce a syntactically valid string that belongs to
          somebody else. Ethereum's checksummed address format exists precisely because a single
          wrong character is indistinguishable to a human reader. An agent should never be the thing
          that decides an address is correct.
        </li>
        <li>
          <strong>Approvals wider than intended.</strong> Under the{" "}
          <a
            href="https://eips.ethereum.org/EIPS/eip-20"
            target="_blank"
            rel="noreferrer"
            className="inline-link"
          >
            ERC-20 approval model
          </a>
          , the number a user approves is the number that can be spent. An agent that "just sets up
          the approval" is making a security decision with the user's balance, and the difference
          between the amount intended and the amount approved is invisible in most interfaces.
        </li>
        <li>
          <strong>Treating pending as final.</strong> On-chain state is not settled the moment a
          transaction hash exists. Solana, for example, exposes settlement commitment rather than a
          single confirmed flag, and{" "}
          <a
            href="https://solana.com/developers/cookbook/transactions/confirmation"
            target="_blank"
            rel="noreferrer"
            className="inline-link"
          >
            the confirmation model is documented
          </a>{" "}
          for exactly this reason. An agent that reports success at the wrong commitment level will
          confidently tell a user something that later becomes false.
        </li>
        <li>
          <strong>Instructions hidden in content.</strong> The{" "}
          <a
            href="https://genai.owasp.org/llm-top-10/"
            target="_blank"
            rel="noreferrer"
            className="inline-link"
          >
            OWASP Top 10 for LLM Applications
          </a>{" "}
          names prompt injection and excessive agency among the most serious risks in systems built
          on language models. Both are boundary problems. An agent that reads a token name, a chat
          message, or a web page is reading untrusted input, and untrusted input can contain
          instructions.
        </li>
        <li>
          <strong>Quiet behaviour drift.</strong> Prompts, models, and upstream APIs all change
          underneath you. An agent that behaved one way at handover can behave differently three
          months later without anyone shipping a change.
        </li>
      </ul>
      <p>
        That list is worth reading next to the{" "}
        <a
          href="https://www.nist.gov/itl/ai-risk-management-framework"
          target="_blank"
          rel="noreferrer"
          className="inline-link"
        >
          NIST AI Risk Management Framework
        </a>
        , which frames the same concerns as a governance question rather than a technical one: who is
        accountable when the system acts, and how is that accountability made real. In a domain
        where an action can move irreversible value, "the model decided" is not an answer that
        survives contact with a customer.
      </p>

      <h2>The control points</h2>
      <p>
        You do not need to gate everything. Gating everything produces an agent that is slower than
        doing the task by hand, which is a different way to fail. You need to gate the actions where
        a mistake is expensive or permanent.
      </p>
      <p>
        Five control points cover most Web3 agents:
      </p>
      <ol>
        <li>
          <strong>Anything that moves value.</strong> Transfers, payments, withdrawals, and
          approvals. Always gated, without exception.
        </li>
        <li>
          <strong>Anything that grants permission.</strong> API keys, access scopes, role changes,
          and token allowances. An agent should be able to request access, never grant it.
        </li>
        <li>
          <strong>Anything that speaks publicly.</strong> Messages to a community, replies to
          customers, posts on an account. Wrong output here is not a bug, it is a public statement
          you cannot unsend.
        </li>
        <li>
          <strong>Anything that mutates production data.</strong> Deletes, overwrites, and schema
          changes. Recoverable in theory, rarely recoverable in practice once someone has noticed.
        </li>
        <li>
          <strong>Anything that spends metered money.</strong> Paid APIs and compute. Not dangerous,
          but a runaway loop is expensive and entirely avoidable with a ceiling.
        </li>
      </ol>
      <p>
        Everything else is a judgement call. The reasoning I use: if a mistake is cheap and
        reversible, let the agent act and review it after. If it is expensive or permanent, the
        agent proposes and a person disposes.
      </p>

      <h2>Approval patterns that work</h2>
      <p>
        Human in the loop is not one pattern. I built four into{" "}
        <Link href="/work/agenthub" className="inline-link">
          AgentHub
        </Link>
        , an access layer that sits between an AI coding assistant and the databases, APIs, and
        infrastructure it needs to reach.
      </p>
      <ul>
        <li>
          <strong>Pre-approval.</strong> The agent proposes the exact action, a human confirms, then
          it executes. This is the correct default for anything in the five control points above.
        </li>
        <li>
          <strong>Spend and rate limits.</strong> The agent acts freely inside a hard ceiling and
          escalates when it would exceed it. This is what makes high-frequency, low-value operations
          practical without a human in every loop.
        </li>
        <li>
          <strong>Dry runs.</strong> The agent produces the exact action it would take, without
          taking it, so the output can be inspected before it is trusted. Extremely useful while a
          new capability is being tested and the human is still building intuition about it.
        </li>
        <li>
          <strong>Escalation.</strong> The agent recognises uncertainty and hands the decision to a
          person instead of choosing. The hard part is teaching it to recognise its own uncertainty,
          which is why the refusal list matters more than the capability list.
        </li>
      </ul>
      <p>
        Two things I got wrong the first time. I initially designed least-privilege access at a
        granularity that made approving anything tedious, and tedious approval is approval that
        becomes a rubber stamp within a week. The second was treating the audit trail as a logging
        requirement rather than a user interface. Audit trails are only useful if they are easy to
        read, not just technically present. A human approving an action needs to understand what
        they are approving, and a raw event log does not do that.
      </p>
      <p>
        The same principle applies to how the agent reaches tools in the first place. The{" "}
        <a
          href="https://modelcontextprotocol.io/"
          target="_blank"
          rel="noreferrer"
          className="inline-link"
        >
          Model Context Protocol
        </a>{" "}
        addresses how an agent discovers and calls external capabilities. It does not decide which of
        those capabilities the agent is allowed to use. That is a separate layer, and it is the layer
        that keeps the first one safe.
      </p>

      <h2>What to log, and why</h2>
      <p>
        Log the decisions, not just the actions. An entry that says the agent sent a message is
        nearly useless on its own. An entry that says the agent sent this message, based on this
        input, and here is what it considered first, can be reviewed by a person who was not there.
      </p>
      <p>
        Four things are worth recording on every meaningful action:
      </p>
      <ul>
        <li>
          <strong>The input.</strong> What the agent was reacting to, including which parts came from
          an untrusted source.
        </li>
        <li>
          <strong>The decision.</strong> What it chose, in the agent's own output, unedited.
        </li>
        <li>
          <strong>The authority.</strong> Which policy allowed it, and whether a human approved it.
        </li>
        <li>
          <strong>The outcome.</strong> What actually happened, including failures and partial
          successes.
        </li>
      </ul>
      <p>
        The reason this matters is not compliance. It is that you cannot improve or safely expand a
        system you cannot reconstruct. When something goes wrong, the log is the only thing that
        tells you whether the problem was the prompt, the model, the input, or the boundary. Without
        it, every incident becomes a guess, and guesses lead to changes that break something else.
      </p>

      <h2>Where AI is genuinely useful and where it is not</h2>
      <p>
        AI tools are excellent at producing plausible code quickly. They are unreliable when it comes
        to things that matter. Security-sensitive logic, complex state, edge cases that only appear
        in real usage.
      </p>
      <p>
        AI does not understand why your product exists. It does not know which user action is
        irreversible. It does not know what your threat model is. It is pattern-matching, not
        thinking. The risk is not that it produces obviously wrong code. The risk is that it produces
        code that looks right, passes basic tests, and fails in production.
      </p>
      <p>
        The distinction I find most useful is whether a task needs interpretation or determinism. If
        a rule would do the job, use the rule. It is cheaper, faster, and it does not drift. Save
        the model for the parts where judgement is genuinely required: understanding a messy input,
        classifying something ambiguous, explaining a result in language a person can act on.
      </p>

      <h2>How I actually use it</h2>
      <p>
        I use AI as a starting point, not a finishing point. I give it clear context about what I am
        building, who it is for, and what the limits are. Then I read everything it produces
        critically, especially the parts that look too easy. I test the behaviour that matters, not
        just the path that works. And I keep notes on what I verified, what I am not sure about, and
        what I have deferred.
      </p>
      <p>
        That is the whole discipline. It is not complicated, but it does require you to stay in the
        loop. The parts I check most carefully are the ones an AI is least able to reason about:
        anything touching keys, anything touching money, anything that decides an address is correct,
        and anything that only fails when a third-party service misbehaves.
      </p>
      <p>
        The honest version of building with AI is that it makes you faster and it does not make you
        less responsible. You still own the product. You still need to know what is in it and why.
        That is how I build, and that is what I expect from the work I do for others.
      </p>
      <p>
        If you want to see the same reasoning applied to an agent design, the{" "}
        <Link href="/services/ai-agent-solana-engineering" className="inline-link">
          AI agent and Solana engineering
        </Link>{" "}
        engagement starts by writing the refusal list before writing any capability.
      </p>
    </>
  );
}
