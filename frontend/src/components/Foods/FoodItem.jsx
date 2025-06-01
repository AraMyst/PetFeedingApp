// src/components/Foods/FoodItem.jsx
import React from 'react'

/**
 * FoodItem displays information about a single food:
 *  - Name, brand, weight, specs
 *  - A “Buy” link that always appears:
 *      • If food.buyLinks exists and has at least one URL, use the first URL
 *      • Otherwise, fall back to an Amazon search URL for the food’s name
 *  - “Edit” and “Delete” buttons at the bottom:
 *      • “Edit” button invokes onEdit(food)
 *      • “Delete” button invokes onDelete(food._id)
 */
export default function FoodItem({ food, onEdit, onDelete }) {
  // Determine the “Buy” URL: use first buyLink if provided, else Amazon search by name
  const buyUrl =
    Array.isArray(food.buyLinks) && food.buyLinks.length > 0
      ? food.buyLinks[0]
      : `https://www.amazon.co.uk/s?k=${encodeURIComponent(food.name)}`

  return (
    <div className="bg-white p-4 rounded shadow flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold mb-1">{food.name}</h3>
        <p className="text-sm text-gray-500 mb-1">{food.brand}</p>
        <p className="text-sm mb-1">Weight: {food.weight} g</p>

        {Array.isArray(food.specifications) && food.specifications.length > 0 && (
          <p className="text-sm mb-1">
            Specs: {food.specifications.join(', ')}
          </p>
        )}

        {/* Always show a single “Buy” link */}
        <a
          href={buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm"
        >
          Buy
        </a>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => onEdit(food)}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(food._id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
