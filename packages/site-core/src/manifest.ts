import type { SiteContext, SiteManifest } from "./types.ts";
import { isProductionDomain, normalizeCanonicalUrl } from "./url.ts";

const SITE_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateSiteManifest(manifest: SiteManifest): string[] {
  const errors: string[] = [];
  if (!SITE_ID_PATTERN.test(manifest.siteId)) errors.push("siteId must be lowercase kebab-case");
  if (!manifest.brand.brandName.trim()) errors.push("brand.brandName is required");
  if (!manifest.brand.legalName.trim()) errors.push("brand.legalName is required");
  if (!manifest.brand.shortDescription.trim()) errors.push("brand.shortDescription is required");
  if (!manifest.supportedLocales.length) errors.push("supportedLocales must contain at least one locale");
  if (!manifest.supportedLocales.some((locale) => locale.code === manifest.defaultLocale)) {
    errors.push("defaultLocale must exist in supportedLocales");
  }
  const defaultLocale = manifest.supportedLocales.find((locale) => locale.code === manifest.defaultLocale);
  if (defaultLocale?.urlPrefix) errors.push("defaultLocale must use an empty URL prefix so the primary homepage remains at /");
  const localeCodes = manifest.supportedLocales.map((locale) => locale.code);
  if (new Set(localeCodes).size !== localeCodes.length) errors.push("supportedLocales contains duplicate locale codes");
  const localePrefixes = manifest.supportedLocales.map((locale) => locale.urlPrefix.replace(/^\/+|\/+$/g, ""));
  if (new Set(localePrefixes).size !== localePrefixes.length) errors.push("supportedLocales contains duplicate URL prefixes");
  if (manifest.supportedLocales.some((locale) => !locale.code.trim() || !locale.htmlLang.trim() || !locale.ogLocale.trim())) errors.push("every locale requires code, htmlLang, and ogLocale");
  if (!manifest.enabledModules.length) errors.push("enabledModules must contain at least one module");
  if (new Set(manifest.enabledModules).size !== manifest.enabledModules.length) errors.push("enabledModules contains duplicates");
  for (const [type, segment] of Object.entries(manifest.routeSegments)) {
    if (segment && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(segment)) errors.push(`routeSegments.${type} must be lowercase kebab-case without slashes`);
  }
  for (const profile of manifest.brand.socialProfiles ?? []) {
    try { if (new URL(profile).protocol !== "https:") errors.push(`social profile must use HTTPS: ${profile}`); }
    catch { errors.push(`social profile URL is invalid: ${profile}`); }
  }
  if (manifest.organization.type === "LocalBusiness" && !manifest.schemaPolicy.enableLocalBusiness) errors.push("LocalBusiness identity requires schemaPolicy.enableLocalBusiness");
  if (manifest.contentQualityPolicy.minimumScore < 0 || manifest.contentQualityPolicy.minimumScore > 100) {
    errors.push("contentQualityPolicy.minimumScore must be between 0 and 100");
  }
  return errors;
}

export function validateBuildEnvironment(input: {
  manifest: SiteManifest;
  siteId: string | undefined;
  siteUrl: string | undefined;
  strictProduction: boolean;
}): string[] {
  const errors = validateSiteManifest(input.manifest);
  if (!input.siteId) errors.push("SITE_ID is required");
  else if (input.siteId !== input.manifest.siteId) errors.push("SITE_ID does not match the selected manifest");
  if (!input.siteUrl) errors.push("PUBLIC_SITE_URL is required");
  else if (input.strictProduction && !isProductionDomain(input.siteUrl)) {
    errors.push("Production PUBLIC_SITE_URL must be HTTPS and cannot use localhost, .example, or .pages.dev");
  }
  if (input.strictProduction && input.manifest.fixture) errors.push("Fixture manifests cannot be deployed to production");
  return errors;
}

export function createSiteContext(manifest: SiteManifest, siteUrl: string): SiteContext {
  const errors = validateSiteManifest(manifest);
  if (errors.length) throw new Error(`Invalid site manifest:\n- ${errors.join("\n- ")}`);
  const normalizedSiteUrl = normalizeCanonicalUrl(siteUrl, "/");
  const defaultLocale = manifest.supportedLocales.find((locale) => locale.code === manifest.defaultLocale);
  if (!defaultLocale) throw new Error("Default locale is not configured");
  return {
    manifest,
    siteUrl: normalizedSiteUrl,
    host: new URL(normalizedSiteUrl).host,
    organizationId: `${normalizedSiteUrl}#organization`,
    websiteId: `${normalizedSiteUrl}#website`,
    defaultLocale
  };
}

export function loadSiteManifest<T extends SiteManifest>(manifest: T): T {
  const errors = validateSiteManifest(manifest);
  if (errors.length) throw new Error(`Invalid site manifest:\n- ${errors.join("\n- ")}`);
  return manifest;
}

export function validateCrossSiteIsolation(
  context: SiteContext,
  values: string[],
  allowedExternalHosts: string[] = []
): string[] {
  const allowed = new Set([context.host, "schema.org", "www.schema.org", ...allowedExternalHosts]);
  const errors: string[] = [];
  for (const value of values) {
    const matches = value.matchAll(/https?:\/\/[^\s"'<>]+/g);
    for (const match of matches) {
      try {
        const host = new URL(match[0].replace(/[),.;]+$/, "")).host;
        if (!allowed.has(host)) errors.push(`Foreign host detected: ${host}`);
      } catch {
        errors.push(`Invalid absolute URL detected: ${match[0]}`);
      }
    }
  }
  return [...new Set(errors)];
}
