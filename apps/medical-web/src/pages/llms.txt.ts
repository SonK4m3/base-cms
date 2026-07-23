import { createLlmsTxt } from "@base-cms/site-core";
import { clinicSite } from "../data/site";

const baseUrl = import.meta.env.SITE ?? process.env.PUBLIC_SITE_URL ?? "https://taitaoantam.vn";

export const GET = () =>
  new Response(
    createLlmsTxt(
      {
        name: clinicSite.name,
        description: "Phòng khám tư vấn chuyên sâu về y học tái tạo và tế bào gốc.",
        url: baseUrl,
        locale: "vi-VN"
      },
      [{ title: "Landing page Phòng khám Tái Tạo An Tâm", url: "/" }]
    ),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
