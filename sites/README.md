# Site manifests

Each directory contains non-secret configuration for one independent deployment. A production deployment selects exactly one manifest with `SITE_ID` and uses its own `PUBLIC_SITE_URL`, Strapi instance, PostgreSQL database, analytics properties, and lead-routing secrets.

The three manifests currently in this directory are fixtures for isolation and rendered-HTML tests. Because `fixture: true`, production validation rejects them.
