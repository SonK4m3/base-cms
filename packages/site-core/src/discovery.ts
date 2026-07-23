import type { RouteManifestEntry, SiteContext, SiteSettings, SitemapEntry } from "./types.ts";
import { normalizeCanonicalUrl, resolveAbsoluteUrl } from "./url.ts";
import { resolveIndexability } from "./routes.ts";

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export function filterIndexableSitemapEntries(entries: SitemapEntry[]): SitemapEntry[] {
  return entries.filter((entry) =>
    entry.indexable !== false && !entry.redirect && !entry.draft && !entry.archived && entry.qualityPassed !== false && (entry.statusCode ?? 200) === 200
  );
}

export function createSitemapXml(siteUrl: string, entries: SitemapEntry[]): string {
  const urls = filterIndexableSitemapEntries(entries);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((entry) => {
      const loc = escapeXml(normalizeCanonicalUrl(siteUrl, entry.url));
      const lastmod = entry.lastmod ? `\n    <lastmod>${new Date(entry.lastmod).toISOString()}</lastmod>` : "";
      return `  <url>\n    <loc>${loc}</loc>${lastmod}\n  </url>`;
    })
    .join("\n")}\n</urlset>`;
}

export function buildSitemapIndex(siteUrl: string, sitemapPaths: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPaths
    .map((path) => `  <sitemap>\n    <loc>${escapeXml(resolveAbsoluteUrl(siteUrl, path))}</loc>\n  </sitemap>`)
    .join("\n")}\n</sitemapindex>`;
}

export function sitemapEntriesFromRoutes(context: SiteContext, entries: RouteManifestEntry[]): SitemapEntry[] {
  return entries.map((entry) => ({
    url: entry.canonicalPath ?? entry.path,
    lastmod: entry.modifiedAt ?? entry.publishedAt,
    contentType: entry.contentType,
    locale: entry.locale,
    indexable: resolveIndexability(entry, context.manifest).indexable,
    redirect: Boolean(entry.redirectTo),
    draft: entry.publicationState !== "published",
    archived: entry.publicationState === "archived",
    qualityPassed: entry.qualityPassed,
    statusCode: entry.redirectTo ? 301 : 200
  }));
}

export function createRobotsTxt(siteUrl: string, sitemapPath = "/sitemap.xml"): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${resolveAbsoluteUrl(siteUrl, sitemapPath)}\n`;
}

export function buildRobotsTxt(context: SiteContext, sitemapPath = "/sitemap.xml"): string {
  const policy = context.manifest.crawlerPolicy;
  const groups = [
    "User-agent: *\nAllow: /",
    "User-agent: Googlebot\nAllow: /",
    "User-agent: Bingbot\nAllow: /",
    `User-agent: OAI-SearchBot\n${policy.oaiSearchBot === "allow" ? "Allow: /" : "Disallow: /"}`,
    `User-agent: ChatGPT-User\n${policy.chatGptUser === "allow" ? "Allow: /" : "Disallow: /"}`,
    `User-agent: GPTBot\n${policy.gptBot === "allow" ? "Allow: /" : "Disallow: /"}`
  ];
  return `${groups.join("\n\n")}\n\nSitemap: ${resolveAbsoluteUrl(context.siteUrl, sitemapPath)}\n`;
}

export function createLlmsTxt(settings: SiteSettings, links: Array<{ title: string; url: string; description?: string }>): string {
  const lines = [`# ${settings.name}`, "", settings.description ?? "", "", "## Key pages", ""];
  for (const link of links) {
    lines.push(`- [${link.title}](${normalizeCanonicalUrl(settings.url, link.url)})${link.description ? `: ${link.description}` : ""}`);
  }
  return `${lines.join("\n").trim()}\n`;
}

export function buildLlmsTxt(context: SiteContext, entries: RouteManifestEntry[]): string {
  const links = entries
    .filter((entry) => resolveIndexability(entry, context.manifest).indexable)
    .map((entry) => ({ title: entry.title, url: entry.canonicalPath ?? entry.path, description: entry.description ?? entry.summary }));
  return createLlmsTxt({
    name: context.manifest.brand.brandName,
    description: context.manifest.brand.shortDescription,
    url: context.siteUrl
  }, links);
}
