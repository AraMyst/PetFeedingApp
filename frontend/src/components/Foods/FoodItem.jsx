// src/components/Foods/FoodItem.jsx
import React from 'react'
import { calculateDaysRemaining } from '../../utils/calculateDaysRemaining'

/**
 * FoodItem displays info about one food object:
 *   - name, brand, weight, specs, buy link
 *   - status: Open vs. Closed (food.isOpen, food.openedAt)
 *   - button to toggle open/close (calls onToggle)
 *   - “Delete” button at bottom (calls onDelete)
 *   - cream‐colored background (#F3CF9F), rounded corners, full height
 *
 * Props:
 *   - food: { _id, name, brand, weight, specifications, buyLinks, isOpen, openedAt }
 *   - onDelete(foodId): function to delete this food
 *   - onToggle(foodId): function to toggle open/close
 */
export default function FoodItem({ food, onDelete, onToggle }) {
  const primaryLink =
    Array.isArray(food.buyLinks) && food.buyLinks.length > 0
      ? food.buyLinks[0]
      : null

  // Calculate days remaining if open, openedAt, weight & specifications exist
  let daysRemaining = null
  if (food.isOpen && food.openedAt && food.weight && food.specifications) {
    daysRemaining = calculateDaysRemaining(
      food.weight,
      /* gramsPerMeal= */ 0,
      /* mealsPerDay= */ 0
    )
  }

  // Format openedAt as localized date
  const openedAtDisplay = food.openedAt
    ? new Date(food.openedAt).toLocaleDateString()
    : null

  const handleToggleClick = async () => {
    try {
      await onToggle(food._id)
    } catch (err) {
      console.error('Failed to toggle open/close:', err)
    }
  }

  const handleDeleteClick = () => {
    onDelete(food._id)
  }

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

        {/* Buy link */}
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

        {/* ─── Status & Opened‐At Info ─── */}
        {food.isOpen ? (
          <div className="mb-2">
            <p className="text-sm text-green-700">
              Status: <span className="font-medium">Open</span>
            </p>
            {openedAtDisplay && (
              <p className="text-sm text-gray-700">
                Opened at: {openedAtDisplay}
              </p>
            )}
            {daysRemaining !== null && (
              <p className="text-sm text-red-600">
                Days remaining: {daysRemaining}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500 mb-2">
            Status: <span className="font-medium">Closed</span>
          </p>
        )}

        {/* ─── Toggle Open/Close Button ─── */}
        <button
          onClick={handleToggleClick}
          className={`mb-4 px-3 py-1 rounded text-white focus:outline-none focus:ring-2 ${
            food.isOpen
              ? 'bg-red-500 hover:bg-red-600 focus:ring-red-300'
              : 'bg-green-500 hover:bg-green-600 focus:ring-green-300'
          }`}
        >
          {food.isOpen ? 'Close Package' : 'Open Package'}
        </button>
      </div>

      {/* ─── Delete Button at bottom ─── */}
      <div className="flex justify-center">
        <button
          onClick={handleDeleteClick}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
