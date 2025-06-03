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
 *
 * Changes:
 *  - All selector‐images (animal, age, weight) are 80×80px with internal padding.
 *  - “Allergies” label no longer mentions commas.
 *  - Each grid wrapper has additional padding (`px-4`) so cards don’t touch form edges.
 *  - Added more horizontal spacing between “Create Pet” and “Cancel” (using `space-x-10`).
 */
export default function PetForm({ foods = [], onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const [animalType, setAnimalType] = useState('')           // 'dog' | 'cat' | 'others'
  const [ageCategory, setAgeCategory] = useState('')         // 'young' | 'adult' | 'old'
  const [ageValue, setAgeValue] = useState('')               // numeric (months if young, years otherwise)
  const [weightCategory, setWeightCategory] = useState('')   // 'thin' | 'medium' | 'fat'
  const [allergies, setAllergies] = useState('')
  const [gramsPerMeal, setGramsPerMeal] = useState('')
  const [mealsPerDay, setMealsPerDay] = useState('')
  const [food, setFood] = useState('')                      // start empty so user sees the dropdown
  const [error, setError] = useState('')

  // Whenever the list of foods changes, auto-select the first if none chosen yet
  useEffect(() => {
    if (foods.length > 0 && food === '') {
      setFood(foods[0]._id)
    }
  }, [foods, food])

  // Build age‐options based on category
  const getAgeOptions = () => {
    if (!ageCategory) return []
    if (ageCategory === 'young') {
      // 0 to 12 months
      return Array.from({ length: 13 }, (_, i) => i)
    } else if (ageCategory === 'adult') {
      // 1 to 7 years
      return Array.from({ length: 7 }, (_, i) => i + 1)
    } else if (ageCategory === 'old') {
      // 7 to 30 years
      return Array.from({ length: 24 }, (_, i) => i + 7)
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

    // Validate required fields
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
      numericAge = Number((Number(ageValue) / 12).toFixed(2))
    }

    // Build the “image” string (e.g. “DogYoung”)
    const capitalizedAnimal =
      animalType.charAt(0).toUpperCase() + animalType.slice(1) // “Dog”, “Cat”, “Others”
    const capitalizedAgeCat =
      ageCategory.charAt(0).toUpperCase() + ageCategory.slice(1) // “Young” | “Adult” | “Old”
    const imageString = `${capitalizedAnimal}${capitalizedAgeCat}`

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

  // Labels under each age image
  const ageLabelMap = {
    young: 'Puppy',
    adult: 'Adult',
    old: 'Senior',
  }

  // Labels under each weight image
  const weightLabelMap = {
    thin: 'Slim',
    medium: 'Normal',
    fat: 'Plump',
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {/* 1) Pet Name */}
      <div>
        <label className="block text-sm font-medium text-center">Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full max-w-[200px] mx-auto border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 2) Animal Type Selector (dog | cat | others) */}
      <div>
        <label className="block text-sm font-medium text-center">Select Animal *</label>
        <PetImageSelector selected={animalType} onSelect={setAnimalType} />
      </div>

      {/* 3) Age Category (young, adult, old) */}
      {animalType && (
        <div>
          <label className="block text-sm font-medium text-center">
            Select Age Category *
          </label>
          <div className="grid grid-cols-3 gap-4 mt-2 px-4">
            {['young', 'adult', 'old'].map((cat) => {
              const capitalAnimal =
                animalType.charAt(0).toUpperCase() + animalType.slice(1)
              const capitalCat = cat.charAt(0).toUpperCase() + cat.slice(1)
              const imageSrc = `/assets/images/${capitalAnimal}${capitalCat}.png`
              return (
                <div
                  key={cat}
                  onClick={() => {
                    setAgeCategory(cat)
                    setAgeValue('')
                  }}
                  className={`border rounded overflow-hidden cursor-pointer bg-white p-2 flex flex-col items-center ${
                    ageCategory === cat ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img
                    src={imageSrc}
                    alt={`${capitalAnimal} ${capitalCat}`}
                    className="w-[80px] h-[80px] object-contain"
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

      {/* 4) Numeric Age Drop-down */}
      {ageCategory && (
        <div>
          {ageCategory === 'young' ? (
            <label className="block text-sm font-medium text-center">
              Age (months) *
            </label>
          ) : (
            <label className="block text-sm font-medium text-center">
              Age (years) *
            </label>
          )}
          <select
            value={ageValue}
            onChange={(e) => setAgeValue(e.target.value)}
            required
            className="mt-1 block w-full max-w-[200px] mx-auto border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          <label className="block text-sm font-medium text-center">
            Select Weight *
          </label>
          <div className="grid grid-cols-3 gap-4 mt-2 px-4">
            {['thin', 'medium', 'fat'].map((w) => {
              const capitalAnimal =
                animalType.charAt(0).toUpperCase() + animalType.slice(1)
              const capitalWeight = w.charAt(0).toUpperCase() + w.slice(1)
              const imageSrc = `/assets/images/${capitalAnimal}${capitalWeight}.png`
              return (
                <div
                  key={w}
                  onClick={() => setWeightCategory(w)}
                  className={`border rounded overflow-hidden cursor-pointer bg-white p-2 flex flex-col items-center ${
                    weightCategory === w ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img
                    src={imageSrc}
                    alt={`${capitalAnimal} ${capitalWeight}`}
                    className="w-[80px] h-[80px] object-contain"
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

      {/* 6) Allergies */}
      <div>
        <label className="block text-sm font-medium text-center">Allergies</label>
        <input
          type="text"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          className="mt-1 block w-full max-w-[200px] mx-auto border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 7) Grams per Meal */}
      <div>
        <label className="block text-sm font-medium text-center">
          Grams per Meal *
        </label>
        <input
          type="number"
          value={gramsPerMeal}
          onChange={(e) => setGramsPerMeal(e.target.value)}
          required
          className="mt-1 block w-full max-w-[200px] mx-auto border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 8) Meals per Day */}
      <div>
        <label className="block text-sm font-medium text-center">
          Meals per Day *
        </label>
        <input
          type="number"
          value={mealsPerDay}
          onChange={(e) => setMealsPerDay(e.target.value)}
          required
          className="mt-1 block w-full max-w-[200px] mx-auto border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 9) Select Food */}
      <div>
        <label className="block text-sm font-medium text-center">
          Select Food *
        </label>
        <select
          value={food}
          onChange={(e) => setFood(e.target.value)}
          required
          className="mt-1 block w-full max-w-[200px] mx-auto border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {foods.map((f) => (
            <option key={f._id} value={f._id}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      {/* 10) Buttons: Create / Cancel */}
      <div className="mt-8 flex justify-center space-x-10">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Create Pet
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
