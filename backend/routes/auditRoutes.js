const express = require('express')
const router = express.Router()
const db = require('../config/db')

// GET All Audit Logs
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT a.*, u.username
      FROM audit_logs a
      LEFT JOIN users u ON a.user_id = u.user_id
      ORDER BY a.created_at DESC
      LIMIT 100
    `)
    res.json(result.rows)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
