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
    "Khalid Murtala is a Product Engineer and Full-Stack Web3 Builder specializing in AI-native development. High-execution full-stack building from smart contracts to responsive UI. Creator of SolPulse, Valor, and TxPreview. Clarity meets craft.",
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
  sameAs: [
    "https://twitter.com/theweb3wizard00",
    "https://github.com/theweb3wizard",
    "https://linkedin.com/in/khalid-murtala",
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
  ],
  description:
    "Product Engineer and Full-Stack Web3 Builder. Creator of SolPulse, Valor, and TxPreview.",
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

const allJsonLd = [personJsonLd, websiteJsonLd, learningResourceJsonLd];

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