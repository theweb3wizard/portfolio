import { useEffect, useState } from "react";
import { projects } from "@/site";

/**
 * HeroConsole — live featured-work preview for the homepage hero.
 * SEO-safe: no h1/h2/h3 inside, reuses existing project copy only,
 * decorative chrome is aria-hidden. Crawlers keep reading the SSG
 * static body + the real h1 in Home().
 */
const featured = projects.filter((p) => p.featured).concat(projects.filter((p) => !p.featured));
const CYCLE_MS = 3600;

export default function HeroConsole() {
  const [index, setIndex] = useState(0);
  const total = featured.length;
  const project = featured[index % total];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (total <= 1) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setIndex((i) => (i + 1) % total);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [total]);

  return (
    <div className="console" role="region" aria-label="Featured work preview">
      <div className="console-bar" aria-hidden="true">
        <span className="console-dots">
          <i /><i /><i />
        </span>
        <span className="console-addr">/{project.slug}</span>
      </div>
      <div className="console-body">
        <div className="console-meta">
          <span className="console-cat">{project.category}</span>
          <span className="console-status">
            <i aria-hidden="true" />{project.status}
          </span>
        </div>
        <div className="console-title" aria-hidden="false">{project.name}</div>
        <p className="console-summary">{project.summary}</p>
        <div className="console-stack" aria-hidden="true">
          {project.stack.slice(0, 3).map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <div className="console-foot" aria-hidden="true">
          <span className="console-index">
            {String((index % total) + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <span className="console-track">
            <span className="console-fill" key={project.slug} />
          </span>
        </div>
        <div className="console-nav" role="group" aria-label="Preview featured projects">
          {featured.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              className={`console-dot${i === index % total ? " active" : ""}`}
              aria-label={`Show ${p.name}`}
              aria-current={i === index % total ? "true" : undefined}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
      <span className="console-glow" aria-hidden="true" />
    </div>
  );
}
