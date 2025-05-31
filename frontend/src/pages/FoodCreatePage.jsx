// src/pages/FoodCreatePage.jsx
import React from 'react'
import FoodForm from '../components/Foods/FoodForm'
import { useFoods } from '../hooks/useFoods'
import { useNavigate } from 'react-router-dom'

/**
 * FoodCreatePage renders a centered form to add a new food item.
 * After submitting, it navigates back to /foods.
 */
export default function FoodCreatePage() {
  const { createFood } = useFoods()
  const navigate = useNavigate()

  // Handle form submission: create and redirect back to /foods
  const handleSubmit = async (data) => {
    await createFood(data)
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
      <main className="mt-16 w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Add Food</h2>

        {/* Food illustration below title */}
        <div className="flex justify-center mb-4">
          <img
            src="/assets/images/Food.png"
            alt="Food Illustration"
            className="w-24 h-24 object-contain"
          />
        </div>

        {/* FoodForm receives smaller inputs and spaced buttons */}
        <FoodForm
          initialData={{ name: '', brand: '', specifications: [], weight: '', buyLinks: [] }}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/foods')}
        />
      </main>
    </div>
  )
}
