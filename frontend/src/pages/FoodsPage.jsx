// src/pages/FoodsPage.jsx
import React, { useEffect } from 'react'
import { useFoods } from '../hooks/useFoods'
import FoodList from '../components/Foods/FoodList'
import { useNavigate, useLocation } from 'react-router-dom'

/**
 * FoodsPage displays:
 *  - Fixed header with logo at top (same as Dashboard)
 *  - Below header: Food illustration + “Add New Food” button (always visible)
 *  - If no foods exist (or an error occurred), show “No foods registered.” message under the image/button
 *  - Otherwise, show a responsive grid of FoodItem cards under the image/button
 *  - “Edit” button on each card navigates to /foods/:id/edit
 */
export default function FoodsPage() {
  const { foods, loading, error, deleteFood, fetchFoods } = useFoods()
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

  // Delete a food after confirmation, then reload list
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this food?')) {
      await deleteFood(id)
      await fetchFoods()
    }
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

      {/* Main content with extra top padding so header does not overlap */}
      <main className="pt-24 px-4 pb-8 max-w-5xl mx-auto">
        {/* Always-visible section: Image + Add button */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="/assets/images/Food.png"
            alt="Food Illustration"
            className="w-[180px] h-[180px] mb-4 object-contain"
            style={{ marginTop: '1rem' }} /* push it slightly below header */
          />
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add New Food
          </button>
        </div>

        {/* If there is an error or no foods, show "No foods registered." */}
        {(!foods || foods.length === 0 || error) ? (
          <p className="text-center text-gray-500">No foods registered.</p>
        ) : (
          /* Otherwise, display the responsive grid of FoodItem cards */
          <FoodList
            foods={foods}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  )
}
