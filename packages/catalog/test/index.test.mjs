import test from "node:test";
import assert from "node:assert/strict";
import { parseCatalogCsv, resolveCatalogLifecycle, validateCatalogCsv, validateCatalogEntry, validateCategoryEntry } from "../src/index.ts";

const product = {
  externalId: "p-1", sku: "SKU-1", kind: "product", locale: "en", name: "Control Unit", slug: "control-unit",
  summary: "A detailed original summary that explains the product, intended buyer, application, and primary value without copying a manufacturer feed.",
  description: "This original product description explains the operating context, integration boundaries, expected inputs and outputs, selection considerations, limitations, and next steps in enough detail to help a buyer evaluate fit before contacting the company.",
  categoryIds: ["controls"], specifications: { power: "24 V" }, media: [{ url: "/x.svg", alt: "Control unit front panel" }], availability: "contact",
  cta: { label: "Request information", formType: "product_inquiry" }, owner: "Catalog editor", reviewedAt: "2026-01-01", publicationState: "published", publishedAt: "2026-01-01"
};

test("product quality gate rejects missing summary and image alt", () => {
  assert.equal(validateCatalogEntry(product).passed, true);
  const result = validateCatalogEntry({ ...product, summary: "short", media: [{ url: "/x.svg", alt: "" }] });
  assert.equal(result.passed, false);
  assert.ok(result.errors.some((error) => error.includes("summary")));
  assert.ok(result.errors.some((error) => error.includes("alt text")));
});

test("category quality gate rejects empty or context-free categories", () => {
  const result = validateCategoryEntry({ id: "c", locale: "en", name: "Controls", slug: "controls", description: "short", selectionGuide: "short", itemIds: [], owner: "Editor", reviewedAt: "2026-01-01" });
  assert.equal(result.passed, false);
  assert.ok(result.errors.includes("empty category cannot be indexed"));
});

test("CSV parser handles quoted values and rejects duplicate locale slugs", () => {
  const csv = `schemaVersion,externalId,sku,locale,kind,name,slug,summary,description,categoryIds,brandId,platformIds,availability,mediaUrl,mediaAlt,deletionFlag\n1,p-1,S1,en,product,"Unit, One",unit-one,Summary,Description,c1,b1,pf1,contact,https://media.example.com/one.jpg,Front,false\n1,p-2,S2,en,product,Unit Two,unit-one,Summary,Description,c1,b1,pf1,contact,https://media.example.com/two.jpg,Front,false`;
  const rows = parseCatalogCsv(csv);
  assert.equal(rows[0].name, "Unit, One");
  const result = validateCatalogCsv(rows, ["media.example.com"]);
  assert.equal(result.passed, false);
  assert.ok(result.errors.some((error) => error.includes("duplicate locale/slug")));
});

test("CSV rejects duplicate SKU even when external IDs differ", () => {
  const csv = `schemaVersion,externalId,sku,locale,kind,name,slug,summary,description,categoryIds,brandId,platformIds,availability,price,currency,mediaUrl,mediaAlt,deletionFlag\n1,p-1,SAME,en,product,Unit One,unit-one,Summary,Description,c1,b1,,contact,,,,,false\n1,p-2,SAME,en,product,Unit Two,unit-two,Summary,Description,c1,b1,,contact,,,,,false`;
  const result = validateCatalogCsv(parseCatalogCsv(csv));
  assert.equal(result.passed, false);
  assert.ok(result.errors.some((error) => error.includes("duplicate SKU SAME")));
});

test("product lifecycle preserves temporary URLs and resolves discontinued products", () => {
  assert.deepEqual(resolveCatalogLifecycle({ availability: "temporarily_unavailable" }), { status: 200, reason: "temporarily_unavailable" });
  assert.deepEqual(resolveCatalogLifecycle({ availability: "discontinued", retainSeoValue: true }), { status: 200, reason: "discontinued_retained" });
  assert.deepEqual(resolveCatalogLifecycle({ availability: "discontinued", replacementUrl: "/products/new-unit/" }), { status: 301, redirectTo: "/products/new-unit/", reason: "direct_replacement" });
  assert.deepEqual(resolveCatalogLifecycle({ availability: "discontinued" }), { status: 410, reason: "permanently_removed" });
});
