// src/pages/FoodEditPage.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import FoodForm from '../components/Foods/FoodForm'
import { useFoods } from '../hooks/useFoods'

/**
 * FoodEditPage loads an existing food by ID e exibe o formulário para edição.
 * Após submeter, atualiza e volta para /foods (refetch incluindo a edição).
 */
export default function FoodEditPage() {
  const { id } = useParams()
  const { foods, updateFood, fetchFoods } = useFoods()
  const navigate = useNavigate()
  const [initialData, setInitialData] = useState(null)

  // On mount ou quando a lista de foods muda, localiza o food pelo ID
  useEffect(() => {
    const existingFood = foods.find((f) => f._id === id)
    if (existingFood) {
      setInitialData(existingFood)
    } else {
      // Se não encontrar (por URL direta), volta para /foods
      navigate('/foods', { replace: true })
    }
  }, [id, foods, navigate])

  // Enquanto não houver initialData, mostra loading
  if (!initialData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#DBF3F6]">
        <p className="text-gray-500">Loading food details for editing...</p>
      </div>
    )
  }

  // Handle form submission: atualiza, refetch e redireciona
  const handleSubmit = async (data) => {
    try {
      await updateFood(id, data)
      await fetchFoods()
      navigate('/foods', { replace: true })
    } catch (err) {
      console.error('Error updating food:', err)
    }
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

      {/* Conteúdo principal */}
      <main className="pt-20 px-4 pb-8 max-w-2xl mx-auto">
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
