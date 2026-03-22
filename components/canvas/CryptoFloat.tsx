"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FloatingSymbol {
  id: number;
  symbol: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  rotation: number;
  rotationEnd: number;
  opacity: number;
  color: string;
}

// Using SVG paths for guaranteed cross-browser rendering
const CRYPTO_SVGS = [
  // Ethereum diamond
  {
    id: "eth",
    svg: `<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 2L6 16.5l10 5.5 10-5.5L16 2z" opacity="0.9"/><path d="M6 16.5L16 30l10-13.5-10 5.5-10-5.5z" opacity="0.7"/></svg>`,
  },
  // Bitcoin B
  {
    id: "btc",
    svg: `<svg viewBox="0 0 32 32" fill="currentColor"><text x="4" y="26" font-size="26" font-weight="bold" font-family="serif">₿</text></svg>`,
  },
  // Hexagon (chain node)
  {
    id: "hex",
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2"><polygon points="16,2 28,9 28,23 16,30 4,23 4,9"/></svg>`,
  },
  // Diamond (generic crypto)
  {
    id: "diamond",
    svg: `<svg viewBox="0 0 32 32" fill="currentColor"><polygon points="16,2 30,16 16,30 2,16"/></svg>`,
  },
  // Chain link
  {
    id: "chain",
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M13 19l-3 3a4 4 0 005.66 5.66l3-3"/><path d="M19 13l3-3a4 4 0 00-5.66-5.66l-3 3"/><line x1="9.5" y1="14.5" x2="14.5" y2="9.5" transform="scale(1.5) translate(-4,-4)"/></svg>`,
  },
  // Circle node
  {
    id: "node",
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2"><circle cx="16" cy="16" r="12"/><circle cx="16" cy="16" r="4" fill="currentColor"/></svg>`,
  },
  // Block/cube
  {
    id: "block",
    svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="24" height="24" rx="3"/><line x1="4" y1="12" x2="28" y2="12"/><line x1="12" y1="4" x2="12" y2="28"/></svg>`,
  },
  // Triangle (delta/Solana-like)
  {
    id: "tri",
    svg: `<svg viewBox="0 0 32 32" fill="currentColor"><polygon points="16,3 30,29 2,29"/></svg>`,
  },
];

const COLORS = [
  "#6366F1",
  "#818CF8",
  "#06B6D4",
  "#67E8F9",
  "#6366F1",
  "#06B6D4",
];

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function generateSymbols(count: number): FloatingSymbol[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    symbol: CRYPTO_SVGS[i % CRYPTO_SVGS.length].svg,
    x: rand(2, 96),
    y: rand(2, 96),
    size: rand(18, 42),
    duration: rand(18, 35),
    delay: rand(-25, 0),
    driftX: rand(-60, 60),
    driftY: rand(-60, 60),
    rotation: rand(0, 360),
    rotationEnd: rand(-180, 180),
    opacity: rand(0.06, 0.22),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));
}

export default function CryptoFloat() {
  const [symbols, setSymbols] = useState<FloatingSymbol[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSymbols(generateSymbols(32));
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {symbols.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            color: s.color,
            filter: `drop-shadow(0 0 6px ${s.color}80)`,
            willChange: "transform, opacity",
          }}
          initial={{ opacity: 0, rotate: s.rotation }}
          animate={{
            opacity: [0, s.opacity, s.opacity * 0.7, s.opacity, 0],
            x: [0, s.driftX * 0.3, s.driftX * 0.7, s.driftX, s.driftX * 0.4, 0],
            y: [0, s.driftY * 0.4, s.driftY * 0.8, s.driftY, s.driftY * 0.2, 0],
            rotate: [
              s.rotation,
              s.rotation + s.rotationEnd * 0.4,
              s.rotation + s.rotationEnd,
            ],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          dangerouslySetInnerHTML={{ __html: s.symbol }}
        />
      ))}
    </div>
  );
}