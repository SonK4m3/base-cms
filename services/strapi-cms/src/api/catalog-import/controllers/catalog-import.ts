import { createHash } from "node:crypto";

type ImportKind = "product" | "service" | "platform";
interface ImportRow {
  externalId: string;
  sku?: string;
  locale: string;
  kind: ImportKind;
  name: string;
  slug: string;
  summary: string;
  description: string;
  categoryIds?: string[];
  brandId?: string;
  platformIds?: string[];
  availability?: string;
  price?: number;
  currency?: string;
  deletionFlag?: boolean;
}

const uidByKind: Record<ImportKind, string> = {
  product: "api::product.product",
  service: "api::service.service",
  platform: "api::platform.platform"
};

function digest(rows: ImportRow[]): string {
  return createHash("sha256").update(JSON.stringify(rows)).digest("hex");
}

function validateRows(rows: ImportRow[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const skus = new Set<string>();
  const slugs = new Set<string>();
  for (const [index, row] of rows.entries()) {
    if (!row.externalId || !row.name || !row.slug || !row.locale || !uidByKind[row.kind]) errors.push(`row ${index + 1}: required field missing or kind invalid`);
    if (/<\/?(?:script|style)|on\w+\s*=/i.test(`${row.summary}${row.description}`)) errors.push(`row ${index + 1}: HTML or JavaScript is not allowed`);
    const idKey = `${row.kind}:${row.externalId}`;
    if (ids.has(idKey)) errors.push(`row ${index + 1}: duplicate kind/externalId`);
    ids.add(idKey);
    if (row.sku && skus.has(row.sku)) errors.push(`row ${index + 1}: duplicate SKU`);
    if (row.sku) skus.add(row.sku);
    const slugKey = `${row.kind}:${row.locale}:${row.slug}`;
    if (slugs.has(slugKey)) errors.push(`row ${index + 1}: duplicate kind/locale/slug`);
    slugs.add(slugKey);
    if (row.kind === "product" && !row.categoryIds?.length) errors.push(`row ${index + 1}: product requires a category`);
    if (row.price !== undefined && (!Number.isFinite(row.price) || row.price < 0 || !/^[A-Z]{3}$/.test(row.currency ?? ""))) errors.push(`row ${index + 1}: invalid price/currency`);
  }
  return errors;
}

async function resolveRelations(cms: any, uid: string, ids: string[] = []) {
  if (!ids.length) return [];
  const documents = await cms.documents(uid).findMany({ filters: { $or: [{ externalId: { $in: ids } }, { documentId: { $in: ids } }] }, limit: ids.length });
  const found = new Set(documents.flatMap((entry: any) => [entry.externalId, entry.documentId]));
  const missing = ids.filter((id) => !found.has(id));
  if (missing.length) throw new Error(`Missing ${uid} relations: ${missing.join(", ")}`);
  return documents.map((entry: any) => ({ documentId: entry.documentId }));
}

function baseData(row: ImportRow, checksum: string) {
  return {
    externalId: row.externalId,
    name: row.name,
    slug: row.slug,
    summary: row.summary,
    editorial: { status: "factual_review", owner: "Catalog import", fixture: false, qualityScore: 0 },
    importedAt: new Date().toISOString(),
    sourceChecksum: checksum
  };
}

export default {
  async apply(ctx: any) {
    const { siteId, checksum, payloadDigest, rows } = ctx.request.body ?? {};
    if (!siteId || siteId !== process.env.SITE_ID) return ctx.badRequest("siteId does not match this CMS deployment");
    if (!Array.isArray(rows) || rows.length > 1000) return ctx.badRequest("rows must be an array with at most 1000 entries");
    const errors = validateRows(rows);
    if (errors.length) return ctx.unprocessableEntity("Catalog validation failed", { errors });
    if (!checksum) return ctx.badRequest("checksum is required");
    if (!payloadDigest || payloadDigest !== digest(rows)) return ctx.badRequest("payload digest does not match the approved dry-run");
    const cms = strapi as any;
    const report = { created: [] as string[], updated: [] as string[], archived: [] as string[], failed: [] as string[] };
    try {
      await cms.db.transaction(async () => {
        for (const row of rows as ImportRow[]) {
          const uid = uidByKind[row.kind];
          const documents = cms.documents(uid);
          const existing = await documents.findFirst({ locale: row.locale, filters: { externalId: row.externalId } });
          const reportKey = `${row.kind}:${row.externalId}`;
          if (row.deletionFlag) {
            if (existing) {
              const archivedData: Record<string, unknown> = { editorial: { status: "archived", owner: "Catalog import", fixture: false, qualityScore: 0 }, sourceChecksum: checksum };
              if (row.kind === "product") archivedData.availability = "discontinued";
              await documents.update({ documentId: existing.documentId, locale: row.locale, data: archivedData });
              report.archived.push(reportKey);
            }
            continue;
          }
          const data: Record<string, unknown> = baseData(row, checksum);
          if (row.kind === "product") {
            data.sku = row.sku;
            data.description = row.description;
            data.availability = row.availability || "contact";
            if (row.price !== undefined) { data.priceDisplay = row.price; data.currency = row.currency; }
            data.categories = { connect: await resolveRelations(cms, "api::category.category", row.categoryIds) };
            if (row.brandId) data.brand = { connect: await resolveRelations(cms, "api::brand.brand", [row.brandId]) };
            if (row.platformIds?.length) data.platforms = { connect: await resolveRelations(cms, "api::platform.platform", row.platformIds) };
          } else if (row.kind === "service") {
            data.scope = row.description;
            data.deliverables = [];
            data.process = [];
          } else {
            data.description = row.description;
            data.audience = row.summary;
            data.capabilities = [];
          }
          if (existing) {
            await documents.update({ documentId: existing.documentId, locale: row.locale, data });
            report.updated.push(reportKey);
          } else {
            await documents.create({ locale: row.locale, data });
            report.created.push(reportKey);
          }
        }
      });
    } catch (error) {
      strapi.log.error(error);
      return ctx.internalServerError("Import transaction was rolled back");
    }
    ctx.body = { data: { siteId, checksum, payloadDigest: digest(rows), ...report, publicationState: "factual_review" } };
  }
};
