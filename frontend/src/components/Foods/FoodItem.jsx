// src/components/Foods/FoodItem.jsx
import React from 'react'

/**
 * FoodItem displays information about a single food:
 *  - Name, brand, weight, specs, buy link
 *  - Only a “Delete” button at the bottom (no Edit)
 *  - Cream-colored background (#F3CF9F) with rounded corners
 *  - Full height (h-full) so that grid’s align-items: stretch
 *    makes all cards in the same row equal height
 */
export default function FoodItem({ food, onDelete }) {
  const primaryLink =
    Array.isArray(food.buyLinks) && food.buyLinks.length > 0
      ? food.buyLinks[0]
      : null

  return (
    <div className="h-full bg-[#F3CF9F] rounded-lg shadow-sm p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold mb-1">{food.name}</h3>
        <p className="text-sm text-gray-600 mb-1">{food.brand}</p>
        <p className="text-sm mb-1">Weight: {food.weight} g</p>

        {food.specifications?.length > 0 && (
          <p className="text-sm mb-1">
            Specs: {food.specifications.join(', ')}
          </p>
        )}

        <div className="mt-2 mb-4">
          <a
            href={
              primaryLink ||
              `https://www.amazon.com/s?k=${encodeURIComponent(food.name)}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline text-sm"
          >
            Buy
          </a>
        </div>
      </div>

      {/* Only “Delete” button (no Edit) */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => onDelete(food._id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
