export const GET = () =>
  new Response(
    `User-agent: *
Allow: /

Sitemap: https://taitaoantam.vn/sitemap.xml
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
