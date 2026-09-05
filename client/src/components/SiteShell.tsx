import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks } from "@/site";

export function BrandMark() {
  return (
    <Link href="/" className="brand-mark" aria-label="The Web3 Wizard home">
      <span className="brand-glyph">W</span>
      <span>The Web3 Wizard</span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab" && menuRef.current) {
        const focusable = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a,button"));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </nav>
        <Link href="/start" className="button button-primary header-cta">
          Start a conversation <ArrowUpRight size={15} />
        </Link>
        <button
          className="mobile-menu-button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && createPortal(
        <div className="mobile-overlay" onClick={() => setOpen(false)}>
          <nav
            ref={menuRef}
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-nav-top">
              <BrandMark />
              <button ref={closeRef} className="icon-button" aria-label="Close navigation" onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>
            ))}
            <Link href="/start" className="button button-primary" onClick={() => setOpen(false)}>
              Start a conversation <ArrowUpRight size={15} />
            </Link>
          </nav>
        </div>,
        document.body
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <BrandMark />
          <p>AI-native Web3 product studio. Turn your problem into a product.</p>
          <p className="footer-disclosure">
            The work shown here is founder-built personal work by Khalid Murtala unless explicitly stated otherwise.
          </p>
        </div>
        <div>
          <span className="footer-label">Studio</span>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/work">Work</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/start">Start a conversation</Link>
        </div>
        <div>
          <span className="footer-label">Services</span>
          <Link href="/services/product-discovery">Product Discovery Sprint</Link>
          <Link href="/services/web3-mvp-development">AI-Native Web3 Product Build</Link>
          <Link href="/services/ai-agent-solana-engineering">AI Agent &amp; Solana Engineering</Link>
        </div>
        <div>
          <span className="footer-label">Connect</span>
          <a href="https://x.com/theweb3wizard00" target="_blank" rel="noreferrer">X (Twitter)</a>
          <a href="https://t.me/theweb3wizard00" target="_blank" rel="noreferrer">Telegram</a>
          <a href="https://github.com/theweb3wizard" target="_blank" rel="noreferrer">GitHub</a>
<a href="https://www.linkedin.com/in/theweb3wizard00" target="_blank" rel="noreferrer">LinkedIn</a>
                          <a href="https://medium.com/@theweb3wizard00" target="_blank" rel="noreferrer">Medium</a>
                          <a href="https://substack.com/@theweb3wizard00" target="_blank" rel="noreferrer">Substack</a>
                          <a href="mailto:theweb3wizard00@gmail.com">Email</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 The Web3 Wizard Labs · Founded by Khalid Murtala.</span>
        <span>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </span>
      </div>
    </footer>
  );
}

export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-frame">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "text";
}) {
  return (
    <Link href={href} className={`button button-${variant}`}>
      {children}
      <ArrowUpRight size={15} />
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-heading align-${align}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

export function ProjectCard({ project }: { project: import("@/site").Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="project-card">
      <div className="project-visual">
        <span className="visual-kicker">{project.category}</span>
        <span className="visual-title">{project.name}</span>
        <span className="visual-line" />
        <span className="visual-line short" />
      </div>
      <div className="project-card-body">
        <div className="card-meta">
          <span className="status-badge">{project.status}</span>
          <span className="personal-label">Founder-built</span>
        </div>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <span className="inline-link">View project <ArrowUpRight size={14} /></span>
      </div>
    </Link>
  );
}

export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <details key={item.question} open={index === 0}>
          <summary>{item.question}<span>+</span></summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        {children}
      </div>
    </section>
  );
}
