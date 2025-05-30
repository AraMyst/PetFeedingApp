const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  allergies: {
    type: [String],
    default: []
  },
  gramsPerMeal: {
    type: Number,
    required: true
  },
  mealsPerDay: {
    type: Number,
    required: true
  },
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);
