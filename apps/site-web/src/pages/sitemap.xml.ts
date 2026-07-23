import type { APIRoute } from "astro";
import { buildSitemapIndex, resolveIndexability } from "@base-cms/site-core";
import { manifest, previewNoindex, routeManifest, siteContext } from "../data/site.ts";

const groupFor = (route: (typeof routeManifest)[number]) => {
  let group: string;
  if (route.contentType === "product") group = "products";
  else if (["category", "brand", "platform"].includes(route.contentType)) group = "collections";
  else if (route.contentType === "article") group = "articles";
  else group = "pages";
  return manifest.supportedLocales.length > 1 ? `${route.locale}-${group}` : group;
};
const groups = [...new Set(routeManifest.filter((route) => resolveIndexability(route, manifest).indexable).map(groupFor))];

export const GET: APIRoute = () => new Response(buildSitemapIndex(siteContext.siteUrl, previewNoindex ? [] : groups.map((group) => `/sitemaps/${group}.xml`)), { headers: { "content-type": "application/xml; charset=utf-8" } });
