export type MedicalReviewStatus =
  | "draft"
  | "seo_review"
  | "medical_review"
  | "approved"
  | "published"
  | "needs_update"
  | "archived";

export type MedicalContentType =
  | "article"
  | "condition"
  | "treatment"
  | "service"
  | "doctor"
  | "specialty"
  | "clinic_location";

export type ContentReviewStatus =
  | "draft"
  | "seo_review"
  | "medical_review"
  | "approved"
  | "published"
  | "needs_update"
  | "archived";

export interface BaseMedicalContent {
  title: string;
  slug: string;
  summary?: string;
  seoTitle?: string;
  seoDescription?: string;
  noindex?: boolean;
}

export interface ArticleContent extends BaseMedicalContent {
  excerpt?: string;
  category?: string;
  tags?: string[];
  body?: string;
  author?: string;
  medicalReviewer?: string;
  references?: Array<{ label: string; url: string }>;
  faq?: Array<{ question: string; answer: string }>;
  status?: ContentReviewStatus;
  publishedAtCustom?: string;
  updatedAtCustom?: string;
  reviewedAt?: string;
  readingTime?: number;
  disclaimer?: string;
  canonicalUrl?: string;
  primaryTopic?: string;
  relatedConditions?: string[];
  relatedServices?: string[];
  relatedArticles?: string[];
  internalLinkSuggestions?: string[];
}

export interface DoctorContent extends BaseMedicalContent {
  specialty?: string;
  credentials?: string[];
  languages?: string[];
  bio?: string;
}

export interface ServiceContent extends BaseMedicalContent {
  details?: string;
  bookingCtas?: Array<{ label: string; href: string; variant?: "primary" | "secondary" | "ghost" }>;
}

export interface MedicalConditionContent extends BaseMedicalContent {
  content?: string;
  faq?: Array<{ question: string; answer: string }>;
  relatedServices?: string[];
  relatedArticles?: string[];
}

export interface SiteSettingContent {
  clinicName: string;
  tagline?: string;
  address?: string;
  hotline?: string;
  workingHours?: string;
  medicalDirector?: string;
  logoImage?: string;
  bookingUrl?: string;
  facebookUrl?: string;
  zaloUrl?: string;
  editorialPolicyUrl?: string;
  privacyPolicyUrl?: string;
  medicalReviewPolicyUrl?: string;
  seoDefaultTitle?: string;
  seoDefaultDescription?: string;
}

export interface SpecialtyContent extends BaseMedicalContent {
  content?: string;
}

export interface LegalPageContent extends BaseMedicalContent {
  body?: string;
  noindex?: boolean;
}

export interface LandingPageContent extends BaseMedicalContent {
  heroTitle?: string;
  heroDescription?: string;
  primaryCta?: { label: string; href: string; variant?: "primary" | "secondary" | "ghost" };
}

export const contentReviewStatuses: ContentReviewStatus[] = [
  "draft",
  "seo_review",
  "medical_review",
  "approved",
  "published",
  "needs_update",
  "archived"
];

export * from "./seed";
