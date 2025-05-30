// models/Food.js

const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  specifications: {
    type: [String],
    default: []
  },
  weight: {
    type: Number,
    required: true
  },
  buyLinks: {
    type: [String],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);
