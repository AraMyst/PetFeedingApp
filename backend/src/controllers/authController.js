// backend/src/controllers/authController.js

const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/**
 * Register a new user.
 * Responds with a JWT token and basic user info.
 */
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check for existing user
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create & save user
    const user = new User({ email, password: hashedPassword })
    await user.save()

    // Sign JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    // Return token + user info
    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * Log in an existing user.
 * Responds with a JWT token and basic user info.
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * Get the currently authenticated user.
 * Requires authMiddleware to set req.user.
 */
exports.me = async (req, res) => {
  const user = req.user
  res.json({
    user: {
      id: user._id,
      email: user.email
    }
  })
}
