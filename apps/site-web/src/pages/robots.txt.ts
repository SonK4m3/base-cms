import type { APIRoute } from "astro";
import { buildRobotsTxt } from "@base-cms/site-core";
import { previewNoindex, siteContext } from "../data/site.ts";

export const GET: APIRoute = () => new Response(
  previewNoindex ? "User-agent: *\nDisallow: /\n" : buildRobotsTxt(siteContext),
  { headers: { "content-type": "text/plain; charset=utf-8" } }
);
