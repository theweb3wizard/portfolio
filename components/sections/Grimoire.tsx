"use client";

import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";

const RESOURCES = [
  {
    title: "Web3 in 5 Minutes",
    desc: "A no-hype breakdown of wallets, transactions, and what a blockchain actually does — straight, no chaser.",
    tag: "Beginner",
    icon: "◈",
    color: "from-indigo-500/20 to-transparent",
  },
  {
    title: "Smart Contracts Explained",
    desc: "What they are, why they matter, and how they execute without a middleman. No code required to understand.",
    tag: "Beginner",
    icon: "◎",
    color: "from-violet-500/20 to-transparent",
  },
  {
    title: "Why AI + Web3 Works",
    desc: "The intersection is real. AI handles the analysis; Web3 handles the trust. Here&apos;s how they fit together.",
    tag: "Intermediate",
    icon: "◇",
    color: "from-cyan-500/20 to-transparent",
  },
  {
    title: "Shipping Like a Wizard",
    desc: "Find the friction. Build the fix. Ship fast. Iterate in public. The methodology behind every tool.",
    tag: "Mindset",
    icon: "✦",
    color: "from-indigo-500/20 to-transparent",
  },
];

export default function Grimoire() {
  return (
    <section id="grimoire" className="section-padding relative z-10">
      <div className="container-width">

        <SectionReveal className="text-center mb-16">
          <p className="text-indigo font-mono text-xs tracking-widest uppercase mb-4">
            ◈ The Grimoire
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-800 text-white mb-4">
            Learning <span className="text-gradient">resources.</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Web3 and AI concepts explained clearly. No gatekeeping. No jargon for
            jargon&apos;s sake.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {RESOURCES.map((res, i) => (
            <motion.article
              key={res.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="glass-card rounded-xl p-6 border border-border hover:border-indigo/30 transition-all duration-300 group cursor-default relative overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${res.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />
              <div className="relative z-10">
                <span className="text-indigo text-lg mb-3 block">{res.icon}</span>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-display font-600 text-white text-lg">
                    {res.title}
                  </h3>
                  <span className="shrink-0 text-[10px] font-mono uppercase tracking-wider text-cyan px-2 py-0.5 rounded-full border border-cyan/20">
                    {res.tag}
                  </span>
                </div>
                <p className="text-muted text-sm leading-relaxed">{res.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <SectionReveal delay={0.3} className="text-center mt-12">
          <p className="text-muted text-sm font-mono">
            More guides coming. Follow{" "}
            <a
              href="https://twitter.com/theweb3wizard00"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo hover:text-cyan transition-colors"
            >
              @theweb3wizard00
            </a>{" "}
            for updates.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
