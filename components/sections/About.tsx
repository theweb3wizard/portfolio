"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionReveal from "@/components/ui/SectionReveal";

const TRAITS = [
  { label: "Stack", value: "Next.js · TypeScript · Solidity · AI APIs" },
  { label: "Based", value: "Kano, Nigeria" },
  { label: "Focus", value: "Web3 × AI tools that solve real problems" },
  { label: "Style", value: "Ship fast. Iterate. Move to the next problem." },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative z-10">
      <div className="container-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Image */}
          <SectionReveal direction="left">
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-indigo/20 rounded-3xl blur-3xl scale-90" />

              {/* Image frame */}
              <div className="relative rounded-3xl overflow-hidden border border-indigo/20 aspect-square max-w-md mx-auto lg:mx-0">
                <Image
                  src="/images/profile.png"
                  alt="Khalid Murtala — The Web3 Wizard"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass rounded-xl px-4 py-3 border border-indigo/20">
                    <p className="font-display font-600 text-white text-sm">
                      Khalid Murtala
                    </p>
                    <p className="text-muted text-xs font-mono mt-0.5">
                      The Web3 Wizard · Builder
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating stat cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 glass-card rounded-xl px-4 py-3 border border-indigo/20 hidden lg:block"
              >
                <p className="font-display font-700 text-2xl text-white">4+</p>
                <p className="text-muted text-xs font-mono">Tools Shipped</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -right-4 glass-card rounded-xl px-4 py-3 border border-cyan/20 hidden lg:block"
              >
                <p className="font-display font-700 text-2xl text-white">∞</p>
                <p className="text-muted text-xs font-mono">Building</p>
              </motion.div>
            </div>
          </SectionReveal>

          {/* Right — Text */}
          <div className="space-y-8">
            <SectionReveal delay={0.1}>
              <div>
                <p className="text-indigo font-mono text-xs tracking-widest uppercase mb-4">
                  ◈ The Wizard
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-800 text-white leading-tight mb-6">
                  I build things.
                  <br />
                  <span className="text-gradient">Real ones.</span>
                </h2>
                <p className="text-slate-400 leading-relaxed text-lg">
                  I find specific, painful friction points that real people hit
                  in Web3 and crypto — and I build the tool that removes it.
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <p className="text-slate-400 leading-relaxed">
                No theories. No long threads about what I&apos;m{" "}
                <em>going to build.</em> I ship, I move on, I ship again. The
                work speaks. Everything else is noise.
              </p>
            </SectionReveal>

            {/* Traits */}
            <SectionReveal delay={0.3}>
              <div className="space-y-3 pt-4 border-t border-border">
                {TRAITS.map((trait, i) => (
                  <motion.div
                    key={trait.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.6 }}
                    className="flex items-start gap-4"
                  >
                    <span className="text-indigo font-mono text-xs pt-0.5 shrink-0 w-12">
                      {trait.label}
                    </span>
                    <span className="text-muted text-sm font-mono w-px bg-border shrink-0 self-stretch mx-0" />
                    <span className="text-slate-300 text-sm">{trait.value}</span>
                  </motion.div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}