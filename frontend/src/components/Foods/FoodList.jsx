// src/components/Foods/FoodList.jsx
import React from 'react'
import FoodItem from './FoodItem'

/**
 * FoodList renders a responsive grid of FoodItem cards.
 * - On small screens: 1 column (grid-cols-1)
 * - On sm (>=640px) screens: 2 columns (sm:grid-cols-2)
 * - On lg (>=1024px) screens: 3 columns (lg:grid-cols-3)
 * Assumes that FoodsPage already handled the “no foods” empty state.
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
