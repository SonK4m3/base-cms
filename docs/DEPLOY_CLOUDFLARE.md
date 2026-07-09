# Cloudflare Deploy Guide

## Target architecture

- Astro public site on Cloudflare Pages
- CMS kept separate
- Pages Functions handle lead form submission
- Turnstile protects the lead form
- Deploy Hooks trigger rebuilds when CMS content is published

## Repository shape

- `apps/medical-web` contains the Cloudflare Pages target
- `apps/medical-web/functions/api/contact.ts` handles the lead submission endpoint
- `apps/medical-web/public/_redirects` keeps redirect rules close to the public app
- workspace packages under `packages/*` are shared by the web app and CMS

## Pre-push checklist

1. Keep secrets out of git. Commit only `*.example` files and local docs.
2. Verify the web app and CMS both build cleanly.
3. Confirm the Pages build uses the Astro app, not the Strapi build.
4. Push to GitHub, then connect Cloudflare Pages to the branch you want to deploy.

## Pages setup

- Root directory: `apps/medical-web`
- Build command: `pnpm build`
- Output directory: `dist`
- Production branch: `main`
- Install command: `pnpm install --frozen-lockfile`

## GitHub push flow

Use this once the repo is ready:

```bash
git status
git add .
git commit -m "chore: prepare cloudflare deploy"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

If the remote already exists, skip the `remote add` step and just push.

## Environment variables

### Production

- `PUBLIC_SITE_URL`
- `PUBLIC_CMS_URL`
- `PUBLIC_GA_MEASUREMENT_ID`
- `PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `CMS_READ_TOKEN`
- `RESEND_API_KEY`

### Preview

- `PUBLIC_SITE_URL`
- `PUBLIC_CMS_URL`
- `PUBLIC_GA_MEASUREMENT_ID`
- `PUBLIC_TURNSTILE_SITE_KEY`

### Cloudflare Pages notes

- Set the same production values in the Cloudflare Pages project settings
- Leave CMS-only secrets out of Pages unless the page function or build needs them
- Use a separate deploy hook or webhook for CMS publish events if the content model changes

## Static file rules

- Use `public/_redirects` for simple redirects
- Keep `robots.txt` and sitemap available to crawlers
- Use canonical URLs from `PUBLIC_SITE_URL`

## Form flow

1. user submits contact form
2. Cloudflare Pages Function validates required fields
3. Turnstile token is checked server-side
4. form is accepted or rejected
5. later integrations can forward the lead to CMS, email, or CRM

## CMS publish flow

- CMS publishes content
- CMS triggers Cloudflare Pages Deploy Hook
- Cloudflare rebuilds the static site

## Scope rule

Do not add a custom `apps/admin` for this phase.
Use Strapi admin and the public site only unless a later client need justifies a separate admin app.

## Final validation

Before the first GitHub push or Cloudflare deploy, run:

```bash
pnpm build:web
pnpm build:cms
```

If both succeed, the repo is ready for the first release branch.

If Astro telemetry hits a Windows permission prompt during local validation, rerun the web build with:

```bash
$env:ASTRO_TELEMETRY_DISABLED='1'; pnpm build:web
```
