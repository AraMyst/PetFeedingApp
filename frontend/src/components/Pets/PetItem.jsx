// src/components/Pets/PetItem.jsx
import React from 'react'

/**
 * PetItem displays information about a single pet:
 *  - Image, Name, Age, Allergies, Consumption, Food name
 *  - Only a “Delete” button at the bottom (no Edit)
 *  - Cream-colored background (#F3CF9F) with rounded corners
 *  - Each card has a max-width so they don’t stretch to the viewport edges
 *  - The image is centered inside a fixed-height container
 */
export default function PetItem({ pet, onDelete }) {
  const {
    _id,
    name,
    age,
    allergies = [],
    gramsPerMeal,
    mealsPerDay,
    food = {},
    image, // e.g. "DogYoung"
  } = pet

  return (
    <div className="bg-[#F3CF9F] rounded-lg shadow-sm overflow-hidden flex flex-col justify-between max-w-xs mx-auto">
      {/* Image container: fixed height, image is centered inside */}
      <div className="flex justify-center items-center h-40 bg-white">
        {image && (
          <img
            src={`/assets/images/${image}.png`}
            alt={name}
            className="max-h-32 object-contain"
          />
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
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
    </div>
  )
}
