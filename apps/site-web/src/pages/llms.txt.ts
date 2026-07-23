import type { APIRoute } from "astro";
import { buildLlmsTxt } from "@base-cms/site-core";
import { previewNoindex, routeManifest, siteContext } from "../data/site.ts";

export const GET: APIRoute = () => new Response(buildLlmsTxt(siteContext, previewNoindex ? [] : routeManifest), { headers: { "content-type": "text/plain; charset=utf-8" } });
