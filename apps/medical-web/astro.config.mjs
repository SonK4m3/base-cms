import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const appDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(appDir, "../..");

export default defineConfig({
  srcDir: "./src",
  publicDir: "./public",
  site: process.env.PUBLIC_SITE_URL || "https://notex.example",
  vite: {
    resolve: {
      alias: {
        "@base-cms/seo": resolve(repoRoot, "packages/seo/src/index.ts"),
        "@base-cms/site-core": resolve(repoRoot, "packages/site-core/src/index.ts"),
        "@base-cms/medical-schema": resolve(repoRoot, "packages/medical-schema/src/index.ts"),
        "@base-cms/analytics": resolve(repoRoot, "packages/analytics/src/index.ts"),
        "@base-cms/forms": resolve(repoRoot, "packages/forms/src/index.ts")
      }
    },
    server: {
      fs: {
        allow: [repoRoot]
      }
    }
  }
});
