"use client";

import { motion } from "framer-motion";
import { Twitter, Github, Linkedin, ExternalLink } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";

const LINKS = [
  {
    label: "X / Twitter",
    handle: "@theweb3wizard",
    url: "https://twitter.com/theweb3wizard00",
    icon: Twitter,
    color: "#1DA1F2",
    desc: "Where I ship announcements and thoughts",
  },
  {
    label: "GitHub",
    handle: "theweb3wizard",
    url: "https://github.com/theweb3wizard",
    icon: Github,
    color: "#FFFFFF",
    desc: "Open source code and project repos",
  },
  {
    label: "LinkedIn",
    handle: "Khalid Murtala",
    url: "https://linkedin.com/in/theweb3wizard00",
    icon: Linkedin,
    color: "#0A66C2",
    desc: "Professional work and product updates",
  },
];

const TOOLS = [
  { name: "WalletLens", url: "https://walletlens-hq.vercel.app", color: "#6366F1" },
  { name: "OrderFlow", url: "https://orderflow-hq.vercel.app", color: "#06B6D4" },
  { name: "Valor", url: "https://valor-tgbot.vercel.app", color: "#10B981" },
  { name: "TaxRabbit", url: "https://taxrabbit.xyz", color: "#F59E0B" },
];

export default function Contact() {
  return (
    <section id="contact" className="section-padding relative z-10">
      <div className="container-width">

        <SectionReveal className="text-center mb-16">
          <p className="text-indigo font-mono text-xs tracking-widest uppercase mb-4">
            ◎ Contact
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-800 text-white mb-4">
            Find me in{" "}
            <span className="text-gradient">the dark.</span>
          </h2>
          <p className="text-muted max-w-lg mx-auto">
            I don&apos;t do cold emails. But if you&apos;re building something real in
            Web3 or AI — find me on X.
          </p>
        </SectionReveal>

        {/* Social links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6 border border-border hover:border-opacity-60 transition-all duration-300 group block"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${link.color}15`, border: `1px solid ${link.color}30` }}
                >
                  <link.icon size={16} style={{ color: link.color }} />
                </div>
                <ExternalLink size={12} className="text-muted group-hover:text-white transition-colors" />
              </div>
              <p className="font-display font-600 text-white text-sm mb-1">{link.label}</p>
              <p className="text-indigo-glow text-xs font-mono mb-2">{link.handle}</p>
              <p className="text-muted text-xs">{link.desc}</p>
            </motion.a>
          ))}
        </div>

        {/* Live tools */}
        <SectionReveal delay={0.2}>
          <div className="text-center">
            <p className="text-muted text-xs font-mono mb-6 tracking-widest uppercase">
              Live tools
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {TOOLS.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-mono text-muted hover:text-white transition-all duration-300"
                  style={{ "--tool-color": tool.color } as React.CSSProperties}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: tool.color }}
                  />
                  {tool.name}
                </a>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Footer */}
        <SectionReveal delay={0.3}>
          <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-muted">
            <p>© 2026 Khalid Murtala — The Web3 Wizard</p>
            <p>Built with Next.js · Deployed on Vercel</p>
            <p>Kano, Nigeria 🇳🇬</p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}