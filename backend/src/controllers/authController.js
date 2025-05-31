// backend/src/controllers/authController.js

const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/**
 * Register a new user.
 * Returns { token, user } on success.
 */
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create and save the new user
    const user = new User({ email, password: hashedPassword })
    await user.save()

    // Sign a JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    // Respond with token and basic user info
    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * Authenticate an existing user.
 * Returns { token, user } on success.
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Compare submitted password with stored hash
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Sign a new JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * Return the currently authenticated user.
 * Requires authMiddleware to have populated req.user.
 */
exports.me = async (req, res) => {
  const user = req.user
  if (!user) {
    return res.status(401).json({ message: 'Not authorized' })
  }
  res.json({
    user: {
      id: user._id,
      email: user.email,
    },
  })
}
