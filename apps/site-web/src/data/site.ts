import catalogManufacturer from "../../../../sites/catalog-manufacturer/site.config.ts";
import serviceBusiness from "../../../../sites/service-business/site.config.ts";
import multiPlatformEnterprise from "../../../../sites/multi-platform-enterprise/site.config.ts";
import { readFileSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  createRouteManifest,
  createSiteContext,
  findOrphanRoutes,
  normalizeCanonicalUrl,
  resolveIndexability,
  validateRedirects,
  validateBuildEnvironment,
  type RouteManifestEntry,
  type SiteManifest
} from "@base-cms/site-core";
import { loadStrapiContent } from "../loaders/strapi.ts";
import type { ContentSection } from "@base-cms/content";
import { getCollection } from "astro:content";

const manifests: Record<string, SiteManifest> = {
  [catalogManufacturer.siteId]: catalogManufacturer,
  [serviceBusiness.siteId]: serviceBusiness,
  [multiPlatformEnterprise.siteId]: multiPlatformEnterprise
};

const rawSiteId = process.env.SITE_ID || import.meta.env.SITE_ID;
export const siteId = rawSiteId || "catalog-manufacturer";
const siteConfigPath = process.env.SITE_CONFIG_PATH || import.meta.env.SITE_CONFIG_PATH;
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");
export const manifest = siteConfigPath
  ? JSON.parse(readFileSync(isAbsolute(siteConfigPath) ? siteConfigPath : resolve(repoRoot, siteConfigPath), "utf8")) as SiteManifest
  : manifests[siteId];
if (!manifest) throw new Error(`Unknown SITE_ID: ${siteId}. Add a manifest under /sites before building.`);

const fixtureUrls: Record<string, string> = {
  "catalog-manufacturer": "https://catalog-manufacturer.example",
  "service-business": "https://service-business.example",
  "multi-platform-enterprise": "https://multi-platform-enterprise.example"
};
export const siteUrl = process.env.PUBLIC_SITE_URL || import.meta.env.PUBLIC_SITE_URL || fixtureUrls[siteId];
export const strictProduction = (process.env.ENFORCE_PRODUCTION_GATES || import.meta.env.ENFORCE_PRODUCTION_GATES) === "true";
const environmentErrors = validateBuildEnvironment({
  manifest,
  siteId: strictProduction ? rawSiteId : siteId,
  siteUrl,
  strictProduction
});
const strapiUrl = process.env.STRAPI_URL;
const strapiToken = process.env.STRAPI_READ_TOKEN;
if (strictProduction && (!strapiUrl || !strapiToken)) environmentErrors.push("Production build requires STRAPI_URL and STRAPI_READ_TOKEN");
if (strictProduction && !siteConfigPath) environmentErrors.push("Production build requires SITE_CONFIG_PATH and cannot use the fixture registry");
if (strictProduction && manifest.analyticsFeatures.includes("indexnow") && !process.env.INDEXNOW_KEY) environmentErrors.push("INDEXNOW_KEY is required when the indexnow feature is enabled");
if (strictProduction && manifest.analyticsFeatures.includes("ga4") && !(process.env.PUBLIC_GA4_ID || import.meta.env.PUBLIC_GA4_ID)) environmentErrors.push("PUBLIC_GA4_ID is required when the ga4 feature is enabled");
if (strictProduction && manifest.enabledModules.includes("lead")) {
  if (!process.env.STRAPI_WRITE_TOKEN) environmentErrors.push("STRAPI_WRITE_TOKEN is required for the lead endpoint");
  if (!(process.env.PUBLIC_TURNSTILE_SITE_KEY || import.meta.env.PUBLIC_TURNSTILE_SITE_KEY) || !process.env.TURNSTILE_SECRET_KEY) environmentErrors.push("Turnstile site and secret keys are required when the lead module is enabled");
}
if (environmentErrors.length) throw new Error(`Site build validation failed:\n- ${environmentErrors.join("\n- ")}`);

export const siteContext = createSiteContext(manifest, siteUrl);
export const previewNoindex = (process.env.PREVIEW_NOINDEX || import.meta.env.PREVIEW_NOINDEX) === "true" || siteUrl.endsWith(".pages.dev");

