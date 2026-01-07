const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'sprtpa_lms',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
})

const branches = [
  { name: 'Hambantota', location: 'Hambantota' },
  { name: 'Matara', location: 'Matara' },
  { name: 'Galle', location: 'Galle' },
]

async function seed() {
  try {
    console.log('🌱 Seeding Branches...')

    for (const branch of branches) {
      // Check if exists
      const res = await pool.query('SELECT * FROM branches WHERE branch_name = $1', [branch.name])
      if (res.rows.length === 0) {
        await pool.query('INSERT INTO branches (branch_name, location) VALUES ($1, $2)', [
          branch.name,
          branch.location,
        ])
        console.log(`✅ Added: ${branch.name}`)
      } else {
        console.log(`⚠️ Exists: ${branch.name}`)
      }
    }

    console.log('✅ Branch Seeding Complete!')
  } catch (err) {
    console.error('❌ Error:', err.message)
  } finally {
    pool.end()
  }
}

seed()
