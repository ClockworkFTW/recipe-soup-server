const port = process.env.PORT;

const env = process.env.NODE_ENV;

const url =
  env === "production"
    ? {
        client: "https://www.recipesoup.app",
        server: "https://www.recipesoup.app/api",
      }
    : {
        client: "http://localhost:5173",
        server: "http://localhost:3000",
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
  verify: {
    secret: process.env.VERIFY_TOKEN_SECRET,
    duration: "1h",
  },
  reset: {
    secret: process.env.RESET_TOKEN_SECRET,
    duration: "15m",
  },
};

const postgres =
  env === "production"
    ? {
        database: process.env.POSTGRES_PROD_DATABASE,
        user: process.env.POSTGRES_PROD_USER,
        password: process.env.POSTGRES_PROD_PASSWORD,
        host: process.env.POSTGRES_PROD_HOST,
        port: process.env.POSTGRES_PROD_PORT,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {
        database: process.env.POSTGRES_DEV_DATABASE,
        user: process.env.POSTGRES_DEV_USER,
        password: process.env.POSTGRES_DEV_PASSWORD,
        host: process.env.POSTGRES_DEV_HOST,
        port: process.env.POSTGRES_DEV_PORT,
        dialectOptions: {},
      };

const aws = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
  bucket: process.env.AWS_S3_BUCKET,
};

const mailer = {
  username: process.env.EMAIL_USERNAME,
  password: process.env.EMAIL_PASSWORD,
};

export default {
  port,
  env,
  url,
  jwt,
  postgres,
  aws,
  mailer,
};
