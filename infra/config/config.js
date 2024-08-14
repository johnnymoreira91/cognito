require('dotenv').config();

const config = {
  COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID,
  COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
  COGNIT_SECRET_HASH: process.env.COGNIT_SECRET_HASH,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
}

module.exports = config;
