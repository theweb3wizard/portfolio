"use client";

import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";

const STACK = [
  { name: "TypeScript", category: "Language", color: "#3178C6" },
  { name: "Next.js", category: "Framework", color: "#FFFFFF" },
  { name: "React", category: "UI", color: "#06B6D4" },
  { name: "Tailwind CSS", category: "Styling", color: "#06B6D4" },
  { name: "Solidity", category: "Smart Contracts", color: "#6366F1" },
  { name: "Ethers.js", category: "Web3", color: "#6366F1" },
  { name: "Moralis", category: "Blockchain Data", color: "#818CF8" },
  { name: "Supabase", category: "Database", color: "#10B981" },
  { name: "Groq AI", category: "AI", color: "#F59E0B" },
  { name: "Gemini AI", category: "AI", color: "#06B6D4" },
  { name: "Three.js", category: "3D / Canvas", color: "#FFFFFF" },
  { name: "Framer Motion", category: "Animation", color: "#EC4899" },
  { name: "Vercel", category: "Deployment", color: "#FFFFFF" },
  { name: "Telegram Bot API", category: "Agents", color: "#29B6F6" },
  { name: "Injective SDK", category: "DeFi", color: "#00C4FF" },
  { name: "Tether WDK", category: "Payments", color: "#26A17B" },
];

export default function Arsenal() {
  return (
    <section id="arsenal" className="section-padding relative z-10">
      <div className="container-width">

        <SectionReveal className="text-center mb-16">
          <p className="text-indigo font-mono text-xs tracking-widest uppercase mb-4">
            ◎ The Arsenal
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-800 text-white mb-4">
            The tools I{" "}
            <span className="text-gradient">wield.</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Every tool chosen for a reason. Every stack decision intentional.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {STACK.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card rounded-xl p-4 border border-border hover:border-opacity-60 transition-all duration-300 group cursor-default"
              style={{ "--hover-color": item.color } as React.CSSProperties}
            >
              <div
                className="w-2 h-2 rounded-full mb-3 transition-all duration-300 group-hover:scale-125"
                style={{ background: item.color, boxShadow: `0 0 8px ${item.color}60` }}
              />
              <p className="font-display font-600 text-white text-sm mb-1">
                {item.name}
              </p>
              <p className="text-muted text-[10px] font-mono">{item.category}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <SectionReveal delay={0.3} className="text-center mt-12">
          <p className="text-muted text-sm font-mono">
            + always learning. always adding.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}