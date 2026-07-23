import {
  buildBreadcrumbs,
  buildJsonLdGraph,
  buildMetadata,
  createBreadcrumbSchema,
  createCollectionSchema,
  createProductSchema,
  createServiceSchema,
  normalizeCanonicalUrl,
  resolveIndexability,
  type JsonLdEntity
} from "@base-cms/site-core";
import { manifest, previewNoindex, routeManifest, siteContext, type ContentRecord } from "../data/site.ts";

export function createPagePresentation(record: ContentRecord) {
  const decision = resolveIndexability(record.route, manifest);
  const robots = previewNoindex ? "noindex,follow" : decision.robots;
  const alternateRoutes = (record.route.alternateEntryIds ?? []).map((id) => routeManifest.find((route) => route.id === id)).filter(Boolean);
  const alternates = alternateRoutes.map((route) => ({
    language: manifest.supportedLocales.find((locale) => locale.code === route!.locale)?.htmlLang ?? route!.locale,
    url: normalizeCanonicalUrl(siteContext.siteUrl, route!.path)
  }));
  if (alternates.length) {
    const ownLanguage = manifest.supportedLocales.find((locale) => locale.code === record.route.locale)?.htmlLang ?? record.route.locale;
    alternates.unshift({ language: ownLanguage, url: normalizeCanonicalUrl(siteContext.siteUrl, record.route.path) });
    const fallback = alternates.find((item) => item.language === siteContext.defaultLocale.htmlLang) ?? alternates[0];
    alternates.push({ language: "x-default", url: fallback.url });
  }
  const metadata = buildMetadata(siteContext, {
    title: record.route.title,
    description: record.route.description,
    path: record.route.canonicalPath ?? record.route.path,
    locale: record.route.locale,
    robots,
    ogType: record.route.contentType === "article" ? "article" : "website",
    schemaType: schemaTypeFor(record.route.contentType),
    alternates,
    imageUrl: record.media?.url ?? manifest.brand.logoUrl,
    imageWidth: record.media?.width ?? 180,
    imageHeight: record.media?.height ?? 40
  });
  const breadcrumbs = buildBreadcrumbs(record.route, routeManifest, siteContext.siteUrl, normalizeCanonicalUrl);
  const entities: JsonLdEntity[] = [];
  if (breadcrumbs.length > 1) entities.push(createBreadcrumbSchema(breadcrumbs));
  if (record.route.contentType === "product") {
    entities.push(createProductSchema({
      id: `${metadata.canonical}#product`,
      name: record.route.title,
      description: record.route.description ?? "",
      imageUrls: record.media ? [new URL(record.media.url, siteContext.siteUrl).toString()] : [],
      sku: record.schema?.sku,
      brand: record.schema?.brand
    }));
  } else if (record.route.contentType === "service") {
    entities.push(createServiceSchema({ id: `${metadata.canonical}#service`, name: record.route.title, description: record.route.description ?? "", providerId: siteContext.organizationId }));
  } else if (["category", "brand", "platform"].includes(record.route.contentType)) {
    const related = (record.relatedIds ?? []).map((id) => routeManifest.find((route) => route.id === id)).filter(Boolean);
    entities.push(...createCollectionSchema({
      id: `${metadata.canonical}#collection`,
      name: record.route.title,
      description: record.route.description ?? "",
      items: related.map((route) => ({ name: route!.title, url: normalizeCanonicalUrl(siteContext.siteUrl, route!.path) }))
    }));
  } else if (record.route.contentType === "article") {
    entities.push({
      "@type": "Article",
      "@id": `${metadata.canonical}#article`,
      headline: record.route.title,
      description: record.route.description,
      datePublished: record.route.publishedAt,
      dateModified: record.route.modifiedAt,
      author: record.schema?.authorUrl ? { "@id": `${normalizeCanonicalUrl(siteContext.siteUrl, record.schema.authorUrl)}#person` } : { "@id": siteContext.organizationId },
      publisher: { "@id": siteContext.organizationId },
      mainEntityOfPage: { "@id": `${metadata.canonical}#webpage` }
    });
  } else if (record.route.contentType === "author") {
    entities.push(
      { "@type": "ProfilePage", "@id": `${metadata.canonical}#profile`, mainEntity: { "@id": `${metadata.canonical}#person` } },
      {
        "@type": "Person",
        "@id": `${metadata.canonical}#person`,
        name: record.route.title,
        description: record.route.description,
        ...(record.schema?.jobTitle ? { jobTitle: record.schema.jobTitle } : {}),
        ...(record.media ? { image: new URL(record.media.url, siteContext.siteUrl).toString() } : {}),
        ...(record.schema?.sameAs?.length ? { sameAs: record.schema.sameAs } : {})
      }
    );
  } else if (record.route.contentType === "location" && manifest.schemaPolicy.enableLocalBusiness && record.schema?.isPhysicalFacility) {
    entities.push({
      "@type": "LocalBusiness",
      "@id": `${metadata.canonical}#location`,
      name: record.route.title,
      description: record.route.description,
      address: record.schema.address,
      ...(record.schema.phone ? { telephone: record.schema.phone } : {}),
      ...(record.schema.email ? { email: record.schema.email } : {})
    });
  }
  if (record.faq?.length && manifest.schemaPolicy.enableFaq) {
    entities.push({
      "@type": "FAQPage",
      "@id": `${metadata.canonical}#faq`,
      mainEntity: record.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } }))
    });
  }
  const graph = buildJsonLdGraph(siteContext, metadata, entities);
  return { metadata, graph, breadcrumbs };
}

function schemaTypeFor(contentType: string): string {
  if (contentType === "product") return "Product";
  if (contentType === "service") return "Service";
  if (["category", "brand", "platform"].includes(contentType)) return "CollectionPage";
  if (contentType === "article") return "Article";
  if (contentType === "author") return "ProfilePage";
  if (contentType === "location") return "LocalBusiness";
  return "WebPage";
}
