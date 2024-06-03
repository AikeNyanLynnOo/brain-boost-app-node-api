import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_CLUSTER_ID = process.env.MONGO_CLUSTER_ID || "";
const MONGO_CLUSTER_NAME = process.env.MONGO_CLUSTER_NAME || "";
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const PWD_ENCRYPTION_SECRET = process.env.PWD_ENCRYPTION_SECRET;
const ACCESS_TOKEN_COOKIE_NAME = process.env.ACCESS_TOKEN_COOKIE_NAME;
const REFRESH_TOKEN_COOKIE_NAME = process.env.REFRESH_TOKEN_COOKIE_NAME;
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER_ID}.mongodb.net`;
export const config = {
  mongo: {
    url: MONGO_URL,
    appName: MONGO_CLUSTER_NAME,
    dbName: MONGO_DB_NAME,
  },
  server: {
    port: PORT,
  },
  secret: {
    accessTokenSecret: ACCESS_TOKEN_SECRET,
    refreshTokenSecret: REFRESH_TOKEN_SECRET,
    passwordEncryptionSecret: PWD_ENCRYPTION_SECRET,
    accessTokenCookieName: ACCESS_TOKEN_COOKIE_NAME,
    refreshTokenCookieName: REFRESH_TOKEN_COOKIE_NAME,
  },
};
