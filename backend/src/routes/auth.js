// backend/src/routes/auth.js

const express = require('express')
const { register, login, me } = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

// POST /auth/register
// Expects { email, password } in the request body.
// Returns 201 + { token, user } on success,
// or 400 + { error: 'User already exists' } if email is taken,
// or 500 + { error: 'Server error' } for other failures.
router.post('/register', register)

// POST /auth/login
// Expects { email, password } in the request body.
// Returns 200 + { token, user } on success,
// or 404 + { error: 'Email not registered' } if no user with that email,
// or 401 + { error: 'Incorrect password' } if password is wrong,
// or 500 + { error: 'Server error' } for other failures.
router.post('/login', login)

// GET /auth/me
// Requires a valid JWT in Authorization header: Bearer <token>
// Returns 200 + { user } on success,
// or 401 + { error: 'Not authorized' } if the token is missing or invalid.
router.get('/me', authMiddleware, me)

module.exports = router
