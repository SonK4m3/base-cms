# Site and content authoring

## Create a site

Choose the smallest preset that covers the business:

- `corporate-catalog` for manufacturer/distributor catalogs
- `service-business` for scoped professional or operational services
- `multi-platform-enterprise` for several platforms/product lines plus services
- `local-business` for real facilities and service areas
- `content-led-business` for authority/content-led acquisition

Run `pnpm site:create <site-id> --preset <preset>`. Replace every placeholder in the generated manifest, configure locales and modules, provision a dedicated CMS/database, then seed only the structural draft records. A preset defines module composition and template defaults; it never owns SEO rules.

## Content workflow

Every public entry follows:

`draft → factual_review → seo_review → localization_review → approved → published → needs_update → archived`

Production requires Strapi `publishedAt`, editorial status `published`, a passing quality score, a content owner, a review date, a valid locale, and no fixture marker. Critical claims need a source, owner, reviewer, verification date, and optional expiry/consent reference.

## Indexable page contract

Each indexable page should have one descriptive H1, an answer-first summary, explicit audience/use case, clear scope or inputs/outputs, specifications/deliverables/process, availability and limitations, nearby sources for important claims, visible ownership/dates where relevant, descriptive internal links, and one intent-aligned next step. The main content must exist in server-rendered HTML.

Product pages additionally need original summary/description, category or platform, structured specifications or applications, at least one valid image with useful alt text, availability, a CTA, metadata, and factual review. Category pages need original context, selection guidance, real items, breadcrumbs, and internal links; a bare grid is not sufficient.

## Typed sections

Editors select approved sections and variants: hero, answer summary, feature/product/category grids, specification/comparison tables, process timeline, testimonial with evidence, case-study evidence, FAQ, CTA, contact details, rich text, media, and downloads. The CMS does not accept custom CSS, JavaScript, or arbitrary page-builder code.

## Structured data

Schema describes visible content only. Product `Offer` is emitted only when visible price/currency/availability are maintained. FAQ schema requires every question and answer to be visible. LocalBusiness requires a real facility. Never enter invented ratings, reviews, awards, certifications, prices, stock, customer metrics, or unsupported organization types.

## URL changes

Use lowercase kebab-case and stable localized segments. Do not change an indexed slug without a 301 redirect. Temporary unavailability remains 200 when a product will return. Discontinued pages with demand/backlinks stay useful and link replacements; direct replacements may receive 301; permanently valueless removals may use 410.
