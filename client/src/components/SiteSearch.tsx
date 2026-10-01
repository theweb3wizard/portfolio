import { useCallback, useEffect, useState } from "react";
import { Command } from "cmdk";
import { useLocation } from "wouter";
import { insights, navLinks, projects, services } from "@/site";

/**
 * SiteSearch — ⌘K quick search over existing titles only.
 * Lazy-loaded so cmdk never touches the initial bundle.
 * No new copy: every result reuses an existing page/project title.
 */
export default function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const onEvent = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("site-search:open", onEvent);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("site-search:open", onEvent);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      navigate(href);
    },
    [navigate]
  );

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Search this site">
      <Command.Input placeholder="Search…" />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group heading="Work">
          {projects.map((p) => (
            <Command.Item key={p.slug} value={`${p.name} ${p.category}`} onSelect={() => go(`/work/${p.slug}`)}>
              {p.name}
              <span>{p.category}</span>
            </Command.Item>
          ))}
        </Command.Group>
        <Command.Group heading="Insights">
          {insights.map((i) => (
            <Command.Item key={i.slug} value={i.title} onSelect={() => go(`/insights/${i.slug}`)}>
              {i.title}
              <span>{i.readingTime}</span>
            </Command.Item>
          ))}
        </Command.Group>
        <Command.Group heading="Pages">
          {navLinks.map((l) => (
            <Command.Item key={l.href} value={l.label} onSelect={() => go(l.href)}>
              {l.label}
            </Command.Item>
          ))}
          {Object.values(services).map((s) => (
            <Command.Item key={s.slug} value={s.label} onSelect={() => go(`/services/${s.slug}`)}>
              {s.label}
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
