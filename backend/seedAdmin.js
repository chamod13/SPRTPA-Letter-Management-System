const { Pool } = require('pg')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'sprtpa_lms',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
})

async function seedAdmin() {
  try {
    const password = 'admin123'
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    console.log('Generated Hash for admin123:', hash)

    // Check if admin exists
    const check = await pool.query("SELECT * FROM users WHERE username = 'admin'")

    if (check.rows.length > 0) {
      await pool.query("UPDATE users SET password_hash = $1 WHERE username = 'admin'", [hash])
      console.log('✅ Admin password updated successfully.')
    } else {
      await pool.query(
        "INSERT INTO users (username, password_hash, role, branch_id) VALUES ('admin', $1, 'Super Admin', 1)",
        [hash],
      )
      console.log('✅ Admin user created successfully.')
    }
  } catch (err) {
    console.error('Error seeding admin:', err)
  } finally {
    pool.end()
  }
}

seedAdmin()
