import { readFileSync, readdirSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const appRoot = resolve(repoRoot, "apps/site-web");
const astro = resolve(appRoot, "node_modules/astro/astro.js");
const fixtures = [
  { id: "catalog-manufacturer", brand: "Northstar Industrial", host: "catalog-manufacturer.example", hasProducts: true },
  { id: "service-business", brand: "Clearpath Advisory", host: "service-business.example", hasProducts: false },
  { id: "multi-platform-enterprise", brand: "Aperture Systems", host: "multi-platform-enterprise.example", hasProducts: true }
];

function files(directory) {
  return readdirSync(directory).flatMap((name) => { const path = join(directory, name); return statSync(path).isDirectory() ? files(path) : [path]; });
}

for (const fixture of fixtures) {
  const result = spawnSync(process.execPath, [astro, "build"], {
    cwd: appRoot,
    stdio: "inherit",
    env: { ...process.env, SITE_ID: fixture.id, PUBLIC_SITE_URL: `https://${fixture.host}`, ENFORCE_PRODUCTION_GATES: "false", ASTRO_TELEMETRY_DISABLED: "1" },
    shell: false
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
  const output = files(resolve(appRoot, "dist")).filter((path) => /\.(?:html|xml|txt|js|css)$/.test(path)).map((path) => readFileSync(path, "utf8")).join("\n");
  if (!output.includes(fixture.brand) || !output.includes(fixture.host)) throw new Error(`${fixture.id} output is missing its own identity`);
  for (const other of fixtures.filter((item) => item.id !== fixture.id)) {
    if (output.includes(other.brand) || output.includes(other.host)) throw new Error(`${fixture.id} leaked identity from ${other.id}`);
  }
  const productSitemapPresent = output.includes(`/sitemaps/products.xml`);
  if (productSitemapPresent !== fixture.hasProducts) throw new Error(`${fixture.id} emitted the wrong product sitemap policy`);
  if (/Notex|clinicName|medicalReviewer/i.test(output)) throw new Error(`${fixture.id} leaked legacy demo terminology`);
  console.log(`Isolation passed: ${fixture.id}`);
}

const preview = fixtures[0];
const previewResult = spawnSync(process.execPath, [astro, "build"], {
  cwd: appRoot,
  stdio: "inherit",
  env: { ...process.env, SITE_ID: preview.id, PUBLIC_SITE_URL: `https://${preview.host}`, ENFORCE_PRODUCTION_GATES: "false", PREVIEW_NOINDEX: "true", ASTRO_TELEMETRY_DISABLED: "1" },
  shell: false
});
if (previewResult.status !== 0) process.exit(previewResult.status ?? 1);
const previewFiles = files(resolve(appRoot, "dist"));
for (const path of previewFiles.filter((item) => item.endsWith(".html"))) {
  if (!/<meta name="robots" content="noindex/i.test(readFileSync(path, "utf8"))) throw new Error(`Preview page is indexable: ${path}`);
}
if (!/^User-agent: \*\s+Disallow: \/\s*$/m.test(readFileSync(resolve(appRoot, "dist/robots.txt"), "utf8"))) throw new Error("Preview robots.txt does not disallow crawling");
console.log("Preview noindex policy passed.");
