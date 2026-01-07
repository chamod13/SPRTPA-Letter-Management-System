const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const db = require('../config/db')

// GET all users (with branch name)
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT u.user_id, u.username, u.role, u.created_at, b.branch_name
      FROM users u
      LEFT JOIN branches b ON u.branch_id = b.branch_id
      ORDER BY u.user_id
    `)
    res.json(result.rows)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// POST new user
router.post('/', async (req, res) => {
  try {
    const { username, password, role, branch_id } = req.body

    // Check if user exists
    const userCheck = await db.query('SELECT * FROM users WHERE username = $1', [username])
    if (userCheck.rows.length > 0) {
      return res.status(401).json({ message: 'User already exists' })
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const newUser = await db.query(
      'INSERT INTO users (username, password_hash, role, branch_id) VALUES ($1, $2, $3, $4) RETURNING user_id, username, role',
      [username, hash, role, branch_id],
    )

    res.json(newUser.rows[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
