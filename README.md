# SEO/GEO website platform

An Astro + Strapi + PostgreSQL codebase for an agency to deploy independent corporate, catalog, service, platform, local-business, and content-led websites. Each production site has one manifest, one primary domain, one Strapi deployment, one PostgreSQL database, and isolated secrets and analytics.

This is not a shared multi-tenant CMS. Medical and Notex work remains only in `apps/medical-web` as a legacy demo and is not part of the production build path.

## Architecture

- `apps/site-web` — neutral Astro static renderer and Cloudflare lead function
- `services/strapi-cms` — generic CMS schemas for company, catalog, content, evidence, locations, redirects, and leads
- `packages/site-core` — manifest, routes, locale, canonical, metadata, indexability, sitemap, robots, llms.txt, and JSON-LD
- `packages/catalog` — catalog contracts, quality gates, and CSV validation
- `packages/content` — typed sections and editorial quality rules
- `packages/forms` — isolated lead payload and validation
- `packages/analytics` — common events and AI-referral classification
- `packages/presets` — module composition only; SEO logic does not live in presets
- `sites` — non-secret configuration selected one site at a time

Build flow:

`site manifest + dedicated Strapi → validation → route manifest → static HTML → dedicated Cloudflare project/domain`

## Create a website

```sh
pnpm site:create acme-industrial --preset corporate-catalog
pnpm site:validate acme-industrial
pnpm site:seed acme-industrial
pnpm site:build acme-industrial --url https://www.acme.com
pnpm site:audit acme-industrial --url https://www.acme.com
```

`site:create` copies structure and schema defaults only. It never copies content from another customer.

## Catalog import

```sh
pnpm catalog:validate --file catalog.csv
pnpm catalog:import --site acme-industrial --file catalog.csv --dry-run
pnpm catalog:import --site acme-industrial --file catalog.csv --apply
pnpm catalog:export --site acme-industrial --output catalog-export.csv
```

Apply is blocked until a matching dry-run report exists. Imported records enter `factual_review`; the importer never auto-publishes products and does not hard-delete missing rows.

## Verification

```sh
pnpm test
pnpm build:web
pnpm build:cms
pnpm test:rendered
pnpm test:isolation
pnpm test:production-build
```

See [platform architecture](./docs/PLATFORM_ARCHITECTURE.md), [site authoring](./docs/SITE_AUTHORING.md), and the [SEO/GEO launch gates](./docs/SEO_GEO_RELEASE_GATES.md).
