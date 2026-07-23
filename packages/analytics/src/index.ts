export type AnalyticsEvent =
  | "page_view"
  | "cta_click"
  | "lead_form_view"
  | "lead_form_start"
  | "lead_form_submit"
  | "lead_form_success"
  | "product_view"
  | "service_view"
  | "download_click"
  | "phone_click"
  | "email_click"
  | "language_switch"
  | "ai_referral";

export type AiReferralSource = "chatgpt" | "perplexity" | "bing" | "google-ai" | "other-ai";

export type AiVisibilityEvent =
  | "ai_referral"
  | "ai_citation_observed"
  | "prompt_check_completed";

export type AnalyticsSource = "ga4" | "cloudflare" | "search_console" | "bing_webmaster";

export function trackEvent(event: AnalyticsEvent, source: AnalyticsSource) {
  return { event, source };
}

export function classifyAiReferral(referrer: string | null | undefined): AiReferralSource | null {
  if (!referrer) return null;
  const value = referrer.toLowerCase();
  if (value.includes("chatgpt.com") || value.includes("chat.openai.com")) return "chatgpt";
  if (value.includes("perplexity.ai")) return "perplexity";
  if (value.includes("bing.com")) return "bing";
  if (value.includes("google.com") && (value.includes("ai") || value.includes("search"))) return "google-ai";
  if (value.includes("claude.ai") || value.includes("gemini.google.com") || value.includes("you.com")) return "other-ai";
  return null;
}

export function createAiVisibilityEvent(
  event: AiVisibilityEvent,
  input: { prompt?: string; source?: AiReferralSource; url?: string; cited?: boolean }
) {
  return { event, ...input, recordedAt: new Date().toISOString() };
}
