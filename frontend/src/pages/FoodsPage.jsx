// src/pages/FoodsPage.jsx
import React, { useEffect } from 'react'
import { useFoods } from '../hooks/useFoods'
import FoodList from '../components/Foods/FoodList'
import { useNavigate, useLocation } from 'react-router-dom'

/**
 * FoodsPage displays:
 *  - Fixed header with logo at top (same as Dashboard)
 *  - “Add New Food” button under header, aligned right
 *  - If no foods (or if an error occurred), show Food illustration + “No foods registered.” + “Add New Food” button
 *  - Otherwise, show responsive grid of FoodItem cards
 *  - “Edit” button on each card navigates to /foods/:id/edit
 */
export default function FoodsPage() {
  const { foods, loading, error, deleteFood, fetchFoods } = useFoods()
  const navigate = useNavigate()
  const location = useLocation()

  // Sempre que a rota for /foods, recarrega a lista
  useEffect(() => {
    fetchFoods()
  }, [location.pathname, fetchFoods])

  // Navega para o create form
  const handleAddNew = () => {
    navigate('/foods/new')
  }

  // Navega para o edit screen de um alimento específico
  const handleEdit = (food) => {
    navigate(`/foods/${food._id}/edit`)
  }

  // Deleta um alimento após confirmação
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this food?')) {
      await deleteFood(id)
      await fetchFoods()
    }
  }

  // Enquanto carrega dados, mostra “Loading”
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#DBF3F6]">
        <p className="text-gray-500">Loading foods...</p>
      </div>
    )
  }

  return (
    <div className="bg-[#DBF3F6] min-h-screen">
      {/* Fixed header com logo */}
      <header className="fixed top-0 left-0 w-full bg-[#DBF3F6] shadow-sm z-10">
        <div className="flex justify-center py-3">
          <img
            src="/assets/images/logo.png"
            alt="App Logo"
            className="w-[150px] h-[50px] object-contain"
          />
        </div>
      </header>

      {/* Conteúdo principal com padding para não ficar atrás do header */}
      <main className="pt-20 px-4 pb-8 max-w-5xl mx-auto">
        {/* Top bar: título + botão “Add New Food” */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Foods</h2>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add New Food
          </button>
        </div>

        {/* Se erro OU não houver alimentos, exibe estado vazio */}
        {(!foods || foods.length === 0 || error) ? (
          <div className="flex flex-col items-center mt-16">
            <img
              src="/assets/images/Food.png"
              alt="No foods available"
              className="w-[200px] h-[200px] mb-4 object-contain"
            />
            <p className="text-center text-gray-500 mb-4">No foods registered.</p>
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add New Food
            </button>
          </div>
        ) : (
          /* Caso contrário, exibe grid responsivo de cards */
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
