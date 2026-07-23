import type { ClaimEvidence, ContentQualityResult, PublicationState } from "../../site-core/src/index.ts";

export interface CatalogMedia {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CatalogItem {
  externalId: string;
  sku?: string;
  kind: "product" | "service" | "platform";
  locale: string;
  name: string;
  slug: string;
  summary: string;
  description: string;
  categoryIds: string[];
  brandId?: string;
  platformIds?: string[];
  specifications?: Record<string, string>;
  applications?: string[];
  media: CatalogMedia[];
  availability: "available" | "temporarily_unavailable" | "discontinued" | "contact";
  price?: { amount: number; currency: string; visible: boolean };
  cta: { label: string; formType: "product_inquiry" | "request_quote" | "service_consultation" };
  evidence?: ClaimEvidence[];
  seoTitle?: string;
  seoDescription?: string;
  owner?: string;
  reviewedAt?: string;
  publicationState: PublicationState;
  publishedAt?: string;
  fixture?: boolean;
  importedAt?: string;
  sourceChecksum?: string;
  replacementUrl?: string;
  retainSeoValue?: boolean;
}

export interface CatalogLifecycleDecision {
  status: 200 | 301 | 410;
  redirectTo?: string;
  reason: "active" | "temporarily_unavailable" | "discontinued_retained" | "direct_replacement" | "permanently_removed";
}

export function resolveCatalogLifecycle(
  item: Pick<CatalogItem, "availability" | "replacementUrl" | "retainSeoValue">
): CatalogLifecycleDecision {
  if (item.availability !== "discontinued") {
    return { status: 200, reason: item.availability === "temporarily_unavailable" ? "temporarily_unavailable" : "active" };
  }
  if (item.replacementUrl && !item.retainSeoValue) {
    return { status: 301, redirectTo: item.replacementUrl, reason: "direct_replacement" };
  }
  if (item.retainSeoValue) return { status: 200, reason: "discontinued_retained" };
  return { status: 410, reason: "permanently_removed" };
}

export interface CategoryEntry {
  id: string;
  locale: string;
  name: string;
  slug: string;
  description: string;
  selectionGuide: string;
  itemIds: string[];
  parentId?: string;
  owner?: string;
  reviewedAt?: string;
}

export interface CatalogQualityPolicy {
  minimumSummaryLength: number;
  minimumDescriptionLength: number;
  requireOwner: boolean;
  requireReviewDate: boolean;
}

export const defaultCatalogQualityPolicy: CatalogQualityPolicy = {
  minimumSummaryLength: 80,
  minimumDescriptionLength: 160,
  requireOwner: true,
  requireReviewDate: true
};

export function validateCatalogEntry(
  item: CatalogItem,
  policy: CatalogQualityPolicy = defaultCatalogQualityPolicy,
  now = new Date()
): ContentQualityResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!item.externalId.trim()) errors.push("externalId is required");
  if (!item.name.trim()) errors.push("name is required");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug)) errors.push("slug must be lowercase kebab-case");
  if (item.summary.trim().length < policy.minimumSummaryLength) errors.push(`summary must contain at least ${policy.minimumSummaryLength} characters`);
  if (item.description.trim().length < policy.minimumDescriptionLength) errors.push(`description must contain at least ${policy.minimumDescriptionLength} characters`);
  if (!item.categoryIds.length && item.kind === "product") errors.push("product requires at least one category");
  if (!Object.keys(item.specifications ?? {}).length && !item.applications?.length) errors.push("specifications or applications are required");
  if (!item.media.length) errors.push("at least one media asset is required");
  if (item.media.some((asset) => !asset.alt.trim())) errors.push("every media asset requires alt text");
  if (!item.cta.label.trim()) errors.push("CTA label is required");
  if (!item.availability) errors.push("availability is required");
  if (policy.requireOwner && !item.owner) errors.push("content owner is required");
  if (policy.requireReviewDate && !item.reviewedAt) errors.push("reviewedAt is required");
  if (item.price && (!item.price.visible || item.price.amount < 0 || !/^[A-Z]{3}$/.test(item.price.currency))) {
    warnings.push("price will not be emitted as an Offer until it is visible, non-negative, and uses an ISO currency");
  }
  for (const evidence of item.evidence ?? []) {
    if (!evidence.sourceUrl || !evidence.reviewer) errors.push(`claim evidence is incomplete: ${evidence.claim}`);
    if (evidence.expiresAt && new Date(evidence.expiresAt) < now) errors.push(`claim evidence has expired: ${evidence.claim}`);
  }
  return { passed: errors.length === 0, score: Math.max(0, 100 - errors.length * 15 - warnings.length * 3), errors, warnings };
}

