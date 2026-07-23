import { createServer } from "node:http";
import { mkdtempSync, readFileSync, readdirSync, rmdirSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";

const repoRoot = resolve(import.meta.dirname, "..");
const appRoot = resolve(repoRoot, "apps/site-web");
const astro = resolve(appRoot, "node_modules/astro/astro.js");
const editorial = { status: "published", owner: "Editorial team", reviewer: "Quality reviewer", reviewedAt: "2026-07-01T00:00:00.000Z", fixture: false, qualityScore: 95 };
const dates = { publishedAt: "2026-06-01T00:00:00.000Z", updatedAt: "2026-07-01T00:00:00.000Z" };
const summary = (subject) => `${subject} gives business buyers a concise, evidence-aware explanation of the intended audience, practical outcome, operating scope, important constraints, accountable ownership, and the next useful action. The page is maintained as original company content and reviewed on a published schedule so readers and search systems can evaluate it accurately.`;
const seo = (description) => ({ description });
const page = (documentId, title, slug, pageType) => ({ documentId, title, slug, pageType, locale: "en", summary: summary(title), primaryAudience: "Business decision makers", primarySearchIntent: "Understand the business and make a next-step decision", sections: [{ __component: "sections.answer-summary", heading: "In brief", text: summary(title) }], seo: seo(`${title} information, scope, evidence, and next steps from Production Test Brand.`), editorial, ...dates });
const author = { documentId: "author-editor", name: "Jordan Editor", slug: "jordan-editor", locale: "en", jobTitle: "Lead editor", summary: summary("Jordan Editor's profile"), bio: "Jordan owns the factual and editorial review process for this production integration fixture.", sameAs: [], seo: seo("Jordan Editor is the accountable lead editor for Production Test Brand resources."), editorial, ...dates };
const article = { documentId: "article-guide", title: "A practical evidence review guide", slug: "evidence-review-guide", locale: "en", summary: summary("This evidence review guide"), body: "Define the decision, inspect each important claim, record its source and owner, then review limitations before acting.", articleType: "guide", primaryAudience: "Business evaluators", primarySearchIntent: "Learn how to review vendor evidence", author, reviewer: author, seo: seo("Use this practical guide to review business claims, evidence, owners, dates, limitations, and next actions."), editorial, ...dates };
const privacy = { documentId: "legal-privacy", title: "Privacy policy", slug: "privacy", locale: "en", summary: summary("This privacy policy"), body: "This production fixture describes collection, use, retention, security, and contact practices for submitted information.", effectiveDate: "2026-07-01", policyType: "privacy", seo: seo("Read how Production Test Brand handles contact and website information."), editorial, ...dates };
const pages = [page("page-home", "Production Test Brand", "home", "landing"), page("page-about", "About Production Test Brand", "about", "about"), page("page-contact", "Contact Production Test Brand", "contact", "contact"), page("page-resources", "Production Test Brand resources", "resources", "landing"), page("page-authors", "Production Test Brand authors", "authors", "team")];
const navigation = [
  { documentId: "nav-about", locale: "en", menuLocation: "primary", label: "About the company", destinationType: "page", destinationId: "page-about", order: 10, visible: true, ...dates },
  { documentId: "nav-resources", locale: "en", menuLocation: "primary", label: "Business resources", destinationType: "page", destinationId: "page-resources", order: 20, visible: true, ...dates },
  { documentId: "nav-contact", locale: "en", menuLocation: "footer", label: "Contact the team", destinationType: "page", destinationId: "page-contact", order: 10, visible: true, ...dates }
];
const manifest = {
  siteId: "production-test-site", preset: "content-led-business", fixture: false,
  brand: { brandName: "Production Test Brand", legalName: "Production Test Brand LLC", shortDescription: "Evidence-led business guidance and resources for accountable purchasing decisions.", logoUrl: "/brand/logo.svg", faviconUrl: "/favicon.svg", contactEmail: "hello@production.test", contactPhone: "+1 555 010 9000", address: "900 Test Avenue, Austin, TX", socialProfiles: [] },
  organization: { type: "Organization", businessAreas: ["Business guidance"] }, defaultLocale: "en",
  supportedLocales: [{ code: "en", htmlLang: "en", ogLocale: "en_US", urlPrefix: "", label: "English" }],
  routeSegments: { article: "resources", author: "authors" }, enabledModules: ["corporate", "content", "lead"],
  theme: { colors: { brand: "#164e63", brandContrast: "#ffffff", accent: "#f59e0b", surface: "#f8fafc", text: "#0f172a", muted: "#475569" }, fonts: { heading: "Inter, system-ui, sans-serif", body: "Inter, system-ui, sans-serif" }, radius: "medium", containerWidth: "1180px", headerVariant: "simple", footerVariant: "columns", colorScheme: "light" },
  navigationPolicy: { maxDepth: 2, requireDescriptiveLabels: true }, schemaPolicy: { enableFaq: true, enableLocalBusiness: false, enableOffers: false }, crawlerPolicy: { gptBot: "disallow", oaiSearchBot: "allow", chatGptUser: "allow" },
  leadFormTypes: ["general_contact", "download_request"], analyticsFeatures: ["ga4", "cloudflare", "ai_referral"], contentQualityPolicy: { minimumScore: 90, requireOwner: true, requireReviewDate: true, maxReviewAgeDays: 365 }
};

const responses = {
  "/api/site-setting": { data: { siteId: manifest.siteId, brandName: manifest.brand.brandName, legalName: manifest.brand.legalName } },
  "/api/pages": { data: pages }, "/api/landing-pages": { data: [] }, "/api/legal-pages": { data: [privacy] },
  "/api/articles": { data: [article] }, "/api/authors": { data: [author] }, "/api/case-studies": { data: [] },
  "/api/redirects": { data: [] }, "/api/navigations": { data: navigation }
};
const server = createServer((request, response) => {
  const pathname = new URL(request.url, "http://127.0.0.1").pathname;
  response.writeHead(200, { "content-type": "application/json" });
  response.end(JSON.stringify(responses[pathname] ?? { data: [] }));
});
await new Promise((resolvePromise) => server.listen(0, "127.0.0.1", resolvePromise));
const address = server.address();
if (!address || typeof address === "string") throw new Error("Mock CMS failed to start");
const tempDirectory = mkdtempSync(join(tmpdir(), "base-cms-production-"));
const manifestPath = join(tempDirectory, "site.config.json");
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

const exitCode = await new Promise((resolvePromise) => {
  const child = spawn(process.execPath, [astro, "build"], {
    cwd: appRoot,
    stdio: "inherit",
    shell: false,
    env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1", SITE_ID: manifest.siteId, SITE_CONFIG_PATH: manifestPath, PUBLIC_SITE_URL: "https://production.test", ENFORCE_PRODUCTION_GATES: "true", STRAPI_URL: `http://127.0.0.1:${address.port}`, STRAPI_READ_TOKEN: "integration-read-token", STRAPI_WRITE_TOKEN: "integration-write-token", PUBLIC_GA4_ID: "G-PRODUCTIONTEST", PUBLIC_TURNSTILE_SITE_KEY: "turnstile-site-key", TURNSTILE_SECRET_KEY: "turnstile-secret-key" }
  });
  child.on("exit", (code) => resolvePromise(code ?? 1));
});
server.close();
unlinkSync(manifestPath);
rmdirSync(tempDirectory);
if (exitCode !== 0) process.exit(exitCode);

function files(directory) { return readdirSync(directory).flatMap((name) => { const path = join(directory, name); return statSync(path).isDirectory() ? files(path) : [path]; }); }
const output = files(resolve(appRoot, "dist")).filter((path) => /\.(?:html|xml|txt)$/.test(path)).map((path) => readFileSync(path, "utf8")).join("\n");
if (!output.includes("https://production.test") || !output.includes("Production Test Brand")) throw new Error("Production build is missing its selected identity");
if (/Northstar Industrial|Clearpath Advisory|Aperture Systems|Notex|medicalReviewer|clinicName/i.test(output)) throw new Error("Production build leaked fixture or legacy content");
if (!output.includes("Jordan Editor") || !output.includes("#person")) throw new Error("Production author/profile graph is missing");
console.log("Strict production Content Layer build passed without fixture leakage.");
