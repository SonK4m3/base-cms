import test from "node:test";
import assert from "node:assert/strict";
import { classifyAiReferral, trackEvent } from "../src/index.ts";

test("classifies common AI referrals and shared events", () => {
  assert.equal(classifyAiReferral("https://chatgpt.com/c/123"), "chatgpt");
  assert.equal(classifyAiReferral("https://www.perplexity.ai/search/x"), "perplexity");
  assert.equal(classifyAiReferral("https://example.com"), null);
  assert.deepEqual(trackEvent("product_view", "ga4"), { event: "product_view", source: "ga4" });
});
