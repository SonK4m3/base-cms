# Notex product website

## Product definition

Notex is an AI note-taking platform that records or imports meetings and audio, creates transcripts, summarizes documents, and turns conversations into action items without requiring a meeting bot.

## Public information architecture

| Route | Purpose |
| --- | --- |
| `/` | Product definition, core value, proof, and primary CTA |
| `/features/` | Feature hub and feature detail pages |
| `/use-cases/` | Sales, remote teams, research, founders, and knowledge workers |
| `/compare/` | Meeting bot, Fireflies, Otter, and Notion AI comparisons |
| `/integrations/` | Google Meet, Zoom, Notion, Slack, and Linear |
| `/customers/` | Evidence-led customer story pages |
| `/pricing/` | Transparent plan and offer information |
| `/docs/` | Workflow explanation and FAQ |
| `/about/` | Product identity, point of view, and trust context |
| `/blog/` | Search-led guides and practical editorial content |

## Content contract

Every page should answer a specific user question with visible server-rendered content. Product claims should name the input, output, mechanism, audience, and relevant trade-off. Comparison pages should state criteria rather than making unsupported superiority claims. Customer stories should use real evidence before publishing.

## GEO/AEO contract

- Allow `OAI-SearchBot`, Googlebot, and Bingbot.
- Keep canonical, indexable URLs in the sitemap.
- Block `GPTBot` by default unless the product owner explicitly changes the policy.
- Use JSON-LD only for entities visible on the page.
- Keep source context, authorship, dates, and evidence close to claims.
- Track AI referrals and prompt coverage; do not treat `llms.txt` as a ranking guarantee.

## Preset boundary

Notex is the primary product preset. The previous medical routes remain as a legacy demo and should be removed or moved to a separate app when the product no longer needs them.
