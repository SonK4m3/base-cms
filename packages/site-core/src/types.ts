export type SitePresetId =
  | "corporate-catalog"
  | "service-business"
  | "multi-platform-enterprise"
  | "local-business"
  | "content-led-business";

export type SiteModuleId =
  | "corporate"
  | "catalog"
  | "services"
  | "platforms"
  | "locations"
  | "content"
  | "lead";

export type RouteContentType =
  | "home"
  | "page"
  | "product"
  | "category"
  | "brand"
  | "platform"
  | "service"
  | "article"
  | "author"
  | "location"
  | "legal"
  | "search"
  | "thank-you"
  | "redirect"
  | "not-found";

export type PublicationState =
  | "draft"
  | "factual_review"
  | "seo_review"
  | "localization_review"
  | "approved"
  | "published"
  | "needs_update"
  | "archived";

export interface LocaleDefinition {
  code: string;
  htmlLang: string;
  ogLocale: string;
  urlPrefix: string;
  label: string;
}

export interface SiteIdentity {
  brandName: string;
  legalName: string;
  shortDescription: string;
  logoUrl: string;
  faviconUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialProfiles?: string[];
  businessIdentifiers?: Record<string, string>;
}

export interface SiteTheme {
  colors: {
    brand: string;
    brandContrast: string;
    accent: string;
    surface: string;
    text: string;
    muted: string;
  };
  fonts: { heading: string; body: string };
  radius: "none" | "small" | "medium" | "large";
  containerWidth: string;
  headerVariant: "simple" | "centered" | "enterprise";
  footerVariant: "simple" | "columns";
  colorScheme: "light" | "dark" | "system";
}

export interface SiteManifest {
  siteId: string;
  preset: SitePresetId;
  fixture?: boolean;
  brand: SiteIdentity;
  organization: {
    type: "Organization" | "Corporation" | "LocalBusiness";
    foundedDate?: string;
    businessAreas?: string[];
    certifications?: Array<{ name: string; sourceUrl: string }>;
  };
  defaultLocale: string;
  supportedLocales: LocaleDefinition[];
  routeSegments: Partial<Record<RouteContentType, string>>;
  enabledModules: SiteModuleId[];
  theme: SiteTheme;
  navigationPolicy: { maxDepth: number; requireDescriptiveLabels: boolean };
  schemaPolicy: { enableFaq: boolean; enableLocalBusiness: boolean; enableOffers: boolean };
  crawlerPolicy: {
    gptBot: "allow" | "disallow";
    oaiSearchBot: "allow" | "disallow";
    chatGptUser: "allow" | "disallow";
  };
  leadFormTypes: Array<"general_contact" | "product_inquiry" | "request_quote" | "service_consultation" | "download_request">;
  analyticsFeatures: Array<"ga4" | "cloudflare" | "ai_referral" | "indexnow">;
  contentQualityPolicy: {
    minimumScore: number;
    requireOwner: boolean;
    requireReviewDate: boolean;
    maxReviewAgeDays: number;
  };
}

export interface SiteContext {
  manifest: SiteManifest;
  siteUrl: string;
  host: string;
  organizationId: string;
  websiteId: string;
  defaultLocale: LocaleDefinition;
}

export interface RouteManifestEntry {
  id: string;
  path: string;
  locale: string;
  contentType: RouteContentType;
  title: string;
  description?: string;
  summary?: string;
  publicationState: PublicationState;
  publishedAt?: string;
  modifiedAt?: string;
  canonicalPath?: string;
  explicitNoindex?: boolean;
  redirectTo?: string;
  qualityPassed?: boolean;
  qualityScore?: number;
  fixture?: boolean;
  owner?: string;
  reviewedAt?: string;
  hasExpiredCriticalClaim?: boolean;
  parentId?: string;
  relatedEntryIds?: string[];
  alternateEntryIds?: string[];
}

export type IndexabilityReasonCode =
  | "indexable"
  | "explicit_noindex"
  | "non_publication_state"
  | "missing_publish_date"
  | "redirect_only"
  | "search_or_facet"
  | "quality_gate_failed"
  | "missing_owner"
  | "missing_review_date"
  | "stale_review_date"
  | "expired_critical_claim"
  | "fixture_content";

export interface IndexabilityDecision {
  indexable: boolean;
  reason: IndexabilityReasonCode;
  robots: "index,follow" | "noindex,follow" | "noindex,nofollow";
}

export interface SeoDocument {
  title: string;
  description: string;
  canonical: string;
  language: string;
  hreflang: Array<{ language: string; url: string }>;
  robots: string;
  openGraph: {
    type: "website" | "article" | "profile";
    title: string;
    description: string;
    url: string;
    image?: string;
    imageWidth?: number;
    imageHeight?: number;
    locale: string;
  };
  twitter: { card: "summary" | "summary_large_image"; title: string; description: string; image?: string };
  schemaType: string;
}

export interface ClaimEvidence {
  claim: string;
  claimType: "certification" | "performance" | "compatibility" | "customer" | "other";
  sourceUrl: string;
  owner: string;
  verifiedAt: string;
  expiresAt?: string;
  reviewer: string;
  consentReference?: string;
}

export interface ContentQualityResult {
  passed: boolean;
  score: number;
  errors: string[];
  warnings: string[];
}

export interface PageSeoInput {
  title: string;
  description: string;
  canonicalUrl: string;
  noindex?: boolean;
  ogType?: "website" | "article" | "profile";
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  locale?: string;
}

export interface SiteSettings {
  name: string;
  description?: string;
  url: string;
  locale?: string;
  logoUrl?: string;
  faviconUrl?: string;
  themeColor?: string;
  socialProfiles?: string[];
}

export interface SitemapEntry {
  url: string;
  lastmod?: string | Date;
  contentType?: RouteContentType;
  locale?: string;
  indexable?: boolean;
  redirect?: boolean;
  draft?: boolean;
  archived?: boolean;
  qualityPassed?: boolean;
  statusCode?: number;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface RedirectRule {
  fromPath: string;
  toPath: string;
  statusCode: 301 | 302;
  enabled?: boolean;
}
