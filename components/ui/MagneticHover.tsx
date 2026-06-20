"use client";

import { useRef, useCallback, type ReactNode } from "react";

interface MagneticHoverProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

export default function MagneticHover({
  children,
  className = "",
  strength = 0.3,
  radius = 200,
}: MagneticHoverProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);

  const animate = useCallback(() => {
    currentX.current += (targetX.current - currentX.current) * 0.12;
    currentY.current += (targetY.current - currentY.current) * 0.12;

    if (elRef.current) {
      elRef.current.style.transform = `translate(${currentX.current}px, ${currentY.current}px)`;
    }

    if (
      Math.abs(currentX.current - targetX.current) > 0.01 ||
      Math.abs(currentY.current - targetY.current) > 0.01
    ) {
      rafId.current = requestAnimationFrame(animate);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = elRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const pull = (1 - dist / radius) * strength;
        targetX.current = dx * pull;
        targetY.current = dy * pull;
        cancelAnimationFrame(rafId.current);
        rafId.current = requestAnimationFrame(animate);
      }
    },
    [strength, radius, animate]
  );

  const handleMouseLeave = useCallback(() => {
    targetX.current = 0;
    targetY.current = 0;
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(animate);
  }, [animate]);

  return (
    <div
      ref={elRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: "transform", transition: "transform 0.05s linear" }}
    >
      {children}
    </div>
  );
}
