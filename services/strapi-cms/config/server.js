export default () => ({
  host: process.env.HOST || "0.0.0.0",
  port: Number(process.env.PORT || 1337),
  app: {
    keys: (process.env.APP_KEYS || "base-cms-key-1,base-cms-key-2").split(",")
  }
});

