"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Arsenal", href: "#arsenal" },
  { label: "Work", href: "#work" },
  { label: "Mission", href: "#mission" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.5 }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "py-4 glass border-b border-border/50"
          : "py-6 bg-transparent"
      )}
    >
      <div className="container-width flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="font-display font-700 text-lg tracking-tight text-white hover:text-indigo transition-colors duration-300"
        >
          <span className="text-gradient">W3</span>
          <span className="text-muted">W</span>
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={cn(
                "text-sm font-mono transition-all duration-300 relative group",
                activeSection === item.href.slice(1)
                  ? "text-indigo-glow"
                  : "text-muted hover:text-slate-300"
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-px bg-indigo transition-all duration-300",
                  activeSection === item.href.slice(1)
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                )}
              />
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://twitter.com/theweb3wizard"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-indigo/30 text-indigo-glow text-xs font-mono hover:bg-indigo/10 hover:border-indigo/60 transition-all duration-300"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse-slow" />
          @theweb3wizard
        </a>
      </div>
    </nav>
  );
}