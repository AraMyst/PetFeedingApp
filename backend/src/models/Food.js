// backend/src/models/Food.js

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
  },
  // ─────────────── New Fields ───────────────
  /**
   * Indicates whether this food package is currently “open.”
   * When true, `openedAt` should hold the Date when the user opened it.
   * When false, `openedAt` should be null.
   */
  isOpen: {
    type: Boolean,
    default: false
  },
  openedAt: {
    type: Date,
    default: null
  }
  // ───────────────────────────────────────────
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);
