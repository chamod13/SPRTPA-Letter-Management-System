const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'sprtpa_lms',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
})

// Helper function to query
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool, // Export pool for transaction client
}
