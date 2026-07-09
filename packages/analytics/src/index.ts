export type AnalyticsEvent =
  | "page_view"
  | "cta_click"
  | "lead_form_view"
  | "lead_form_submit"
  | "phone_click"
  | "zalo_click"
  | "messenger_click"
  | "book_appointment_click";

export type AnalyticsSource = "ga4" | "posthog" | "search_console";

export function trackEvent(event: AnalyticsEvent, source: AnalyticsSource) {
  return { event, source };
}

