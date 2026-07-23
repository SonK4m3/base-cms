import type { APIRoute } from "astro";
import { createSitemapXml, resolveIndexability, sitemapEntriesFromRoutes } from "@base-cms/site-core";
import { manifest, previewNoindex, routeManifest, siteContext } from "../../data/site.ts";

const groupFor = (route: (typeof routeManifest)[number]) => {
  const base = route.contentType === "product" ? "products" : ["category", "brand", "platform"].includes(route.contentType) ? "collections" : route.contentType === "article" ? "articles" : "pages";
  return manifest.supportedLocales.length > 1 ? `${route.locale}-${base}` : base;
};
const groups = [...new Set(routeManifest.filter((route) => resolveIndexability(route, manifest).indexable).map(groupFor))];

export function getStaticPaths() {
  return groups.map((group) => ({ params: { group } }));
}

export const GET: APIRoute = ({ params }) => {
  const routes = routeManifest.filter((route) => groupFor(route) === params.group);
  return new Response(createSitemapXml(siteContext.siteUrl, previewNoindex ? [] : sitemapEntriesFromRoutes(siteContext, routes)), { headers: { "content-type": "application/xml; charset=utf-8" } });
};
