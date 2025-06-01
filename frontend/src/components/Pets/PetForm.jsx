// src/components/Pets/PetForm.jsx
import React, { useState, useEffect } from 'react'
import PetImageSelector from './PetImageSelector'

/**
 * PetForm handles creation of a new pet.
 *
 * Props:
 *  - foods: Array<{ _id: string, name: string }>
 *  - onSubmit: (data: {
 *      name: string,
 *      animalType: string,
 *      age: number,
 *      ageCategory: string,
 *      weightCategory: string,
 *      allergies: string[],
 *      gramsPerMeal: number,
 *      mealsPerDay: number,
 *      food: string,
 *      image: string
 *    }) => void
 *  - onCancel?: () => void
 *
 * New fields:
 *  - animalType (dog | cat | others)
 *  - ageCategory (young | adult | old)
 *  - weightCategory (thin | medium | fat)
 *  - age (computed in years, converting months ‐ see below)
 */
export default function PetForm({ foods = [], onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const [animalType, setAnimalType] = useState('')           // 'dog' | 'cat' | 'others'
  const [ageCategory, setAgeCategory] = useState('')         // 'young' | 'adult' | 'old'
  const [ageValue, setAgeValue] = useState('')               // numeric value (months if young, years otherwise)
  const [weightCategory, setWeightCategory] = useState('')   // 'thin' | 'medium' | 'fat'
  const [allergies, setAllergies] = useState('')
  const [gramsPerMeal, setGramsPerMeal] = useState('')
  const [mealsPerDay, setMealsPerDay] = useState('')
  const [food, setFood] = useState(foods[0]?._id || '')
  const [error, setError] = useState('')

  // Whenever the list of foods changes, ensure the <select> has a default
  useEffect(() => {
    if (foods.length > 0 && !food) {
      setFood(foods[0]._id)
    }
  }, [foods, food])

  // Helper: Build age‐options based on category
  const getAgeOptions = () => {
    if (!ageCategory) return []
    if (ageCategory === 'young') {
      // 0 to 12 months
      return Array.from({ length: 13 }, (_, i) => i) // [0,1,2,...,12]
    } else if (ageCategory === 'adult') {
      // 1 to 7 years
      return Array.from({ length: 7 }, (_, i) => i + 1) // [1,2,...,7]
    } else if (ageCategory === 'old') {
      // 7 to 30 years
      return Array.from({ length: 24 }, (_, i) => i + 7) // [7,8,...,30]
    } else {
      return []
    }
  }

  // When submitting, ensure required fields and compute image + numeric age
  const handleSubmit = (e) => {
    e.preventDefault()
    const allergiesArray = allergies
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean)

    // Validate everything
    if (
      !name ||
      !animalType ||
      !ageCategory ||
      ageValue === '' ||
      !weightCategory ||
      !gramsPerMeal ||
      !mealsPerDay ||
      !food
    ) {
      setError('Please fill in all required fields.')
      return
    }

    // Compute numeric age (in years). If “young” (months), convert to decimal.
    let numericAge = Number(ageValue)
    if (ageCategory === 'young') {
      // Convert months to years with two‐decimal precision
      numericAge = Number((Number(ageValue) / 12).toFixed(2))
    }
    // Build the “image” string for this pet (used by PetItem to render the correct PNG)
    // e.g. “DogYoung” or “CatAdult” etc. (must match filenames exactly)
    const capitalizedAnimal = animalType.charAt(0).toUpperCase() + animalType.slice(1) // “Dog”, “Cat”, “Others”
    const capitalizedAgeCat =
      ageCategory.charAt(0).toUpperCase() + ageCategory.slice(1) // “Young” | “Adult” | “Old”
    const imageString = `${capitalizedAnimal}${capitalizedAgeCat}` // e.g. “DogYoung”

    onSubmit({
      name,
      animalType,
      age: numericAge,
      ageCategory,
      weightCategory,
      allergies: allergiesArray,
      gramsPerMeal: Number(gramsPerMeal),
      mealsPerDay: Number(mealsPerDay),
      food,
      image: imageString,
    })
  }

  // Helper to make a user‐friendly label under each image
  const ageLabelMap = {
    young: 'Puppy',
    adult: 'Adult',
    old: 'Senior',
  }

  const weightLabelMap = {
    thin: 'Slim',
    medium: 'Normal',
    fat: 'Plump',
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-6">
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {/* 1) Pet Name */}
      <div>
        <label className="block text-sm font-medium">Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full max-w-xs border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* 2) Animal Type Selector (dog | cat | others) */}
      <div>
        <label className="block text-sm font-medium">Select Animal *</label>
        <PetImageSelector selected={animalType} onSelect={setAnimalType} />
      </div>

      {/* 3) Age Category (young, adult, old) */}
      {animalType && (
        <div>
          <label className="block text-sm font-medium">Select Age Category *</label>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {['young', 'adult', 'old'].map((cat) => {
              // Build the correct image path based on animalType + category
              const capitalAnimal = animalType.charAt(0).toUpperCase() + animalType.slice(1) // “Dog” etc.
              const capitalCat = cat.charAt(0).toUpperCase() + cat.slice(1) // “Young” / “Adult” / “Old”
              const imageSrc = `/assets/images/${capitalAnimal}${capitalCat}.png`

              return (
                <div
                  key={cat}
                  onClick={() => {
                    setAgeCategory(cat)
                    setAgeValue('') // reset numeric age when category changes
                  }}
                  className={`border rounded overflow-hidden cursor-pointer p-1 ${
                    ageCategory === cat ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img
                    src={imageSrc}
                    alt={`${capitalAnimal} ${capitalCat}`}
                    className="w-full h-20 object-contain"
                  />
                  <p className="text-center text-sm capitalize mt-1">
                    {ageLabelMap[cat]}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* 4) Numeric Age Drop-down (based on chosen ageCategory) */}
      {ageCategory && (
        <div>
          {ageCategory === 'young' ? (
            <label className="block text-sm font-medium">Age (months) *</label>
          ) : (
            <label className="block text-sm font-medium">Age (years) *</label>
          )}
          <select
            value={ageValue}
            onChange={(e) => setAgeValue(e.target.value)}
            required
            className="mt-1 block w-full max-w-xs border border-gray-300 rounded px-3 py-2"
          >
            <option value="" disabled>
              -- Select {ageCategory === 'young' ? 'months' : 'years'} --
            </option>
            {getAgeOptions().map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 5) Weight Category Selector (thin, medium, fat) */}
      {animalType && ageCategory && (
        <div>
          <label className="block text-sm font-medium">Select Weight *</label>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {['thin', 'medium', 'fat'].map((w) => {
              const capitalAnimal = animalType.charAt(0).toUpperCase() + animalType.slice(1) // “Dog” etc.
              const capitalWeight = w.charAt(0).toUpperCase() + w.slice(1) // “Thin” / “Medium” / “Fat”
              const imageSrc = `/assets/images/${capitalAnimal}${capitalWeight}.png`

              return (
                <div
                  key={w}
                  onClick={() => setWeightCategory(w)}
                  className={`border rounded overflow-hidden cursor-pointer p-1 ${
                    weightCategory === w ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img
                    src={imageSrc}
                    alt={`${capitalAnimal} ${capitalWeight}`}
                    className="w-full h-20 object-contain"
                  />
                  <p className="text-center text-sm capitalize mt-1">
                    {weightLabelMap[w]}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* 6) Allergies, comma separated */}
      <div>
        <label className="block text-sm font-medium">Allergies, comma separated</label>
        <input
          type="text"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          className="mt-1 block w-full max-w-xs border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* 7) Grams per Meal */}
      <div>
        <label className="block text-sm font-medium">Grams per Meal *</label>
        <input
          type="number"
          value={gramsPerMeal}
          onChange={(e) => setGramsPerMeal(e.target.value)}
          required
          className="mt-1 block w-full max-w-xs border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* 8) Meals per Day */}
      <div>
        <label className="block text-sm font-medium">Meals per Day *</label>
        <input
          type="number"
          value={mealsPerDay}
          onChange={(e) => setMealsPerDay(e.target.value)}
          required
          className="mt-1 block w-full max-w-xs border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* 9) Select Food */}
      <div>
        <label className="block text-sm font-medium">Select Food *</label>
        <select
          value={food}
          onChange={(e) => setFood(e.target.value)}
          required
          className="mt-1 block w-full max-w-xs border border-gray-300 rounded px-3 py-2"
        >
          {foods.map((f) => (
            <option key={f._id} value={f._id}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      {/* 10) Buttons: Create / Cancel */}
      <div className="flex justify-center space-x-8 pt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Create Pet
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
