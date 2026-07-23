import { doctors } from "../data/site";
import { conditionPages, servicePages, specialtyPages } from "../data/seo";
import { notexBlog, notexComparisons, notexCustomers, notexFeatures, notexIntegrations, notexUseCases } from "../data/notex";
import { createSitemapXml, type SitemapEntry } from "@base-cms/site-core";

const baseUrl = import.meta.env.SITE ?? process.env.PUBLIC_SITE_URL ?? "https://notex.example";

const staticRoutes = [
  "/",
  "/gioi-thieu/",
  "/lien-he/",
  "/faq/",
  "/blog/",
  "/bac-si/",
  "/chuyen-khoa/",
  "/benh-ly/",
  "/dich-vu/",
  "/phuong-phap-dieu-tri/",
  "/nghien-cuu-cong-bo/",
  "/quy-trinh/",
  "/chinh-sach-bien-tap/",
  "/chinh-sach-duyet-y-khoa/",
  "/chinh-sach-bao-mat/"
];

const dynamicRoutes = [
  ...notexBlog.map((item) => `/blog/${item.slug}/`),
  ...doctors.map((item) => `/bac-si/${item.slug}/`),
  ...specialtyPages.map((item) => `/chuyen-khoa/${item.slug}/`),
  ...conditionPages.map((item) => `/benh-ly/${item.slug}/`),
  ...servicePages.map((item) => `/dich-vu/${item.slug}/`),
  ...notexFeatures.map((item) => `/features/${item.slug}/`),
  ...notexUseCases.map((item) => `/use-cases/${item.slug}/`),
  ...notexComparisons.map((item) => `/compare/${item.slug}/`),
  ...notexIntegrations.map((item) => `/integrations/${item.slug}/`),
  ...notexCustomers.map((item) => `/customers/${item.slug}/`)
];

const routes: SitemapEntry[] = [...new Set([...staticRoutes, ...dynamicRoutes])].map((url) => ({
  url,
  indexable: !["/thank-you/", "/404/"].includes(url)
}));

export const GET = () => {
  const body = createSitemapXml(baseUrl, routes);

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
