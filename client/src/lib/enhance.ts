/**
 * lib/enhance — progressive enhancement only. No copy changes, no route changes.
 * - .reveal: hidden ONLY when html.js is present (no-JS + crawlers stay visible)
 * - tilt: pointer:fine + no reduced-motion, max 5deg
 * - reading progress + form progress bars are aria-hidden
 */
let booted = false;

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function initReveal() {
  const els = Array.from(
    document.querySelectorAll(".section, .page-hero, .project-card, .insight-card, .engagement-card, .proof-item, .usecase-card, .service-card, .problem-card")
  );
  for (const el of els) {
    if (!el.classList.contains("reveal")) el.classList.add("reveal");
  }
  if (typeof IntersectionObserver === "undefined" || reducedMotion()) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => io.observe(el));
}

function initTilt() {
  if (reducedMotion()) return;
  if (window.matchMedia("(pointer: fine)").matches === false) return;
  const cards = Array.from(document.querySelectorAll<HTMLElement>(".project-card, .insight-card"));
  for (const card of cards) {
    if ((card as HTMLElement & { __tilt?: boolean }).__tilt) continue;
    (card as HTMLElement & { __tilt?: boolean }).__tilt = true;
    let raf = 0;
    card.addEventListener("pointermove", (ev) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        const px = (ev.clientX - r.left) / Math.max(1, r.width) - 0.5;
        const py = (ev.clientY - r.top) / Math.max(1, r.height) - 0.5;
        card.style.transform = `translateY(-6px) perspective(900px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg)`;
      });
    });
    card.addEventListener("pointerleave", () => {
      cancelAnimationFrame(raf);
      card.style.transform = "";
    });
  }
}

function initProgress() {
  if (reducedMotion()) return;
  const bar = document.querySelector<HTMLElement>("[data-reading-progress]");
  if (bar) {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = Math.max(1, h.scrollHeight - h.clientHeight);
        bar.style.transform = `scaleX(${Math.min(1, Math.max(0, h.scrollTop / max)).toFixed(4)})`;
      });
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
  const formBar = document.querySelector<HTMLElement>("[data-form-progress]");
  if (formBar) {
    const update = () => {
      const inputs = Array.from(document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(".form-card input, .form-card textarea, .form-card select"));
      const filled = inputs.filter((el) => {
        if (el instanceof HTMLInputElement && el.type === "checkbox") return el.checked;
        if (el.name === "website") return true;
        return String(el.value ?? "").trim().length > 0;
      }).length;
      const pct = Math.min(1, filled / Math.max(1, inputs.length - 1));
      formBar.style.transform = `scaleX(${pct.toFixed(3)})`;
    };
    document.addEventListener("input", update, { passive: true });
    document.addEventListener("change", update);
    update();
  }
}

export function initEnhancements() {
  if (booted) return;
  booted = true;
  try {
    document.documentElement.classList.add("js");
    initReveal();
    initTilt();
    initProgress();
    const mo = new MutationObserver(() => {
      initReveal();
      initTilt();
      initProgress();
    });
    const root = document.getElementById("root");
    if (root) mo.observe(root, { childList: true, subtree: true });
  } catch {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }
}
