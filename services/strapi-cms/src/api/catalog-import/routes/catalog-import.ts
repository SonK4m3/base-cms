export default {
  routes: [
    {
      method: "POST",
      path: "/catalog-import/apply",
      handler: "catalog-import.apply",
      config: { auth: true }
    }
  ]
};
