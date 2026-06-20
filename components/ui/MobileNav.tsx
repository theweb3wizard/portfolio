"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "About", href: "#about", icon: "◈" },
  { label: "Stack", href: "#arsenal", icon: "◎" },
  { label: "Work", href: "#work", icon: "⬡" },
  { label: "Why", href: "#mission", icon: "◈" },
  { label: "Find", href: "#contact", icon: "◎" },
];

export default function MobileNav() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function handleClick(href: string) {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 block md:hidden"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="glass border-t border-border/50 px-2 py-2 flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.href.slice(1);
          return (
            <button
              key={item.label}
              onClick={() => handleClick(item.href)}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-300 min-w-[56px]",
                isActive
                  ? "text-indigo-glow"
                  : "text-muted"
              )}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <span
                className={cn(
                  "text-xs transition-all duration-300",
                  isActive && "scale-110"
                )}
              >
                {item.icon}
              </span>
              <span className="text-[9px] font-mono tracking-wider">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
