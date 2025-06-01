// src/components/Foods/FoodList.jsx
import React from 'react'
import FoodItem from './FoodItem'

/**
 * FoodList renders a fixed 3-column grid of FoodItem cards:
 *  - 1 column on small screens
 *  - 2 columns on medium screens (>= 640px)
 *  - 3 columns on large screens (>= 1024px)
 *  - gap-6 (1.5rem = 24px) between items
 */
export default function FoodList({ foods, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
