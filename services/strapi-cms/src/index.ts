import { clinicSeedData } from "@base-cms/medical-schema";

const isSeedEnabled = () => {
  const value = (process.env.CMS_SEED_DEMO_CONTENT ?? "").toLowerCase();
  return value === "1" || value === "true" || value === "yes" || value === "on";
};

const withPublishedAt = <T extends Record<string, unknown>>(data: T) => ({
  ...data,
  publishedAt: new Date().toISOString()
});

const toDoctorRecord = (doctor: Record<string, unknown>) => ({
  name: doctor.title,
  slug: doctor.slug,
  specialty: doctor.specialty,
  bio: doctor.bio,
  credentials: doctor.credentials,
  languages: doctor.languages,
  seoTitle: doctor.seoTitle,
  seoDescription: doctor.seoDescription
});

const toServiceRecord = (service: Record<string, unknown>) => ({
  name: service.title,
  slug: service.slug,
  summary: service.summary,
  details: service.details,
  bookingCtas: service.bookingCtas,
  seoTitle: service.seoTitle,
  seoDescription: service.seoDescription
});

const toConditionRecord = (condition: Record<string, unknown>) => ({
  name: condition.title,
  slug: condition.slug,
  summary: condition.summary,
  content: condition.content,
  faq: condition.faq,
  relatedServices: condition.relatedServices,
  relatedArticles: condition.relatedArticles,
  seoTitle: condition.seoTitle,
  seoDescription: condition.seoDescription
});

const toSpecialtyRecord = (specialty: Record<string, unknown>) => ({
  name: specialty.title,
  slug: specialty.slug,
  summary: specialty.summary,
  content: specialty.content,
  seoTitle: specialty.seoTitle,
  seoDescription: specialty.seoDescription
});

const toArticleRecord = (article: Record<string, unknown>) => ({
  title: article.title,
  slug: article.slug,
  excerpt: article.summary,
  body: article.body,
  category: article.category,
  tags: article.tags,
  author: article.author,
  medicalReviewer: article.medicalReviewer,
  status: article.status,
  publishedAtCustom: article.publishedAtCustom,
  updatedAtCustom: article.updatedAtCustom,
  reviewedAt: article.reviewedAt,
  readingTime: article.readingTime,
  references: article.references,
  faq: article.faq,
  disclaimer: article.disclaimer,
  seoTitle: article.seoTitle,
  seoDescription: article.seoDescription,
  canonicalUrl: article.canonicalUrl,
  noindex: article.noindex,
  primaryTopic: article.primaryTopic,
  relatedConditions: article.relatedConditions,
  relatedServices: article.relatedServices,
  relatedArticles: article.relatedArticles,
  internalLinkSuggestions: article.internalLinkSuggestions
});

async function upsertSingle(strapi: any, uid: string, data: Record<string, unknown>) {
  const query = strapi.db.query(uid);
  const existing = await query.findOne();

  if (existing) {
    return query.update({ where: { id: existing.id }, data });
  }

  return query.create({ data });
}

async function upsertCollection(
  strapi: any,
  uid: string,
  uniqueField: string,
  items: Array<Record<string, unknown>>
) {
  const query = strapi.db.query(uid);

  for (const item of items) {
    const uniqueValue = item[uniqueField];
    const existing = await query.findOne({
      where: {
        [uniqueField]: uniqueValue
      }
    });

    const data = withPublishedAt(item);

    if (existing) {
      await query.update({ where: { id: existing.id }, data });
    } else {
      await query.create({ data });
    }
  }
}

async function seedClinicContent(strapi: any) {
  await upsertSingle(strapi, "api::site-setting.site-setting", clinicSeedData.siteSetting as Record<string, unknown>);

  await upsertCollection(
    strapi,
    "api::doctor.doctor",
    "slug",
    clinicSeedData.doctors.map(toDoctorRecord)
  );
  await upsertCollection(
    strapi,
    "api::article.article",
    "slug",
    clinicSeedData.articles.map(toArticleRecord)
  );
  await upsertCollection(
    strapi,
    "api::service.service",
    "slug",
    clinicSeedData.services.map(toServiceRecord)
  );
  await upsertCollection(
    strapi,
    "api::medical-condition.medical-condition",
    "slug",
    clinicSeedData.medicalConditions.map(toConditionRecord)
  );
  await upsertCollection(
    strapi,
    "api::specialty.specialty",
    "slug",
    clinicSeedData.specialties.map(toSpecialtyRecord)
  );
  await upsertCollection(
    strapi,
    "api::legal-page.legal-page",
    "slug",
    clinicSeedData.legalPages as Array<Record<string, unknown>>
  );
  await upsertCollection(
    strapi,
    "api::landing-page.landing-page",
    "slug",
    clinicSeedData.landingPages as Array<Record<string, unknown>>
  );
}

export default {
  register() {},
  async bootstrap({ strapi }: { strapi: any }) {
    if (!isSeedEnabled()) {
      return;
    }

    await seedClinicContent(strapi);
  }
};
