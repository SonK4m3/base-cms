import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCatalogCsv, validateCatalogCsv } from "../packages/catalog/src/index.ts";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [command, ...args] = process.argv.slice(2);
const value = (name) => { const index = args.indexOf(name); return index >= 0 ? args[index + 1] : undefined; };
const has = (name) => args.includes(name);
const fail = (message) => { console.error(message); process.exit(1); };
const filePath = value("--file") ? resolve(repoRoot, value("--file")) : undefined;
const siteId = value("--site");
const allowedHosts = (process.env.CATALOG_IMAGE_HOSTS || "").split(",").map((host) => host.trim()).filter(Boolean);

function loadCsv() {
  if (!filePath || !existsSync(filePath)) fail("A valid --file <csv> is required");
  const source = readFileSync(filePath, "utf8");
  const rows = parseCatalogCsv(source);
  const result = validateCatalogCsv(rows, allowedHosts);
  if (!result.passed) fail(`Catalog validation failed:\n- ${result.errors.join("\n- ")}`);
  return { rows, source, result };
}

function checksum(source) { return createHash("sha256").update(source).digest("hex"); }
function payloadDigest(rows) { return createHash("sha256").update(JSON.stringify(rows)).digest("hex"); }
function reportPath(id, digest) { return resolve(repoRoot, ".catalog-reports", `${id}-${digest}.dry-run.json`); }

async function api(path, init = {}) {
  const token = process.env.STRAPI_WRITE_TOKEN || process.env.STRAPI_READ_TOKEN;
  if (!process.env.STRAPI_URL || !token) fail("STRAPI_URL and a Strapi read/write token are required");
  const response = await fetch(`${process.env.STRAPI_URL.replace(/\/$/, "")}${path}`, { ...init, headers: { authorization: `Bearer ${token}`, "content-type": "application/json", ...(init.headers || {}) } });
  if (!response.ok) fail(`Strapi request failed (${response.status}): ${await response.text()}`);
  return response.json();
}

async function assertCmsSite() {
  const response = await api("/api/site-setting");
  const settings = response.data?.attributes ? { ...response.data.attributes, id: response.data.id } : response.data;
  if (!settings || settings.siteId !== siteId) fail(`CMS siteId ${settings?.siteId ?? "<missing>"} does not match --site ${siteId}`);
}

const entryFields = (entry) => entry?.attributes ? { id: entry.id, documentId: entry.documentId, ...entry.attributes } : entry;

