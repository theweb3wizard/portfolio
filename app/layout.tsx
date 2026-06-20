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
    default: "Khalid Murtala — The Web3 Wizard | Web3 × AI Builder",
    template: "%s | The Web3 Wizard",
  },
  description:
    "Khalid Murtala is The Web3 Wizard — a Web3 and AI builder from Kano, Nigeria. Creator of Conviction Collapse Detector, SearchLens, Write3, and SolPulse. Clarity meets craft. Building tools at the intersection of crypto and artificial intelligence.",
  keywords: [
    "The Web3 Wizard",
    "Khalid Murtala",
    "Web3 builder",
    "AI crypto tools",
    "Conviction Collapse Detector",
    "SearchLens",
    "Write3",
    "SolPulse",
    "Web3 developer Nigeria",
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
      "Clarity meets craft. Web3 × AI builder from Kano, Nigeria. Building tools that solve real problems at the intersection of crypto and artificial intelligence.",
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
  jobTitle: "Web3 and AI Builder",
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
    "Web3 and AI builder from Kano, Nigeria. Creator of Conviction Collapse Detector, SearchLens, Write3, and SolPulse.",
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
        {children}
      </body>
    </html>
  );
}