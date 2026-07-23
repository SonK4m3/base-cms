import type { SiteManifest } from "../../packages/site-core/src/index.ts";

const manifest: SiteManifest = {
  siteId: "multi-platform-enterprise",
  preset: "multi-platform-enterprise",
  fixture: true,
  brand: {
    brandName: "Aperture Systems",
    legalName: "Aperture Systems Corporation",
    shortDescription: "Connected software platforms and implementation services for enterprise data, operations, and customer workflows.",
    logoUrl: "/brand/logo.svg",
    faviconUrl: "/favicon.svg",
    contactEmail: "enterprise@aperture.example",
    contactPhone: "+1 555 010 3000",
    address: "800 Technology Drive, Seattle, WA",
    socialProfiles: []
  },
  organization: { type: "Corporation", businessAreas: ["Enterprise software", "Implementation services"] },
  defaultLocale: "en",
  supportedLocales: [{ code: "en", htmlLang: "en", ogLocale: "en_US", urlPrefix: "", label: "English" }],
  routeSegments: { product: "products", category: "solutions", brand: "brands", platform: "platforms", service: "services", article: "resources" },
  enabledModules: ["corporate", "catalog", "services", "platforms", "content", "lead"],
  theme: {
    colors: { brand: "#0f172a", brandContrast: "#ffffff", accent: "#06b6d4", surface: "#f1f5f9", text: "#020617", muted: "#475569" },
    fonts: { heading: "Inter, system-ui, sans-serif", body: "Inter, system-ui, sans-serif" },
    radius: "small",
    containerWidth: "1240px",
    headerVariant: "enterprise",
    footerVariant: "columns",
    colorScheme: "light"
  },
  navigationPolicy: { maxDepth: 3, requireDescriptiveLabels: true },
  schemaPolicy: { enableFaq: true, enableLocalBusiness: false, enableOffers: false },
  crawlerPolicy: { gptBot: "disallow", oaiSearchBot: "allow", chatGptUser: "allow" },
  leadFormTypes: ["general_contact", "product_inquiry", "request_quote", "service_consultation", "download_request"],
  analyticsFeatures: ["ga4", "cloudflare", "ai_referral", "indexnow"],
  contentQualityPolicy: { minimumScore: 88, requireOwner: true, requireReviewDate: true, maxReviewAgeDays: 270 }
};

export default manifest;
