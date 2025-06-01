import React from 'react'
import FoodItem from './FoodItem'

/**
 * FoodList renders a responsive grid of FoodItem cards.
 * Uses the .food-grid utility from index.css:
 *   - auto-fit columns with a minimum width of 300px, each flexible up to 1fr
 *   - gap: 1rem between rows and columns
 *   - align-items: stretch so all cards in a row share the same height
 */
export default function FoodList({ foods, onEdit, onDelete }) {
  return (
    <div className="food-grid">
      {foods.map((food) => (
        <FoodItem
          key={food._id}
          food={food}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
