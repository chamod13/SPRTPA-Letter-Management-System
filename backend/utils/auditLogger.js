const db = require('../config/db')

const logAction = async (userId, action, details, req) => {
  try {
    const ipAddress = req.ip || req.connection.remoteAddress

    await db.query(
      'INSERT INTO audit_logs (user_id, action, details, ip_address) VALUES ($1, $2, $3, $4)',
      [userId, action, details, ipAddress],
    )
    console.log(`📝 Audit Log: [${action}] User: ${userId}`)
  } catch (error) {
    console.error('❌ Failed to create audit log:', error.message)
  }
}

module.exports = logAction
