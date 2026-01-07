const express = require('express')
const router = express.Router()
const db = require('../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const logAction = require('../utils/auditLogger')

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    console.log('Processing login for:', username)

    // 1. Check User in DB
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username])

    if (result.rows.length === 0) {
      console.log('User not found.')
      return res.status(401).json({ message: 'Invalid Credentials' })
    }

    const user = result.rows[0]

    // 2. Validate Password
    const isMatch = await bcrypt.compare(password, user.password_hash)

    if (!isMatch) {
      console.log('Password incorrect.')
      // Log Failed Attempt (Optional, passing null for userId or trying to find ID)
      return res.status(401).json({ message: 'Invalid Credentials' })
    }

    console.log('Credentials matched. Generating token...')

    const token = jwt.sign(
      { id: user.user_id, role: user.role, branch: user.branch_id },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '8h' },
    )

    // LOG LOGIN ACTION
    await logAction(user.user_id, 'USER_LOGIN', `User ${username} logged in successfully`, req)

    return res.status(200).json({
      token,
      user: { username: user.username, role: user.role },
    })
  } catch (error) {
    console.error('Login Route Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
