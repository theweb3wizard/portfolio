"""
generate-og-images.py — per-page Open Graph cards for theweb3wizard.xyz

Reproduces the design language of client/public/og-image.svg (dark ground, gold
radial glow, diamond glyph, monospace eyebrow, heavy sans headline) and emits one
1200x630 PNG per route.

Requires Pillow:  pip install Pillow
Run:              python generate-og-images.py

Output: client/public/og/<slug>.png
"""

from __future__ import annotations

import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

try:  # Pillow >= 9.1
    RESAMPLE = Image.Resampling.BICUBIC
except AttributeError:  # pragma: no cover
    RESAMPLE = Image.BICUBIC

# ─── Brand palette (sampled from og-image.svg) ────────────────────────────────

BG = (10, 10, 11)                  # #0a0a0b
GOLD = (215, 168, 75)              # #d7a84b
BLUE = (120, 169, 255)             # #78a9ff
BORDER = (41, 44, 49)              # #292c31
# #78a9ff at 25% over #0a0a0b, precomputed because Pillow rejects RGBA colours
# when drawing onto an RGB canvas.
INNER_BORDER = (38, 50, 72)
INK = (244, 244, 241)              # #f4f4f1
MUTED = (164, 167, 174)            # #a4a7ae

WIDTH, HEIGHT = 1200, 630
GLOW_STRENGTH = 0.12               # matches the 0.12 stop-opacity in the SVG

EYEBROW_TRACKING = 0.13            # em
HEADLINE_TRACKING = -0.06          # em

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "client" / "public" / "og"

# ─── Fonts ────────────────────────────────────────────────────────────────────

SANS_BLACK = [
    "C:/Windows/Fonts/seguibl.ttf",   # Segoe UI Black — closest to Inter 800
    "C:/Windows/Fonts/segoeuib.ttf",
    "C:/Windows/Fonts/arialbd.ttf",
]
SANS_REGULAR = [
    "C:/Windows/Fonts/segoeui.ttf",
    "C:/Windows/Fonts/arial.ttf",
]
MONO = [
    "C:/Windows/Fonts/consola.ttf",
    "C:/Windows/Fonts/cour.ttf",
]

_font_cache: dict[tuple[int, int], ImageFont.FreeTypeFont] = {}


def load_font(candidates: list[str], size: int) -> ImageFont.FreeTypeFont:
    key = (id(candidates), size)
    if key not in _font_cache:
        for path in candidates:
            if os.path.exists(path):
                _font_cache[key] = ImageFont.truetype(path, size)
                break
        else:
            raise SystemExit("No usable font found. Tried:\n  " + "\n  ".join(candidates))
    return _font_cache[key]


# ─── Page content ─────────────────────────────────────────────────────────────

