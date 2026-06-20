"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/projects";

interface Props {
  projects: Project[];
}

export default function MobileProjectCarousel({ projects }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="block md:hidden -mx-6">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none px-6 pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="snap-start shrink-0 w-[85vw] max-w-sm rounded-2xl overflow-hidden"
            style={{
              border: `1px solid ${project.color}30`,
              background: "rgba(10, 10, 18, 0.9)",
            }}
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-mono font-600 shrink-0"
                    style={{
                      background: `${project.color}15`,
                      border: `1px solid ${project.color}30`,
                      color: project.color,
                    }}
                  >
                    {project.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-display font-700 text-base text-white">
                      {project.name}
                    </h3>
                    <p className="text-muted text-[10px] font-mono">
                      {project.category} · {project.year}
                    </p>
                  </div>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted shrink-0"
                >
                  <ArrowUpRight size={12} />
                </a>
              </div>

              <p className="text-slate-400 text-xs font-mono mb-2">{project.tagline}</p>
              <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded-md border border-border text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[10px] font-mono text-muted"
                >
                  <ExternalLink size={9} />
                  {project.url.replace("https://", "").slice(0, 20)}...
                </a>

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted"
                  >
                    <Github size={12} />
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Scroll hint */}
      <p className="text-center text-[10px] font-mono text-muted mt-2 md:hidden">
        ← Swipe to browse projects →
      </p>
    </div>
  );
}
