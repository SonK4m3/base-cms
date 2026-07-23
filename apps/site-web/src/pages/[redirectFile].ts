import type { APIRoute } from "astro";
import { redirects } from "../data/site.ts";

const indexNowKey = process.env.INDEXNOW_KEY;

export function getStaticPaths() {
  return [
    { params: { redirectFile: "_redirects" }, props: { kind: "redirects" } },
    ...(indexNowKey ? [{ params: { redirectFile: `${indexNowKey}.txt` }, props: { kind: "indexnow" } }] : [])
  ];
}

export const GET: APIRoute = ({ props }) => {
  if (props.kind === "indexnow") return new Response(`${indexNowKey}\n`, { headers: { "content-type": "text/plain; charset=utf-8" } });
  const body = redirects.filter((rule) => rule.enabled !== false).map((rule) => `${rule.fromPath} ${rule.toPath} ${rule.statusCode}`).join("\n");
  return new Response(body ? `${body}\n` : "# No CMS redirects configured\n", { headers: { "content-type": "text/plain; charset=utf-8" } });
};
