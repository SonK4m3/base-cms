# Site Core

`packages/site-core` contains the vertical-neutral foundation used by every website preset in this repository.

## What belongs in the core

- site identity and branding settings
- canonical URL normalization
- page metadata and robots directives
- Open Graph and Twitter metadata inputs
- sitemap and `robots.txt` generation
- optional `llms.txt` generation from the same navigation source
- organization, website, webpage, breadcrumb, and page-entity JSON-LD builders
- indexability and metadata validation helpers

The core is intentionally static-first. Astro pages should render useful text, headings, links, and metadata on the server. Interactive behavior stays in small vanilla-script islands or explicitly hydrated components.

## Presets

The current medical clinic is a preset/demo adapter. Medical-only concepts such as doctors, conditions, specialties, medical reviewers, licenses, and clinical disclaimers remain outside the neutral core.

Future presets should provide:

1. site settings and navigation
2. page/content routes
3. vertical-specific structured-data entities
4. conversion components

They should consume `@base-cms/site-core` for technical SEO behavior instead of duplicating metadata, canonical, robots, sitemap, or JSON-LD logic.

## SEO contract

Every indexable page should provide a title, description, canonical URL, visible H1, and server-rendered primary content. Structured data must describe content visible on the page; it is not a substitute for content.
