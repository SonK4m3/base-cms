import type { ClaimEvidence, ContentQualityResult, PublicationState } from "../../site-core/src/index.ts";

export type ContentSection =
  | { type: "hero"; heading: string; summary: string; mediaUrl?: string; mediaAlt?: string }
  | { type: "answer-summary"; heading?: string; text: string }
  | { type: "feature-grid"; heading: string; items: Array<{ title: string; description: string }> }
  | { type: "product-grid"; heading: string; itemIds: string[] }
  | { type: "category-grid"; heading: string; categoryIds: string[] }
  | { type: "specification-table"; heading: string; rows: Array<{ label: string; value: string }> }
  | { type: "comparison-table"; heading: string; columns: string[]; rows: string[][] }
  | { type: "timeline"; heading: string; steps: Array<{ title: string; description: string }> }
  | { type: "testimonial"; quote: string; person: string; organization?: string; evidenceId: string }
  | { type: "faq"; heading: string; items: Array<{ question: string; answer: string }> }
  | { type: "cta"; heading: string; text: string; label: string; href: string }
  | { type: "contact-details"; heading: string; email?: string; phone?: string; address?: string }
  | { type: "rich-text"; heading?: string; html: string }
  | { type: "media"; url: string; alt: string; caption?: string }
  | { type: "download-list"; heading: string; items: Array<{ title: string; url: string }> };

export interface EditorialDocument {
  id: string;
  locale: string;
  title: string;
  slug: string;
  summary: string;
  sections: ContentSection[];
  primaryAudience: string;
  primarySearchIntent: string;
  authorId?: string;
  reviewerId?: string;
  owner?: string;
  references?: Array<{ title: string; url: string }>;
  evidence?: ClaimEvidence[];
  publicationState: PublicationState;
  publishedAt?: string;
  reviewedAt?: string;
  fixture?: boolean;
}

export function validateContentQuality(document: EditorialDocument, now = new Date()): ContentQualityResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!document.title.trim()) errors.push("title is required");
  if (!document.summary.trim()) errors.push("answer-first summary is required");
  else if (document.summary.trim().split(/\s+/).length < 20) warnings.push("summary should be concise but substantial");
  if (!document.primaryAudience.trim()) errors.push("primary audience is required");
  if (!document.primarySearchIntent.trim()) errors.push("primary search intent is required");
  if (!document.sections.length) errors.push("at least one visible content section is required");
  if (!document.owner) errors.push("content owner is required");
  if (!document.reviewedAt) errors.push("review date is required");
  for (const section of document.sections) {
    if (section.type === "rich-text" && /<script\b|on\w+\s*=/i.test(section.html)) errors.push("raw JavaScript and inline event handlers are forbidden");
    if (section.type === "testimonial" && !section.evidenceId) errors.push("testimonial requires signed evidence");
    if (section.type === "media" && !section.alt.trim()) errors.push("media alt text is required");
  }
  for (const evidence of document.evidence ?? []) {
    if (evidence.expiresAt && new Date(evidence.expiresAt) < now) errors.push(`expired evidence: ${evidence.claim}`);
  }
  return { passed: errors.length === 0, score: Math.max(0, 100 - errors.length * 14 - warnings.length * 2), errors, warnings };
}

export function canPublish(document: EditorialDocument): boolean {
  return document.publicationState === "published" && Boolean(document.publishedAt) && !document.fixture && validateContentQuality(document).passed;
}
