import dotenv from "dotenv";

dotenv.config();

export const AppConfig = {
  server: {
    name: process.env.WEB_SERVER || "express",
    port: process.env.PORT || 3000,
    apiUrl: process.env.API_URL,
  },
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {
      auth: {
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD,
      },
      dbName: process.env.MONGODB_NAME,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET_CURRENT,
    expiresIn: "7d",
  },
  token: {
    defaultExpiresIn: process.env.TOKEN_DEFAULT_EXPIRATION || 86400,
  },
  POSTGRES_USERNAME: process.env.POSTGRES_USERNAME,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
};
