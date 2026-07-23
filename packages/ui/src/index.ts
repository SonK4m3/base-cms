import type { SiteTheme } from "../../site-core/src/index.ts";
import type { ContentSection } from "../../content/src/index.ts";

export type SectionType = ContentSection["type"];

export const sectionVariants: Record<SectionType, readonly string[]> = {
  "hero": ["default", "split", "centered"],
  "answer-summary": ["plain", "highlighted"],
  "feature-grid": ["cards", "bordered", "icons"],
  "product-grid": ["cards", "compact"],
  "category-grid": ["cards", "links"],
  "specification-table": ["default", "grouped"],
  "comparison-table": ["default", "highlight-first"],
  "timeline": ["vertical", "horizontal"],
  "testimonial": ["quote", "card"],
  "faq": ["stack", "accordion"],
  "cta": ["panel", "full-width"],
  "contact-details": ["list", "cards"],
  "rich-text": ["prose", "two-column"],
  "media": ["full", "contained"],
  "download-list": ["list", "cards"]
};

export function themeToCssVariables(theme: SiteTheme): Record<string, string> {
  return {
    "--brand": theme.colors.brand,
    "--brand-contrast": theme.colors.brandContrast,
    "--accent": theme.colors.accent,
    "--surface": theme.colors.surface,
    "--text": theme.colors.text,
    "--muted": theme.colors.muted,
    "--container": theme.containerWidth,
    "--heading-font": theme.fonts.heading,
    "--body-font": theme.fonts.body
  };
}

export function validateSectionVariant(sectionType: SectionType, variant: string): boolean {
  return sectionVariants[sectionType].includes(variant);
}
