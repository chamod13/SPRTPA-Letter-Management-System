const express = require('express')
const router = express.Router()
const db = require('../config/db')

// GET all branches
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM branches ORDER BY branch_id')
    res.json(result.rows)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// POST new branch
router.post('/', async (req, res) => {
  try {
    const { branch_name, location } = req.body
    const newBranch = await db.query(
      'INSERT INTO branches (branch_name, location) VALUES ($1, $2) RETURNING *',
      [branch_name, location],
    )
    res.json(newBranch.rows[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// DELETE branch
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await db.query('DELETE FROM branches WHERE branch_id = $1', [id])
    res.json({ message: 'Branch deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
