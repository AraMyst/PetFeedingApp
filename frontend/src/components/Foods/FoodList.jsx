// src/components/Foods/FoodList.jsx
import React from 'react'
import FoodItem from './FoodItem'

/**
 * FoodList renders a responsive grid of FoodItem cards.
 * 
 * Props:
 *   - foods: array of food objects
 *   - onDelete: function(foodId) → deletes that food
 *   - onToggle: function(foodId) → toggles open/close on that food
 */
export default function FoodList({ foods, onDelete, onToggle }) {
  return (
    <div className="food-grid">
      {foods.map((food) => (
        <FoodItem
          key={food._id}
          food={food}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}
