# The Web3 Wizard — Portfolio

**Product Engineer · Full-Stack Web3 × AI Builder**

High-execution full-stack building from smart contracts to responsive UI. Clarity meets craft.

## Live Site

[https://theweb3wizard.vercel.app](https://theweb3wizard.vercel.app)

## Overview

This is the personal portfolio and brand presence for **Khalid Murtala (The Web3 Wizard)** — a product engineer who builds at the intersection of cryptocurrency and artificial intelligence.

The site is a single-page application featuring:
- Immersive Three.js particle universe with mouse-follow parallax
- Floating crypto symbol ambiance with ambient hue-shifting
- Smooth scroll via Lenis with section-aware color transitions
- Custom cursor with trail effects
- Responsive mobile navigation with horizontal project carousel
- Dynamic OG image generation at the edge
- Full SEO suite (sitemap, robots.txt, JSON-LD structured data)

## Built With

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 3.4 |
| Animation | Framer Motion 12 |
| 3D | Three.js 0.183 |
| Smooth Scroll | Lenis 1.3 |
| Icons | Lucide React |
| Deployment | Vercel |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/theweb3wizard/web3wizard.git
cd web3wizard

# Install dependencies
npm install

# Set environment variable
echo "NEXT_PUBLIC_SITE_URL=https://your-url.com" > .env.local

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

## Project Structure

```
app/              Next.js App Router pages & layout
  codex/          Brand codex page
  globals.css     Global styles & Tailwind layers
  layout.tsx      Root layout with SEO metadata
  page.tsx        Homepage (main portfolio)
components/
  canvas/         Three.js & canvas-heavy components
  sections/       Page sections (Hero, About, Work, etc.)
  ui/             Reusable UI components
data/             Static project data
hooks/            Custom React hooks (Lenis, parallax, ambient color)
lib/              Utilities (scroll state, color lerp, cn())
public/
  images/         Static assets (logos, profile photo)
  favicon.svg     SVG favicon
```

## Projects Featured

- **SolPulse** — Real-time Solana memecoin whale tracker
- **Valor** — Low-latency AI agents for on-chain trading
- **TxPreview** — Transaction security previewer
- **SearchLens** — AI Overview interception scanner
- **Write3** — AI Web3 content generator
- **Conviction Collapse Detector** — Social sentiment/depeg detector

## Environment Variables

| Variable | Required | Default |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | No | `https://theweb3wizard.vercel.app` |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build with type checking |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Deployment

Deployed on [Vercel](https://vercel.com). Push to `main` to trigger automatic deployment.

## License

MIT © Khalid Murtala
