"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { projects } from "@/data/projects";

const LINES = [
  "High-execution. Full-stack. Web3 × AI.",
  "AI-native orchestration. Compressed cycles.",
  "From chain to UI — I own the loop.",
];

export default function Hero() {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const target = LINES[lineIndex];
    clearTimeout(timerRef.current);
    if (typing) {
      if (displayed.length < target.length) {
        timerRef.current = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 50);
      } else {
        timerRef.current = setTimeout(() => setTyping(false), 2500);
      }
    } else {
      if (displayed.length > 0) {
        timerRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 25);
      } else {
        setLineIndex((i) => (i + 1) % LINES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [displayed, typing, lineIndex]);

  function scrollToAbout() {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center z-10">
      {/* Sigil */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mb-8 relative"
      >
        <div className="absolute inset-0 bg-indigo/10 rounded-full blur-3xl scale-150" />
        <motion.img
          src="/images/wizard-sigil.svg"
          alt="The Web3 Wizard Sigil"
          className="w-24 h-24 md:w-28 md:h-28 relative z-10"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface/50 text-xs font-mono text-muted mb-8"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse-slow" />
        Open to product engineering roles
      </motion.div>

      <div className="overflow-hidden mb-3">
        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-800 leading-none tracking-tight"
        >
          <span className="text-gradient">The Web3</span>
        </motion.h1>
      </div>

      <div className="overflow-hidden mb-4">
        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-800 leading-none tracking-tight text-white glow-text"
        >
          Wizard
        </motion.h1>
      </div>

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mb-6"
      >
        <p className="font-display text-xl md:text-2xl font-500 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300 tracking-wide">
          &ldquo;Clarity meets craft.&rdquo;
        </p>
      </motion.div>

      {/* Typewriter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="h-8 flex items-center justify-center mb-10"
      >
        <p className="font-mono text-base md:text-lg text-slate-400">
          {displayed}
          <span className="animate-pulse text-indigo ml-0.5">|</span>
        </p>
      </motion.div>

      {/* Dual CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="flex flex-wrap items-center justify-center gap-4 mb-14"
      >
        <a
          href="#work"
          onClick={(e) => { e.preventDefault(); document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" }); }}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-mono text-sm font-500 hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
        >
          Explore the tools &rarr;
        </a>
        <a
          href="#arsenal"
          onClick={(e) => { e.preventDefault(); document.querySelector("#arsenal")?.scrollIntoView({ behavior: "smooth" }); }}
          className="px-6 py-3 rounded-full border border-indigo/30 text-slate-300 font-mono text-sm hover:bg-indigo/10 hover:border-indigo/50 transition-all duration-300"
        >
          Start learning &rarr;
        </a>
      </motion.div>

      {/* Meta line */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs font-mono text-muted mb-12"
      >
        <span className="flex items-center gap-1.5">
          <span className="text-indigo">◈</span>
          Khalid Murtala
        </span>
        <span className="w-px h-4 bg-border hidden sm:block" />
        <span className="flex items-center gap-1.5">
          <span className="text-cyan">◎</span>
          Product Engineer
        </span>
        <span className="w-px h-4 bg-border hidden sm:block" />
        <span className="flex items-center gap-1.5">
           <span className="text-emerald">●</span>
           {projects.length} Tools Shipped
        </span>
      </motion.div>

      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="flex flex-col items-center gap-2 text-muted hover:text-indigo transition-colors duration-300 group"
      >
         <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
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