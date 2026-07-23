export type LeadFormPurpose =
  | "general_contact"
  | "product_inquiry"
  | "request_quote"
  | "service_consultation"
  | "download_request";

export interface LeadFormField {
  name: string;
  label: string;
  required?: boolean;
}

export const defaultLeadFormFields: LeadFormField[] = [
  { name: "fullName", label: "Full name", required: true },
  { name: "phone", label: "Phone", required: true },
  { name: "email", label: "Email" },
  { name: "message", label: "How can we help?", required: true }
];

export interface LeadPayload {
  siteId: string;
  formType: LeadFormPurpose;
  locale: string;
  fullName: string;
  email?: string;
  phone?: string;
  message?: string;
  contextId?: string;
  productId?: string;
  serviceId?: string;
  landingPage: string;
  referrer?: string;
  utm?: Record<string, string>;
  aiReferralSource?: string;
  consentTimestamp: string;
  privacyPolicyVersion: string;
  idempotencyKey: string;
}

export function validateLeadPayload(payload: Partial<LeadPayload>, expectedSiteId?: string): string[] {
  const errors: string[] = [];
  const formTypes: LeadFormPurpose[] = ["general_contact", "product_inquiry", "request_quote", "service_consultation", "download_request"];
  if (!payload.siteId) errors.push("siteId is required");
  if (expectedSiteId && payload.siteId !== expectedSiteId) errors.push("siteId does not match this deployment");
  if (!payload.formType || !formTypes.includes(payload.formType)) errors.push("valid formType is required");
  if (!payload.locale?.trim()) errors.push("locale is required");
  if (!payload.fullName?.trim()) errors.push("fullName is required");
  if (!payload.email?.trim() && !payload.phone?.trim()) errors.push("email or phone is required");
  if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) errors.push("email is invalid");
  if (!payload.landingPage || !/^https?:\/\//.test(payload.landingPage)) errors.push("absolute landingPage is required");
  if ((payload.message?.length ?? 0) > 10_000) errors.push("message is too long");
  if (!payload.consentTimestamp || Number.isNaN(Date.parse(payload.consentTimestamp))) errors.push("valid consentTimestamp is required");
  if (!payload.privacyPolicyVersion) errors.push("privacyPolicyVersion is required");
  if (!payload.idempotencyKey) errors.push("idempotencyKey is required");
  return errors;
}
