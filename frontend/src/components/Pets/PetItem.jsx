// src/components/Pets/PetItem.jsx
import React from 'react'

export default function PetItem({ pet, onDelete }) {
  const {
    _id,
    name,
    age,
    allergies = [],
    gramsPerMeal,
    mealsPerDay,
    food = {},
    image,
  } = pet

  return (
    <div className="h-full bg-[#F3CF9F] rounded-lg shadow-sm p-4 flex flex-col justify-between">
      <div className="flex items-start space-x-4">
        {image && (
          <img
            src={`/assets/images/${image}.jpg`}
            alt={name}
            className="w-24 h-24 object-cover rounded"
          />
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{name}</h3>
          <p className="text-sm text-gray-500 mb-1">
            Age: {age} year{age !== 1 ? 's' : ''}
          </p>
          {allergies.length > 0 && (
            <p className="text-sm mb-1">Allergies: {allergies.join(', ')}</p>
          )}
          <p className="text-sm mb-1">
            Consumption: {gramsPerMeal}g per meal × {mealsPerDay} meal
            {mealsPerDay !== 1 ? 's' : ''}
          </p>
          {food.name && <p className="text-sm">Food: {food.name}</p>}
        </div>
      </div>

      {/* Only “Delete” button (no Edit) */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => onDelete(_id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
