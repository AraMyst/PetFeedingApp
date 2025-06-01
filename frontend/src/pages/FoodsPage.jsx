import React, { useEffect } from 'react'
import { useFoods } from '../hooks/useFoods'
import FoodList from '../components/Foods/FoodList'
import { useNavigate, useLocation, Link } from 'react-router-dom'

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
      {/**
        * Fixed header with logo linking to Dashboard.
        * We give it a fixed height of 64px (h-16). 
        */}
      <header className="fixed top-0 left-0 w-full bg-[#DBF3F6] shadow-sm z-10 h-16">
        <div className="h-full flex items-center justify-center">
          <Link to="/dashboard">
            <img
              src="/assets/images/logo.png"
              alt="App Logo"
              className="w-[150px] h-[50px] object-contain"
            />
          </Link>
        </div>
      </header>

      {/**
        * Main content with padding-top equal to header height (16 = 4rem = 64px).
        * That way, nothing fica atrás do header fixo.
        */}
      <main className="pt-16 px-4 pb-8 max-w-5xl mx-auto">
        {/**
          * Always-visible section: 
          *   - mt-8 to push nossa “Food” image um pouco abaixo do header.
          *   - mb-8 para espaçamento inferior.
          */}
        <div className="flex flex-col items-center mt-8 mb-8">
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

        {/**
          * If there is an error or no foods, show “No foods registered.”
          * Otherwise, display the responsive grid of FoodItem cards.
          */}
        {(!foods || foods.length === 0 || error) ? (
          <p className="text-center text-gray-500">No foods registered.</p>
        ) : (
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
