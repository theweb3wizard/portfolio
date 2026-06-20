"use client";

import { useEffect, useRef } from "react";
import { SECTION_HUES } from "@/lib/ambient";

const SECTION_IDS = ["hero", "about", "arsenal", "work", "mission", "contact"];

export default function SectionPortal() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const lastSection = useRef("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visible = new Map<string, number>();

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          visible.set(id, entry.intersectionRatio);
          if (entry.intersectionRatio > 0.3) {
            const prev = lastSection.current;
            if (prev !== id) {
              lastSection.current = id;
              triggerPortal(prev, id);
            }
          }
        },
        { threshold: [0.3, 0.5] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    function triggerPortal(from: string, to: string) {
      const overlay = overlayRef.current;
      if (!overlay) return;

      const toHue = SECTION_HUES[to] || 239;

      overlay.style.background = `radial-gradient(circle at 50% 50%, hsl(${toHue}, 75%, 55%, 0.08) 0%, transparent 70%)`;
      overlay.style.opacity = "1";
      overlay.style.transition = "none";

      requestAnimationFrame(() => {
        overlay.style.transition = "opacity 1.2s ease";
        overlay.style.opacity = "0";
      });
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 2,
        opacity: 0,
        transition: "opacity 1.2s ease",
      }}
    />
  );
}
