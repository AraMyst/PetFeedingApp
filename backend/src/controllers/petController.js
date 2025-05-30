const Pet = require('../models/Pet');

exports.createPet = async (req, res) => {
  try {
    const { name, age, allergies, gramsPerMeal, mealsPerDay, food } = req.body;
    const pet = new Pet({ name, age, allergies, gramsPerMeal, mealsPerDay, food });
    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPets = async (req, res) => {
  try {
    const pets = await Pet.find().populate('food');
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate('food');
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePet = async (req, res) => {
  try {
    const updated = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deletePet = async (req, res) => {
  try {
    const deleted = await Pet.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json({ message: 'Pet deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
