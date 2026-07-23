import type { IndexabilityDecision, RouteManifestEntry, SiteManifest } from "./types.ts";

export function resolveIndexability(
  entry: RouteManifestEntry,
  manifest?: SiteManifest,
  now = new Date()
): IndexabilityDecision {
  const noindex = (reason: IndexabilityDecision["reason"], nofollow = false): IndexabilityDecision => ({
    indexable: false,
    reason,
    robots: nofollow ? "noindex,nofollow" : "noindex,follow"
  });
  if (entry.explicitNoindex) return noindex("explicit_noindex");
  if (entry.contentType === "search" || /[?&](q|sort|filter|facet)=/i.test(entry.path)) return noindex("search_or_facet");
  if (entry.redirectTo || entry.contentType === "redirect") return noindex("redirect_only", true);
  if (entry.publicationState !== "published") return noindex("non_publication_state");
  if (!entry.publishedAt) return noindex("missing_publish_date");
  if (entry.qualityPassed !== true) return noindex("quality_gate_failed");
  if (manifest && (entry.qualityScore ?? 0) < manifest.contentQualityPolicy.minimumScore) return noindex("quality_gate_failed");
  if (entry.fixture) return noindex("fixture_content");
  if (manifest?.contentQualityPolicy.requireOwner && !entry.owner) return noindex("missing_owner");
  if (manifest?.contentQualityPolicy.requireReviewDate && !entry.reviewedAt) return noindex("missing_review_date");
  if (manifest && entry.reviewedAt) {
    const reviewedAt = new Date(entry.reviewedAt);
    const ageDays = (now.getTime() - reviewedAt.getTime()) / 86_400_000;
    if (Number.isNaN(reviewedAt.getTime()) || ageDays > manifest.contentQualityPolicy.maxReviewAgeDays) return noindex("stale_review_date");
  }
  if (entry.hasExpiredCriticalClaim) return noindex("expired_critical_claim");
  return { indexable: true, reason: "indexable", robots: "index,follow" };
}

export function validateRedirects(rules: Array<{ fromPath: string; toPath: string; enabled?: boolean }>): string[] {
  const errors: string[] = [];
  const active = rules.filter((rule) => rule.enabled !== false);
  const destinations = new Map(active.map((rule) => [rule.fromPath, rule.toPath]));
  for (const rule of active) {
    if (!rule.fromPath.startsWith("/") || !rule.toPath.startsWith("/")) errors.push(`Redirect paths must be site-relative: ${rule.fromPath} -> ${rule.toPath}`);
    if (rule.fromPath === rule.toPath) errors.push(`Redirect loop: ${rule.fromPath}`);
    if (destinations.has(rule.toPath)) errors.push(`Redirect chain: ${rule.fromPath} -> ${rule.toPath}`);
    const seen = new Set([rule.fromPath]);
    let cursor: string | undefined = rule.toPath;
    while (cursor && destinations.has(cursor)) {
      if (seen.has(cursor)) { errors.push(`Redirect loop includes ${cursor}`); break; }
      seen.add(cursor);
      cursor = destinations.get(cursor);
    }
  }
  return [...new Set(errors)];
}

export function createRouteManifest(entries: RouteManifestEntry[], manifest?: SiteManifest): RouteManifestEntry[] {
  const ids = new Set<string>();
  const paths = new Set<string>();
  for (const entry of entries) {
    if (ids.has(entry.id)) throw new Error(`Duplicate route id: ${entry.id}`);
    const key = `${entry.locale}:${entry.path}`;
    if (paths.has(key)) throw new Error(`Duplicate localized route: ${key}`);
    ids.add(entry.id);
    paths.add(key);
    resolveIndexability(entry, manifest);
  }
  return [...entries].sort((a, b) => a.path.localeCompare(b.path));
}

export function findOrphanRoutes(entries: RouteManifestEntry[]): RouteManifestEntry[] {
  const knownIds = new Set(entries.map((entry) => entry.id));
  const linkedIds = new Set<string>();
  for (const entry of entries) {
    for (const relatedId of entry.relatedEntryIds ?? []) if (knownIds.has(relatedId)) linkedIds.add(relatedId);
  }
  return entries.filter((entry) => entry.contentType !== "home" && resolveIndexability(entry).indexable && !linkedIds.has(entry.id));
}

export function buildBreadcrumbs(
  entry: RouteManifestEntry,
  entries: RouteManifestEntry[],
  siteUrl: string,
  canonicalize: (siteUrl: string, path: string) => string
): Array<{ name: string; url: string }> {
  const byId = new Map(entries.map((item) => [item.id, item]));
  const chain: RouteManifestEntry[] = [entry];
  const seen = new Set([entry.id]);
  let cursor = entry;
  while (cursor.parentId) {
    const parent = byId.get(cursor.parentId);
    if (!parent || seen.has(parent.id)) break;
    chain.unshift(parent);
    seen.add(parent.id);
    cursor = parent;
  }
  return chain.map((item) => ({ name: item.title, url: canonicalize(siteUrl, item.canonicalPath ?? item.path) }));
}
