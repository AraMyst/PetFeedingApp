// src/components/Pets/PetAgeSelector.jsx
import React from 'react'

/**
 * PetAgeSelector renders:
 *   1) Age category selection (young, adult, old) with images
 *   2) Numeric age dropdown (months if young; years otherwise)
 *
 * Props:
 *   - animalType: string             // 'dog', 'cat', 'others'
 *   - selectedCategory: string       // 'young' | 'adult' | 'old'
 *   - onSelectCategory: (category: string) => void
 *   - selectedValue: string          // numeric string (e.g., '3')
 *   - onSelectValue: (value: string) => void
 */
export default function PetAgeSelector({
  animalType,
  selectedCategory,
  onSelectCategory,
  selectedValue,
  onSelectValue,
}) {
  if (!animalType) {
    return null
  }

  // Build the list of numeric options based on age category
  const getAgeOptions = () => {
    if (selectedCategory === 'young') {
      return Array.from({ length: 13 }, (_, i) => i) // 0 to 12 months
    } else if (selectedCategory === 'adult') {
      return Array.from({ length: 7 }, (_, i) => i + 1) // 1 to 7 years
    } else if (selectedCategory === 'old') {
      return Array.from({ length: 24 }, (_, i) => i + 7) // 7 to 30 years
    } else {
      return []
    }
  }

  // Helper to capitalize first letter
  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1)

  return (
    <div>
      {/* Age Category Selection */}
      <label className="block text-sm font-medium">
        Select Age Category *
      </label>
      <div className="grid grid-cols-3 gap-4 mt-2">
        {['young', 'adult', 'old'].map((category) => {
          const capitalAnimal = capitalize(animalType)     // 'Dog', 'Cat', 'Others'
          const capitalCat = capitalize(category)          // 'Young', 'Adult', 'Old'
          const imageSrc = `/assets/images/${capitalAnimal}${capitalCat}.png`
          return (
            <div
              key={category}
              onClick={() => {
                onSelectCategory(category)
                onSelectValue('') // reset numeric value when category changes
              }}
              className={`border rounded overflow-hidden cursor-pointer p-1 ${
                selectedCategory === category
                  ? 'ring-2 ring-blue-500'
                  : ''
              }`}
            >
              <img
                src={imageSrc}
                alt={`${capitalAnimal} ${capitalCat}`}
                className="w-full h-20 object-contain"
              />
              <p className="text-center text-sm capitalize mt-1">
                {category}
              </p>
            </div>
          )
        })}
      </div>

      {/* Numeric Age Dropdown */}
      {selectedCategory && (
        <div className="mt-4">
          {selectedCategory === 'young' ? (
            <label className="block text-sm font-medium">
              Age (months) *
            </label>
          ) : (
            <label className="block text-sm font-medium">
              Age (years) *
            </label>
          )}
          <select
            value={selectedValue}
            onChange={(e) => onSelectValue(e.target.value)}
            required
            className="mt-1 block w-full max-w-xs border border-gray-300 rounded px-3 py-2"
          >
            <option value="" disabled>
              -- Select {selectedCategory === 'young' ? 'months' : 'years'} --
            </option>
            {getAgeOptions().map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
