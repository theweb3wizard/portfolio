// SEO analyzer over built static output. No dependencies.
// Usage: node analyze.mjs <distDir> > report.json
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const dist = process.argv[2];
const outFile = process.argv[3];

const PAGE_RE = /\.html$/i;

function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (PAGE_RE.test(e.name)) acc.push(p);
  }
  return acc;
}

const strip = (s) => s.replace(/\s+/g, " ").trim();
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
   .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
   .replace(/&#x27;/g, "'").replace(/&hellip;/g, "…");

function attr(tag, name) {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, "i"));
  return m ? decode(m[1]) : null;
}

function metaByName(html, name) {
  const re = /<meta\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const n = attr(m[0], "name") || attr(m[0], "property");
    if (n && n.toLowerCase() === name.toLowerCase()) return attr(m[0], "content");
  }
  return null;
}
function metaAll(html, name) {
  const out = [];
  const re = /<meta\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const n = attr(m[0], "name") || attr(m[0], "property");
    if (n && n.toLowerCase() === name.toLowerCase()) out.push(attr(m[0], "content"));
  }
  return out;
}
function linkRel(html, rel, asAttr = "href") {
  const re = /<link\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const r = attr(m[0], "rel");
    if (r && r.toLowerCase() === rel.toLowerCase()) return attr(m[0], asAttr);
  }
  return null;
}
function linkRelAll(html, rel) {
  const out = [];
  const re = /<link\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const r = attr(m[0], "rel");
    if (r && r.toLowerCase() === rel.toLowerCase()) out.push(attr(m[0], "href"));
  }
  return out;
}

function headings(html) {
  const out = [];
  const re = /<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(html))) {
    out.push({ level: Number(m[1][1]), text: strip(decode(m[2].replace(/<[^>]+>/g, ""))) });
  }
  return out;
}

function images(html) {
  const out = [];
  const re = /<img\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    out.push({
      src: attr(m[0], "src"),
      alt: attr(m[0], "alt"),
      width: attr(m[0], "width"),
      height: attr(m[0], "height"),
      loading: attr(m[0], "loading"),
      decoding: attr(m[0], "decoding"),
      srcset: attr(m[0], "srcset") ? true : false,
      fetchpriority: attr(m[0], "fetchpriority"),
    });
  }
  return out;
}

function jsonld(html) {
  const out = [];
  const re = /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    const raw = m[1].trim();
    try {
      const parsed = JSON.parse(raw);
      const nodes = Array.isArray(parsed) ? parsed : (parsed["@graph"] ? parsed["@graph"] : [parsed]);
      for (const n of nodes) out.push({ ok: true, type: n["@type"] ?? null, raw });
    } catch (e) {
      out.push({ ok: false, type: null, error: String(e.message).slice(0, 120), raw: raw.slice(0, 300) });
    }
  }
  return out;
}

function anchors(html) {
  const out = [];
  const re = /<a\b[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html))) {
    out.push({
      href: attr(m[0], "href"),
      text: strip(decode(m[1].replace(/<[^>]+>/g, ""))),
      rel: attr(m[0], "rel"),
      target: attr(m[0], "target"),
    });
  }
  return out;
}

function visibleText(html) {
  return strip(decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " ")
  ));
}

