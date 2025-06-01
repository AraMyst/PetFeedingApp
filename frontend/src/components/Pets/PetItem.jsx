// src/components/Pets/PetItem.jsx
import React from 'react'

/**
 * PetItem displays information about a single pet:
 *  - Image, Name, Age, Allergies, Consumption, Food name (if assigned)
 *  - Only a “Delete” button at the bottom (no Edit)
 *  - Cream-colored background (#F3CF9F) with rounded corners
 *  - Full height (h-full) so that grid’s align-items: stretch makes all cards in a row equal height
 *  - The image is centered inside a fixed-height container
 *
 * Props:
 *  - pet: object with { _id, name, age, allergies, gramsPerMeal, mealsPerDay, food, image }
 *  - onDelete(petId): function to delete this pet
 */
export default function PetItem({ pet, onDelete }) {
  const {
    _id,
    name,
    age,
    allergies = [],
    gramsPerMeal,
    mealsPerDay,
    food,   // note: do not default to {} here, because pet.food may be null
    image,  // e.g. "DogYoung"
  } = pet

  // Safely extract foodName only if food is non-null
  const foodName = food && food.name ? food.name : null

  return (
    <div className="h-full bg-[#F3CF9F] rounded-lg shadow-sm overflow-hidden flex flex-col justify-between">
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

          {/* Only render the food line if foodName is non-null */}
          {foodName && <p className="text-sm">Food: {foodName}</p>}
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
