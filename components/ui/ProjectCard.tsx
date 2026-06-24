"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowUpRight, Github } from "lucide-react";
import { Project } from "@/data/projects";
import Tilt3D from "./Tilt3D";

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        border: `1px solid ${hovered ? `${project.color}40` : "#1A1A2E"}`,
        background: "rgba(10, 10, 18, 0.9)",
      }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${project.color}15 0%, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: project.color }}
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
      />

      <Tilt3D className="p-6 md:p-8" maxTilt={6} perspective={1200} scale={1.01}>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-mono font-600 shrink-0"
              style={{
                background: `${project.color}15`,
                border: `1px solid ${project.color}30`,
                color: project.color,
              }}
            >
              {project.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3
                  className="font-display font-700 text-xl transition-colors duration-300"
                  style={{ color: hovered ? project.accentColor : "white" }}
                >
                  {project.name}
                </h3>
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded-full flex items-center gap-1"
                  style={{
                    background: `${project.color}15`,
                    border: `1px solid ${project.color}30`,
                    color: project.color,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{
                      background: project.color,
                      boxShadow: `0 0 6px ${project.color}`,
                    }}
                  />
                  {project.status === "live" ? "LIVE" : "BUILDING"}
                </span>
              </div>
              <p className="text-muted text-xs font-mono mt-0.5">
                {project.category} · {project.year}
              </p>
            </div>
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted hover:text-white hover:border-indigo/40 transition-all duration-300 shrink-0"
          >
            <ArrowUpRight size={14} />
          </a>
        </div>

        <p className="text-slate-400 text-sm font-mono mb-3">{project.tagline}</p>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2 py-1 rounded-md border border-border text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Terminal snippet */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div
                className="mb-4 rounded-lg px-3 py-2 font-mono text-xs leading-relaxed"
                style={{
                  background: `${project.color}08`,
                  border: `1px solid ${project.color}20`,
                }}
              >
                <span style={{ color: project.color }}>$</span>{" "}
                <span className="text-slate-400">npx</span>{" "}
                <span className="text-white">{project.name.toLowerCase()}</span>{" "}
                <span className="text-slate-500">--stack</span>{" "}
                <span className="text-slate-400">{project.stack[0]}</span>
                <br />
                <span className="text-emerald">✓</span>{" "}
                <span className="text-slate-500">Built and shipped</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono transition-all duration-300 truncate mr-4"
            style={{ color: hovered ? project.color : "#3D3D5C" }}
          >
            <ExternalLink size={11} className="shrink-0" />
            {project.url.replace("https://", "")}
          </a>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-white transition-colors shrink-0"
            >
              <Github size={14} />
            </a>
          )}
        </div>
      </Tilt3D>
    </motion.article>
  );
}