async function importCatalog() {
  if (!siteId) fail("catalog:import requires --site <site-id>");
  const { rows, source, result } = loadCsv();
  const digest = checksum(source);
  const path = reportPath(siteId, digest);
  await assertCmsSite();
  if (has("--dry-run")) {
    const [products, services, platforms, categories, brands] = await Promise.all([
      api("/api/products?pagination[pageSize]=1000&fields[0]=externalId&fields[1]=sku"),
      api("/api/services?pagination[pageSize]=1000&fields[0]=externalId"),
      api("/api/platforms?pagination[pageSize]=1000&fields[0]=externalId"),
      api("/api/categories?pagination[pageSize]=1000&fields[0]=externalId"),
      api("/api/brands?pagination[pageSize]=1000&fields[0]=externalId")
    ]);
    const byKind = new Map([
      ["product", new Set((products.data || []).map(entryFields).flatMap((entry) => [entry.externalId, entry.sku].filter(Boolean)))],
      ["service", new Set((services.data || []).map(entryFields).map((entry) => entry.externalId).filter(Boolean))],
      ["platform", new Set((platforms.data || []).map(entryFields).flatMap((entry) => [entry.externalId, entry.documentId].filter(Boolean)))]
    ]);
    const categoryKeys = new Set((categories.data || []).map(entryFields).flatMap((entry) => [entry.externalId, entry.documentId].filter(Boolean)));
    const brandKeys = new Set((brands.data || []).map(entryFields).flatMap((entry) => [entry.externalId, entry.documentId].filter(Boolean)));
    const platformKeys = byKind.get("platform");
    const failed = rows.flatMap((row) => {
      const missing = [...row.categoryIds.filter((id) => !categoryKeys.has(id)), ...(row.brandId && !brandKeys.has(row.brandId) ? [row.brandId] : []), ...row.platformIds.filter((id) => !platformKeys.has(id))];
      return missing.length ? [{ key: `${row.kind}:${row.externalId}`, reason: `missing relations: ${missing.join(", ")}` }] : [];
    });
    const report = {
      siteId, checksum: digest, payloadDigest: payloadDigest(rows), generatedAt: new Date().toISOString(),
      applicable: failed.length === 0,
      created: rows.filter((row) => !byKind.get(row.kind).has(row.externalId) && !(row.sku && byKind.get(row.kind).has(row.sku))).map((row) => `${row.kind}:${row.externalId}`),
      updated: rows.filter((row) => byKind.get(row.kind).has(row.externalId) || (row.sku && byKind.get(row.kind).has(row.sku))).map((row) => `${row.kind}:${row.externalId}`),
      archived: rows.filter((row) => row.deletionFlag).map((row) => `${row.kind}:${row.externalId}`),
      failed,
      warnings: result.warnings
    };
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, `${JSON.stringify(report, null, 2)}\n`);
    console.log(JSON.stringify(report, null, 2));
    console.log(`Dry-run report: ${path}`);
    return;
  }
  if (!has("--apply")) fail("Choose --dry-run or --apply");
  if (!process.env.STRAPI_WRITE_TOKEN) fail("STRAPI_WRITE_TOKEN is required for --apply");
  if (!existsSync(path)) fail("Matching dry-run report is required before --apply");
  const dryRun = JSON.parse(readFileSync(path, "utf8"));
  if (dryRun.checksum !== digest || dryRun.siteId !== siteId) fail("Dry-run report does not match this site/file");
  if (!dryRun.applicable) fail("Dry-run contains failed relations and cannot be applied");
  const resultBody = await api("/api/catalog-import/apply", { method: "POST", body: JSON.stringify({ siteId, checksum: digest, payloadDigest: dryRun.payloadDigest, rows }) });
  console.log(JSON.stringify(resultBody, null, 2));
}

function csvEscape(value) { const text = String(value ?? ""); return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text; }
async function exportCatalog() {
  if (!siteId) fail("catalog:export requires --site <site-id>");
  await assertCmsSite();
  const responses = await Promise.all(["products", "services", "platforms"].map(async (endpoint) => ({ endpoint, response: await api(`/api/${endpoint}?locale=all&pagination[pageSize]=1000&populate=*`) })));
  const headers = ["schemaVersion", "externalId", "sku", "locale", "kind", "name", "slug", "summary", "description", "categoryIds", "brandId", "platformIds", "availability", "price", "currency", "mediaUrl", "mediaAlt", "deletionFlag"];
  const lines = [headers.join(",")];
  let count = 0;
  for (const { endpoint, response } of responses) {
    const kind = endpoint === "products" ? "product" : endpoint === "services" ? "service" : "platform";
    for (const raw of response.data || []) {
      const item = entryFields(raw);
      const row = ["1", item.externalId, item.sku, item.locale, kind, item.name, item.slug, item.summary, item.description ?? item.scope, (item.categories || []).map((entry) => entry.documentId || entry.id).join("|"), item.brand?.documentId || item.brand?.id, (item.platforms || []).map((entry) => entry.documentId || entry.id).join("|"), item.availability ?? "contact", item.priceDisplay, item.currency, "", "", "false"];
      lines.push(row.map(csvEscape).join(","));
      count += 1;
    }
  }
  const output = value("--output") ? resolve(repoRoot, value("--output")) : resolve(repoRoot, `${siteId}-catalog.csv`);
  writeFileSync(output, `${lines.join("\n")}\n`);
  console.log(`Exported ${count} catalog records to ${output}`);
}

if (command === "validate") { const { rows, result } = loadCsv(); console.log(JSON.stringify({ rows: rows.length, ...result }, null, 2)); }
else if (command === "import") await importCatalog();
else if (command === "export") await exportCatalog();
else fail("Usage: catalog-cli.mjs <validate|import|export>");
