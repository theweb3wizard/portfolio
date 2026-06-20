"use client";

import { useEffect, useRef } from "react";
import { scrollY } from "@/lib/scrollState";

export default function ScrollWand() {
  const barRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const tick = () => {
      const bar = barRef.current;
      if (bar) {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? scrollY.current / scrollable : 0;
        bar.style.transform = `scaleY(${progress})`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <div
      className="fixed right-0 top-0 bottom-0 w-[3px] z-50 pointer-events-none"
      style={{ padding: "4rem 0" }}
    >
      <div
        ref={barRef}
        className="w-full origin-top transition-transform duration-75"
        style={{
          height: "100%",
          background:
            "linear-gradient(to bottom, var(--ambient-color, #6366F1), transparent)",
          boxShadow: "0 0 8px var(--ambient-color, #6366F1), 0 0 20px var(--ambient-glow, rgba(99,102,241,0.3))",
          borderRadius: "2px",
          willChange: "transform",
        }}
      />
    </div>
  );
}