export interface ContentRecord {
  route: RouteManifestEntry;
  eyebrow?: string;
  body: string[];
  media?: { url: string; alt: string; width?: number; height?: number };
  features?: Array<{ title: string; description: string }>;
  sections?: ContentSection[];
  faq?: Array<{ question: string; answer: string }>;
  specifications?: Array<{ label: string; value: string }>;
  relatedIds?: string[];
  schema?: {
    sku?: string;
    brand?: string;
    availability?: string;
    price?: number;
    currency?: string;
    jobTitle?: string;
    sameAs?: string[];
    isPhysicalFacility?: boolean;
    address?: string;
    phone?: string;
    email?: string;
    authorName?: string;
    authorUrl?: string;
    reviewerName?: string;
    policyType?: string;
  };
}

const publishedAt = "2026-01-15T00:00:00.000Z";
const modifiedAt = "2026-06-15T00:00:00.000Z";
const owner = "Editorial team";
const reviewedAt = "2026-06-15";
const brand = manifest.brand.brandName;
const segment = (type: keyof SiteManifest["routeSegments"], fallback: string) => manifest.routeSegments[type] || fallback;
const publicRoute = (entry: Omit<RouteManifestEntry, "publicationState" | "publishedAt" | "modifiedAt" | "qualityPassed" | "owner" | "reviewedAt">): RouteManifestEntry => ({
  ...entry,
  publicationState: "published",
  publishedAt,
  modifiedAt,
  qualityPassed: true,
  qualityScore: 95,
  owner,
  reviewedAt
});

const records: ContentRecord[] = [
  {
    route: publicRoute({ id: "home", path: "/", locale: manifest.defaultLocale, contentType: "home", title: brand, description: manifest.brand.shortDescription }),
    eyebrow: "Business website platform fixture",
    body: [
      `${brand} helps buyers understand products and services through clear, evidence-led pages. This fixture demonstrates the shared renderer, not reusable customer copy.`,
      "Every public page is generated from one route manifest so canonical URLs, navigation, schema, sitemap entries, and internal links stay aligned."
    ],
    features: [
      { title: "Clear catalog structure", description: "Products, services, categories, brands, and platforms are connected with descriptive links." },
      { title: "Evidence-aware content", description: "Claims require an owner, source, review date, and expiry when appropriate." },
      { title: "Lead-ready pages", description: "Commercial pages guide visitors to a relevant inquiry, quote, consultation, or download action." }
    ]
  },
  {
    route: publicRoute({ id: "about", path: "/about/", locale: manifest.defaultLocale, contentType: "page", title: `About ${brand}`, description: `Learn how ${brand} serves customers, manages product information, and keeps business claims accurate.`, parentId: "home" }),
    eyebrow: "Company",
    body: [`${manifest.brand.legalName} maintains this website and is responsible for its product, service, and company information.`, "Business identity, contact details, product naming, and evidence are kept consistent across visible content and machine-readable metadata."],
    features: [{ title: "Editorial ownership", description: "Each important page has a named owner and a real review date." }, { title: "Factual review", description: "Critical claims cannot be published when their supporting evidence is missing or expired." }]
  },
  {
    route: publicRoute({ id: "contact", path: "/contact/", locale: manifest.defaultLocale, contentType: "page", title: `Contact ${brand}`, description: `Contact ${brand} about products, services, technical questions, or a tailored quotation.`, parentId: "home" }),
    eyebrow: "Contact",
    body: ["Tell us what you are evaluating, the application or business outcome you need, and your preferred next step. We route each inquiry only within this site's dedicated deployment."]
  },
  {
    route: publicRoute({ id: "privacy", path: "/privacy/", locale: manifest.defaultLocale, contentType: "legal", title: `${brand} privacy policy`, description: `Read how ${brand} handles website inquiries, contact information, attribution data, retention, and privacy requests.`, parentId: "home" }),
    eyebrow: "Privacy policy",
    body: ["This isolated fixture records only information a visitor submits, page and attribution context needed to respond, consent time, and the applicable policy version. A real deployment must replace this fixture text with reviewed legal content for its jurisdiction and actual data practices."],
    schema: { policyType: "privacy" }
  }
];

