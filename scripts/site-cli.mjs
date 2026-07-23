import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { validateSiteManifest } from "../packages/site-core/src/index.ts";
import { presets, validatePresetModules } from "../packages/presets/src/index.ts";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [command, siteId, ...rest] = process.argv.slice(2);
const flag = (name) => { const index = rest.indexOf(name); return index >= 0 ? rest[index + 1] : undefined; };
const has = (name) => rest.includes(name);

function fail(message) { console.error(message); process.exit(1); }
function validSiteId(value) { return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value || ""); }
function configPath(id) { return resolve(repoRoot, "sites", id, "site.config.json"); }
function loadManifest(id) {
  const path = configPath(id);
  if (!existsSync(path)) fail(`Missing ${relative(repoRoot, path)}. Fixture TypeScript manifests are test-only.`);
  return JSON.parse(readFileSync(path, "utf8"));
}

function baseManifest(id, presetId) {
  const preset = presets[presetId];
  if (!preset) fail(`Unknown preset: ${presetId}`);
  return {
    siteId: id,
    preset: presetId,
    fixture: false,
    brand: {
      brandName: "Replace with brand name",
      legalName: "Replace with legal name",
      shortDescription: "Replace with a concise, factual description of this business and its primary customer value.",
      logoUrl: "/brand/logo.svg",
      faviconUrl: "/favicon.svg",
      contactEmail: "contact@example.com",
      contactPhone: "+00 000 000 000",
      address: "Replace with verified business address",
      socialProfiles: []
    },
    organization: { type: "Organization", businessAreas: [] },
    defaultLocale: "en",
    supportedLocales: [{ code: "en", htmlLang: "en", ogLocale: "en_US", urlPrefix: "", label: "English" }],
    routeSegments: { product: "products", category: "categories", brand: "brands", platform: "platforms", service: "services", location: "locations", article: "resources" },
    enabledModules: preset.modules,
    theme: {
      colors: { brand: "#164e63", brandContrast: "#ffffff", accent: "#f59e0b", surface: "#f8fafc", text: "#0f172a", muted: "#475569" },
      fonts: { heading: "Inter, system-ui, sans-serif", body: "Inter, system-ui, sans-serif" },
      radius: "medium",
      containerWidth: "1180px",
      headerVariant: "simple",
      footerVariant: "columns",
      colorScheme: "light"
    },
    navigationPolicy: { maxDepth: 2, requireDescriptiveLabels: true },
    schemaPolicy: { enableFaq: true, enableLocalBusiness: presetId === "local-business", enableOffers: false },
    crawlerPolicy: { gptBot: "disallow", oaiSearchBot: "allow", chatGptUser: "allow" },
    leadFormTypes: ["general_contact", ...(preset.modules.includes("catalog") ? ["product_inquiry", "request_quote"] : []), ...(preset.modules.includes("services") ? ["service_consultation"] : [])],
    analyticsFeatures: ["ga4", "cloudflare", "ai_referral", "indexnow"],
    contentQualityPolicy: { minimumScore: 85, requireOwner: true, requireReviewDate: true, maxReviewAgeDays: 365 }
  };
}

