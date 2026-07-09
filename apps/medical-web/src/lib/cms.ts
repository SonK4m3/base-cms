import type {
  ArticleContent,
  DoctorContent,
  MedicalConditionContent,
  ServiceContent,
  SiteSettingContent
} from "@base-cms/medical-schema";

const cmsBaseUrl =
  process.env.STRAPI_URL ??
  import.meta.env.PUBLIC_CMS_URL ??
  import.meta.env.PUBLIC_STRAPI_URL ??
  "http://strapi:1337";

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${cmsBaseUrl}${path}`);
  if (!response.ok) {
    throw new Error(`CMS request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export function createCmsPaths() {
  return {
    article: (slug: string) => `/api/articles?filters[slug][$eq]=${slug}`,
    condition: (slug: string) => `/api/medical-conditions?filters[slug][$eq]=${slug}`,
    service: (slug: string) => `/api/services?filters[slug][$eq]=${slug}`,
    doctor: (slug: string) => `/api/doctors?filters[slug][$eq]=${slug}`,
    siteSetting: () => "/api/site-setting"
  };
}

export async function getArticleBySlug(slug: string) {
  return fetchJson<{ data: Array<{ attributes: ArticleContent }> }>(createCmsPaths().article(slug));
}

export async function getConditionBySlug(slug: string) {
  return fetchJson<{ data: Array<{ attributes: MedicalConditionContent }> }>(
    createCmsPaths().condition(slug)
  );
}

export async function getServiceBySlug(slug: string) {
  return fetchJson<{ data: Array<{ attributes: ServiceContent }> }>(createCmsPaths().service(slug));
}

export async function getDoctorBySlug(slug: string) {
  return fetchJson<{ data: Array<{ attributes: DoctorContent }> }>(createCmsPaths().doctor(slug));
}

export async function getSiteSettings() {
  return fetchJson<{ data: SiteSettingContent }>(createCmsPaths().siteSetting());
}
