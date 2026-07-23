import type { BreadcrumbItem, PageSeoInput, SeoDocument, SiteContext, SiteSettings } from "./types.ts";
import { resolveAbsoluteUrl } from "./url.ts";

export type JsonLdEntity = Record<string, unknown>;

export function createOrganizationSchema(settings: SiteSettings): JsonLdEntity {
  const siteUrl = settings.url.endsWith("/") ? settings.url : `${settings.url}/`;
  return {
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: settings.name,
    url: siteUrl,
    ...(settings.description ? { description: settings.description } : {}),
    ...(settings.logoUrl ? { logo: resolveAbsoluteUrl(siteUrl, settings.logoUrl) } : {}),
    ...(settings.socialProfiles?.length ? { sameAs: settings.socialProfiles } : {})
  };
}

export function createWebsiteSchema(settings: SiteSettings): JsonLdEntity {
  const siteUrl = settings.url.endsWith("/") ? settings.url : `${settings.url}/`;
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    name: settings.name,
    url: siteUrl,
    publisher: { "@id": `${siteUrl}#organization` },
    ...(settings.locale ? { inLanguage: settings.locale } : {})
  };
}

export function createWebPageSchema(input: PageSeoInput, settings: SiteSettings): JsonLdEntity {
  const siteUrl = settings.url.endsWith("/") ? settings.url : `${settings.url}/`;
  return {
    "@type": "WebPage",
    "@id": `${input.canonicalUrl}#webpage`,
    url: input.canonicalUrl,
    name: input.title,
    description: input.description,
    isPartOf: { "@id": `${siteUrl}#website` },
    ...(input.locale || settings.locale ? { inLanguage: input.locale ?? settings.locale } : {})
  };
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]): JsonLdEntity {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function createJsonLdGraph(
  settings: SiteSettings,
  page: PageSeoInput,
  additionalEntities: JsonLdEntity[] = []
) {
  return {
    "@context": "https://schema.org",
    "@graph": [createOrganizationSchema(settings), createWebsiteSchema(settings), createWebPageSchema(page, settings), ...additionalEntities]
  };
}

export function buildJsonLdGraph(
  context: SiteContext,
  metadata: SeoDocument,
  additionalEntities: JsonLdEntity[] = []
) {
  const settings: SiteSettings = {
    name: context.manifest.brand.brandName,
    description: context.manifest.brand.shortDescription,
    url: context.siteUrl,
    locale: metadata.language,
    logoUrl: context.manifest.brand.logoUrl,
    socialProfiles: context.manifest.brand.socialProfiles
  };
  const graph = createJsonLdGraph(settings, {
    title: metadata.title,
    description: metadata.description,
    canonicalUrl: metadata.canonical,
    locale: metadata.language
  }, additionalEntities);
  const organization = graph["@graph"][0];
  organization["@type"] = context.manifest.organization.type;
  organization.legalName = context.manifest.brand.legalName;
  if (context.manifest.brand.contactEmail || context.manifest.brand.contactPhone) {
    organization.contactPoint = {
      "@type": "ContactPoint",
      ...(context.manifest.brand.contactEmail ? { email: context.manifest.brand.contactEmail } : {}),
      ...(context.manifest.brand.contactPhone ? { telephone: context.manifest.brand.contactPhone } : {})
    };
  }
  if (context.manifest.brand.address) organization.address = context.manifest.brand.address;
  return graph;
}

export function createProductSchema(input: {
  id: string;
  name: string;
  description: string;
  imageUrls: string[];
  sku?: string;
  brand?: string;
  offers?: { price: number; currency: string; availability: string; url: string };
}): JsonLdEntity {
  return {
    "@type": "Product",
    "@id": input.id,
    name: input.name,
    description: input.description,
    image: input.imageUrls,
    ...(input.sku ? { sku: input.sku } : {}),
    ...(input.brand ? { brand: { "@type": "Brand", name: input.brand } } : {}),
    ...(input.offers ? {
      offers: {
        "@type": "Offer",
        price: input.offers.price,
        priceCurrency: input.offers.currency,
        availability: input.offers.availability,
        url: input.offers.url
      }
    } : {})
  };
}

export function createServiceSchema(input: { id: string; name: string; description: string; providerId: string; areaServed?: string[] }): JsonLdEntity {
  return {
    "@type": "Service",
    "@id": input.id,
    name: input.name,
    description: input.description,
    provider: { "@id": input.providerId },
    ...(input.areaServed?.length ? { areaServed: input.areaServed } : {})
  };
}

export function createCollectionSchema(input: { id: string; name: string; description: string; items: Array<{ name: string; url: string }> }): JsonLdEntity[] {
  return [
    { "@type": "CollectionPage", "@id": input.id, name: input.name, description: input.description },
    {
      "@type": "ItemList",
      itemListElement: input.items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, url: item.url }))
    }
  ];
}

export function serializeJsonLd(graph: unknown): string {
  return JSON.stringify(graph)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
