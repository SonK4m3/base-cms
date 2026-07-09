# Admin Strategy

## Phase 1

Do not build a separate custom admin app.

Use:

- Astro public site
- Strapi admin

## When to add `apps/admin`

Only add a custom admin app if the client needs at least one of the following:

- lead dashboard
- booking management
- custom approval workflow
- marketing report
- role-specific UI for consultants or doctors

## Default rule

If the requirement can be handled by Strapi admin and the public site, keep the repo simpler and do not add `apps/admin`.
