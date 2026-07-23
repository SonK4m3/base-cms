# SEO/GEO release gates

Technical SEO and useful, crawlable, evidence-backed content are also the basis for AI search visibility. `llms.txt` is generated for maintainability but is not treated as a ranking or citation guarantee.

## Build blockers

- `SITE_ID`, `SITE_CONFIG_PATH`, `PUBLIC_SITE_URL`, `STRAPI_URL`, or `STRAPI_READ_TOKEN` is missing.
- Manifest/CMS `siteId`, brand name, or legal name differs.
- Domain is not HTTPS or is `localhost`, `.example`, or `.pages.dev`.
- Manifest is marked as a fixture.
- An indexable page lacks title, description/summary, canonical, one H1, language, OG/Twitter metadata, static primary content, owner, review date, or passing quality score.
- Duplicate canonical/title, foreign-domain canonical/schema ID, redirect chain/loop, orphan route, indexable search/filter route, demo content, placeholder, expired critical claim, or fake evidence is present.
- Sitemap contains a non-200, non-canonical, draft, archive, redirect, filter, noindex, fixture, or quality-failed URL.
- Lead routing does not match the site deployment.
- Typecheck, build, unit tests, rendered tests, link crawl, accessibility, or performance gates fail.

## Preview policy

Set `PREVIEW_NOINDEX=true` on preview builds. Preview robots disallows all crawlers and every rendered page emits noindex. Do not attach the primary custom domain to a preview project.

## Crawler policy

The generated robots file allows normal public crawling and makes OAI-SearchBot, ChatGPT-User, and GPTBot explicit from the site owner's manifest. A site that wants eligibility for ChatGPT Search should allow OAI-SearchBot. Cloudflare verified crawlers must not receive a JavaScript Challenge.

## Per-domain launch

1. Redirect aliases to the single primary HTTPS domain.
2. Verify organization identity, contact details, logo, social profiles, and business category across visible pages and JSON-LD.
3. Confirm canonical, hreflang reciprocity, sitemap index, robots, OG image/dimensions/locale, favicon, and theme color.
4. Validate representative Product, Service, CollectionPage, Article, ProfilePage, LocalBusiness, and FAQ graphs only where supported.
5. Submit the correct sitemap to dedicated Google Search Console and Bing properties; configure a dedicated IndexNow key.
6. Verify GA4/Cloudflare analytics and common event names; test AI referral classification and lead attribution.
7. Submit every lead form, confirm Turnstile/rate limits, and prove the lead/email reaches only this customer.
8. Run `pnpm site:audit <site-id> --url <primary-url>` against the final output.

## Measurement

Measure crawl/index coverage, non-brand and brand landing pages, qualified lead conversion, AI referral sessions, cited landing pages, brand/entity accuracy, and customer-specific prompt coverage. Do not report “GEO ranking” or promise an AI citation.