if (manifest.enabledModules.includes("catalog")) {
  const products = segment("product", "products");
  const categories = segment("category", "categories");
  const brands = segment("brand", "brands");
  records.push(
    {
      route: publicRoute({ id: "products", path: `/${products}/`, locale: manifest.defaultLocale, contentType: "page", title: `${brand} products`, description: `Explore curated ${brand} products with application guidance, specifications, availability, and clear inquiry paths.`, parentId: "home", relatedEntryIds: ["product-control-unit", "category-control-systems"] }),
      eyebrow: "Product catalog",
      body: ["Browse products that have passed factual and catalog quality review. Search and filter combinations remain noindex and never enter the sitemap."],
      features: [{ title: "Control Unit X100", description: "A configurable control component for monitored production systems." }]
    },
    {
      route: publicRoute({ id: "product-control-unit", path: `/${products}/control-unit-x100/`, locale: manifest.defaultLocale, contentType: "product", title: "Control Unit X100", description: `Control Unit X100 from ${brand} provides configurable industrial control, monitored I/O, and documented integration options.`, parentId: "products", relatedEntryIds: ["category-control-systems", "brand-primary", "platform-operations"] }),
      eyebrow: "Industrial control product",
      body: ["Control Unit X100 is designed for teams that need a documented control component for monitored production equipment. It combines configurable I/O, standard communications, and a clear engineering handoff.", "Use the specification table to confirm fit. Availability is shown as contact-for-status because this fixture does not maintain transactional inventory or live pricing."],
      specifications: [{ label: "Power input", value: "24 V DC" }, { label: "Operating range", value: "-10°C to 55°C" }, { label: "Communications", value: "Ethernet and serial" }, { label: "Availability", value: "Contact for current status" }],
      schema: { sku: "X100", brand, availability: "https://schema.org/InStock" },
      media: { url: "/assets/product-placeholder.svg", alt: "Illustration of Control Unit X100", width: 1200, height: 800 },
      relatedIds: ["category-control-systems", "platform-operations"]
    },
    {
      route: publicRoute({ id: "category-control-systems", path: `/${categories}/control-systems/`, locale: manifest.defaultLocale, contentType: "category", title: "Control systems", description: `Compare ${brand} control system components, understand selection criteria, and reach the right product or technical next step.`, parentId: "products", relatedEntryIds: ["product-control-unit"] }),
      eyebrow: "Product category",
      body: ["Control systems coordinate equipment inputs, operating logic, and monitored outputs. Select components by environment, I/O requirements, communication standards, safety obligations, and support needs.", "This category is intentionally curated. It is an editorial hub with useful selection guidance, not an automatically generated facet page."],
      features: [{ title: "Start with the application", description: "Document the controlled process, signals, environment, and required response." }, { title: "Confirm integration", description: "Check electrical, communication, enclosure, and documentation requirements before selection." }],
      relatedIds: ["product-control-unit"]
    },
    {
      route: publicRoute({ id: "brand-primary", path: `/${brands}/${siteId}/`, locale: manifest.defaultLocale, contentType: "brand", title: `${brand} product brand`, description: `View verified information and available product families associated with the ${brand} brand.`, parentId: "products", relatedEntryIds: ["product-control-unit"] }),
      eyebrow: "Brand",
      body: [`${brand} is the product brand represented by this dedicated site fixture. Official company and contact information is kept consistent with the Organization entity.`, "Brand pages are published only when they add original manufacturer context, evidence, and useful links to available catalog items."],
      relatedIds: ["product-control-unit"]
    }
  );
}

if (manifest.enabledModules.includes("platforms")) {
  const platforms = segment("platform", "platforms");
  records.push({
    route: publicRoute({ id: "platforms", path: `/${platforms}/`, locale: manifest.defaultLocale, contentType: "page", title: `${brand} platforms`, description: `Understand the platforms and product lines that organize ${brand} capabilities, products, services, and documentation.`, parentId: "home", relatedEntryIds: ["platform-operations"] }),
    eyebrow: "Platforms",
    body: ["Platforms group related capabilities, products, services, compatibility information, and documentation around a stable customer need."],
    features: [{ title: "Connected Operations", description: "A shared product line for monitored workflows, integration, and operational visibility." }]
  }, {
    route: publicRoute({ id: "platform-operations", path: `/${platforms}/connected-operations/`, locale: manifest.defaultLocale, contentType: "platform", title: "Connected Operations platform", description: `The ${brand} Connected Operations platform brings compatible products, implementation guidance, and support paths into one hub.`, parentId: "platforms", relatedEntryIds: manifest.enabledModules.includes("catalog") ? ["product-control-unit"] : [] }),
    eyebrow: "Product platform",
    body: ["Connected Operations is for teams connecting operational signals, documented workflows, and business oversight. The platform page defines audience, capabilities, compatibility boundaries, and next steps.", "Compatibility claims are published only when an accountable reviewer and evidence source are present."],
    features: [{ title: "Shared data context", description: "Connect supported operational records without claiming unsupported real-time integrations." }, { title: "Guided adoption", description: "Use documented implementation stages and accountable service handoffs." }],
    relatedIds: manifest.enabledModules.includes("catalog") ? ["product-control-unit"] : []
  });
}

