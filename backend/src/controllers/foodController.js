// backend/src/controllers/foodController.js

const Food = require('../models/Food');

/**
 * Create a new Food document.
 * Returns the newly created Food in JSON.
 */
exports.createFood = async (req, res) => {
  try {
    const { name, brand, specifications, weight, buyLinks } = req.body;

    // If no buyLinks provided, default to an Amazon search link
    const linksToSave =
      Array.isArray(buyLinks) && buyLinks.length > 0
        ? buyLinks
        : [`https://www.amazon.co.uk/s?k=${encodeURIComponent(name)}`];

    const food = new Food({
      name,
      brand,
      specifications,
      weight,
      buyLinks: linksToSave,
      // isOpen and openedAt will default to false / null
    });

    await food.save();
    return res.status(201).json(food);
  } catch (error) {
    console.error('createFood error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get all Food documents for the authenticated user.
 * (Assumes authMiddleware has already verified the token.)
 */
exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    return res.json(foods);
  } catch (error) {
    console.error('getFoods error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get a single Food by its ID.
 * If not found → 404.
 */
exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    return res.json(food);
  } catch (error) {
    console.error('getFoodById error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update an existing Food by its ID.
 * Any field in req.body (name, brand, specifications, weight, buyLinks,
 * isOpen, openedAt, etc.) will be updated if present.
 * If the array buyLinks is empty or omitted, we default it to an Amazon link.
 */
exports.updateFood = async (req, res) => {
  try {
    const { buyLinks, name } = req.body;

    // If the client sends an empty buyLinks array (or none), default to an Amazon link
    let updatedData = { ...req.body };
    if (!Array.isArray(buyLinks) || buyLinks.length === 0) {
      updatedData.buyLinks = [`https://www.amazon.co.uk/s?k=${encodeURIComponent(name)}`];
    }

    const updated = await Food.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Food not found' });
    }

    return res.json(updated);
  } catch (error) {
    console.error('updateFood error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Delete a Food by its ID.
 * If not found → 404.
 */
exports.deleteFood = async (req, res) => {
  try {
    const deleted = await Food.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Food not found' });
    }
    return res.json({ message: 'Food deleted' });
  } catch (error) {
    console.error('deleteFood error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Toggle “open” / “close” state for a given Food.
 *
 * - If `isOpen` was false → becomes true, and we set openedAt = new Date().
 * - If `isOpen` was true → becomes false, and we set openedAt = null.
 *
 * Returns the updated Food in JSON.
 */
exports.toggleOpen = async (req, res) => {
  try {
    const foodId = req.params.id;
    const food = await Food.findById(foodId);

    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    // Flip the flag:
    const nowOpen = !food.isOpen;
    food.isOpen = nowOpen;

    if (nowOpen) {
      // Was closed → user just opened it
      food.openedAt = new Date();
    } else {
      // Was open → user just closed it
      food.openedAt = null;
    }

    await food.save();
    return res.json(food);
  } catch (error) {
    console.error('toggleOpen error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
