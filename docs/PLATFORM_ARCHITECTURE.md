# Platform architecture

## Deployment boundary

The repository is a shared codebase, not a shared customer runtime. Every production website receives its own primary domain, Cloudflare Pages project, Strapi deployment, PostgreSQL credentials/database, media namespace, backup schedule, crawler policy, analytics properties, Search Console/Bing properties, IndexNow key, and lead destinations.

The build selects exactly one site with `SITE_ID`, `SITE_CONFIG_PATH`, and `PUBLIC_SITE_URL`. It then connects only to that site's `STRAPI_URL` using a site-specific read token. Production validation rejects fixture manifests, missing configuration, non-HTTPS URLs, `localhost`, `.example`, and `.pages.dev` domains.

## Dependency direction

`apps/site-web → presets/UI/adapters → site-core/domain contracts`

`site-core`, `catalog`, `content`, and `forms` do not import Astro, Strapi, Cloudflare, or a customer preset. Vendor-specific code lives in the Astro Strapi loader, Cloudflare Function, deployment script, and Strapi APIs.

## Build pipeline

1. Read one non-secret manifest from `SITE_CONFIG_PATH`.
2. Validate manifest identity, locale, enabled modules, theme, crawler policy, and quality policy.
3. Verify the dedicated Strapi `site-setting.siteId`, brand name, and legal name match the manifest.
4. Load only enabled content types and published records.
5. Convert CMS entries into one route manifest.
6. Resolve indexability from publication state, quality score, owner, review date, fixtures, redirects, and page type.
7. Generate static HTML, one JSON-LD graph per page, canonical URLs, alternate locales, robots, sitemap index/children, and `llms.txt` from that route manifest.
8. Audit the output for duplicate metadata, missing H1/metadata, foreign canonical hosts, and demo terminology.
9. Deploy only the selected `apps/site-web/dist` to the site's Cloudflare project.

## Indexation model

Indexation is curated. Product, category, brand, platform, service, article, location, and landing pages must be published and meet the site's quality score. Search, query-string filters, sort/facet combinations, previews, thank-you pages, redirects, archives, drafts, fixtures, expired critical claims, and thin entries are excluded.

Facet combinations remain query parameters with `noindex,follow`, canonicalize to their approved hub, and never enter a sitemap. A facet becomes indexable only after an editor creates a standalone route with original demand evidence, useful content, and approval.

## Domain isolation

The deployment domain is never read from Strapi content. It is the sole base for canonical, Open Graph, sitemap, hreflang, and JSON-LD `@id` values. The CMS may contain external evidence and official profile links, but it cannot override site identity or canonical ownership.

Lead requests contain `siteId`; the Cloudflare Function rejects a mismatch, uses only that deployment's environment secrets, and writes to its dedicated Strapi. CMS tokens are never exposed through `PUBLIC_*` environment variables.
