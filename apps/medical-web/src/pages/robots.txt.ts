import { createRobotsTxt } from "@base-cms/site-core";

const baseUrl = import.meta.env.SITE ?? process.env.PUBLIC_SITE_URL ?? "https://taitaoantam.vn";

export const GET = () =>
  new Response(`User-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: Googlebot\nAllow: /\n\nUser-agent: Bingbot\nAllow: /\n\nUser-agent: GPTBot\nDisallow: /\n\n${createRobotsTxt(baseUrl).split("\n").slice(0, 2).join("\n")}\n\nSitemap: ${new URL("/sitemap.xml", baseUrl).toString()}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