PAGES: dict[str, dict[str, object]] = {
    "/": {
        "eyebrow": "FOUNDER-LED WEB3 PRODUCT STUDIO",
        "headline": ["Clearer Web3 products,", "built by one founder."],
        "subline": "Product builds \u00b7 AI agents \u00b7 Solana \u00b7 automation",
    },
    "/services": {
        "eyebrow": "SERVICES",
        "headline": ["Choose the engagement", "that fits."],
        "subline": "Discovery \u00b7 Product builds \u00b7 AI agent & Solana engineering",
    },
    "/services/product-discovery": {
        "eyebrow": "SERVICE \u00b7 PRODUCT DISCOVERY",
        "headline": ["Turn a Web3 problem into", "a build-ready direction."],
        "subline": "Define the user \u00b7 Scope the MVP \u00b7 Decide what to build first",
    },
    "/services/web3-mvp-development": {
        "eyebrow": "SERVICE \u00b7 WEB3 MVP",
        "headline": ["Build a focused,", "working Web3 product."],
        "subline": "AI agents \u00b7 Solana apps \u00b7 dApps \u00b7 automation",
    },
    "/services/ai-agent-solana-engineering": {
        "eyebrow": "SERVICE \u00b7 AI & SOLANA",
        "headline": ["AI agents and Solana", "engineering."],
        "subline": "Integration sprints \u00b7 Guardrails \u00b7 On-chain data",
    },
    "/work": {
        "eyebrow": "WORK",
        "headline": ["Web3 products,", "built and shipped."],
        "subline": "Founder-built \u00b7 Live demos \u00b7 Public repositories",
    },
    "/work/spellbook": {
        "eyebrow": "PROJECT \u00b7 SPELLBOOK",
        "headline": ["A Web3 AI agent", "marketplace."],
        "subline": "USDT/USDC checkout \u00b7 Source handover \u00b7 Managed hosting",
    },
    "/work/valor": {
        "eyebrow": "PROJECT \u00b7 VALOR",
        "headline": ["Autonomous USDC rewards", "for Telegram."],
        "subline": "Message scoring \u00b7 Base payments \u00b7 Isolated treasury",
    },
    "/work/walletlens": {
        "eyebrow": "PROJECT \u00b7 WALLETLENS",
        "headline": ["EVM wallet intelligence", "in plain language."],
        "subline": "Risk score \u00b7 Portfolio \u00b7 Behavioural analysis",
    },
    "/work/write3": {
        "eyebrow": "PROJECT \u00b7 WRITE3",
        "headline": ["Compliance-safe content", "in your own voice."],
        "subline": "Voice cloning \u00b7 Risk flags \u00b7 Platform-native drafts",
    },
    "/work/agenthub": {
        "eyebrow": "PROJECT \u00b7 AGENTHUB",
        "headline": ["A policy-controlled", "agent access layer."],
        "subline": "Least privilege \u00b7 Audit trails \u00b7 Human approval",
    },
    "/work/orderflow": {
        "eyebrow": "PROJECT \u00b7 ORDERFLOW",
        "headline": ["An AI trading journal", "on Injective."],
        "subline": "Trade logging \u00b7 Reflection \u00b7 On-chain data",
    },
    "/work/solpulse": {
        "eyebrow": "PROJECT \u00b7 SOLPULSE",
        "headline": ["Solana wallet signals,", "without the noise."],
        "subline": "Whale tracking \u00b7 Dust filtering \u00b7 Telegram alerts",
    },
    "/work/community-signal": {
        "eyebrow": "PROJECT \u00b7 COMMUNITY SIGNAL",
        "headline": ["From community attention", "to product action."],
        "subline": "Building stage \u00b7 Telegram & Discord workflows",
    },
    "/about": {
        "eyebrow": "ABOUT",
        "headline": ["One founder.", "Every engagement."],
        "subline": "No client logos \u00b7 No invented metrics \u00b7 Everything inspectable",
    },
    "/hire-khalid": {
        "eyebrow": "HIRE KHALID MURTALA",
        "headline": ["AI \u00d7 Web3 product", "engineering."],
        "subline": "From $750 \u00b7 Project-based \u00b7 Direct with the founder",
    },
    "/profile": {
        "eyebrow": "PROFILE \u00b7 KHALID MURTALA",
        "headline": ["AI \u00d7 Web3 product", "engineer."],
        "subline": "Skills \u00b7 Selected work \u00b7 Availability",
    },
    "/ai-agents": {
        "eyebrow": "AI AGENTS",
        "headline": ["Practical AI agents", "for Web3."],
        "subline": "Support \u00b7 Wallet intelligence \u00b7 Treasury monitoring",
    },
    "/insights": {
        "eyebrow": "INSIGHTS",
        "headline": ["Notes on building", "Web3 products."],
        "subline": "Scoping \u00b7 Prototypes \u00b7 Using AI well",
    },
    "/insights/scope-a-web3-product-before-spending-money": {
        "eyebrow": "INSIGHT",
        "headline": ["How to scope a Web3 MVP", "before you spend."],
        "subline": "Product discovery \u00b7 Cost \u00b7 Scope",
    },
    "/insights/why-a-web3-prototype-can-fail": {
        "eyebrow": "INSIGHT",
        "headline": ["Why Web3 prototypes", "fail with users."],
        "subline": "Failure modes \u00b7 Testing \u00b7 What to measure",
    },
    "/insights/use-ai-without-blindly-trusting-it": {
        "eyebrow": "INSIGHT",
        "headline": ["Using AI in Web3", "without blind trust."],
        "subline": "Guardrails \u00b7 Verification \u00b7 Accountability",
    },
    "/insights/what-i-learned-shipping-seven-web3-mvps-solo": {
        "eyebrow": "INSIGHT",
        "headline": ["Seven Web3 MVPs,", "built alone."],
        "subline": "Scope \u00b7 Integrations \u00b7 Agent boundaries",
    },
    "/insights/how-much-does-a-web3-mvp-cost": {
        "eyebrow": "INSIGHT",
        "headline": ["What a Web3 MVP", "actually costs."],
        "subline": "Published ranges \u00b7 Cost drivers \u00b7 Scope cuts",
    },
    "/insights/do-i-need-a-smart-contract-audit": {
        "eyebrow": "INSIGHT",
        "headline": ["Do you need a", "smart contract audit?"],
        "subline": "When it helps \u00b7 When it does not",
    },
    "/insights/how-to-evaluate-a-web3-developer": {
        "eyebrow": "INSIGHT",
        "headline": ["How to evaluate", "a Web3 developer."],
        "subline": "Five checks \u00b7 Questions \u00b7 Red flags",
    },
    "/insights/web3-agency-vs-freelancer": {
        "eyebrow": "INSIGHT",
        "headline": ["Agency, freelancer", "or solo studio?"],
        "subline": "Capacity \u00b7 Cost \u00b7 Accountability",
    },
    "/insights/what-is-an-ai-agent-in-web3": {
        "eyebrow": "INSIGHT",
        "headline": ["What is an AI", "agent in Web3?"],
        "subline": "Input \u00b7 Reasoning \u00b7 Bounded action",
    },
    "/insights/what-is-a-web3-mvp": {
        "eyebrow": "INSIGHT",
        "headline": ["What is a", "Web3 MVP?"],
        "subline": "One user \u00b7 One action \u00b7 Failure handled",
    },
    "/insights/what-is-a-product-discovery-sprint": {
        "eyebrow": "INSIGHT",
        "headline": ["What is a product", "discovery sprint?"],
        "subline": "Definition \u00b7 Deliverables \u00b7 When to skip it",
    },
    "/insights/what-is-wallet-intelligence": {
        "eyebrow": "INSIGHT",
        "headline": ["What is", "wallet intelligence?"],
        "subline": "Interpretation \u00b7 Limits \u00b7 Worked example",
    },
    "/start": {
        "eyebrow": "GET STARTED",
        "headline": ["Start a conversation", "about your product."],
        "subline": "One founder reads every inquiry",
    },
    "/privacy": {
        "eyebrow": "LEGAL",
        "headline": ["Privacy", "Policy"],
        "subline": "How inquiries and data are handled",
    },
    "/terms": {
        "eyebrow": "LEGAL",
        "headline": ["Terms of", "Service"],
        "subline": "Clear boundaries for every engagement",
    },
}


