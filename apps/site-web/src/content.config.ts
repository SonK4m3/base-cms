import { defineCollection, z } from "astro:content";
import { readFileSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { SiteManifest } from "@base-cms/site-core";
import { strapiContentLoader } from "./loaders/content-layer.ts";

const enabled = process.env.ENFORCE_PRODUCTION_GATES === "true";
const configPath = process.env.SITE_CONFIG_PATH;
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const manifest = enabled && configPath
  ? JSON.parse(readFileSync(isAbsolute(configPath) ? configPath : resolve(repoRoot, configPath), "utf8")) as SiteManifest
  : undefined;
const modules = manifest?.enabledModules ?? [];
const contentTypes = manifest ? [
  "pages",
  ...(modules.includes("lead") ? ["landing-pages"] : []),
  ...(modules.includes("corporate") ? ["legal-pages"] : []),
  ...(modules.includes("locations") ? ["locations"] : []),
  ...(modules.includes("catalog") ? ["products", "categories", "brands"] : []),
  ...(modules.includes("platforms") ? ["platforms"] : []),
  ...(modules.includes("services") ? ["services"] : []),
  ...(modules.includes("content") ? ["articles", "authors", "case-studies"] : [])
] : [];

const cms = defineCollection({
  loader: strapiContentLoader({ baseUrl: process.env.STRAPI_URL, token: process.env.STRAPI_READ_TOKEN, contentTypes, enabled }),
  schema: z.object({ sourceType: z.string(), entry: z.record(z.any()) })
});

export const collections = { cms };
