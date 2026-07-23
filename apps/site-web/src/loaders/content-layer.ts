import type { Loader } from "astro/loaders";

interface Options {
  baseUrl?: string;
  token?: string;
  contentTypes: string[];
  enabled: boolean;
}

export function strapiContentLoader(options: Options): Loader {
  return {
    name: "dedicated-strapi-content",
    async load({ store, logger, parseData, generateDigest }) {
      store.clear();
      if (!options.enabled) {
        logger.info("Production Strapi Content Layer is disabled for fixture/dev build");
        return;
      }
      if (!options.baseUrl || !options.token) throw new Error("STRAPI_URL and STRAPI_READ_TOKEN are required by the Content Layer loader");
      for (const contentType of options.contentTypes) {
        const response = await fetch(`${options.baseUrl.replace(/\/$/, "")}/api/${contentType}?status=published&locale=all&pagination[pageSize]=1000&populate=*`, {
          headers: { authorization: `Bearer ${options.token}`, accept: "application/json" }
        });
        if (!response.ok) throw new Error(`Content Layer failed to load ${contentType}: ${response.status}`);
        const payload = await response.json() as { data?: Array<Record<string, unknown>> };
        for (const entry of payload.data ?? []) {
          const attributes = (entry.attributes as Record<string, unknown> | undefined) ?? entry;
          const documentId = String(entry.documentId ?? entry.id ?? attributes.slug ?? attributes.name ?? attributes.title);
          const locale = String(attributes.locale ?? "default");
          const id = `${contentType}:${documentId}:${locale}`;
          const data = await parseData({ id, data: { sourceType: contentType, entry } });
          store.set({ id, data, digest: generateDigest(data) });
        }
      }
    }
  };
}