def slug_for(route: str) -> str:
    return "home" if route == "/" else route.strip("/").replace("/", "-")


# ─── Text helpers (letter-spacing, which Pillow has no native support for) ────


def measure_tracked(
    draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, tracking: float
) -> float:
    if not text:
        return 0.0
    width = sum(draw.textlength(ch, font=font) for ch in text)
    return width + tracking * (len(text) - 1)


def draw_tracked(
    draw: ImageDraw.ImageDraw,
    xy: tuple[float, float],
    text: str,
    font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int],
    tracking: float,
) -> None:
    """Draw left-aligned on a baseline, adding `tracking` px between glyphs."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill, anchor="ls")
        x += draw.textlength(ch, font=font) + tracking


def fit_font(
    draw: ImageDraw.ImageDraw,
    lines: list[str],
    candidates: list[str],
    start_size: int,
    max_width: int,
    tracking_em: float,
    min_size: int = 28,
) -> ImageFont.FreeTypeFont:
    """Shrink until every line fits, measuring with the same tracking used to draw."""
    size = start_size
    while size > min_size:
        font = load_font(candidates, size)
        tracking = tracking_em * size
        if all(measure_tracked(draw, line, font, tracking) <= max_width for line in lines):
            return font
        size -= 2
    return load_font(candidates, min_size)


# ─── Drawing ──────────────────────────────────────────────────────────────────


def radial_glow() -> Image.Image:
    """Gold glow anchored at 75% / 0%, matching the SVG radialGradient."""
    sw, sh = 300, 158
    cx, cy = 0.75, 0.0
    px = Image.new("L", (sw, sh))
    data = []
    for y in range(sh):
        ny = (y + 0.5) / sh
        for x in range(sw):
            nx = (x + 0.5) / sw
            dist = ((nx - cx) ** 2 + (ny - cy) ** 2) ** 0.5
            t = max(0.0, 1.0 - dist / 0.60)
            data.append(int(255 * t * GLOW_STRENGTH))
    px.putdata(data)
    return px.resize((WIDTH, HEIGHT), RESAMPLE)


def render(route: str, spec: dict[str, object]) -> Path:
    img = Image.new("RGB", (WIDTH, HEIGHT), BG)
    img.paste(Image.new("RGB", (WIDTH, HEIGHT), GOLD), (0, 0), radial_glow())

    draw = ImageDraw.Draw(img)

    # Frames
    draw.rectangle([32, 32, 1167, 597], outline=BORDER, width=1)
    draw.rectangle([56, 56, 1143, 573], outline=INNER_BORDER, width=1)

    # Brand glyph — diamond outline with centred W
    draw.polygon([(90, 65), (115, 90), (90, 115), (65, 90)], outline=GOLD)
    draw.text((90, 90), "W", font=load_font(MONO, 14), fill=GOLD, anchor="mm")

    # Brand name
    draw_tracked(draw, (120, 96), "The Web3 Wizard Labs", load_font(SANS_BLACK, 19), INK, -0.04 * 19)

    # Eyebrow (monospace, wide tracking)
    eyebrow = str(spec["eyebrow"])
    eyebrow_font = load_font(MONO, 13)
    draw_tracked(draw, (72, 260), eyebrow, eyebrow_font, GOLD, EYEBROW_TRACKING * 13)

    # Headline
    lines = [str(line) for line in spec["headline"]]  # type: ignore[union-attr]
    headline_font = fit_font(draw, lines, SANS_BLACK, 62, 1040, HEADLINE_TRACKING)
    headline_tracking = HEADLINE_TRACKING * headline_font.size
    baselines = [340, 415] if len(lines) > 1 else [378]
    for line, baseline in zip(lines, baselines):
        draw_tracked(draw, (72, baseline), line, headline_font, INK, headline_tracking)

    # Subline
    subline = str(spec["subline"])
    sub_font = fit_font(draw, [subline], SANS_REGULAR, 22, 1040, 0, 16)
    draw_tracked(draw, (72, 490), subline, sub_font, MUTED, 0)

    # Accent rule
    draw.rectangle([72, 532, 251, 535], fill=GOLD)
    draw.rectangle([264, 532, 353, 535], fill=BLUE)

    # URL
    url = "theweb3wizard.xyz" if route == "/" else f"theweb3wizard.xyz{route}"
    url_font = load_font(MONO, 14)
    draw.text(
        (1128, 562),
        url,
        font=url_font,
        fill=MUTED,
        anchor="rs",
    )

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out = OUT_DIR / f"{slug_for(route)}.png"
    img.save(out, "PNG", optimize=True)
    return out


def main() -> None:
    print(f"writing to {OUT_DIR}\n")
    total = 0
    for route, spec in PAGES.items():
        out = render(route, spec)
        size = out.stat().st_size
        total += size
        print(f"  {route:<56} {size / 1024:>6.1f} KB")
    print(f"\n{len(PAGES)} images, {total / 1024 / 1024:.2f} MB total")


if __name__ == "__main__":
    main()
