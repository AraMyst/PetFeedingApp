// src/pages/FoodCreatePage.jsx
import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useFoods } from '../hooks/useFoods'
import { useAuth } from '../contexts/AuthContext'
import FoodForm from '../components/Foods/FoodForm'

/**
 * FoodCreatePage renders a centered form to add a new food item.
 * After submitting, it navigates back to /foods and refetches the list.
 */
export default function FoodCreatePage() {
  const { createFood, fetchFoods } = useFoods()
  const { logout } = useAuth()
  const navigate = useNavigate()

  // Handle form submission: create then refetch + redirect
  const handleSubmit = async (data) => {
    try {
      await createFood(data)
      await fetchFoods()
      navigate('/foods', { replace: true })
    } catch (err) {
      console.error('Error creating food:', err)
    }
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

      {/* Main container for form, pushed below fixed header */}
      <main className="pt-16 flex flex-col items-center px-4">
        <div className="w-full max-w-xs bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-bold text-center mb-4">Add Food</h2>

          {/* Food illustration below title */}
          <div className="flex justify-center mb-4">
            <img
              src="/assets/images/Food.png"
              alt="Food Illustration"
              className="w-[200px] h-[200px] object-contain"
            />
          </div>

          {/* FoodForm for creating a new food */}
          <FoodForm
            initialData={{ name: '', brand: '', specifications: [], weight: '', buyLinks: [] }}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/foods')}
          />
        </div>
      </main>
    </div>
  )
}
