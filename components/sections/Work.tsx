"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import ProjectCard from "@/components/ui/ProjectCard";
import FeaturedSpotlight from "@/components/ui/FeaturedSpotlight";
import MobileProjectCarousel from "@/components/ui/MobileProjectCarousel";
import { allProjects } from "@/data/projects";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "AI", "Agent"];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? allProjects
    : allProjects.filter((p) => p.category === activeFilter);

  return (
    <section id="work" className="section-padding relative z-10">
      <div className="container-width">

        <SectionReveal className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="text-indigo font-mono text-xs tracking-widest uppercase mb-4">
                ⬡ Shipped
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-800 text-white mb-4">
                What I&apos;ve{" "}
                <span className="text-gradient">built.</span>
              </h2>
              <p className="text-slate-400 max-w-lg">
                Every product solves a specific problem. No demo projects.
                No tutorial clones. All live.
              </p>
            </div>
          </div>
        </SectionReveal>

        {/* Featured spotlight */}
        <FeaturedSpotlight />

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => {
            const count = f === "All"
              ? allProjects.length
              : allProjects.filter((p) => p.category === f).length;
            if (count === 0) return null;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 border",
                  activeFilter === f
                    ? "bg-indigo/20 border-indigo/40 text-indigo-glow"
                    : "border-border text-muted hover:border-subtle hover:text-slate-300"
                )}
              >
                {f}
                <span className="ml-1.5 opacity-50">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop grid — hidden on mobile */}
        <motion.div
          layout
          className="hidden md:grid grid-cols-2 gap-6"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        {/* Mobile carousel — hidden on desktop */}
        <MobileProjectCarousel projects={filtered} />

        {/* More coming */}
        <SectionReveal delay={0.4} className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-muted text-sm font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo animate-pulse-slow" />
            More tools shipping soon
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}