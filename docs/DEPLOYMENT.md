# Dedicated site deployment

## Cloudflare Pages

Create one Cloudflare Pages project per customer. Configure the neutral app build with the customer environment:

- build command: `pnpm site:build <site-id> --url https://www.customer.com`
- output directory: `apps/site-web/dist`
- production-only: `ENFORCE_PRODUCTION_GATES=true`
- preview-only: `PREVIEW_NOINDEX=true`
- `SITE_ID` and `SITE_CONFIG_PATH` for exactly one manifest
- dedicated `STRAPI_URL`, `STRAPI_READ_TOKEN`, `STRAPI_WRITE_TOKEN`
- dedicated GA4, Turnstile, email/CRM webhook, and IndexNow values

The direct deploy script runs from `apps/site-web` so Cloudflare detects its `functions` directory as well as the static output. `/api/lead` is the only Function route; `_routes.json` excludes static pages from Functions execution.

Attach one primary custom domain. Redirect aliases at Cloudflare to the primary HTTPS host. Do not serve identical live content on the `pages.dev` domain; production validation rejects it.

## CMS and database

Provision one Strapi deployment, PostgreSQL credential set/database, media namespace, and backup schedule. Set the CMS runtime `SITE_ID` to match the site manifest and seed `site-setting.siteId` with the same value. Use separate read and write API tokens with the minimum permissions needed by the build and lead endpoint.

Back up PostgreSQL and media before every schema migration. Test restore regularly. Deploy CMS schema changes to a staging copy before a customer production CMS.

## Lead security

Enable Cloudflare Turnstile, WAF rate limiting for `/api/lead`, and verified-bot handling. The Function also enforces POST, body size, honeypot, server-side payload/site validation, optional Turnstile verification, dedicated Strapi routing, idempotency key, and one retry on server errors.

## Release sequence

1. `pnpm site:validate <site-id>`
2. complete editorial/factual/SEO/localization review in Strapi
3. `pnpm site:build <site-id> --url <primary-domain>`
4. `pnpm site:audit <site-id> --url <primary-domain>`
5. submit test leads and verify the exact CMS/email destination
6. deploy to preview with noindex and complete accessibility/link/performance checks
7. deploy production, attach the primary domain, validate redirects and crawler access
8. submit sitemap and monitor crawl/index/lead health
