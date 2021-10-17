import * as dotenv from 'dotenv';
// get config vars
dotenv.config();

// access config var
const {
  JWT_SECRET,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  STAGE,
  PORT,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
  CLIENT_URL,
  JWT_EXPIRE_DURATION,
} = process.env;

export {
  JWT_SECRET,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  STAGE,
  PORT,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
  CLIENT_URL,
  JWT_EXPIRE_DURATION,
};