export function validateCategoryEntry(category: CategoryEntry): ContentQualityResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!category.name.trim()) errors.push("category name is required");
  if (category.description.trim().length < 120) errors.push("category requires a unique description of at least 120 characters");
  if (category.selectionGuide.trim().length < 120) errors.push("category requires selection or use guidance of at least 120 characters");
  if (!category.itemIds.length) errors.push("empty category cannot be indexed");
  if (!category.owner) errors.push("category owner is required");
  if (!category.reviewedAt) errors.push("category review date is required");
  return { passed: errors.length === 0, score: Math.max(0, 100 - errors.length * 18), errors, warnings };
}

export interface CatalogCsvRow {
  schemaVersion: string;
  externalId: string;
  sku?: string;
  locale: string;
  kind: CatalogItem["kind"];
  name: string;
  slug: string;
  summary: string;
  description: string;
  categoryIds: string[];
  brandId?: string;
  platformIds: string[];
  availability: CatalogItem["availability"];
  price?: number;
  currency?: string;
  mediaUrl?: string;
  mediaAlt?: string;
  deletionFlag: boolean;
}

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"' && quoted && line[index + 1] === '"') { value += '"'; index += 1; }
    else if (character === '"') quoted = !quoted;
    else if (character === "," && !quoted) { fields.push(value); value = ""; }
    else value += character;
  }
  fields.push(value);
  return fields.map((field) => field.trim());
}

export function parseCatalogCsv(csv: string): CatalogCsvRow[] {
  const lines = csv.replace(/^\uFEFF/, "").split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const record = Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
    return {
      schemaVersion: record.schemaVersion,
      externalId: record.externalId,
      sku: record.sku || undefined,
      locale: record.locale,
      kind: record.kind as CatalogItem["kind"],
      name: record.name,
      slug: record.slug,
      summary: record.summary,
      description: record.description,
      categoryIds: record.categoryIds ? record.categoryIds.split("|").filter(Boolean) : [],
      brandId: record.brandId || undefined,
      platformIds: record.platformIds ? record.platformIds.split("|").filter(Boolean) : [],
      availability: record.availability as CatalogItem["availability"],
      price: record.price ? Number(record.price) : undefined,
      currency: record.currency || undefined,
      mediaUrl: record.mediaUrl || undefined,
      mediaAlt: record.mediaAlt || undefined,
      deletionFlag: record.deletionFlag.toLowerCase() === "true"
    };
  });
}

export function validateCatalogCsv(rows: CatalogCsvRow[], allowedImageHosts: string[] = []): ContentQualityResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const externalIds = new Set<string>();
  const skus = new Set<string>();
  const slugs = new Set<string>();
  if (!rows.length) errors.push("CSV must contain at least one data row");
  for (const [index, row] of rows.entries()) {
    const line = index + 2;
    if (row.schemaVersion !== "1") errors.push(`line ${line}: unsupported schemaVersion`);
    if (!row.externalId) errors.push(`line ${line}: externalId is required`);
    if (!row.name) errors.push(`line ${line}: name is required`);
    if (!(["product", "service", "platform"] as string[]).includes(row.kind)) errors.push(`line ${line}: invalid kind`);
    if (row.kind === "product" && !row.categoryIds.length) errors.push(`line ${line}: product requires at least one category`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.slug)) errors.push(`line ${line}: invalid slug`);
    if (row.externalId && externalIds.has(row.externalId)) errors.push(`line ${line}: duplicate externalId ${row.externalId}`);
    if (row.externalId) externalIds.add(row.externalId);
    if (row.sku && skus.has(row.sku)) errors.push(`line ${line}: duplicate SKU ${row.sku}`);
    if (row.sku) skus.add(row.sku);
    const slugKey = `${row.locale}:${row.slug}`;
    if (slugs.has(slugKey)) errors.push(`line ${line}: duplicate locale/slug ${slugKey}`);
    slugs.add(slugKey);
    if (row.mediaUrl) {
      try {
        const url = new URL(row.mediaUrl);
        if (allowedImageHosts.length && !allowedImageHosts.includes(url.host)) errors.push(`line ${line}: media host is not allowed`);
      } catch { errors.push(`line ${line}: mediaUrl is invalid`); }
      if (!row.mediaAlt?.trim()) errors.push(`line ${line}: mediaAlt is required when mediaUrl is present`);
    }
    if (/<\/?(?:script|style)|on\w+\s*=/i.test(`${row.summary}${row.description}`)) errors.push(`line ${line}: HTML or JavaScript is not allowed`);
    if (row.price !== undefined && (!Number.isFinite(row.price) || row.price < 0 || !/^[A-Z]{3}$/.test(row.currency ?? ""))) errors.push(`line ${line}: price requires a non-negative number and ISO currency`);
    if (row.deletionFlag) warnings.push(`line ${line}: explicit deletion requested; apply mode must require confirmation`);
  }
  return { passed: errors.length === 0, score: Math.max(0, 100 - errors.length * 10), errors, warnings };
}
