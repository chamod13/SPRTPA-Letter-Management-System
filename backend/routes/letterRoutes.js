const express = require('express')
const router = express.Router()
const db = require('../config/db')

const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/'
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir)
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    // Unique filename: FieldName-Timestamp-OriginalName
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB Limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf/
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

    if (mimetype && extname) {
      return cb(null, true)
    }
    cb(new Error('Error: File upload only supports images and PDFs!'))
  },
})

// GET All Letters
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT l.*,
             (SELECT json_agg(json_build_object('path', a.file_path, 'name', a.file_name))
              FROM attachments a WHERE a.letter_id = l.letter_id) as attachments
      FROM letters l
      ORDER BY created_at DESC
    `)
    res.json(result.rows)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

const logAction = require('../utils/auditLogger')

// POST New Letter with Attachment
router.post('/', upload.single('attachment'), async (req, res) => {
  const client = await db.pool.connect()

  try {
    await client.query('BEGIN') // Start Transaction

    const { title, sender, priority, assigned_user_id } = req.body
    // Assuming we can get user ID from request if middleware sets it, OR we'll use a placeholder/admin for now
    // Ideally we should have auth middleware extracting user. Let's assume user_id=1 (Admin) if not present,
    // OR we will update middleware later. For now, let's hardcode User ID 1 for logging if req.user is undefined.
    // NOTE: In a real app, 'verifyToken' middleware should populate req.user.
    const currentUserId = req.user ? req.user.id : 1

    // Auto-generate Letter Number
    const letter_number = 'L-' + Date.now().toString().slice(-6)

    // 1. Insert Letter
    const newLetter = await client.query(
      'INSERT INTO letters (letter_number, title, sender, priority, assigned_user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        letter_number,
        title,
        sender,
        priority,
        assigned_user_id ? parseInt(assigned_user_id) : null,
      ],
    )

    const letterId = newLetter.rows[0].letter_id

    // 2. Insert Attachment if exists
    if (req.file) {
      await client.query(
        'INSERT INTO attachments (letter_id, file_path, file_name) VALUES ($1, $2, $3)',
        [letterId, req.file.path, req.file.originalname],
      )
    }

    await client.query('COMMIT') // Commit Transaction

    // Log Audit
    // We can't use 'client' here for logging necessarily as it's separate, but we can call our utility
    logAction(currentUserId, 'CREATE_LETTER', `Created letter ${letter_number}: ${title}`, req)

    res.json(newLetter.rows[0])
  } catch (err) {
    await client.query('ROLLBACK') // Rollback on error
    console.error(err.message)
    res.status(500).send('Server Error: ' + err.message)
  } finally {
    client.release()
  }
})

module.exports = router
