import * as dotenv from 'dotenv';
// get config vars
dotenv.config();

// access config var
const {
  JWT_SECRET,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DDB_PASSWORD,
  DB_DATABASE,
  STAGE,
} = process.env;

export {
  JWT_SECRET,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DDB_PASSWORD,
  DB_DATABASE,
  STAGE,
};
