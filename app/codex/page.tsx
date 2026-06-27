import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Codex — The Brand",
  description:
    "The Web3 Wizard brand codex: manifesto, archetype, voice, and the Fundamental Theorem of Web3 Wizardry. Clarity meets craft.",
  openGraph: {
    title: "Codex — The Web3 Wizard",
    description:
      "The brand codex: manifesto, archetype, voice, and the Fundamental Theorem of Web3 Wizardry.",
  },
};

const PRINCIPLES = [
  {
    title: "Ship, then iterate.",
    desc: "Done beats perfect. Launch fast, learn faster, improve in public.",
  },
  {
    title: "Solve one thing well.",
    desc: "A single sharp tool beats a blunt Swiss Army knife every time.",
  },
  {
    title: "No noise.",
    desc: "No threads about what you're going to build. Show the build.",
  },
  {
    title: "Clarity > cleverness.",
    desc: "If they don't get it in three seconds, you've already lost them.",
  },
  {
    title: "Make it hit different.",
    desc: "The bar isn't 'it works.' The bar is 'it feels good to use.'",
  },
];

const VOICE_TRAITS = [
  { label: "Tone", value: "Confident but not arrogant. Sharp but not cold." },
  { label: "Register 1 (Alex)", value: "Bold, direct, cred-first. 'Ship or shut up.'" },
  { label: "Register 2 (Jordan)", value: "Welcoming, clear, laddered. 'Start here.'" },
  { label: "Rhythm", value: "Short sentences. Subheadlines do the waving." },
  { label: "Diction", value: "No jargon for jargon's sake. Use the right word, not the fancy one." },
  { label: "Signature move", value: "State the problem. Show the tool. Let it speak." },
];

