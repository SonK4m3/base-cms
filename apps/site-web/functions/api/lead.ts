import { validateLeadPayload, type LeadPayload } from "../../../../packages/forms/src/index.ts";

interface Env {
  SITE_ID: string;
  STRAPI_URL: string;
  STRAPI_WRITE_TOKEN: string;
  TURNSTILE_SECRET_KEY?: string;
  LEAD_EMAIL_WEBHOOK?: string;
}

async function verifyTurnstile(secret: string, token: string, remoteip?: string): Promise<boolean> {
  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);
  if (remoteip) body.set("remoteip", remoteip);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  if (!response.ok) return false;
  const result = await response.json() as { success?: boolean };
  return result.success === true;
}

async function postWithRetry(url: string, init: RequestInit): Promise<Response> {
  const first = await fetch(url, init);
  if (first.ok || first.status < 500) return first;
  return fetch(url, init);
}

export const onRequest = async ({ request, env }: { request: Request; env: Env }): Promise<Response> => {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: { allow: "POST" } });
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 32_000) return new Response("Payload too large", { status: 413 });
  let body: Partial<LeadPayload> & { companyWebsite?: string; turnstileToken?: string };
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }
  if (body.companyWebsite) return Response.json({ accepted: true });
  const errors = validateLeadPayload(body, env.SITE_ID);
  if (errors.length) return Response.json({ error: "Validation failed", details: errors }, { status: 422 });
  if (!env.STRAPI_URL || !env.STRAPI_WRITE_TOKEN) return Response.json({ error: "Lead destination is not configured" }, { status: 503 });
  if (env.TURNSTILE_SECRET_KEY) {
    const verified = Boolean(body.turnstileToken) && await verifyTurnstile(env.TURNSTILE_SECRET_KEY, body.turnstileToken!, request.headers.get("CF-Connecting-IP") || undefined);
    if (!verified) return Response.json({ error: "Bot verification failed" }, { status: 403 });
  }
  const lead = {
    siteId: body.siteId,
    formType: body.formType,
    locale: body.locale,
    fullName: body.fullName,
    email: body.email,
    phone: body.phone,
    message: body.message,
    contextId: body.contextId,
    landingPage: body.landingPage,
    referrer: body.referrer,
    utm: body.utm,
    aiReferralSource: body.aiReferralSource,
    consentTimestamp: body.consentTimestamp,
    privacyPolicyVersion: body.privacyPolicyVersion,
    idempotencyKey: body.idempotencyKey,
    receivedAt: new Date().toISOString()
  };
  const cmsResponse = await postWithRetry(`${env.STRAPI_URL.replace(/\/$/, "")}/api/lead-entries`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${env.STRAPI_WRITE_TOKEN}`, "idempotency-key": body.idempotencyKey! },
    body: JSON.stringify({ data: lead })
  });
  if (!cmsResponse.ok) return Response.json({ error: "Lead destination rejected the request" }, { status: 502 });
  if (env.LEAD_EMAIL_WEBHOOK) {
    await postWithRetry(env.LEAD_EMAIL_WEBHOOK, { method: "POST", headers: { "content-type": "application/json", "idempotency-key": body.idempotencyKey! }, body: JSON.stringify(lead) });
  }
  return Response.json({ accepted: true }, { status: 202 });
};
