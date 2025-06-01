import React from 'react'
import FoodItem from './FoodItem'

/**
 * FoodList renders a responsive grid of FoodItem cards.
 * - On small screens: 1 column (grid-cols-1)
 * - On sm (>=640px) screens: 2 columns (sm:grid-cols-2)
 * - On lg (>=1024px) screens: 3 columns (lg:grid-cols-3)
 * - Reduced gap between cards for um layout mais compacto
 */
export default function FoodList({ foods, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {foods.map((food) => (
        <div key={food._id} className="flex">
          {/* 
            Envolvo cada FoodItem em um wrapper “flex” para 
            garantir que todos os cards tenham a mesma altura de linha
            caso desejemos alinhá-los por baseline ou stretch. 
          */}
          <FoodItem
            food={food}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  )
}
