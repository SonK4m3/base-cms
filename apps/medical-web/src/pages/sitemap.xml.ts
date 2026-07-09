import { articleCards, doctors } from "../data/site";
import { conditionPages, servicePages, specialtyPages } from "../data/seo";

const baseUrl = "https://taitaoantam.vn";

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
  ...articleCards.map((item) => `/blog/${item.slug}/`),
  ...doctors.map((item) => `/bac-si/${item.slug}/`),
  ...specialtyPages.map((item) => `/chuyen-khoa/${item.slug}/`),
  ...conditionPages.map((item) => `/benh-ly/${item.slug}/`),
  ...servicePages.map((item) => `/dich-vu/${item.slug}/`)
];

const routes = [...new Set([...staticRoutes, ...dynamicRoutes])];

export const GET = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route}</loc>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
