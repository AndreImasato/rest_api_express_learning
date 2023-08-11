if (process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}

const SECRET_KEY = process.env.SECRET_KEY;
const PORT = parseInt(process.env.PORT);
const DATABASE_URL = process.env.DATABASE_URL;
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);
const JWT_EXPIRATION = parseInt(process.env.JWT_EXPIRATION);
const JWT_REFRESH_EXPIRATION = parseInt(process.env.JWT_REFRESH_EXPIRATION);

module.exports = {
  SECRET_KEY,
  PORT,
  DATABASE_URL,
  BCRYPT_SALT_ROUNDS,
  JWT_EXPIRATION,
  JWT_REFRESH_EXPIRATION,
};