if (manifest.enabledModules.includes("services")) {
  const services = segment("service", "services");
  records.push({
    route: publicRoute({ id: "services", path: `/${services}/`, locale: manifest.defaultLocale, contentType: "page", title: `${brand} services`, description: `Explore ${brand} services with defined scope, deliverables, process, evidence, and consultation options.`, parentId: "home", relatedEntryIds: ["service-assessment"] }),
    eyebrow: "Services",
    body: ["Each service page explains the intended customer, inputs, deliverables, process, limitations, and an appropriate consultation next step."],
    features: [{ title: "Operations assessment", description: "A structured review that maps current workflows, constraints, risks, and prioritized improvements." }]
  }, {
    route: publicRoute({ id: "service-assessment", path: `/${services}/operations-assessment/`, locale: manifest.defaultLocale, contentType: "service", title: "Operations assessment", description: `${brand} operations assessment documents workflows, constraints, evidence, and a prioritized improvement plan for accountable execution.`, parentId: "services" }),
    eyebrow: "Advisory service",
    body: ["The operations assessment is designed for leaders who need a shared, evidence-based view of current work before selecting technology or changing responsibilities.", "Inputs include stakeholder interviews, process artifacts, performance data that the client can substantiate, and agreed scope. Deliverables include a current-state map, risk register, prioritized actions, and an implementation decision brief."],
    features: [{ title: "Discover", description: "Agree scope, stakeholders, evidence sources, and decision criteria." }, { title: "Analyze", description: "Map workflows, constraints, handoffs, and measurable gaps." }, { title: "Recommend", description: "Prioritize actions with owners, dependencies, and transparent limitations." }]
  });
}

if (manifest.enabledModules.includes("content")) {
  const resources = segment("article", "resources");
  records.push({
    route: publicRoute({ id: "resources", path: `/${resources}/`, locale: manifest.defaultLocale, contentType: "page", title: `${brand} resources`, description: `Read practical ${brand} guides that explain selection, implementation, and evaluation decisions with visible ownership and dates.`, parentId: "home", relatedEntryIds: ["article-evaluation-guide"] }),
    eyebrow: "Resources",
    body: ["Guides answer real customer questions and link to relevant commercial pages only when that link helps the reader take the next step."],
    features: [{ title: "How to evaluate a business solution", description: "A decision framework for comparing fit, evidence, implementation, and ongoing ownership." }]
  }, {
    route: publicRoute({ id: "article-evaluation-guide", path: `/${resources}/evaluate-business-solution/`, locale: manifest.defaultLocale, contentType: "article", title: "How to evaluate a business solution", description: "A practical framework for evaluating business products and services by intended outcome, evidence, constraints, implementation, and ownership.", parentId: "resources" }),
    eyebrow: "Guide",
    body: ["Start by defining the business outcome, the people affected, and the evidence that would demonstrate improvement. A feature list is not a substitute for fit.", "Then evaluate constraints, integration boundaries, implementation ownership, data responsibilities, support, and exit conditions. Record unresolved claims and ask who owns verification."],
    features: [{ title: "Define the decision", description: "Write the outcome, audience, constraints, and success evidence before comparing options." }, { title: "Verify claims", description: "Ask for a source, owner, review date, and applicable scope for important claims." }, { title: "Plan adoption", description: "Confirm roles, dependencies, training, data, support, and measurement." }],
    relatedIds: manifest.enabledModules.includes("catalog") ? ["product-control-unit"] : manifest.enabledModules.includes("services") ? ["service-assessment"] : []
  });
}

const cmsCollection = strictProduction ? await getCollection("cms") : [];
const productionContent = strictProduction
  ? await loadStrapiContent({ manifest, context: siteContext, url: strapiUrl!, token: strapiToken!, contentEntries: cmsCollection.map((item) => item.data) })
  : undefined;
