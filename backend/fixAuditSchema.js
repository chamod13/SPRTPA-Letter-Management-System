const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'sprtpa_lms',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
})

async function fix() {
  try {
    console.log('🔧 Fixing Audit Table...')

    // 1. Ensure Table Exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        log_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id),
        action VARCHAR(255) NOT NULL,
        details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // 2. Add ip_address if missing
    await pool.query(`ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS ip_address VARCHAR(45)`)

    // 3. Handle Timestamp -> Created_at rename if needed
    const res = await pool.query(
      "SELECT column_name FROM information_schema.columns WHERE table_name='audit_logs' AND column_name='timestamp'",
    )
    if (res.rows.length > 0) {
      console.log('Renaming timestamp to created_at...')
      await pool.query(`ALTER TABLE audit_logs RENAME COLUMN "timestamp" TO created_at`)
    }

    console.log('✅ Audit Table Fixed Successfully!')
  } catch (err) {
    console.error('❌ Error:', err.message)
  } finally {
    pool.end()
  }
}

fix()
