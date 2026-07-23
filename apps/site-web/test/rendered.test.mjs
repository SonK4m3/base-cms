import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const dist = resolve(import.meta.dirname, "../dist");
function files(directory) { return readdirSync(directory).flatMap((name) => { const path = join(directory, name); return statSync(path).isDirectory() ? files(path) : [path]; }); }

test("representative build contains valid static SEO HTML", () => {
  assert.ok(existsSync(dist), "Run build:web before rendered tests");
  const htmlFiles = files(dist).filter((path) => path.endsWith(".html"));
  assert.ok(htmlFiles.length >= 8);
  for (const path of htmlFiles) {
    const html = readFileSync(path, "utf8");
    const indexable = !/<meta name="robots" content="noindex/i.test(html);
    if (!indexable) continue;
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, path);
    for (const pattern of [/<title>[^<]+<\/title>/, /<meta name="description"/, /<link rel="canonical"/, /<meta property="og:image"/, /<meta name="twitter:card"/, /application\/ld\+json/]) assert.match(html, pattern, path);
    assert.doesNotMatch(html, /Notex|clinicName|medicalReviewer/i, path);
  }
});

test("sitemap excludes search, thank-you, and foreign hosts", () => {
  const sitemap = readFileSync(join(dist, "sitemap.xml"), "utf8");
  assert.doesNotMatch(sitemap, /search|thank-you/);
  assert.doesNotMatch(sitemap, /notex|medical/i);
});

test("internal links resolve and every indexable page is linked from HTML", () => {
  const htmlFiles = files(dist).filter((path) => path.endsWith(".html"));
  const routeForFile = (path) => {
    const relative = path.slice(dist.length).replace(/\\/g, "/");
    if (relative === "/index.html") return "/";
    if (relative.endsWith("/index.html")) return relative.slice(0, -"index.html".length);
    return relative.replace(/\.html$/, "/");
  };
  const htmlRoutes = new Set(htmlFiles.map(routeForFile));
  const linkedRoutes = new Set();
  for (const path of htmlFiles) {
    const html = readFileSync(path, "utf8");
    for (const match of html.matchAll(/href="([^"]+)"/g)) {
      const href = match[1];
      if (/^(?:https?:|mailto:|tel:|#)/.test(href)) continue;
      const pathname = new URL(href, "https://fixture.test").pathname;
      if (/^\/(?:_astro|assets|brand)\//.test(pathname) || pathname === "/favicon.svg" || pathname.startsWith("/api/")) continue;
      assert.ok(htmlRoutes.has(pathname), `Broken internal link ${pathname} in ${path}`);
      linkedRoutes.add(pathname);
    }
  }
  for (const path of htmlFiles) {
    const html = readFileSync(path, "utf8");
    if (/<meta name="robots" content="noindex/i.test(html)) continue;
    const route = routeForFile(path);
    if (route !== "/") assert.ok(linkedRoutes.has(route), `Orphan indexable page ${route}`);
  }
});
