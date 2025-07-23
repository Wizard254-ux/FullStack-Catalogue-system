const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
   ssl: {
    rejectUnauthorized: false, // Accept Render's self-signed cert
  },
});

// Test database connection
pool.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('Connected to PostgreSQL database');
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};