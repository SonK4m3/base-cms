import type { SiteManifest } from "../../packages/site-core/src/index.ts";

const manifest: SiteManifest = {
  siteId: "catalog-manufacturer",
  preset: "corporate-catalog",
  fixture: true,
  brand: {
    brandName: "Northstar Industrial",
    legalName: "Northstar Industrial Systems Ltd.",
    shortDescription: "Industrial control components and engineering support for manufacturers building reliable production systems.",
    logoUrl: "/brand/logo.svg",
    faviconUrl: "/favicon.svg",
    contactEmail: "sales@northstar.example",
    contactPhone: "+1 555 010 1000",
    address: "100 Industry Way, Cleveland, OH",
    socialProfiles: []
  },
  organization: { type: "Corporation", businessAreas: ["Industrial automation", "Control systems"] },
  defaultLocale: "en",
  supportedLocales: [{ code: "en", htmlLang: "en", ogLocale: "en_US", urlPrefix: "", label: "English" }],
  routeSegments: { product: "products", category: "categories", brand: "brands", platform: "platforms", article: "resources" },
  enabledModules: ["corporate", "catalog", "platforms", "content", "lead"],
  theme: {
    colors: { brand: "#164e63", brandContrast: "#ffffff", accent: "#f59e0b", surface: "#f8fafc", text: "#0f172a", muted: "#475569" },
    fonts: { heading: "Inter, system-ui, sans-serif", body: "Inter, system-ui, sans-serif" },
    radius: "medium",
    containerWidth: "1180px",
    headerVariant: "enterprise",
    footerVariant: "columns",
    colorScheme: "light"
  },
  navigationPolicy: { maxDepth: 2, requireDescriptiveLabels: true },
  schemaPolicy: { enableFaq: true, enableLocalBusiness: false, enableOffers: false },
  crawlerPolicy: { gptBot: "disallow", oaiSearchBot: "allow", chatGptUser: "allow" },
  leadFormTypes: ["general_contact", "product_inquiry", "request_quote", "download_request"],
  analyticsFeatures: ["ga4", "cloudflare", "ai_referral", "indexnow"],
  contentQualityPolicy: { minimumScore: 85, requireOwner: true, requireReviewDate: true, maxReviewAgeDays: 365 }
};

export default manifest;
