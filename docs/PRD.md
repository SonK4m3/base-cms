# Base CMS PRD

## Purpose

Build a trusted medical marketing website that turns search intent into qualified clinic leads.

The product should help users:

- find clear, trustworthy medical information
- understand the clinic's expertise and services
- see trust signals quickly
- leave contact details or book an appointment without friction

## Product principles

- Content is structured, not free-form
- Trust signals are first-class product features
- Public pages should be fast and static by default
- CMS operations should be simple to run in Docker
- CTA should feel helpful, not pushy
- Lead capture should be easy on mobile
- Tracking should explain where traffic comes from and what converts
- GEO and AI-search readability should be treated as part of the content system

## Key user roles

- Content writer
- SEO editor
- Medical reviewer
- Admin
- Developer
- Marketing operator
- Clinic staff
- Front-desk staff

## MVP scope

### Included

- Astro public site scaffold
- Strapi CMS scaffold
- PostgreSQL service
- Docker Compose deployment
- editorial workflow metadata
- SEO schema helper package
- conversion and analytics scaffold
- trust/CTA component scaffolds
- Strapi admin only, no custom `apps/admin` yet

### Excluded for MVP

- Authentication for public users
- Advanced search
- Multisite content permissions matrix
- Programmatic A/B testing
- Custom internal admin/dashboard app
- Lead dashboard
- Booking management
- Custom approval workflow UI
- Marketing reports UI
- Separate role-specific apps for consultants/doctors

## Milestones

### Milestone 1

- Workspace scaffold
- Docker baseline
- app/service folder structure
- No custom admin app in phase 1

### Milestone 2

- CMS schemas
- editorial workflow states
- SEO entity helpers

### Milestone 3

- Public page templates
- article rendering
- condition/service pages

### Milestone 4

- JSON-LD helpers
- metadata generation
- sitemap/robots support

### Milestone 5

- preview flow
- publish webhook
- analytics integration

### Milestone 6

- lead capture forms
- CTA variants by page type
- conversion event tracking
- geo/local content tuning

## Risks

- Medical content compliance requirements may expand scope
- CMS setup can drift if content models are not defined early
- SEO and review metadata can be skipped unless enforced in the schema
- CTA can become overly salesy if not tied to user intent
- tracking can become noisy unless event names are standardized

## Definition of done

- The repo can be booted locally with Docker Compose
- The Astro app and Strapi service are separated cleanly
- Shared schema helpers exist for SEO and medical workflow
- The README documents the implementation plan clearly

## Future admin expansion

Only add a custom `apps/admin` when the client explicitly needs one of these:

- lead dashboard
- booking management
- custom approval workflow
- marketing reports
- role-specific UI for consultants or doctors

If those needs do not exist, keep using Strapi admin and the public site only.

## Repository layout

```txt
base-cms/
  apps/
    medical-web/
  packages/
    medical-schema/
    seo/
    analytics/
    forms/
  services/
    strapi-cms/
  docker/
    caddy/
  docs/
```
