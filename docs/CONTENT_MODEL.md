# Content Model

## Goals

- Model medical content by intent, not by generic post type
- Keep review metadata visible
- Support SEO, GEO, and conversion flows

## Core types

### Article

- SEO article or educational blog post
- Must support author, reviewer, references, FAQ, disclaimer, and review status

### Medical condition

- Symptom or condition landing page
- Used for symptom search and informational SEO

### Service

- Service or treatment offer page
- Used for conversion-focused intent

### Doctor

- Profile page for clinician trust
- Used for expert authority and local trust signals

### Specialty

- Cluster page for a medical specialty

### Landing page

- Campaign or high-intent conversion page

### Legal page

- Editorial policy, review policy, privacy, terms, and similar content

### Site setting

- Global clinic identity and contact information

## Shared components

- FAQ item
- Reference
- Contact link

## Required trust fields

- `author`
- `medicalReviewer`
- `reviewedAt`
- `references`
- `disclaimer`
- `seoTitle`
- `seoDescription`
- `noindex`

