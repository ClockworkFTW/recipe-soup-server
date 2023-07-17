const port = process.env.PORT;

const environment = process.env.NODE_ENV;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const jwt = {
  access: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    duration: "15m",
  },
  refresh: {
    secret: process.env.REFRESH_TOKEN_SECRET,
    duration: "7d",
    cookieOptions: {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  },
};

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
  corsOptions,
  jwt,
  postgres,
};