function createSite() {
  if (!validSiteId(siteId)) fail("site:create requires a lowercase kebab-case site id");
  const presetId = flag("--preset");
  if (!presetId) fail("site:create requires --preset <preset>");
  const directory = dirname(configPath(siteId));
  if (existsSync(directory)) fail(`Site directory already exists: ${relative(repoRoot, directory)}`);
  mkdirSync(directory, { recursive: true });
  const manifest = baseManifest(siteId, presetId);
  writeFileSync(configPath(siteId), `${JSON.stringify(manifest, null, 2)}\n`);
  writeFileSync(join(directory, ".env.example"), `SITE_ID=${siteId}\nSITE_CONFIG_PATH=sites/${siteId}/site.config.json\nPUBLIC_SITE_URL=https://www.example.com\nENFORCE_PRODUCTION_GATES=true\nSTRAPI_URL=https://cms.example.com\nSTRAPI_READ_TOKEN=replace-with-read-token\nSTRAPI_WRITE_TOKEN=replace-with-write-token\nPUBLIC_GA4_ID=G-XXXXXXXXXX\nTURNSTILE_SECRET_KEY=replace-with-secret\nCLOUDFLARE_PAGES_PROJECT_NAME=${siteId}\n`);
  writeFileSync(join(directory, "theme.tokens.css"), `:root {\n  --brand: ${manifest.theme.colors.brand};\n  --accent: ${manifest.theme.colors.accent};\n  --surface: ${manifest.theme.colors.surface};\n  --text: ${manifest.theme.colors.text};\n}\n`);
  writeFileSync(join(directory, "locales.json"), `${JSON.stringify(manifest.supportedLocales, null, 2)}\n`);
  writeFileSync(join(directory, "navigation.seed.json"), `${JSON.stringify([{ menuLocation: "primary", label: "About", destinationType: "page", destinationId: "about", order: 10, visible: true }, { menuLocation: "primary", label: "Contact", destinationType: "page", destinationId: "contact", order: 100, visible: true }], null, 2)}\n`);
  const draftPage = (title, slug, pageType) => ({ title, slug, pageType, summary: `Draft ${title} summary; replace before review.`, primaryAudience: "Define primary audience", primarySearchIntent: "Define primary intent", sections: [], editorial: { status: "draft", owner: "Unassigned", fixture: false, qualityScore: 0 } });
  writeFileSync(join(directory, "strapi.seed.json"), `${JSON.stringify({ siteSetting: { siteId, brandName: manifest.brand.brandName, legalName: manifest.brand.legalName, shortDescription: manifest.brand.shortDescription, defaultSeoTitle: manifest.brand.brandName, defaultSeoDescription: manifest.brand.shortDescription }, pages: [draftPage("Home", "home", "landing"), draftPage("About", "about", "about"), draftPage("Contact", "contact", "contact")] }, null, 2)}\n`);
  writeFileSync(join(directory, "LAUNCH_CHECKLIST.md"), `# ${siteId} launch checklist\n\n- [ ] Replace every placeholder in site.config.json\n- [ ] Create dedicated Strapi, PostgreSQL, media storage, and backups\n- [ ] Create and review homepage, hub pages, contact, legal, and module content\n- [ ] Configure dedicated analytics, Search Console, Bing, and IndexNow\n- [ ] Verify canonical, hreflang, schema, sitemap, robots, and lead routing\n- [ ] Run pnpm site:validate ${siteId}\n- [ ] Run pnpm site:build ${siteId}\n- [ ] Run pnpm site:audit ${siteId}\n`);
  console.log(`Created sites/${siteId} from structural preset ${presetId}. No customer content was copied.`);
}

function validateSite() {
  if (!validSiteId(siteId)) fail("A valid site id is required");
  const manifest = loadManifest(siteId);
  const errors = [...validateSiteManifest(manifest), ...validatePresetModules(manifest.preset, manifest.enabledModules)];
  const serialized = JSON.stringify(manifest);
  if (/Replace with|example\.com|\+00 000/i.test(serialized)) errors.push("manifest still contains placeholders");
  if (errors.length) fail(`Site validation failed:\n- ${errors.join("\n- ")}`);
  console.log(`Site manifest ${siteId} is valid.`);
}

function runPnpm(args, extraEnv = {}) {
  const executable = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
  const result = spawnSync(executable, args, { cwd: repoRoot, stdio: "inherit", env: { ...process.env, ...extraEnv }, shell: false });
  process.exitCode = result.status ?? 1;
  return process.exitCode;
}

function buildSite() {
  const manifest = loadManifest(siteId);
  const publicSiteUrl = flag("--url") || process.env.PUBLIC_SITE_URL;
  if (!publicSiteUrl) fail("Set PUBLIC_SITE_URL or pass --url");
  runPnpm(["--filter", "@base-cms/site-web", "build"], { SITE_ID: manifest.siteId, SITE_CONFIG_PATH: relative(repoRoot, configPath(siteId)).replace(/\\/g, "/"), PUBLIC_SITE_URL: publicSiteUrl, ENFORCE_PRODUCTION_GATES: "true" });
}

