"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GitBranch, Star, Users } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import AnimatedCounter from "./AnimatedCounter";

export default function FeaturedSpotlight() {
  const project = featuredProjects[0];
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl overflow-hidden mb-12 group"
      style={{
        border: `1px solid ${project.color}30`,
        background: `linear-gradient(135deg, ${project.color}08 0%, ${project.color}02 50%, transparent 100%)`,
      }}
    >
      {/* Spotlight glow */}
      <div
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: `${project.color}20` }}
      />

      <div className="relative p-8 md:p-12">
        <div className="flex items-center gap-2 mb-4">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: project.color, boxShadow: `0 0 8px ${project.color}` }}
          />
          <span className="text-[10px] font-mono tracking-widest uppercase text-muted">
            Featured Project
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3
              className="font-display text-3xl md:text-4xl font-800 text-white mb-4"
              style={{ color: project.color }}
            >
              {project.name}
            </h3>
            <p className="text-lg text-slate-300 font-mono mb-3">
              {project.tagline}
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono px-2 py-1 rounded-md"
                  style={{
                    border: `1px solid ${project.color}30`,
                    background: `${project.color}10`,
                    color: project.color,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-mono transition-all duration-300"
              style={{
                background: project.color,
                color: "#fff",
                boxShadow: `0 0 20px ${project.color}40`,
              }}
            >
              {project.url.includes("github.com") ? "View on GitHub" : "Visit Live Site"}
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Animated metrics */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: GitBranch, label: "Stack Depth", value: project.stack.length, suffix: " techs" },
              { icon: Star, label: "Category", value: project.category, suffix: "" },
              { icon: Users, label: "Status", value: project.status === "live" ? 100 : 60, suffix: "% live" },
              { icon: ArrowUpRight, label: "Year", value: Number(project.year), suffix: "" },
            ].map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="glass-card rounded-xl p-4 border"
                style={{ borderColor: `${project.color}20` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <metric.icon size={12} style={{ color: project.color }} />
                  <span className="text-[10px] font-mono text-muted tracking-wider uppercase">
                    {metric.label}
                  </span>
                </div>
                <div className="font-display font-700 text-xl text-white">
                  {typeof metric.value === "number" && metric.label !== "Category" && metric.label !== "Status" ? (
                    <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                  ) : (
                    <span>{metric.value}{metric.suffix}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
