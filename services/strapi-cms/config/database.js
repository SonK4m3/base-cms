export default () => ({
  connection: {
    client: "postgres",
    connection: {
      host: process.env.DATABASE_HOST || "postgres",
      port: Number(process.env.DATABASE_PORT || 5432),
      database: process.env.DATABASE_NAME || "base_cms",
      user: process.env.DATABASE_USERNAME || "base_cms",
      password: process.env.DATABASE_PASSWORD || "base_cms",
      ssl: false
    }
  }
});

