// src/pages/FoodEditPage.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import FoodForm from '../components/Foods/FoodForm'
import { useFoods } from '../hooks/useFoods'

/**
 * FoodEditPage loads an existing food by ID and displays it in FoodForm for editing.
 * After submission, it navigates back to /foods.
 */
export default function FoodEditPage() {
  const { id } = useParams()
  const { foods, updateFood } = useFoods()
  const navigate = useNavigate()
  const [initialData, setInitialData] = useState(null)

  // On mount or when foods change, find the food with matching ID
  useEffect(() => {
    const existingFood = foods.find((f) => f._id === id)
    if (existingFood) {
      setInitialData(existingFood)
    } else {
      // If not found (e.g., direct URL load), redirect back to /foods
      navigate('/foods', { replace: true })
    }
  }, [id, foods, navigate])

  // While waiting for initialData, show a loading state
  if (!initialData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#DBF3F6]">
        <p className="text-gray-500">Loading food details for editing...</p>
      </div>
    )
  }

  // Handle form submission: update then navigate back
  const handleSubmit = async (data) => {
    await updateFood(id, data)
    navigate('/foods', { replace: true })
  }

  return (
    <div className="bg-[#DBF3F6] min-h-screen flex flex-col items-center pt-20 px-4">
      {/* Fixed header with logo */}
      <header className="fixed top-0 left-0 w-full bg-[#DBF3F6] shadow-sm z-10">
        <div className="flex justify-center py-3">
          <img
            src="/assets/images/logo.png"
            alt="App Logo"
            className="w-[150px] h-[50px] object-contain"
          />
        </div>
      </header>

      {/* Main container for form */}
      <main className="mt-16 w-full max-w-xs bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Edit Food</h2>

        {/* Food illustration below title */}
        <div className="flex justify-center mb-4">
          <img
            src="/assets/images/Food.png"
            alt="Food Illustration"
            className="w-[200px] h-[200px] object-contain"
          />
        </div>

        {/* FoodForm receives smaller inputs and spaced buttons */}
        <FoodForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/foods')}
        />
      </main>
    </div>
  )
}
