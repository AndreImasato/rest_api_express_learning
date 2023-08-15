if (process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}

const SECRET_KEY = process.env.SECRET_KEY;
const PORT = parseInt(process.env.PORT);
const DATABASE_URL = process.env.DATABASE_URL;
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);
const JWT_EXPIRATION = parseInt(process.env.JWT_EXPIRATION);
const JWT_REFRESH_EXPIRATION = parseInt(process.env.JWT_REFRESH_EXPIRATION);

const SAMPLE_ADMIN_USER = process.env.SAMPLE_ADMIN_USER;
const SAMPLE_ADMIN_EMAIL = process.env.SAMPLE_ADMIN_EMAIL;
const SAMPLE_ADMIN_PASSWORD = process.env.SAMPLE_ADMIN_PASSWORD;

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_REGION;
const AWS_S3_DEMO_BUCKET = process.env.AWS_S3_DEMO_BUCKET;

module.exports = {
  SECRET_KEY,
  PORT,
  DATABASE_URL,
  BCRYPT_SALT_ROUNDS,
  JWT_EXPIRATION,
  JWT_REFRESH_EXPIRATION,
  SAMPLE_ADMIN_USER,
  SAMPLE_ADMIN_EMAIL,
  SAMPLE_ADMIN_PASSWORD,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_S3_DEMO_BUCKET,
};