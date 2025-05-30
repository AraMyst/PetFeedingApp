const Food = require('../models/Food');

exports.createFood = async (req, res) => {
  try {
    const { name, brand, specifications, weight, amazonLinks } = req.body;
    const food = new Food({ name, brand, specifications, weight, amazonLinks });
    await food.save();
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateFood = async (req, res) => {
  try {
    const updated = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    const deleted = await Food.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json({ message: 'Food deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};