const pages = [];
for (const f of walk(dist)) {
  const html = readFileSync(f, "utf8");
  const rel = relative(dist, f).split(sep).join("/");
  let url = "/" + rel.replace(/index\.html$/, "").replace(/\.html$/, "");
  if (url !== "/" && !url.endsWith("/")) url += "/";

  const h = headings(html);
  const text = visibleText(html);
  const imgs = images(html);
  const as = anchors(html);

  pages.push({
    file: rel,
    url,
    bytes: statSync(f).size,
    lang: (html.match(/<html\b[^>]*\blang\s*=\s*["']([^"']*)["']/i) || [])[1] || null,
    title: (html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1]?.trim() ?? null,
    titleLen: ((html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "").trim().length,
    metaDescription: metaByName(html, "description"),
    metaDescriptionLen: (metaByName(html, "description") || "").length,
    canonical: linkRel(html, "canonical"),
    robots: metaByName(html, "robots"),
    keywords: metaByName(html, "keywords"),
    viewport: metaByName(html, "viewport"),
    ogTitle: metaByName(html, "og:title"),
    ogDescription: metaByName(html, "og:description"),
    ogImage: metaByName(html, "og:image"),
    ogUrl: metaByName(html, "og:url"),
    ogType: metaByName(html, "og:type"),
    ogSiteName: metaByName(html, "og:site_name"),
    twitterCard: metaByName(html, "twitter:card"),
    twitterTitle: metaByName(html, "twitter:title"),
    twitterImage: metaByName(html, "twitter:image"),
    hreflang: linkRelAll(html, "alternate"),
    h1: h.filter((x) => x.level === 1).map((x) => x.text),
    headings: h,
    wordCount: text ? text.split(" ").filter(Boolean).length : 0,
    textSample: text.slice(0, 400),
    images: imgs,
    imagesMissingAlt: imgs.filter((i) => i.alt === null).length,
    imagesEmptyAlt: imgs.filter((i) => i.alt === "").length,
    imagesNoDims: imgs.filter((i) => !i.width || !i.height).length,
    jsonld: jsonld(html),
    anchorCount: as.length,
    internalLinks: as.filter((a) => a.href && (a.href.startsWith("/") || a.href.includes("theweb3wizard"))).length,
    externalLinks: as.filter((a) => a.href && /^https?:\/\//.test(a.href) && !a.href.includes("theweb3wizard")).length,
    emptyAnchors: as.filter((a) => !a.text && a.href).length,
    anchors: as.slice(0, 80),
    preloads: linkRelAll(html, "preload"),
    scripts: (html.match(/<script\b/gi) || []).length,
    stylesheets: (html.match(/<link\b[^>]*rel\s*=\s*["']stylesheet["']/gi) || []).length,
    inlineJsonLdCount: (html.match(/application\/ld\+json/gi) || []).length,
  });
}

// cross-page analysis
const titles = new Map(), descs = new Map(), canonicals = new Map();
for (const p of pages) {
  if (p.title) titles.set(p.title, [...(titles.get(p.title) || []), p.url]);
  if (p.metaDescription) descs.set(p.metaDescription, [...(descs.get(p.metaDescription) || []), p.url]);
  if (p.canonical) canonicals.set(p.canonical, [...(canonicals.get(p.canonical) || []), p.url]);
}
const dupTitles = [...titles.entries()].filter(([, u]) => u.length > 1);
const dupDescs = [...descs.entries()].filter(([, u]) => u.length > 1);
const dupCanonicals = [...canonicals.entries()].filter(([, u]) => u.length > 1);

// inbound internal link map
const inbound = new Map();
for (const p of pages) {
  for (const a of p.anchors) {
    if (!a.href) continue;
    let t = a.href.split("#")[0].split("?")[0];
    if (t.startsWith("http")) { try { t = new URL(t).pathname; } catch {} }
    if (!t.startsWith("/")) continue;
    if (t !== "/" && !t.endsWith("/")) t += "/";
    if (!inbound.has(t)) inbound.set(t, new Set());
    inbound.get(t).add(p.url);
  }
}

const result = {
  generatedAt: new Date().toISOString(),
  dist,
  pageCount: pages.length,
  crossPage: {
    duplicateTitles: dupTitles.map(([t, u]) => ({ title: t, urls: u })),
    duplicateDescriptions: dupDescs.map(([d, u]) => ({ description: d.slice(0, 80), urls: u })),
    duplicateCanonicals: dupCanonicals.map(([c, u]) => ({ canonical: c, urls: u })),
    missingCanonical: pages.filter((p) => !p.canonical).map((p) => p.url),
    missingTitle: pages.filter((p) => !p.title).map((p) => p.url),
    missingDescription: pages.filter((p) => !p.metaDescription).map((p) => p.url),
    titleTooLong: pages.filter((p) => p.titleLen > 60).map((p) => ({ url: p.url, len: p.titleLen, title: p.title })),
    titleTooShort: pages.filter((p) => p.title && p.titleLen < 30).map((p) => ({ url: p.url, len: p.titleLen, title: p.title })),
    descTooLong: pages.filter((p) => p.metaDescriptionLen > 160).map((p) => ({ url: p.url, len: p.metaDescriptionLen })),
    descTooShort: pages.filter((p) => p.metaDescription && p.metaDescriptionLen < 70).map((p) => ({ url: p.url, len: p.metaDescriptionLen })),
    noH1: pages.filter((p) => p.h1.length === 0).map((p) => p.url),
    multiH1: pages.filter((p) => p.h1.length > 1).map((p) => ({ url: p.url, h1s: p.h1 })),
    noJsonLd: pages.filter((p) => p.jsonld.length === 0).map((p) => p.url),
    brokenJsonLd: pages.filter((p) => p.jsonld.some((j) => !j.ok)).map((p) => ({ url: p.url, errors: p.jsonld.filter((j) => !j.ok).map((j) => j.error) })),
    thinContent: pages.filter((p) => p.wordCount < 300).map((p) => ({ url: p.url, words: p.wordCount })),
    noOgImage: pages.filter((p) => !p.ogImage).map((p) => p.url),
    noTwitterCard: pages.filter((p) => !p.twitterCard).map((p) => p.url),
    orphanPages: pages.filter((p) => !inbound.has(p.url) && p.url !== "/").map((p) => p.url),
    nonWwwCanonical: pages.filter((p) => p.canonical && !p.canonical.includes("://www.")).map((p) => ({ url: p.url, canonical: p.canonical })),
  },
  schemaTypes: (() => {
    const c = {};
    for (const p of pages) for (const j of p.jsonld) {
      const t = j.type;
      if (!t) { c["(none)"] = (c["(none)"] || 0) + 1; continue; }
      for (const tt of (Array.isArray(t) ? t : [t])) c[tt] = (c[tt] || 0) + 1;
    }
    return c;
  })(),
  pages,
};

if (outFile) writeFileSync(outFile, JSON.stringify(result, null, 2));
console.log(JSON.stringify({
  pageCount: result.pageCount,
  schemaTypes: result.schemaTypes,
  crossPage: result.crossPage,
}, null, 2));
