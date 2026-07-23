export * from "../../site-core/src/index";

export type SeoEntity = "article" | "service" | "profile" | "organization" | "faq" | "breadcrumb";
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
    "@type": "MedicalClinic",
    ...input
  };
}
