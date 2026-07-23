import type { PageSeoInput, SeoDocument, SiteContext } from "./types.ts";
import { normalizeCanonicalUrl, resolveAbsoluteUrl } from "./url.ts";

export interface MetadataInput {
  title?: string;
  seoTitle?: string;
  description?: string;
  seoDescription?: string;
  summary?: string;
  path: string;
  locale?: string;
  robots?: string;
  ogType?: "website" | "article" | "profile";
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  schemaType?: string;
  alternates?: Array<{ language: string; url: string }>;
}

export function buildMetadata(context: SiteContext, input: MetadataInput): SeoDocument {
  const title = input.seoTitle?.trim() || input.title?.trim() || "";
  const description = input.seoDescription?.trim() || input.description?.trim() || input.summary?.trim() || "";
  if (!title) throw new Error(`SEO title is required for ${input.path}`);
  if (!description) throw new Error(`SEO description or summary is required for ${input.path}`);
  const locale = context.manifest.supportedLocales.find((item) => item.code === input.locale) ?? context.defaultLocale;
  const canonical = normalizeCanonicalUrl(context.siteUrl, input.path);
  const image = input.imageUrl
    ? resolveAbsoluteUrl(context.siteUrl, input.imageUrl)
    : resolveAbsoluteUrl(context.siteUrl, context.manifest.brand.logoUrl);
  return {
    title,
    description,
    canonical,
    language: locale.htmlLang,
    hreflang: input.alternates ?? [],
    robots: input.robots ?? "index,follow",
    openGraph: {
      type: input.ogType ?? "website",
      title,
      description,
      url: canonical,
      image,
      ...(input.imageWidth ? { imageWidth: input.imageWidth } : {}),
      ...(input.imageHeight ? { imageHeight: input.imageHeight } : {}),
      locale: locale.ogLocale
    },
    twitter: { card: image ? "summary_large_image" : "summary", title, description, ...(image ? { image } : {}) },
    schemaType: input.schemaType ?? "WebPage"
  };
}

export function validatePageSeo(input: PageSeoInput): string[] {
  const errors: string[] = [];
  if (!input.title.trim()) errors.push("title is required");
  if (!input.description.trim()) errors.push("description is required");
  if (!input.canonicalUrl.startsWith("http")) errors.push("canonicalUrl must be absolute");
  if (input.title.length > 70) errors.push("title is longer than 70 characters");
  if (input.description.length > 180) errors.push("description is longer than 180 characters");
  return errors;
}

export function validateUniqueMetadata(documents: SeoDocument[]): string[] {
  const errors: string[] = [];
  for (const [field, values] of [
    ["canonical", documents.map((document) => document.canonical)],
    ["title", documents.filter((document) => document.robots.startsWith("index")).map((document) => document.title)]
  ] as const) {
    const seen = new Set<string>();
    for (const value of values) {
      if (seen.has(value)) errors.push(`Duplicate ${field}: ${value}`);
      seen.add(value);
    }
  }
  return errors;
}
