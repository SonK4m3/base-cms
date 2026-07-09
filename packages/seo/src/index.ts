export type SeoEntity =
  | "article"
  | "medical-condition"
  | "service"
  | "doctor"
  | "clinic"
  | "faq"
  | "breadcrumb";

export interface SeoMetadataInput {
  title: string;
  description: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

export function createSeoEntity(entity: SeoEntity) {
  return entity;
}

export function createMedicalClinicSchema(input: {
  name: string;
  description: string;
  url: string;
  telephone?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    ...input
  };
}

export function createWebsiteSchema(input: { name: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    ...input
  };
}

export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
