# Catalog CSV import

CSV schema version 1 uses these headers:

`schemaVersion,externalId,sku,locale,kind,name,slug,summary,description,categoryIds,brandId,platformIds,availability,price,currency,mediaUrl,mediaAlt,deletionFlag`

`kind` may be `product`, `service`, or `platform`. Pipe-separate multiple relation IDs. Save UTF-8. `externalId` is the stable upsert key; SKU may also be unique. Slugs must be unique per kind and locale. Price requires a three-letter ISO currency. Remote media hosts must appear in `CATALOG_IMAGE_HOSTS`.

Always run validation and dry-run before apply. Apply refuses a file without a matching checksum report. The dedicated CMS handles the batch in a transaction: failure rolls the batch back, new/updated products enter `factual_review`, and no product is published automatically.

Rows missing from a later CSV are not deleted. `deletionFlag=true` is explicit and archives the matching entry instead of hard-deleting it. Editors still need to resolve category/brand/platform relations, add managed media and alt text, complete specifications/evidence, pass factual and SEO review, and publish.

The importer rejects duplicate IDs/slugs, unsupported schema versions, invalid URLs, disallowed image hosts, and HTML/JavaScript payloads. Import reports list created, updated, archived/skipped, warnings, and failures.

Validate the non-production example with:

`pnpm catalog:validate --file examples/catalog/catalog-v1.csv`

Product lifecycle is explicit: temporary unavailability retains a `200` URL; a discontinued item with independent SEO value remains `200`; a direct replacement may receive a `301`; and a permanently removed item without replacement or retained value resolves to `410`.
