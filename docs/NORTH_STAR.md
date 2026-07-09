# North Star

## Goal

Build a trusted medical marketing website that turns search intent into qualified clinic leads.

## What the site must do

- Help users find clear medical information
- Explain what the clinic does and who it helps
- Show trust signals fast
- Make it easy to leave contact details or book a consultation

## Strategic priorities

### Trust

- Doctors and specialists are visible
- Content has review gates
- Dates, references, and disclaimers are visible
- Clinic identity and contact information are clear

### SEO and GEO

- Rank by service, condition, symptom, and local intent
- Use structured content and schema
- Make the content understandable for AI search and Google AI features
- Keep internal linking between services, conditions, doctors, and FAQs

### Conversion

- Use soft, helpful CTAs
- Offer clear paths to hotline, form, chat, or booking
- Keep mobile CTA friction low
- Capture qualified leads rather than raw traffic

### CMS operations

- Let the clinic update services, doctors, articles, offers, and contact info without developer help
- Keep reviewable, structured content
- Make publishing safe and repeatable
- Use Strapi admin first; do not introduce a separate custom admin app until operations needs justify it

## Decision filter

If a UI, content, or tracking decision does not help the site become:

```txt
findable
trustworthy
and contactable
```

then it is probably not the right default.
