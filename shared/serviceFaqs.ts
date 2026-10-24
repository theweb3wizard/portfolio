/**
 * shared/serviceFaqs.ts
 *
 * Real questions prospects ask about each service, with the answers.
 *
 * Two consumers, one source:
 *   server/meta.ts        -> builds FAQPage JSON-LD for the service pages
 *   client/src/pages/...  -> renders the same Q&A as a visible FAQ section
 *
 * Google's structured data policy requires that FAQPage markup matches content
 * that is visible on the page. Keeping one array here means the visible copy and
 * the schema cannot drift apart.
 *
 * House style: answer-first, plain language, no em dashes, no hype words.
 */

export type ServiceFaq = { question: string; answer: string };

export type ServiceKey =
  | "productDiscovery"
  | "web3MvpDevelopment"
  | "aiAgentSolanaEngineering";

export const SERVICE_FAQS: Record<ServiceKey, ServiceFaq[]> = {
  productDiscovery: [
    {
      question: "I do not have a technical specification. Can we still start here?",
      answer:
        "Yes. Most people who start here do not have one. You can bring a problem, an idea, a requirement, a desired outcome, or a manual workflow your team already runs every day. The specification is what discovery produces, not what it requires.",
    },
    {
      question: "How is this different from a consultation call?",
      answer:
        "A call gives you opinions. A discovery sprint gives you a written direction you can act on: a defined problem and user, the core workflow, a scoped MVP, and an honest note on technical feasibility. You keep that output whether or not you build with me afterwards.",
    },
    {
      question: "What if discovery concludes the idea is not worth building?",
      answer:
        "That is a real and useful outcome, not a failed engagement. Finding out in a week costs far less than finding out after a build. If the honest answer is that the problem does not justify the software, I will say so plainly and explain the reasoning behind it.",
    },
    {
      question: "Do I have to build with you after discovery?",
      answer:
        "No. Discovery is a standalone piece of work with no obligation and no lock-in. If you take the direction and build it with your own team, or with someone else entirely, that is a perfectly good outcome.",
    },
    {
      question: "How long does it take and what does it cost?",
      answer:
        "Typically three to seven days, starting from $750. The exact figure depends on how much is already known and how many people need to be involved in the conversations. Scope and price are agreed in writing before any work starts.",
    },
    {
      question: "Do you need access to my codebase or production systems?",
      answer:
        "No. Discovery works from conversations and whatever you are willing to share. If reviewing an existing repository would genuinely improve the direction, that can be agreed as a separate piece of work rather than assumed.",
    },
  ],

  web3MvpDevelopment: [
    {
      question: "How long does a Web3 MVP take to build?",
      answer:
        "Typically three to eight weeks, depending on scope. A narrow product with one core workflow and one integration lands at the short end. Anything touching several chains, complex wallet flows, or multiple user roles takes longer. The timeline is agreed before the build starts.",
    },
    {
      question: "What does a Web3 MVP cost?",
      answer:
        "Focused product builds start from $6,000. The number moves with scope rather than ambition: how many integrations are included, how much of the user journey is in the first version, and how much has to happen on-chain. A written scope and fixed price come before any building.",
    },
    {
      question: "Do you write and audit smart contracts?",
      answer:
        "Application-layer integrations and straightforward contracts are part of some builds. What I do not offer is a formal smart-contract audit or a security certification. If your product depends on a contract holding real value, that work belongs with a dedicated auditor, and I will say so rather than quietly skip past it.",
    },
    {
      question: "What happens if we need changes during the build?",
      answer:
        "Small adjustments inside the agreed scope are normal and expected. A new requirement that changes the shape of the product is a scope change, and it gets scoped and priced before it is built. That is what stops a four week build from quietly becoming a six month one.",
    },
    {
      question: "What do we actually receive at the end?",
      answer:
        "A working product focused on the agreed core workflow, deployment support, documentation, and a written list of known limitations. The limitations list matters as much as the product. You should know exactly what you own and what remains unproven.",
    },
    {
      question: "Can you work with our existing repository or team?",
      answer:
        "Yes, if the codebase is in a state where a focused change is realistic. If it is not, I will tell you before either of us commits to anything. Working alongside an existing team is usually easier than a greenfield build, not harder.",
    },
    {
      question: "Will real users be able to use it, or is it only a demo?",
      answer:
        "The standard is a product a real person can complete the core action in without being walked through it. That means plain language, visible transaction states, and errors a non-technical user can understand. A build that only works while the founder is watching is not finished.",
    },
  ],

  aiAgentSolanaEngineering: [
    {
      question: "What will the agent actually do, and what will it refuse to do?",
      answer:
        "Every agent is built to a written capability boundary. It handles the tasks inside that boundary and refuses everything else instead of guessing. The refusal list is documented at handover, because an agent that confidently invents an answer is more dangerous than one that admits it does not know.",
    },
    {
      question: "Are fully autonomous agents safe in Web3?",
      answer:
        "Where an action is irreversible, no. Transfers, token approvals, and contract calls should sit behind human approval, spend limits, or a written policy. I build agents that are autonomous where mistakes are recoverable and gated where they are not recoverable.",
    },
    {
      question: "Which platforms and chains do you work with?",
      answer:
        "Agents run on Telegram, Discord, the web, and internal dashboards. On-chain work covers Solana and EVM chains, with data pulled from RPC providers, indexers, and block explorer APIs. If a chain exposes a documented API, it can usually be integrated.",
    },
    {
      question: "Who pays for the LLM and RPC costs?",
      answer:
        "Your team owns and pays for its own provider accounts, so the credentials stay under your control rather than mine. Expected running cost is sized before the build so there are no surprises after handover.",
    },
    {
      question: "Do you provide ongoing maintenance?",
      answer:
        "Not by default. Maintenance is a separate engagement, agreed after the initial build. Agents drift as prompts, models, and upstream APIs change, so ongoing care is a genuine cost. Pretending an agent can be handed over and forgotten would be dishonest.",
    },
    {
      question: "Can you guarantee an on-chain outcome?",
      answer:
        "No, and neither can anyone else. Network conditions, congestion, and third-party APIs sit outside any developer's control. What can be designed and tested is how the integration behaves when a transaction fails, which is where most products either recover gracefully or lose the user entirely.",
    },
  ],
};
