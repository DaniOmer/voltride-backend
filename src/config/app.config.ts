import dotenv from "dotenv";
import { Sequelize } from "sequelize";

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
  sequelize: {
    dialect: "postgres",
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  jwt: {
    secret: process.env.JWT_SECRET_CURRENT,
    expiresIn: 604800,
  },
  token: {
    defaultExpiresIn: process.env.TOKEN_DEFAULT_EXPIRATION || 86400,
  },
};
