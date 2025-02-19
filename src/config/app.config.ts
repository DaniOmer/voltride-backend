import dotenv from "dotenv";

dotenv.config();

export const AppConfig = {
  WEB_SERVER: process.env.WEB_SERVER || "express",
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
  POSTGRES_USERNAME: process.env.POSTGRES_USERNAME,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  JWT_SECRET: process.env.JWT_SECRET,
};
