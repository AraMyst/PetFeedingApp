// src/components/Foods/FoodList.jsx
import React from 'react'
import FoodItem from './FoodItem'

/**
 * FoodList renders a responsive grid of FoodItem cards.
 * Uses the .food-grid utility from index.css:
 *   - auto-fit columns with a minimum width of 300px, each flexible up to 1fr
 *   - gap: 1rem between rows and columns
 *   - align-items: stretch so all cards in a row share the same height
 *
 * Props:
 *  - foods: array of food objects
 *  - onDelete: function(foodId) → deletes that food
 */
export default function FoodList({ foods, onDelete }) {
  return (
    <div className="food-grid">
      {foods.map((food) => (
        <FoodItem
          key={food._id}
          food={food}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
