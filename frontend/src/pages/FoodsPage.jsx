// src/pages/FoodsPage.jsx
import React, { useEffect } from 'react'
import { useFoods } from '../hooks/useFoods'
import FoodList from '../components/Foods/FoodList'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

/**
 * FoodsPage displays:
 *  - Fixed header with logo linking to Dashboard and a logout button
 *  - Below header: Food illustration + “Add New Food” button (sempre visíveis)
 *  - Espaço extra em cima (pt-20) para não cortar a imagem com a header fixa
 *  - Se não houver alimentos (ou ocorreu erro), mensagem “No foods registered.”
 *  - Senão, lista flexível de FoodItem cards que quebra em várias linhas
 */
export default function FoodsPage() {
  const { foods, loading, error, deleteFood, fetchFoods } = useFoods()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    fetchFoods()
  }, [location.pathname, fetchFoods])

  const handleAddNew = () => {
    navigate('/foods/new')
  }

  const handleEdit = (food) => {
    navigate(`/foods/${food._id}/edit`)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this food?')) {
      await deleteFood(id)
      await fetchFoods()
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  // Enquanto carrega, exibe mensagem de loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#DBF3F6]">
        <p className="text-gray-500">Loading foods...</p>
      </div>
    )
  }

  return (
    <div className="bg-[#DBF3F6] min-h-screen">
      {/* Header fixo */}
      <header className="fixed top-0 left-0 w-full bg-[#DBF3F6] shadow-sm z-10 h-16">
        <div className="h-full flex items-center justify-between px-4">
          <Link to="/dashboard">
            <img
              src="/assets/images/logo.png"
              alt="App Logo"
              className="w-[150px] h-[50px] object-contain"
            />
          </Link>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-teal-400 text-white rounded hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300 text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* 
        pt-20 = 5rem (80px) garante espaço em cima para não “cortar” a imagem. 
        Ajuste para pt-24 (6rem = 96px) se ainda estiver cortando.
      */}
      <main className="pt-20 px-4 pb-8 max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <img
            src="/assets/images/Food.png"
            alt="Food Illustration"
            className="w-[200px] h-[200px] mb-4"
          />
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add New Food
          </button>
        </div>

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
