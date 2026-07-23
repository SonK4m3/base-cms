/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly SITE_ID?: string;
  readonly SITE_CONFIG_PATH?: string;
  readonly ENFORCE_PRODUCTION_GATES?: string;
  readonly PREVIEW_NOINDEX?: string;
  readonly PUBLIC_GA4_ID?: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
}

interface ImportMeta { readonly env: ImportMetaEnv }

interface Window {
  dataLayer: Array<Record<string, unknown> | IArguments>;
  gtag: (...args: unknown[]) => void;
  trackSiteEvent?: (event: string | null, properties?: Record<string, unknown>) => void;
}
