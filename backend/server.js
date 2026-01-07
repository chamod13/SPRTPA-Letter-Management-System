require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Debug Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  console.log('Body:', req.body)
  next()
})

const db = require('./config/db')

// Test Database Connection
db.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database Connection Error:', err)
  } else {
    console.log('✅ Connected to PostgreSQL Database')
  }
})

// Basic Route
app.get('/', (req, res) => {
  res.send('SPRTPA LMS Backend is Running...')
})

// Routes (Placeholders)
// Routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/letters', require('./routes/letterRoutes'))
app.use('/api/audit', require('./routes/auditRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/branches', require('./routes/branchRoutes'))

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
