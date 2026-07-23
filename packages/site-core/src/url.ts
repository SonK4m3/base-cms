import type { LocaleDefinition } from "./types.ts";

export function normalizeCanonicalUrl(siteUrl: string, pathOrUrl: string): string {
  const base = new URL(siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`);
  const resolved = new URL(pathOrUrl, base);
  resolved.hash = "";
  resolved.search = "";
  resolved.hostname = resolved.hostname.toLowerCase();
  resolved.pathname = resolved.pathname.replace(/\/{2,}/g, "/");
  if (resolved.pathname !== "/" && !resolved.pathname.endsWith("/")) resolved.pathname += "/";
  return resolved.toString();
}

export const buildCanonicalUrl = normalizeCanonicalUrl;

export function resolveAbsoluteUrl(siteUrl: string, pathOrUrl: string): string {
  const base = new URL(siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`);
  return new URL(pathOrUrl, base).toString();
}

export function getLocalePath(locale: LocaleDefinition, path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const prefix = locale.urlPrefix.replace(/^\/+|\/+$/g, "");
  return prefix ? `/${prefix}${normalizedPath === "/" ? "/" : normalizedPath}` : normalizedPath;
}

export function buildLocaleAlternates(
  siteUrl: string,
  entries: Array<{ locale: LocaleDefinition; path: string }>,
  defaultLocaleCode?: string
): Array<{ language: string; url: string }> {
  const alternates = entries.map(({ locale, path }) => ({
    language: locale.htmlLang,
    url: normalizeCanonicalUrl(siteUrl, getLocalePath(locale, path))
  }));
  const fallback = alternates.find((entry) => entry.language === defaultLocaleCode) ?? alternates[0];
  return fallback ? [...alternates, { language: "x-default", url: fallback.url }] : alternates;
}

export function isProductionDomain(siteUrl: string): boolean {
  try {
    const url = new URL(siteUrl);
    const host = url.hostname.toLowerCase();
    return url.protocol === "https:" &&
      host !== "localhost" &&
      host !== "127.0.0.1" &&
      !host.endsWith(".example") &&
      !host.endsWith(".pages.dev");
  } catch {
    return false;
  }
}
