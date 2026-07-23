import test from "node:test";
import assert from "node:assert/strict";
import {
  createJsonLdGraph,
  createLlmsTxt,
  createRobotsTxt,
  createSitemapXml,
  filterIndexableSitemapEntries,
  normalizeCanonicalUrl,
  validatePageSeo
} from "../src/index.ts";

test("normalizes canonical URLs and removes query/hash", () => {
  assert.equal(normalizeCanonicalUrl("https://example.com", "/about?utm=1#team"), "https://example.com/about/");
});

test("validates required SEO fields", () => {
  assert.deepEqual(validatePageSeo({ title: "", description: "", canonicalUrl: "/about" }), [
    "title is required",
    "description is required",
    "canonicalUrl must be absolute"
  ]);
});

test("filters non-indexable sitemap entries", () => {
  assert.deepEqual(filterIndexableSitemapEntries([
    { url: "/", indexable: true },
    { url: "/draft", draft: true },
    { url: "/redirect", redirect: true },
    { url: "/hidden", indexable: false }
  ]).map((entry) => entry.url), ["/"]);
});

test("creates robots, sitemap, and llms outputs", () => {
  const siteUrl = "https://example.com";
  assert.match(createRobotsTxt(siteUrl), /Sitemap: https:\/\/example\.com\/sitemap\.xml/);
  assert.match(createSitemapXml(siteUrl, [{ url: "/", lastmod: "2026-01-01" }]), /<loc>https:\/\/example\.com\/<\/loc>/);
  assert.match(createLlmsTxt({ name: "Example", url: siteUrl }, [{ title: "About", url: "/about" }]), /\[About\]\(https:\/\/example\.com\/about\/\)/);
});

test("creates a complete JSON-LD graph with only supplied page entities", () => {
  const graph = createJsonLdGraph(
    { name: "Example", description: "A useful site", url: "https://example.com", locale: "en" },
    { title: "About", description: "About Example", canonicalUrl: "https://example.com/about/" },
    [{ "@type": "BreadcrumbList", itemListElement: [] }]
  );

  assert.equal(graph["@context"], "https://schema.org");
  assert.deepEqual(graph["@graph"].map((item) => item["@type"]), [
    "Organization",
    "WebSite",
    "WebPage",
    "BreadcrumbList"
  ]);
});
