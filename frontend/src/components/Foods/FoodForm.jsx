// src/components/Foods/FoodForm.jsx
import React, { useState, useEffect } from 'react'

/**
 * FoodForm allows creating or editing a food item.
 * Props:
 *  - initialData: object with existing food values or defaults
 *  - onSubmit: function({ name, brand, specifications, weight, buyLinks })
 *  - onCancel: optional function to cancel and close the form
 */
export default function FoodForm({
  initialData = {
    name: '',
    brand: '',
    specifications: [],
    weight: '',
    buyLinks: [],
  },
  onSubmit,
  onCancel,
}) {
  // Local state for each field
  const [name, setName] = useState(initialData.name)
  const [brand, setBrand] = useState(initialData.brand)
  // Join existing array into comma-separated string
  const [specifications, setSpecifications] = useState(
    initialData.specifications.join(', ')
  )
  const [weight, setWeight] = useState(initialData.weight)
  const [buyLinks, setBuyLinks] = useState(
    (initialData.buyLinks || []).join(', ')
  )
  const [error, setError] = useState('')

  // If initialData changes (e.g., switching from “edit” to “add”), reset form fields
  useEffect(() => {
    setName(initialData.name || '')
    setBrand(initialData.brand || '')
    setSpecifications((initialData.specifications || []).join(', '))
    setWeight(initialData.weight || '')
    setBuyLinks((initialData.buyLinks || []).join(', '))
    setError('')
  }, [initialData])

  const handleSubmit = (e) => {
    e.preventDefault()

    // Convert comma-separated strings back into arrays (trimmed, nonempty)
    const specsArray = specifications
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    const linksArray = buyLinks
      .split(',')
      .map((l) => l.trim())
      .filter(Boolean)

    // Validate required fields
    if (!name || !brand || !weight) {
      setError('Please fill in name, brand, and weight')
      return
    }

    // Call onSubmit with number-converted weight and arrays for specs & links
    onSubmit({
      name,
      brand,
      specifications: specsArray,
      weight: Number(weight),
      buyLinks: linksArray,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md space-y-4 max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold">
        {initialData._id ? 'Edit Food' : 'Add Food'}
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      {/* Name field */}
      <div>
        <label
          htmlFor="food-name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="food-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Brand field */}
      <div>
        <label
          htmlFor="food-brand"
          className="block text-sm font-medium text-gray-700"
        >
          Brand
        </label>
        <input
          id="food-brand"
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Specifications field */}
      <div>
        <label
          htmlFor="food-specs"
          className="block text-sm font-medium text-gray-700"
        >
          Specifications (comma separated)
        </label>
        <input
          id="food-specs"
          type="text"
          value={specifications}
          onChange={(e) => setSpecifications(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Weight field */}
      <div>
        <label
          htmlFor="food-weight"
          className="block text-sm font-medium text-gray-700"
        >
          Weight (grams)
        </label>
        <input
          id="food-weight"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Buy Links field */}
      <div>
        <label
          htmlFor="food-links"
          className="block text-sm font-medium text-gray-700"
        >
          Buy Links (comma separated)
        </label>
        <input
          id="food-links"
          type="text"
          value={buyLinks}
          onChange={(e) => setBuyLinks(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Buttons */}
      <div className="flex space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {initialData._id ? 'Update Food' : 'Create Food'}
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
