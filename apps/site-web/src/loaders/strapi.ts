import type { RedirectRule, RouteContentType, SiteContext, SiteManifest } from "@base-cms/site-core";
import type { ContentRecord } from "../data/site.ts";
import type { ContentSection } from "@base-cms/content";

interface StrapiLoadInput {
  manifest: SiteManifest;
  context: SiteContext;
  url: string;
  token: string;
  contentEntries?: Array<{ sourceType: string; entry: StrapiEntry }>;
}

export interface StrapiContentPayload {
  records: ContentRecord[];
  redirects: RedirectRule[];
  navigation: Array<{ label: string; href: string; order: number; locale: string; location: "primary" | "footer" | "utility" }>;
}

type StrapiEntry = Record<string, any>;

function fields(entry: StrapiEntry): StrapiEntry {
  return entry.attributes ? { id: entry.id, documentId: entry.documentId, ...entry.attributes } : entry;
}

function plainText(value: unknown): string {
  return String(value ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function safeDestination(value: unknown): string {
  const destination = String(value ?? "").trim();
  if (destination.startsWith("/") || /^https:\/\//i.test(destination)) return destination;
  throw new Error(`Unsafe or invalid content destination: ${destination || "<missing>"}`);
}

async function getJson(baseUrl: string, token: string, path: string): Promise<any> {
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}${path}`, {
    headers: { authorization: `Bearer ${token}`, accept: "application/json" }
  });
  if (!response.ok) throw new Error(`Strapi request failed (${response.status}) for ${path}`);
  return response.json();
}

function editorialFields(entry: StrapiEntry, minimumScore: number) {
  const editorial = fields(entry.editorial?.data ?? entry.editorial ?? {});
  return {
    publicationState: editorial.status ?? "draft",
    qualityPassed: Number(editorial.qualityScore ?? 0) >= minimumScore && editorial.status === "published" && editorial.fixture !== true,
    qualityScore: Number(editorial.qualityScore ?? 0),
    owner: editorial.owner,
    reviewedAt: editorial.reviewedAt,
    fixture: editorial.fixture === true
  };
}

function segment(manifest: SiteManifest, type: keyof SiteManifest["routeSegments"], fallback: string): string {
  return manifest.routeSegments[type] || fallback;
}

function routeFor(manifest: SiteManifest, type: string, slug: string, localeCode: string): string {
  const locale = manifest.supportedLocales.find((item) => item.code === localeCode);
  const prefix = locale?.urlPrefix ? `/${locale.urlPrefix.replace(/^\/+|\/+$/g, "")}` : "";
  if (["page", "landing-page", "legal-page"].includes(type)) return type === "page" && slug === "home" ? `${prefix}/` : `${prefix}/${slug}/`;
  const segmentType = type === "case-study" ? "article" : type;
  const routeSegment = segment(manifest, segmentType as keyof SiteManifest["routeSegments"], `${type}s`);
  return `${prefix}/${routeSegment}/${slug}/`;
}

function mapSections(value: unknown): ContentSection[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((raw: StrapiEntry) => {
    const section = fields(raw);
    if (section.__component === "sections.answer-summary") return [{ type: "answer-summary", heading: section.heading, text: plainText(section.text) } as ContentSection];
    if (section.__component === "sections.rich-text") return [{ type: "rich-text", heading: section.heading, html: plainText(section.body) } as ContentSection];
    if (section.__component === "sections.feature-grid") {
      const items = Array.isArray(section.items) ? section.items.map((item: StrapiEntry) => ({ title: plainText(item.title), description: plainText(item.description) })).filter((item: { title: string; description: string }) => item.title && item.description) : [];
      return [{ type: "feature-grid", heading: section.heading, items } as ContentSection];
    }
    if (section.__component === "sections.call-to-action") return [{ type: "cta", heading: section.heading, text: plainText(section.text), label: section.label, href: safeDestination(section.destination) } as ContentSection];
    return [];
  });
}

function mapFaq(value: unknown): Array<{ question: string; answer: string }> {
  if (!Array.isArray(value)) return [];
  return value.map((item: StrapiEntry) => ({ question: plainText(item.question), answer: plainText(item.answer) })).filter((item) => item.question && item.answer);
}

function toRecord(manifest: SiteManifest, type: string, raw: StrapiEntry, cmsUrl: string): ContentRecord {
  const entry = fields(raw);
  const title = entry.title ?? entry.name;
  const description = plainText(entry.seo?.description ?? entry.summary ?? entry.description ?? entry.bio);
  const routeType = (type === "page" && entry.slug === "home" ? "home" : ["page", "landing-page"].includes(type) ? "page" : type === "legal-page" ? "legal" : type === "case-study" ? "article" : type) as RouteContentType;
  const localeCode = entry.locale ?? manifest.defaultLocale;
  const path = routeFor(manifest, type, entry.slug, localeCode);
  const editorial = editorialFields(entry, manifest.contentQualityPolicy.minimumScore);
  const selectedMedia = type === "product" ? entry.gallery : type === "author" ? entry.image : entry.coverImage;
  const gallery = selectedMedia?.data ?? selectedMedia ?? [];
  const firstMedia = Array.isArray(gallery) ? fields(gallery[0] ?? {}) : fields(gallery);
  const mediaUrl = firstMedia.url ? new URL(firstMedia.url, `${cmsUrl.replace(/\/$/, "")}/`).toString() : undefined;
  const author = fields(entry.author?.data ?? entry.author ?? {});
  const reviewer = fields(entry.reviewer?.data ?? entry.reviewer ?? {});
  return {
    route: {
      id: `${type}:${entry.documentId ?? entry.id}:${localeCode}`,
      path,
      locale: localeCode,
      contentType: routeType,
      title,
      description,
      summary: plainText(entry.summary ?? entry.bio),
      publicationState: editorial.publicationState,
      publishedAt: entry.publishedAt,
      modifiedAt: entry.updatedAt,
      qualityPassed: editorial.qualityPassed,
      qualityScore: editorial.qualityScore,
      owner: editorial.owner,
      reviewedAt: editorial.reviewedAt,
      fixture: editorial.fixture,
      explicitNoindex: entry.seo?.noindex === true
    },
    eyebrow: type === "page" ? entry.pageType : type,
    body: [plainText(entry.summary), plainText(entry.description ?? entry.scope ?? entry.body ?? entry.bio)].filter(Boolean),
    sections: mapSections(entry.sections),
    faq: mapFaq(entry.faq),
    media: mediaUrl ? { url: mediaUrl, alt: entry.galleryAlt?.[0] ?? firstMedia.alternativeText ?? title, width: firstMedia.width, height: firstMedia.height } : undefined,
    specifications: Array.isArray(entry.specifications) ? entry.specifications.map((item: StrapiEntry) => ({ label: item.label, value: `${item.value}${item.unit ? ` ${item.unit}` : ""}` })) : undefined,
    schema: type === "product"
      ? { sku: entry.sku, brand: fields(entry.brand?.data ?? entry.brand ?? {}).name }
      : type === "author"
        ? { jobTitle: entry.jobTitle, sameAs: entry.sameAs }
      : type === "location"
          ? { isPhysicalFacility: entry.isPhysicalFacility, address: entry.address, phone: entry.phone, email: entry.email }
          : type === "legal-page"
            ? { policyType: entry.policyType }
          : routeType === "article" && author.name && author.slug
            ? { authorName: author.name, authorUrl: routeFor(manifest, "author", author.slug, localeCode), reviewerName: reviewer.name }
          : undefined
  };
}

export async function loadStrapiContent(input: StrapiLoadInput): Promise<StrapiContentPayload> {
  const settingResponse = await getJson(input.url, input.token, "/api/site-setting?populate=*");
  const settings = fields(settingResponse.data ?? {});
  if (settings.siteId !== input.manifest.siteId) throw new Error(`Strapi siteId ${settings.siteId ?? "<missing>"} does not match ${input.manifest.siteId}`);
  if (settings.brandName !== input.manifest.brand.brandName || settings.legalName !== input.manifest.brand.legalName) {
    throw new Error("Strapi identity does not match the selected site manifest");
  }
  const contentTypes = [
    "pages",
    ...(input.manifest.enabledModules.includes("lead") ? ["landing-pages"] : []),
    ...(input.manifest.enabledModules.includes("corporate") ? ["legal-pages"] : []),
    ...(input.manifest.enabledModules.includes("locations") ? ["locations"] : []),
    ...(input.manifest.enabledModules.includes("catalog") ? ["products", "categories", "brands"] : []),
    ...(input.manifest.enabledModules.includes("platforms") ? ["platforms"] : []),
    ...(input.manifest.enabledModules.includes("services") ? ["services"] : []),
    ...(input.manifest.enabledModules.includes("content") ? ["articles", "authors", "case-studies"] : [])
  ];
  const singular: Record<string, string> = { pages: "page", "landing-pages": "landing-page", "legal-pages": "legal-page", locations: "location", products: "product", categories: "category", brands: "brand", platforms: "platform", services: "service", articles: "article", authors: "author", "case-studies": "case-study" };
  const responses = input.contentEntries
    ? contentTypes.map((contentType) => ({ type: singular[contentType], response: { data: input.contentEntries!.filter((item) => item.sourceType === contentType).map((item) => item.entry) } }))
    : await Promise.all(contentTypes.map(async (contentType) => ({
        type: singular[contentType],
        response: await getJson(input.url, input.token, `/api/${contentType}?status=published&locale=all&pagination[pageSize]=1000&populate=*`)
      })));
  const redirectResponse = await getJson(input.url, input.token, "/api/redirects?filters[enabled][$eq]=true&pagination[pageSize]=1000");
  const navigationResponse = await getJson(input.url, input.token, "/api/navigations?status=published&locale=all&filters[visible][$eq]=true&pagination[pageSize]=1000");
  const redirects: RedirectRule[] = (redirectResponse.data ?? []).map((raw: StrapiEntry) => {
    const entry = fields(raw);
    return { fromPath: entry.fromPath, toPath: entry.toPath, statusCode: Number(entry.statusCode) === 302 ? 302 : 301, enabled: entry.enabled !== false };
  });
  const records = responses.flatMap(({ type, response }) => (response.data ?? []).map((entry: StrapiEntry) => toRecord(input.manifest, type, entry, input.url)));
  const byPath = new Map(records.map((record) => [record.route.path, record]));
  const home = byPath.get("/");
  if (!home) throw new Error("Production CMS must provide a published page with slug 'home'");
  for (const record of records) {
    if (record.route.path === "/") continue;
    const type = record.route.contentType;
    if (["product", "category", "brand", "platform", "service", "article", "author", "location"].includes(type)) {
      const locale = input.manifest.supportedLocales.find((item) => item.code === record.route.locale);
      const prefix = locale?.urlPrefix ? `/${locale.urlPrefix.replace(/^\/+|\/+$/g, "")}` : "";
      const hubType = type;
      const hubPath = `${prefix}/${segment(input.manifest, hubType as keyof SiteManifest["routeSegments"], `${hubType}s`)}/`;
      record.route.parentId = byPath.get(hubPath)?.route.id;
    } else {
      const localeHome = records.find((item) => item.route.contentType === "page" && item.route.locale === record.route.locale && /\/$/.test(item.route.path) && item.route.path.split("/").filter(Boolean).length <= 1);
      record.route.parentId = localeHome?.route.id ?? home.route.id;
    }
  }
  const byId = new Map(records.map((record) => [record.route.id, record]));
  for (const record of records) {
    if (!record.route.parentId) continue;
    const parent = byId.get(record.route.parentId);
    if (!parent) continue;
    parent.relatedIds = [...new Set([...(parent.relatedIds ?? []), record.route.id])];
    parent.route.relatedEntryIds = [...new Set([...(parent.route.relatedEntryIds ?? []), record.route.id])];
  }
  const translations = new Map<string, ContentRecord[]>();
  for (const record of records) {
    const key = record.route.id.split(":").slice(0, 2).join(":");
    translations.set(key, [...(translations.get(key) ?? []), record]);
  }
  for (const group of translations.values()) for (const record of group) record.route.alternateEntryIds = group.filter((item) => item.route.id !== record.route.id).map((item) => item.route.id);
  const navigation = (navigationResponse.data ?? []).map((raw: StrapiEntry) => fields(raw)).map((entry: StrapiEntry) => {
    if (!entry.label?.trim() || /^(click here|learn more|read more)$/i.test(entry.label.trim())) throw new Error(`Navigation label is not descriptive: ${entry.label ?? "<missing>"}`);
    const locale = entry.locale ?? input.manifest.defaultLocale;
    const destination = records.find((record) => record.route.locale === locale && (record.route.id.includes(`:${entry.destinationId}:`) || record.route.path === entry.destinationId));
    const href = entry.destinationType === "external" ? safeDestination(entry.externalUrl) : destination?.route.path;
    if (!href) throw new Error(`Navigation destination cannot be resolved: ${entry.label}`);
    return { label: entry.label, href, order: Number(entry.order ?? 0), locale, location: entry.menuLocation as "primary" | "footer" | "utility" };
  }).sort((a: { order: number }, b: { order: number }) => a.order - b.order);
  return { records, redirects, navigation };
}
