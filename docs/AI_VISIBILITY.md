# AI visibility measurement

Notex treats GEO/AEO as an outcome to measure, not a markup trick to promise.

## Crawlability

- `robots.txt` allows `OAI-SearchBot`, `Googlebot`, and `Bingbot`.
- `GPTBot` is blocked by default; change the policy deliberately if training use is desired.
- `/sitemap.xml` contains the canonical, indexable Notex routes.
- `/llms.txt` is generated from the same product navigation source, but is informational and not treated as a ranking requirement.
- `scripts/submit-indexnow.mjs` can notify Bing when a published URL changes.

## What to track

Use `classifyAiReferral()` from `@base-cms/analytics` to classify referrers such as ChatGPT, Perplexity, Bing, and other AI tools. Record:

- AI referral sessions and landing pages
- observed citations and source URLs
- prompt checks run, prompt text, date, and result
- whether the answer described Notex accurately
- which page was cited

Run a small recurring prompt set instead of generating hundreds of thin pages. Example prompts are documented in the product brief that motivated this implementation:

```txt
Best AI note taking tools for remote teams
AI meeting assistant without a meeting bot
Tools to summarize Vietnamese meetings
Best alternatives to Fireflies.ai
How to summarize local audio files with AI
AI note taking software for sales teams
```
