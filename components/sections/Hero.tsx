"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const LINES = [
  "I build. I ship. I disappear.",
  "Web3 × AI tools that hit different.",
  "Find the friction. Build the fix.",
];

export default function Hero() {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = LINES[lineIndex];
    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 50);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2500);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 25);
        return () => clearTimeout(t);
      } else {
        setLineIndex((i) => (i + 1) % LINES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, lineIndex]);

  function scrollToAbout() {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface/50 text-xs font-mono text-muted mb-10"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse-slow" />
        Available for select collaborations
      </motion.div>

      <div className="overflow-hidden mb-4">
        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-800 leading-none tracking-tight"
        >
          <span className="text-gradient">The Web3</span>
        </motion.h1>
      </div>

      <div className="overflow-hidden mb-8">
        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-800 leading-none tracking-tight text-white glow-text"
        >
          Wizard
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="h-8 flex items-center justify-center mb-12"
      >
        <p className="font-mono text-lg text-slate-400">
          {displayed}
          <span className="animate-pulse text-indigo ml-0.5">|</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs font-mono text-muted mb-16"
      >
        <span className="flex items-center gap-1.5">
          <span className="text-indigo">◈</span>
          Khalid Murtala
        </span>
        <span className="w-px h-4 bg-border hidden sm:block" />
        <span className="flex items-center gap-1.5">
          <span className="text-cyan">◎</span>
          Kano, Nigeria
        </span>
        <span className="w-px h-4 bg-border hidden sm:block" />
        <span className="flex items-center gap-1.5">
          <span className="text-emerald">●</span>
          4 Tools Shipped
        </span>
      </motion.div>

      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="flex flex-col items-center gap-2 text-muted hover:text-indigo transition-colors duration-300 group"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>

      <div className="absolute left-0 top-1/2 w-24 h-px bg-gradient-to-r from-transparent to-indigo/30 hidden lg:block" />
      <div className="absolute right-0 top-1/2 w-24 h-px bg-gradient-to-l from-transparent to-cyan/30 hidden lg:block" />
    </section>
  );
}