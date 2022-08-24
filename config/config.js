require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbUrl: process.env.DATABASE_URL || process.env.HEROKU_POSTGRESQL_JADE_URL,
  api_public_key: process.env.API_PUBLIC_KEY,
  salt_rounds: process.env.SALT_ROUNDS,
  secret_key: process.env.SECRET,
};

module.exports = { config };