export const contentRecords = productionContent?.records ?? records;
export const redirects = productionContent?.redirects ?? [];
export const routeManifest = createRouteManifest(contentRecords.map((record) => record.route), manifest);
if (strictProduction) {
  const releaseErrors: string[] = [...validateRedirects(redirects)];
  const indexable = routeManifest.filter((route) => resolveIndexability(route, manifest).indexable);
  const commercialTypes = new Set(["product", "category", "brand", "platform", "service", "article", "location"]);
  for (const route of routeManifest) {
    const decision = resolveIndexability(route, manifest);
    const summaryWords = (route.summary ?? "").trim().split(/\s+/).filter(Boolean).length;
    if (!route.explicitNoindex && decision.indexable && (summaryWords < 40 || summaryWords > 80)) releaseErrors.push(`${route.path} requires an answer-first summary of 40–80 words`);
    if (!route.description?.trim()) releaseErrors.push(`${route.path} requires an SEO description or summary`);
    if (route.title.length > 70) console.warn(`[seo] unusually long title (${route.title.length}) at ${route.path}`);
    if ((route.description?.length ?? 0) > 180) console.warn(`[seo] unusually long description (${route.description!.length}) at ${route.path}`);
    if (commercialTypes.has(route.contentType) && route.publicationState === "published" && !route.explicitNoindex && !decision.indexable) {
      releaseErrors.push(`${route.path} failed production indexability: ${decision.reason}`);
    }
    const canonical = normalizeCanonicalUrl(siteContext.siteUrl, route.canonicalPath ?? route.path);
    if (new URL(canonical).host !== siteContext.host) releaseErrors.push(`${route.path} has a foreign canonical host`);
  }
  for (const record of contentRecords.filter((item) => item.route.contentType === "product" && !item.route.explicitNoindex)) {
    if (!record.media?.url || !record.media.alt) releaseErrors.push(`${record.route.path} requires visible product media and alt text`);
    if (!record.specifications?.length) releaseErrors.push(`${record.route.path} requires structured specifications`);
  }
  for (const record of contentRecords.filter((item) => item.route.contentType === "article" && !item.route.explicitNoindex)) {
    if (!record.schema?.authorName || !record.schema.authorUrl) releaseErrors.push(`${record.route.path} requires a visible linked author profile`);
  }
  if (manifest.enabledModules.includes("lead") && !contentRecords.some((record) => record.route.contentType === "legal" && record.schema?.policyType === "privacy")) releaseErrors.push("Lead-enabled production site requires a published privacy policy");
  for (const orphan of findOrphanRoutes(routeManifest)) releaseErrors.push(`Orphan indexable route: ${orphan.path}`);
  const titles = new Set<string>();
  const canonicals = new Set<string>();
  for (const route of indexable) {
    const title = route.title.trim().toLowerCase();
    const canonical = normalizeCanonicalUrl(siteContext.siteUrl, route.canonicalPath ?? route.path);
    if (titles.has(title)) releaseErrors.push(`Duplicate indexable title: ${route.title}`);
    if (canonicals.has(canonical)) releaseErrors.push(`Duplicate canonical: ${canonical}`);
    titles.add(title);
    canonicals.add(canonical);
  }
  if (releaseErrors.length) throw new Error(`Production release gates failed:\n- ${releaseErrors.join("\n- ")}`);
}
export const contentById = new Map(contentRecords.map((record) => [record.route.id, record]));
export const contentByPath = new Map(contentRecords.map((record) => [record.route.path, record]));
export const indexableRoutes = routeManifest.filter((route) => resolveIndexability(route, manifest).indexable);
const homeRouteId = routeManifest.find((route) => route.contentType === "home")?.id ?? "home";
const fixtureNavigation = contentRecords.filter((record) => record.route.parentId === homeRouteId && record.route.id !== "contact" && record.route.contentType === "page").map((record) => ({ label: record.route.title.replace(`${brand} `, ""), href: record.route.path }));
export const navigationByLocale = Object.fromEntries(manifest.supportedLocales.map((locale) => [locale.code, productionContent ? productionContent.navigation.filter((item) => item.locale === locale.code && item.location === "primary").map(({ label, href }) => ({ label, href })) : fixtureNavigation]));
export const footerNavigationByLocale = Object.fromEntries(manifest.supportedLocales.map((locale) => [locale.code, productionContent ? productionContent.navigation.filter((item) => item.locale === locale.code && item.location === "footer").map(({ label, href }) => ({ label, href })) : fixtureNavigation]));

export function getRelatedRecords(record: ContentRecord): ContentRecord[] {
  const ids = [...new Set([...(record.relatedIds ?? []), ...(record.route.relatedEntryIds ?? [])])];
  return ids.map((id) => contentById.get(id)).filter((item): item is ContentRecord => Boolean(item));
}
