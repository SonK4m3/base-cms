import test from "node:test";
import assert from "node:assert/strict";
import {
  buildBreadcrumbs,
  buildJsonLdGraph,
  buildMetadata,
  buildRobotsTxt,
  createRouteManifest,
  createSiteContext,
  findOrphanRoutes,
  normalizeCanonicalUrl,
  resolveIndexability,
  sitemapEntriesFromRoutes,
  validateBuildEnvironment,
  validateCrossSiteIsolation,
  validateRedirects,
  validateUniqueMetadata
} from "../src/index.ts";

function manifest(siteId = "site-a", fixture = false) {
  return {
    siteId, preset: "corporate-catalog", fixture,
    brand: { brandName: `Brand ${siteId}`, legalName: `Brand ${siteId} LLC`, shortDescription: "A clear description for a dedicated business website.", logoUrl: "/logo.svg" },
    organization: { type: "Organization" }, defaultLocale: "en",
    supportedLocales: [{ code: "en", htmlLang: "en", ogLocale: "en_US", urlPrefix: "", label: "English" }],
    routeSegments: { product: "products" }, enabledModules: ["corporate", "catalog", "content", "lead"],
    theme: { colors: { brand: "#000", brandContrast: "#fff", accent: "#f00", surface: "#eee", text: "#111", muted: "#555" }, fonts: { heading: "sans", body: "sans" }, radius: "small", containerWidth: "1200px", headerVariant: "simple", footerVariant: "simple", colorScheme: "light" },
    navigationPolicy: { maxDepth: 2, requireDescriptiveLabels: true }, schemaPolicy: { enableFaq: true, enableLocalBusiness: false, enableOffers: false },
    crawlerPolicy: { gptBot: "disallow", oaiSearchBot: "allow", chatGptUser: "allow" }, leadFormTypes: ["general_contact"], analyticsFeatures: ["ai_referral"],
    contentQualityPolicy: { minimumScore: 85, requireOwner: true, requireReviewDate: true, maxReviewAgeDays: 365 }
  };
}

function route(overrides = {}) {
  return { id: "home", path: "/", locale: "en", contentType: "home", title: "Home", description: "Home description", publicationState: "published", publishedAt: "2026-01-01", qualityPassed: true, qualityScore: 90, owner: "Editor", reviewedAt: "2026-01-01", ...overrides };
}

test("production gate rejects fixtures and placeholder domains", () => {
  const errors = validateBuildEnvironment({ manifest: manifest("site-a", true), siteId: "site-a", siteUrl: "https://site-a.example", strictProduction: true });
  assert.ok(errors.some((error) => error.includes("HTTPS")));
  assert.ok(errors.some((error) => error.includes("Fixture")));
});

test("indexability uses editorial and quality policy", () => {
  assert.equal(resolveIndexability(route(), manifest()).indexable, true);
  assert.equal(resolveIndexability(route({ qualityScore: 70 }), manifest()).reason, "quality_gate_failed");
  assert.equal(resolveIndexability(route({ contentType: "search" }), manifest()).reason, "search_or_facet");
  assert.equal(resolveIndexability(route({ publicationState: "draft" }), manifest()).reason, "non_publication_state");
  assert.equal(resolveIndexability(route({ owner: undefined }), manifest()).reason, "missing_owner");
  assert.equal(resolveIndexability(route({ reviewedAt: "2020-01-01" }), manifest(), new Date("2026-01-01")).reason, "stale_review_date");
});

test("redirect validation rejects chains, loops, and external ownership", () => {
  assert.deepEqual(validateRedirects([{ fromPath: "/old/", toPath: "/new/" }]), []);
  const errors = validateRedirects([{ fromPath: "/a/", toPath: "/b/" }, { fromPath: "/b/", toPath: "/a/" }, { fromPath: "https://other.com/x", toPath: "/x/" }]);
  assert.ok(errors.some((error) => error.includes("chain")));
  assert.ok(errors.some((error) => error.includes("loop")));
  assert.ok(errors.some((error) => error.includes("site-relative")));
});

test("route manifest catches duplicates and breadcrumbs follow parents", () => {
  const routes = createRouteManifest([route({ relatedEntryIds: ["hub"] }), route({ id: "hub", path: "/products/", contentType: "page", title: "Products", parentId: "home", relatedEntryIds: ["detail"] }), route({ id: "detail", path: "/products/x/", contentType: "product", title: "X", parentId: "hub" })]);
  const crumbs = buildBreadcrumbs(routes[2], routes, "https://site-a.com", normalizeCanonicalUrl);
  assert.deepEqual(crumbs.map((item) => item.name), ["Home", "Products", "X"]);
  assert.equal(findOrphanRoutes(routes).length, 0);
  assert.throws(() => createRouteManifest([route(), route({ id: "home", path: "/other/" })]), /Duplicate route id/);
});

test("metadata fallback, uniqueness, robots, sitemap and JSON-LD remain domain-scoped", () => {
  const context = createSiteContext(manifest(), "https://site-a.com");
  const document = buildMetadata(context, { title: "Fallback title", summary: "Fallback description", path: "/about/" });
  assert.equal(document.description, "Fallback description");
  assert.deepEqual(validateUniqueMetadata([document, { ...document }]), ["Duplicate canonical: https://site-a.com/about/", "Duplicate title: Fallback title"]);
  assert.match(buildRobotsTxt(context), /OAI-SearchBot\nAllow: \//);
  assert.match(buildRobotsTxt(context), /GPTBot\nDisallow: \//);
  assert.equal(sitemapEntriesFromRoutes(context, [route()])[0].indexable, true);
  const graph = buildJsonLdGraph(context, document);
  assert.equal(graph["@graph"][0]["@id"], "https://site-a.com/#organization");
  assert.deepEqual(validateCrossSiteIsolation(context, [JSON.stringify(graph)]), []);
  assert.deepEqual(validateCrossSiteIsolation(context, ["https://site-b.com/path/"]), ["Foreign host detected: site-b.com"]);
});
