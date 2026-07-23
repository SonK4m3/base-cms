import { createSitemapXml, type SitemapEntry } from "@base-cms/site-core";

const baseUrl = import.meta.env.SITE ?? process.env.PUBLIC_SITE_URL ?? "https://taitaoantam.vn";
const routes: SitemapEntry[] = [{ url: "/", indexable: true }];

export const GET = () =>
  new Response(createSitemapXml(baseUrl, routes), {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
