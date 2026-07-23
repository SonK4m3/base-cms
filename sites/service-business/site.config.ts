import type { SiteManifest } from "../../packages/site-core/src/index.ts";

const manifest: SiteManifest = {
  siteId: "service-business",
  preset: "service-business",
  fixture: true,
  brand: {
    brandName: "Clearpath Advisory",
    legalName: "Clearpath Advisory Group LLC",
    shortDescription: "Operations consulting for growing businesses that need measurable processes, clearer decisions, and accountable delivery.",
    logoUrl: "/brand/logo.svg",
    faviconUrl: "/favicon.svg",
    contactEmail: "hello@clearpath.example",
    contactPhone: "+1 555 010 2000",
    address: "240 Market Street, Austin, TX",
    socialProfiles: []
  },
  organization: { type: "Organization", businessAreas: ["Operations consulting", "Process improvement"] },
  defaultLocale: "en",
  supportedLocales: [{ code: "en", htmlLang: "en", ogLocale: "en_US", urlPrefix: "", label: "English" }],
  routeSegments: { service: "services", article: "insights", location: "locations" },
  enabledModules: ["corporate", "services", "content", "lead"],
  theme: {
    colors: { brand: "#4338ca", brandContrast: "#ffffff", accent: "#22c55e", surface: "#f8fafc", text: "#111827", muted: "#4b5563" },
    fonts: { heading: "Inter, system-ui, sans-serif", body: "Inter, system-ui, sans-serif" },
    radius: "large",
    containerWidth: "1120px",
    headerVariant: "simple",
    footerVariant: "columns",
    colorScheme: "light"
  },
  navigationPolicy: { maxDepth: 2, requireDescriptiveLabels: true },
  schemaPolicy: { enableFaq: true, enableLocalBusiness: false, enableOffers: false },
  crawlerPolicy: { gptBot: "disallow", oaiSearchBot: "allow", chatGptUser: "allow" },
  leadFormTypes: ["general_contact", "service_consultation", "download_request"],
  analyticsFeatures: ["ga4", "cloudflare", "ai_referral"],
  contentQualityPolicy: { minimumScore: 85, requireOwner: true, requireReviewDate: true, maxReviewAgeDays: 365 }
};

export default manifest;
