# base-cms

Trusted medical marketing website scaffold.

This repo is for a clinic-facing site that needs to:

- earn trust quickly
- rank for services, symptoms, and local intent
- support content-heavy SEO and GEO
- capture qualified leads without feeling pushy

## Docs

- [North Star](./docs/NORTH_STAR.md)
- [PRD](./docs/PRD.md)
- [Content Model](./docs/CONTENT_MODEL.md)

## Current scaffold

- Astro public site in `apps/medical-web`
- Strapi CMS in `services/strapi-cms`
- shared packages for SEO, analytics, forms, and medical schema
- Cloudflare Pages demo path documented in `docs/DEPLOY_CLOUDFLARE.md`
- Docker Compose with PostgreSQL and Caddy for local/self-host workflows
- No custom `apps/admin` in phase 1; Strapi admin covers CMS operations for now
- Demo content seed lives in `packages/medical-schema/src/seed.ts` and can be enabled with `CMS_SEED_DEMO_CONTENT=true`

## Release checklist

- Run `pnpm build:web`
- Run `pnpm build:cms`
- Review `docs/DEPLOY_CLOUDFLARE.md`
- Push the branch to GitHub
- Connect Cloudflare Pages to `apps/medical-web`
