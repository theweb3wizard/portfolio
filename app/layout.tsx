import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theweb3wizard.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Khalid Murtala — Product Engineer | Full-Stack Web3 × AI Builder",
    template: "%s | The Web3 Wizard",
  },
  description:
    "Khalid Murtala (The Web3 Wizard) is a Product Engineer and Full-Stack Web3 Builder who independently architects, builds, and ships production-grade tools at the intersection of crypto and AI. Creator of SolPulse, Valor, TxPreview, SearchLens, and 10+ Web3 products — from smart contracts and data pipelines to responsive UI. Clarity meets craft.",
  keywords: [
    "The Web3 Wizard",
    "Khalid Murtala",
    "Web3 builder",
    "AI crypto tools",
    "Conviction Collapse Detector",
    "SearchLens",
    "Write3",
    "SolPulse",
    "Product Engineer",
    "crypto AI tools",
    "blockchain developer",
    "DeFi tools",
    "Solana analytics",
    "Web3 learning resources",
    "Clarity meets craft",
  ],
  authors: [{ name: "Khalid Murtala", url: siteUrl }],
  creator: "Khalid Murtala",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Khalid Murtala — The Web3 Wizard",
    description:
      "Clarity meets craft. Full-Stack Web3 × AI Product Engineer. Building tools that solve real problems at the intersection of crypto and artificial intelligence.",
    siteName: "The Web3 Wizard",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "The Web3 Wizard — Khalid Murtala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@theweb3wizard00",
    title: "Khalid Murtala — The Web3 Wizard",
    description: "Clarity meets craft. Web3 × AI builder. Building tools that hit different.",
    creator: "@theweb3wizard00",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};


const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Khalid Murtala",
  alternateName: "The Web3 Wizard",
  url: siteUrl,
  image: `${siteUrl}/images/profile.png`,
  sameAs: [
    "https://twitter.com/theweb3wizard00",
    "https://github.com/theweb3wizard",
    "https://linkedin.com/in/khalid-murtala",
    "https://t.me/theweb3wizard00",
    "https://discord.com/users/theweb3wizard00",
    "https://instagram.com/theweb3wizard00",
  ],
  jobTitle: "Product Engineer & Full-Stack Web3 Builder",
  worksFor: {
    "@type": "Organization",
    name: "The Web3 Wizard",
  },
  knowsAbout: [
    "Web3",
    "Blockchain",
    "Artificial Intelligence",
    "DeFi",
    "Smart Contracts",
    "Next.js",
    "TypeScript",
    "Solana",
    "EVM",
    "Solidity",
    "React",
    "Full-Stack Development",
    "AI Agents",
    "Crypto Trading",
    "Web Development",
  ],
  description:
    "Khalid Murtala, known as The Web3 Wizard, is a Product Engineer and Full-Stack Web3 Builder specializing in AI-native development. Creator of SolPulse, Valor, TxPreview, SearchLens, Write3, and 10+ Web3 and AI tools. Independently ships products from smart contracts to responsive UI.",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "The Web3 Wizard",
  alternateName: "Khalid Murtala",
  url: siteUrl,
  description:
    "Web3 and AI tools by Khalid Murtala. Clarity meets craft.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const learningResourceJsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "The Web3 Wizard — Learning Resources",
  description:
    "Web3 and AI concepts explained clearly. No gatekeeping. No jargon for jargon's sake.",
  provider: {
    "@type": "Person",
    name: "Khalid Murtala",
    alternateName: "The Web3 Wizard",
  },
  audience: {
    "@type": "Audience",
    audienceType: "Web3 learners and developers",
  },
  educationalLevel: "Beginner to Intermediate",
  teaches: [
    "Web3 fundamentals",
    "Smart contracts",
    "AI and blockchain integration",
    "Solana development",
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is Khalid Murtala?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Khalid Murtala, known online as The Web3 Wizard, is a Product Engineer and Full-Stack Web3 Builder specializing in AI-native development. He builds production-grade Web3 tools end-to-end — from smart contracts and data pipelines to responsive UI. He is the creator of SolPulse, Valor, TxPreview, and 10+ other tools in the Web3 and AI space.",
      },
    },
    {
      "@type": "Question",
      name: "What is The Web3 Wizard?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Web3 Wizard is the online alias and brand of Khalid Murtala, a Product Engineer building at the intersection of Web3 and AI. It represents a portfolio of independently built tools including SolPulse, Valor, TxPreview, SearchLens, Write3, and more — along with Web3 learning resources and educational content.",
      },
    },
    {
      "@type": "Question",
      name: "What tools has Khalid Murtala built?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Khalid Murtala has built 13 Web3 and AI tools including SolPulse (Solana whale tracker), Valor (AI on-chain trading agents), TxPreview (transaction security simulator), SearchLens (AI Overview SEO scanner), Write3 (AI Web3 content generator), Conviction Collapse Detector, FlowForge, Grant-OS, ChainCard, WalletLens, OrderFlow, SolvFlow, and Zenith.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I find Khalid Murtala online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Khalid Murtala (The Web3 Wizard) can be found on X/Twitter at @theweb3wizard00, GitHub at theweb3wizard, LinkedIn at Khalid Murtala, Telegram at @theweb3wizard00, Discord at theweb3wizard00, and Instagram at @theweb3wizard00. His portfolio is at theweb3wizard.vercel.app.",
      },
    },
  ],
};

const allJsonLd = [personJsonLd, websiteJsonLd, learningResourceJsonLd, faqJsonLd];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(allJsonLd) }}
        />
        <meta name="google-site-verification" content="zvIJiEYmfKERekflP9xpnVxCRJdhI2vjwYbaYGWqK3s" />
        <meta name="theme-color" content="#050508" />
        <link rel="llms-txt" href="/llms.txt" />
      </head>
      <body
        className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable} bg-void text-slate-300 antialiased noise-overlay`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-indigo focus:text-white focus:text-sm focus:font-mono focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}