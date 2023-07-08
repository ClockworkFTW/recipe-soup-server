const port = process.env.PORT;

const environment = process.env.NODE_ENV;

const postgres =
  environment === "production"
    ? {
        database: process.env.POSTGRES_PROD_DATABASE,
        user: process.env.POSTGRES_PROD_USER,
        password: process.env.POSTGRES_PROD_PASSWORD,
        host: process.env.POSTGRES_PROD_HOST,
        port: process.env.POSTGRES_PROD_PORT,
      }
    : {
        database: process.env.POSTGRES_DEV_DATABASE,
        user: process.env.POSTGRES_DEV_USER,
        password: process.env.POSTGRES_DEV_PASSWORD,
        host: process.env.POSTGRES_DEV_HOST,
        port: process.env.POSTGRES_DEV_PORT,
      };

export default {
  port,
  environment,
  postgres,
};
