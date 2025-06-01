// src/components/Pets/PetWeightSelector.jsx
import React from 'react'

/**
 * PetWeightSelector renders weight category options (thin, medium, fat)
 * with images based on the selected animal.
 *
 * Props:
 *   - animalType: string               // 'dog', 'cat', 'others'
 *   - selectedWeight: string           // 'thin' | 'medium' | 'fat'
 *   - onSelectWeight: (weight: string) => void
 */
export default function PetWeightSelector({
  animalType,
  selectedWeight,
  onSelectWeight,
}) {
  if (!animalType) {
    return null
  }

  // Helper to capitalize first letter
  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1)

  return (
    <div>
      <label className="block text-sm font-medium">
        Select Weight *
      </label>
      <div className="grid grid-cols-3 gap-4 mt-2">
        {['thin', 'medium', 'fat'].map((weight) => {
          const capitalAnimal = capitalize(animalType)     // 'Dog', 'Cat', 'Others'
          const capitalWeight = capitalize(weight)         // 'Thin', 'Medium', 'Fat'
          const imageSrc = `/assets/images/${capitalAnimal}${capitalWeight}.png`
          return (
            <div
              key={weight}
              onClick={() => onSelectWeight(weight)}
              className={`border rounded overflow-hidden cursor-pointer p-1 ${
                selectedWeight === weight
                  ? 'ring-2 ring-blue-500'
                  : ''
              }`}
            >
              <img
                src={imageSrc}
                alt={`${capitalAnimal} ${capitalWeight}`}
                className="w-full h-20 object-contain"
              />
              <p className="text-center text-sm capitalize mt-1">
                {weight}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
