import type { SiteModuleId, SitePresetId } from "../../site-core/src/index.ts";

export interface PresetDefinition {
  id: SitePresetId;
  modules: SiteModuleId[];
  defaultTemplates: Record<string, string>;
}

export const presets: Record<SitePresetId, PresetDefinition> = {
  "corporate-catalog": { id: "corporate-catalog", modules: ["corporate", "catalog", "content", "lead"], defaultTemplates: { home: "catalog-home", product: "product-detail", category: "collection-hub" } },
  "service-business": { id: "service-business", modules: ["corporate", "services", "content", "lead"], defaultTemplates: { home: "service-home", service: "service-detail", location: "local-service" } },
  "multi-platform-enterprise": { id: "multi-platform-enterprise", modules: ["corporate", "catalog", "services", "platforms", "content", "lead"], defaultTemplates: { home: "enterprise-home", platform: "platform-hub", product: "product-detail" } },
  "local-business": { id: "local-business", modules: ["corporate", "services", "locations", "content", "lead"], defaultTemplates: { home: "local-home", location: "location-detail", service: "service-detail" } },
  "content-led-business": { id: "content-led-business", modules: ["corporate", "content", "lead"], defaultTemplates: { home: "content-home", article: "article-detail", author: "author-profile" } }
};

export function getPreset(id: SitePresetId): PresetDefinition {
  return presets[id];
}

export function validatePresetModules(id: SitePresetId, enabledModules: SiteModuleId[]): string[] {
  return presets[id].modules.filter((moduleId) => !enabledModules.includes(moduleId)).map((moduleId) => `Preset ${id} requires module ${moduleId}`);
}
