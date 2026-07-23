# Migration from the legacy demo

`apps/medical-web`, `packages/medical-schema`, and existing vertical routes are retained as a legacy demo/test area while the neutral platform moves forward in `apps/site-web`. Root development, build, deploy, and Docker paths now select the neutral app. Production audit rejects Notex/medical terminology in generated output.

The Strapi schemas were generalized additively where possible. Before applying schema changes to an existing database, take a verified PostgreSQL and media backup, run the CMS build in a staging copy, migrate useful demo records into the new generic fields, and verify relations/locales/editorial components. Do not remove legacy database columns or content types until that staged migration is accepted.

Existing public URLs should remain in the legacy demo until equivalent neutral routes and redirects are tested. For a real customer, create a new dedicated site/CMS instead of transforming demo content in place.
