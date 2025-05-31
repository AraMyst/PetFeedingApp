// src/pages/FoodsPage.jsx
import React, { useState } from 'react'
import { useFoods } from '../hooks/useFoods'
import FoodList from '../components/Foods/FoodList'
import FoodForm from '../components/Foods/FoodForm'

/**
 * FoodsPage displays:
 *  - Fixed header with logo at top (same as Dashboard)
 *  - “Add New Food” button under header, aligned right
 *  - If no foods exist: show Food illustration + “Add New Food” button
 *  - Otherwise: show grid of FoodItem cards (wrapping as needed)
 *  - When “Add” or “Edit” is clicked, show FoodForm instead of list
 */
export default function FoodsPage() {
  const { foods, loading, error, createFood, updateFood, deleteFood } = useFoods()
  const [editingFood, setEditingFood] = useState(null)
  const [showForm, setShowForm] = useState(false)

  // Create handler
  const handleCreate = async (data) => {
    await createFood(data)
    setShowForm(false)
  }

  // Update handler
  const handleUpdate = async (id, data) => {
    await updateFood(id, data)
    setEditingFood(null)
    setShowForm(false)
  }

  // Delete handler
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this food?')) {
      await deleteFood(id)
    }
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

      {/* Main content with padding to clear header */}
      <main className="pt-20 px-4 pb-8 max-w-5xl mx-auto">
        {/* Top bar: Page title and Add button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Foods</h2>
          {!showForm && (
            <button
              onClick={() => { setEditingFood(null); setShowForm(true) }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add New Food
            </button>
          )}
        </div>

        {/* Loading / Error */}
        {loading && <p className="text-center text-gray-500">Loading foods...</p>}
        {error && <p className="text-center text-red-500">Error loading foods.</p>}

        {/* Show Form if requested */}
        {showForm && (
          <FoodForm
            initialData={editingFood || {}}
            onSubmit={async (data) => {
              if (editingFood) {
                await handleUpdate(editingFood._id, data)
              } else {
                await handleCreate(data)
              }
            }}
            onCancel={() => {
              setShowForm(false)
              setEditingFood(null)
            }}
          />
        )}

        {/* If no Form showing, display list or empty state */}
        {!showForm && (
          <>
            {(!foods || foods.length === 0) ? (
              <div className="flex flex-col items-center mt-16">
                <img
                  src="/assets/images/Food.png"
                  alt="No foods available"
                  className="w-[200px] h-[200px] mb-4 object-contain"
                />
                <button
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add New Food
                </button>
              </div>
            ) : (
              <FoodList
                foods={foods}
                onEdit={(food) => {
                  setEditingFood(food)
                  setShowForm(true)
                }}
                onDelete={handleDelete}
              />
            )}
          </>
        )}
      </main>
    </div>
  )
}
