// src/pages/FoodsPage.jsx
import React, { useEffect } from 'react'
import { useFoods } from '../hooks/useFoods'
import FoodList from '../components/Foods/FoodList'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

/**
 * FoodsPage displays:
 *  - A fixed header with a logo linking to Dashboard and a logout button
 *  - Below the header: a Food illustration + “Add New Food” button (always visible)
 *  - If no foods exist (or an error occurred), show “No foods registered.”
 *  - Otherwise, show a centered 3-column grid of FoodItem cards under the image/button
 *  - “Edit” button on each card navigates to /foods/:id/edit
 */
export default function FoodsPage() {
  const { foods, loading, error, deleteFood, fetchFoods } = useFoods()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Whenever the path is /foods, reload the list
  useEffect(() => {
    fetchFoods()
  }, [location.pathname, fetchFoods])

  // Navigate to the create form
  const handleAddNew = () => {
    navigate('/foods/new')
  }

  // Navigate to the edit screen for a specific food
  const handleEdit = (food) => {
    navigate(`/foods/${food._id}/edit`)
  }

  // Delete a food, then reload the list
  // (actual confirmation happens in FoodItem.handleDeleteClick)
  const handleDelete = async (id) => {
    await deleteFood(id)
    await fetchFoods()
  }

  // Handle logout and redirect to login
  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  // While data is loading, show “Loading foods...”
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#DBF3F6]">
        <p className="text-gray-500">Loading foods...</p>
      </div>
    )
  }

  return (
    <div className="bg-[#DBF3F6] min-h-screen">
      {/*
        Fixed header with logo linking to Dashboard and logout button.
        Height: 4rem (h-16 = 64px).
      */}
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

      {/*
        Main content uses .main-content to push it below the fixed header.
        .main-content = padding-top: 3rem (48px), defined in index.css.
      */}
      <main className="main-content px-4 pb-8">
        {/*
          Food illustration and “Add New Food” button.
          mb-12 gives extra vertical space (3rem = 48px) before showing cards.
        */}
        <div className="flex flex-col items-center mb-12">
          <img
            src="/assets/images/Food.png"
            alt="Food Illustration"
            className="w-[200px] h-[200px] mb-4 object-contain"
          />
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add New Food
          </button>
        </div>

        {/*
          If there is an error or no foods, show “No foods registered.”
          Otherwise, wrap the fixed 3-column grid in a max-width container (960px)
          and center it with mx-auto.
        */}
        {(!foods || foods.length === 0 || error) ? (
          <p className="text-center text-gray-500">No foods registered.</p>
        ) : (
          <div className="max-w-[960px] mx-auto">
            <FoodList
              foods={foods}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}
      </main>
    </div>
  )
}
