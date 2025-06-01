// src/pages/FoodEditPage.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import FoodForm from '../components/Foods/FoodForm'
import { useFoods } from '../hooks/useFoods'
import { useAuth } from '../contexts/AuthContext'

/**
 * FoodEditPage loads an existing food by ID and displays it in FoodForm for editing.
 * After submission, it navigates back to /foods.
 */
export default function FoodEditPage() {
  const { id } = useParams()
  const { foods, updateFood, fetchFoods } = useFoods()
  const { logout } = useAuth()
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
    await fetchFoods()
    navigate('/foods', { replace: true })
  }

  // Handle logout and redirect to login
  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="bg-[#DBF3F6] min-h-screen">
      {/* Fixed header with logo linking to Dashboard and logout button */}
      <header className="fixed top-0 left-0 w-full bg-[#DBF3F6] shadow-sm z-10 h-16">
        <div className="h-full flex items-center justify-between px-4">
          {/* Logo that links back to Dashboard */}
          <Link to="/dashboard">
            <img
              src="/assets/images/logo.png"
              alt="App Logo"
              className="w-[150px] h-[50px] object-contain"
            />
          </Link>

          {/* Discreet logout button in turquoise-blue */}
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-teal-400 text-white rounded hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300 text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content with padding-top equal to header height (4rem = 64px) */}
      <main className="pt-16 px-4 pb-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Food</h2>
        <FoodForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/foods')}
        />
      </main>
    </div>
  )
}
