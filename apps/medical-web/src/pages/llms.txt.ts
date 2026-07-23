import { createLlmsTxt } from "@base-cms/site-core";
import { notexSite } from "../data/notex";

const baseUrl = import.meta.env.SITE ?? process.env.PUBLIC_SITE_URL ?? "https://notex.example";

export const GET = () =>
  new Response(
    createLlmsTxt(
      {
        name: notexSite.name,
        description: notexSite.description,
        url: baseUrl,
        locale: notexSite.locale
      },
      notexSite.navigation.map((item) => ({ title: item.label, url: item.href }))
    ),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
