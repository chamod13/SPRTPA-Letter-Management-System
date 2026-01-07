const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'sprtpa_lms',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
})

async function checkLogs() {
  try {
    const res = await pool.query('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 5')
    console.log('LOG COUNT:', res.rowCount)
    console.log('SAMPLE LOGS:', res.rows)
  } catch (err) {
    console.error('❌ Error:', err.message)
  } finally {
    pool.end()
  }
}

checkLogs()
