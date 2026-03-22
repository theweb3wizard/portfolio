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
    "Khalid Murtala is The Web3 Wizard — a Web3 and AI builder from Kano, Nigeria. Creator of WalletLens, OrderFlow, Valor, and TaxRabbit. Building tools that solve real problems at the intersection of crypto and artificial intelligence.",
  keywords: [
    "The Web3 Wizard",
    "Khalid Murtala",
    "Web3 builder",
    "AI crypto tools",
    "WalletLens",
    "OrderFlow",
    "Valor",
    "TaxRabbit",
    "Web3 developer Nigeria",
    "crypto AI tools",
    "blockchain developer",
    "DeFi tools",
    "EVM wallet analysis",
  ],
  authors: [{ name: "Khalid Murtala", url: siteUrl }],
  creator: "Khalid Murtala",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Khalid Murtala — The Web3 Wizard",
    description:
      "Web3 × AI builder from Kano, Nigeria. Building tools that solve real problems in crypto.",
    siteName: "The Web3 Wizard",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Web3 Wizard — Khalid Murtala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khalid Murtala — The Web3 Wizard",
    description: "Web3 × AI builder. Building tools that hit different.",
    creator: "@theweb3wizard",
    images: ["/images/og-image.png"],
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Khalid Murtala",
  alternateName: "The Web3 Wizard",
  url: siteUrl,
  sameAs: [
    "https://twitter.com/theweb3wizard",
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
  ],
  description:
    "Web3 and AI builder from Kano, Nigeria. Creator of WalletLens, OrderFlow, Valor, and TaxRabbit.",
};

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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