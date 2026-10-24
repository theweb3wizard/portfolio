/**
 * verify-live.mjs — production checks for theweb3wizard.xyz
 *
 * verify-seo.mjs checks what we BUILT. This checks what is actually SERVED,
 * which is the only thing search engines and visitors ever see. Deploys can
 * fail silently, edge caches can serve yesterday's bundle, and a redirect can
 * be configured but unreachable. This script is the difference between "the
 * build passed" and "the change is live".
 *
 *   node verify-live.mjs            checks https://www.theweb3wizard.xyz
 *   node verify-live.mjs --apex     also checks https://theweb3wizard.xyz
 *
 * Exit code 1 means at least one check failed.
 */
const WWW = "https://www.theweb3wizard.xyz";
const APEX = "https://theweb3wizard.xyz";
const CHECK_APEX = process.argv.includes("--apex");

const failures = [];
const lines = [];

const fail = (msg) => {
  failures.push(msg);
  console.log(`  FAIL  ${msg}`);
};
const pass = (msg) => console.log(`  PASS  ${msg}`);
const info = (msg) => console.log(`  INFO  ${msg}`);

/** Fetch with a timeout and bounded retries, because this connection is lossy. */
async function get(url, { redirect = "follow", tries = 3 } = {}) {
  let lastError;
  for (let attempt = 1; attempt <= tries; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30000);
    try {
      const res = await fetch(url, { redirect, signal: controller.signal });
      const body = await res.text();
      clearTimeout(timer);
      return { status: res.status, headers: res.headers, body };
    } catch (err) {
      clearTimeout(timer);
      lastError = err;
    }
  }
  throw lastError;
}

/** Visible words in a served HTML document, with scripts and styles removed. */
function words(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .split(/\s+/)
    .filter((w) => /[a-zA-Z]/.test(w)).length;
}

// ── 1. apex to www redirect ───────────────────────────────────────────────────

if (CHECK_APEX) {
  console.log("\n[1] apex -> www redirect");
  try {
    const res = await get(`${APEX}/about`, { redirect: "manual", tries: 2 });
    const location = res.headers.get("location") || "";
    if (res.status !== 301 && res.status !== 308) {
      fail(`apex /about returned ${res.status}, expected 301 or 308`);
    } else {
      pass(`apex /about returns ${res.status}`);
    }
    if (location.startsWith(WWW)) {
      pass(`redirect target is on the www host (${location})`);
    } else {
      fail(`redirect target is not www: "${location}"`);
    }
  } catch (err) {
    fail(`apex request failed: ${err.message}`);
  }
} else {
  console.log("\n[1] apex -> www redirect  (skipped, pass --apex to check)");
}

// ── 2. sitemap served and consistent ──────────────────────────────────────────

console.log("\n[2] sitemap.xml");
let sitemapPaths = [];
try {
  const res = await get(`${WWW}/sitemap.xml`);
  if (res.status !== 200) {
    fail(`sitemap returned ${res.status}`);
  } else {
    const locs = [...res.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    pass(`sitemap served with ${locs.length} URLs`);
    const offHost = locs.filter((u) => !u.startsWith(WWW));
    if (offHost.length) fail(`${offHost.length} sitemap URL(s) are off the www host`);
    else pass("every sitemap URL uses the www host");
    sitemapPaths = locs.map((u) => u.replace(WWW, "") || "/");
  }
} catch (err) {
  fail(`sitemap request failed: ${err.message}`);
}

// ── 3. every sitemap URL is served, with real content ─────────────────────────

console.log("\n[3] served pages");
if (sitemapPaths.length === 0) {
  fail("no sitemap URLs to check, so page checks were skipped");
} else {
  const rows = [];
  for (const p of sitemapPaths) {
    try {
      const res = await get(`${WWW}${p}`);
      const w = words(res.body);
      rows.push({ p, status: res.status, words: w });
      if (res.status !== 200) fail(`${p} returned ${res.status}`);
      else if (w < 200) fail(`${p} served only ${w} words, so it is not prerendered`);
    } catch (err) {
      rows.push({ p, status: "ERR", words: 0 });
      fail(`${p} request failed: ${err.message}`);
    }
  }
  const ok = rows.filter((r) => r.status === 200 && r.words >= 200);
  if (ok.length === rows.length) {
    pass(`all ${rows.length} sitemap URLs served with 200 and 200+ words`);
    const total = rows.reduce((n, r) => n + r.words, 0);
    const min = Math.min(...rows.map((r) => r.words));
    info(`words served across the site: ${total} (thinnest page: ${min})`);
  }
  for (const r of rows.sort((a, b) => a.words - b.words).slice(0, 5)) {
    lines.push(`    ${String(r.status).padStart(3)}  ${String(r.words).padStart(5)}  ${r.p}`);
  }
  if (lines.length) {
    info("thinnest five pages:");
    for (const l of lines) console.log(l);
  }
}

// ── 4. noindex on /start, and the em dash ban holds in served HTML ────────────

console.log("\n[4] shipped invariants");
try {
  const res = await get(`${WWW}/start`);
  if (/name=["']robots["'][^>]*noindex/i.test(res.body)) pass("/start is served with noindex");
  else fail("/start is served without a noindex robots meta tag");
} catch (err) {
  fail(`/start request failed: ${err.message}`);
}

try {
  const res = await get(`${WWW}/`);
  const emDashes = (res.body.match(/\u2014/g) || []).length;
  if (emDashes === 0) pass("no em dashes in the served homepage HTML");
  else fail(`${emDashes} em dash(es) in the served homepage HTML`);
} catch (err) {
  fail(`homepage request failed: ${err.message}`);
}

// ── summary ───────────────────────────────────────────────────────────────────

console.log(
  failures.length === 0
    ? "\nPASS: the deployed site matches expectations."
    : `\nFAIL: ${failures.length} problem(s) found in production.`,
);
process.exit(failures.length === 0 ? 0 : 1);