function allFiles(directory) {
  return readdirSync(directory).flatMap((name) => { const path = join(directory, name); return statSync(path).isDirectory() ? allFiles(path) : [path]; });
}

function auditSite() {
  loadManifest(siteId);
  const dist = resolve(repoRoot, "apps/site-web/dist");
  if (!existsSync(dist)) fail("Build output is missing. Run site:build first.");
  const expectedHost = new URL(process.env.PUBLIC_SITE_URL || flag("--url") || "https://invalid.example").host;
  const errors = [];
  const canonical = new Set();
  const titles = new Set();
  for (const path of allFiles(dist)) {
    const text = readFileSync(path, "utf8");
    if (/notex|clinicName|medicalReviewer/i.test(text)) errors.push(`${relative(dist, path)} contains demo/vertical terminology`);
    if (path.endsWith(".html")) {
      const indexable = !/<meta name="robots" content="noindex/i.test(text);
      const h1Count = (text.match(/<h1(?:\s|>)/g) || []).length;
      if (indexable && h1Count !== 1) errors.push(`${relative(dist, path)} has ${h1Count} H1 elements`);
      for (const required of [/<title>[^<]+<\/title>/, /<meta name="description"/, /<link rel="canonical"/, /<meta property="og:title"/, /<meta name="twitter:card"/, /application\/ld\+json/]) {
        if (indexable && !required.test(text)) errors.push(`${relative(dist, path)} is missing required metadata`);
      }
      const canonicalMatch = text.match(/<link rel="canonical" href="([^"]+)"/);
      const titleMatch = text.match(/<title>([^<]+)<\/title>/);
      if (indexable && canonicalMatch) {
        if (canonical.has(canonicalMatch[1])) errors.push(`duplicate canonical ${canonicalMatch[1]}`);
        canonical.add(canonicalMatch[1]);
        if (expectedHost !== "invalid.example" && new URL(canonicalMatch[1]).host !== expectedHost) errors.push(`foreign canonical host in ${relative(dist, path)}`);
      }
      if (indexable && titleMatch) { if (titles.has(titleMatch[1])) errors.push(`duplicate title ${titleMatch[1]}`); titles.add(titleMatch[1]); }
    }
  }
  if (errors.length) fail(`Site audit failed:\n- ${[...new Set(errors)].join("\n- ")}`);
  console.log(`Site audit passed for ${siteId}: ${canonical.size} indexable HTML documents.`);
}

async function seedSite() {
  const seedPath = resolve(dirname(configPath(siteId)), "strapi.seed.json");
  const seed = JSON.parse(readFileSync(seedPath, "utf8"));
  if (!has("--apply")) { console.log(JSON.stringify(seed, null, 2)); console.log("Dry run only. Add --apply with STRAPI_URL and STRAPI_WRITE_TOKEN to send seed records."); return; }
  if (!process.env.STRAPI_URL || !process.env.STRAPI_WRITE_TOKEN) fail("STRAPI_URL and STRAPI_WRITE_TOKEN are required");
  const headers = { "content-type": "application/json", authorization: `Bearer ${process.env.STRAPI_WRITE_TOKEN}` };
  const requests = [["site-setting", seed.siteSetting], ...seed.pages.map((page) => ["pages", { ...page, editorial: { status: "draft", owner: "Unassigned", fixture: false } }])];
  for (const [endpoint, data] of requests) {
    const response = await fetch(`${process.env.STRAPI_URL.replace(/\/$/, "")}/api/${endpoint}`, { method: endpoint === "site-setting" ? "PUT" : "POST", headers, body: JSON.stringify({ data }) });
    if (!response.ok) fail(`Seed request failed for ${endpoint}: ${response.status}`);
  }
  console.log(`Seeded draft structure for ${siteId}. Nothing was auto-published.`);
}

if (command === "create") createSite();
else if (command === "validate") validateSite();
else if (command === "build") buildSite();
else if (command === "audit") auditSite();
else if (command === "seed") await seedSite();
else if (command === "deploy") { if (!has("--skip-build")) buildSite(); if (!process.exitCode) runPnpm(["deploy:web"]); }
else fail("Usage: site-cli.mjs <create|validate|seed|build|deploy|audit> <site-id>");
