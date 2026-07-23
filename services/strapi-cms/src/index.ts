export default {
  register() {},
  async bootstrap({ strapi }: { strapi: any }) {
    if (process.env.NODE_ENV === "production" && !process.env.SITE_ID) {
      throw new Error("SITE_ID is required for a dedicated production CMS deployment");
    }
    if ((process.env.CMS_SEED_DEMO_CONTENT ?? "").toLowerCase() === "true") {
      strapi.log.warn("CMS_SEED_DEMO_CONTENT is ignored by the neutral CMS. Use pnpm site:seed with a dedicated site manifest.");
    }
  }
};
