"use client";

import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";

const PILLARS = [
  {
    number: "01",
    title: "Find the friction",
    body: "Every tool I build starts with a specific, painful problem that real people hit. Not a trend. Not a hackathon prompt. A real friction point.",
    color: "#6366F1",
  },
  {
    number: "02",
    title: "Build the fix",
    body: "Precise, focused solutions. Not platforms. Not ecosystems. A single tool that does one thing exceptionally well.",
    color: "#06B6D4",
  },
  {
    number: "03",
    title: "Ship it live",
    body: "Everything I build is deployed and functional. No prototypes. No demos. If it's not live and usable, it doesn't count.",
    color: "#10B981",
  },
  {
    number: "04",
    title: "Move to the next",
    body: "Once a tool is live and working, I move on. The goal is a portfolio of precision tools, each solving a different problem for a different audience.",
    color: "#F59E0B",
  },
];

function Mission() {
  return (
    <section id="mission" className="section-padding relative z-10">
      <div className="container-width">

        <SectionReveal className="text-center mb-16">
          <p className="text-indigo font-mono text-xs tracking-widest uppercase mb-4">
            ◈ The Mission
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-800 text-white mb-6">
            Why I{" "}
            <span className="text-gradient">build.</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            The gap between what blockchain technology promises and what people
            actually experience is enormous. I work in that gap.
          </p>
        </SectionReveal>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-2xl p-8 border border-border hover:border-opacity-60 transition-all duration-500 group"
            >
              <div className="flex items-start gap-6">
                <span
                  className="font-display text-5xl font-800 leading-none opacity-20 group-hover:opacity-40 transition-opacity duration-300 shrink-0"
                  style={{ color: pillar.color }}
                >
                  {pillar.number}
                </span>
                <div>
                  <h3
                    className="font-display font-700 text-xl text-white mb-3 group-hover:transition-colors duration-300"
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {pillar.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Vision statement */}
        <SectionReveal delay={0.3}>
          <div className="relative rounded-3xl overflow-hidden border border-indigo/20 p-10 md:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo/10 via-transparent to-cyan/5" />
            <div className="relative z-10">
              <p className="font-display text-2xl md:text-3xl font-700 text-white leading-relaxed max-w-3xl mx-auto">
                &quot;I build for problems that exist everywhere,{" "}
                <span className="text-gradient">from wherever the work gets done.</span>
                {" "}The truth underneath the noise is usually simpler than the noise suggests.&quot;
              </p>
              <p className="text-muted font-mono text-sm mt-6">— Khalid Murtala</p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

export default Mission;