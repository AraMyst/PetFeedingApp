// backend/src/routes/foods.js

const express = require('express')
const router = express.Router()

const {
  createFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
  toggleOpen   // ← Import the new toggleOpen handler
} = require('../controllers/foodController')

const authMiddleware = require('../middlewares/authMiddleware')

// All /foods routes require authentication
router.use(authMiddleware)

// Create a new Food
router.post('/', createFood)

// Get all Foods
router.get('/', getFoods)

// Get a specific Food by ID
router.get('/:id', getFoodById)

// Update a Food by ID (any fields, including isOpen/openedAt if you want)
router.put('/:id', updateFood)

// Delete a Food by ID
router.delete('/:id', deleteFood)

// ─── Our new toggle-open route ───
// Flip isOpen ↔ openedAt for this Food:
router.patch('/:id/toggle-open', toggleOpen)

module.exports = router
