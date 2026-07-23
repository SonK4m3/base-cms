import test from "node:test";
import assert from "node:assert/strict";
import { validateLeadPayload } from "../src/index.ts";

test("lead validation enforces site isolation and consent attribution", () => {
  const payload = { siteId: "site-a", formType: "general_contact", locale: "en", fullName: "A Buyer", email: "buyer@example.com", landingPage: "https://site-a.com/contact/", consentTimestamp: "2026-01-01T00:00:00Z", privacyPolicyVersion: "2026-01", idempotencyKey: "one" };
  assert.deepEqual(validateLeadPayload(payload, "site-a"), []);
  assert.ok(validateLeadPayload(payload, "site-b").includes("siteId does not match this deployment"));
  assert.ok(validateLeadPayload({ ...payload, email: undefined }, "site-a").includes("email or phone is required"));
});
