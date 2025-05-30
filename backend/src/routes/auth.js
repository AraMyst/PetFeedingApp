// backend/src/routes/auth.js

const express = require('express')
const { register, login, me } = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

// POST /auth/register
router.post('/register', register)

// POST /auth/login
router.post('/login', login)

// GET /auth/me  (authenticated)
router.get('/me', authMiddleware, me)

module.exports = router
