import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const appDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(appDir, "../..");
const fixtureUrls = {
  "catalog-manufacturer": "https://catalog-manufacturer.example",
  "service-business": "https://service-business.example",
  "multi-platform-enterprise": "https://multi-platform-enterprise.example"
};
const selectedSite = process.env.SITE_ID || "catalog-manufacturer";

export default defineConfig({
  srcDir: "./src",
  publicDir: "./public",
  output: "static",
  trailingSlash: "ignore",
  site: process.env.PUBLIC_SITE_URL || fixtureUrls[selectedSite] || fixtureUrls["catalog-manufacturer"],
  vite: {
    resolve: {
      alias: {
        "@base-cms/site-core": resolve(repoRoot, "packages/site-core/src/index.ts"),
        "@base-cms/catalog": resolve(repoRoot, "packages/catalog/src/index.ts"),
        "@base-cms/content": resolve(repoRoot, "packages/content/src/index.ts"),
        "@base-cms/ui": resolve(repoRoot, "packages/ui/src/index.ts"),
        "@base-cms/presets": resolve(repoRoot, "packages/presets/src/index.ts"),
        "@base-cms/forms": resolve(repoRoot, "packages/forms/src/index.ts"),
        "@base-cms/analytics": resolve(repoRoot, "packages/analytics/src/index.ts")
      }
    },
    server: { fs: { allow: [repoRoot] } }
  }
});