const CODEX_SECTIONS = [
  {
    id: "fundamental-theorem",
    title: "The Fundamental Theorem of Web3 Wizardry",
    content: (
      <>
        <div className="glass rounded-2xl p-8 md:p-12 border border-indigo/20 text-center my-8">
          <p className="font-display text-2xl md:text-3xl font-700 text-gradient mb-4">
            Relevance = Problems Solved &times; (1 − Noise)
          </p>
          <p className="text-muted font-mono text-sm">
            A wizard&apos;s relevance is the product of problems solved and
            the inverse of noise generated. Maximize the first. Minimize the second.
          </p>
        </div>
        <p className="text-slate-400 leading-relaxed">
          This is the axiom everything else builds on. Not lines of code shipped.
          Not tweets posted. Not followers accumulated. Problems solved, minus noise.
          A tool that removes a friction point for ten people is worth more than
          a platform nobody uses. A clear sentence beats a clever thread. The
           equation rewards action and penalizes theater.
        </p>
      </>
    ),
  },
  {
    id: "manifesto",
    title: "Manifesto",
    content: (
      <>
        <p className="text-slate-400 leading-relaxed text-lg">
          The Web3 Wizard is not a title. It&apos;s not a persona, a costume,
          or a content bit. It is a description of fact — a developer who
          operates at the intersection of cryptocurrency and artificial
          intelligence, building tools that remove friction and create clarity.
        </p>
        <p className="text-slate-400 leading-relaxed mt-4">
          Web3 is drowning in noise. Every day, a thousand new projects shriek
          for attention. Most of them solve nothing. They add a new blockchain,
          a new token, a new protocol that exists because someone wanted to
          launch something, not because a problem needed solving.
        </p>
        <p className="text-slate-400 leading-relaxed mt-4">
          The Wizard works the other way. Find the friction. Feel it yourself.
          Then build the tool that removes it — sharp, clean, and quiet. No
          fanfare. No 30-tweet thread. Just the tool working, and the problem gone.
        </p>
        <p className="text-slate-400 leading-relaxed mt-4 font-semibold text-indigo">
          Build the tool. Let it speak.
        </p>
      </>
    ),
  },
  {
    id: "archetype",
    title: "The Archetype — The Magician",
    content: (
      <>
        <p className="text-slate-400 leading-relaxed">
          The Magician archetype is the alchemist, the visionary, the one who
          sees what is and imagines what could be. In branding terms, the Magician
          transforms — taking base materials (code, data, fragmented systems) and
          turning them into something valuable (tools that solve real problems).
        </p>
        <p className="text-slate-400 leading-relaxed mt-4">
          This is not the Jester (entertainment), not the Hero (conquest),
          not the Sage (wisdom for its own sake). The Magician transmutes.
          Input: friction. Output: flow. Input: chaos. Output: clarity.
        </p>
        <p className="text-slate-400 leading-relaxed mt-4">
          The sigil is not a costume. It is a signal: this person transmutes
          complexity into working software. The aura is earned, not claimed.
        </p>
      </>
    ),
  },
  {
    id: "wizarding-code",
    title: "The Wizarding Code",
    content: (
      <>
        <p className="text-slate-400 leading-relaxed mb-6">
          Five principles that govern everything — from how code is written to
          how the brand shows up.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {PRINCIPLES.map((p, i) => (
            <div
              key={p.title}
              className="glass rounded-xl p-5 border border-indigo/10 hover:border-indigo/30 transition-colors"
            >
              <span className="text-indigo font-mono text-xs tracking-widest">
                0{i + 1}
              </span>
              <h3 className="font-display font-700 text-white mt-1 mb-2">
                {p.title}
              </h3>
              <p className="text-muted text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "brand-voice",
    title: "Brand Voice",
    content: (
      <>
        <p className="text-slate-400 leading-relaxed mb-6">
          One brand, two registers. Alex (the builder) and Jordan (the learner)
          arrive at the same site and find what they need — because the voice
          flexes without breaking.
        </p>
        <div className="space-y-4">
          {VOICE_TRAITS.map((t) => (
            <div key={t.label} className="flex items-start gap-4 py-3 border-b border-border last:border-0">
              <span className="text-indigo font-mono text-xs pt-0.5 shrink-0 w-28 uppercase tracking-wider">
                {t.label}
              </span>
              <span className="text-slate-300 text-sm">{t.value}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "origin",
    title: "The Origin",
    content: (
      <>
        <p className="text-slate-400 leading-relaxed">
          The Wizard grew up watching markets work on trust, reputation, and
          handshake deals — and later discovered that blockchain was just the
          same thing, digitized. The first tool was born from the same
          friction that every builder knows: the gap between what should
          exist and what actually does.
        </p>
        <p className="text-slate-400 leading-relaxed mt-4">
          The first tool was born from that gap: wallet analysis that required
          six tabs, three APIs, and a spreadsheet. The Wizard built what
          should have existed. Then did it again. And again.
        </p>
        <p className="text-slate-400 leading-relaxed mt-4">
          The title came later. Someone called him &quot;the Web3 Wizard&quot;
          in a tweet. It stuck because it was true before it was a name. The
          brand followed the reputation, not the other way around.
        </p>
      </>
    ),
  },
];

export default function CodexPage() {
  return (
    <div className="min-h-screen bg-void">
      {/* Nav spacer */}
      <div className="h-20" />

      {/* Hero */}
      <section className="section-padding relative z-10">
        <div className="container-width max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-indigo font-mono text-xs tracking-widest uppercase mb-6">
              ◈ The Brand Codex
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-800 text-white leading-tight mb-6">
              Clarity meets
              <br />
              <span className="text-gradient">craft.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              The Web3 Wizard brand is not a persona. It is a description of
              fact. These are the axioms, principles, and voice that govern
              everything this brand is and builds.
            </p>
          </div>

          {/* Sigil */}
          <div className="flex justify-center mb-16">
            <div className="w-24 h-24 md:w-32 md:h-32 relative">
              <div className="absolute inset-0 bg-indigo/20 rounded-full blur-3xl scale-150" />
              <img
                src="/images/wizard-sigil.svg"
                alt="The Web3 Wizard Sigil"
                className="w-full h-full relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Codex sections */}
      <div className="section-padding pb-32 relative z-10">
        <div className="container-width max-w-4xl space-y-24">
          {CODEX_SECTIONS.map((section, i) => (
            <section key={section.id} id={section.id}>
              <div className="mb-6 flex items-center gap-4">
                <span className="text-indigo font-mono text-xs tracking-widest">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-indigo/40 to-transparent" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-700 text-white mb-6">
                {section.title}
              </h2>
              {section.content}
            </section>
          ))}
        </div>
      </div>

      {/* Footer nav */}
      <footer className="border-t border-border py-8">
        <div className="container-width max-w-4xl flex items-center justify-between">
          <p className="text-muted text-sm">
            &copy; {new Date().getFullYear()} The Web3 Wizard
          </p>
          <Link
            href="/"
            className="text-indigo hover:text-cyan text-sm font-mono transition-colors duration-300"
          >
            &larr; Back to home
          </Link>
        </div>
      </footer>
    </div>
  );
}
