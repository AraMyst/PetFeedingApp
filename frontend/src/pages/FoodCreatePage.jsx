// src/pages/FoodCreatePage.jsx
import React from 'react'
import FoodForm from '../components/Foods/FoodForm'
import { useFoods } from '../hooks/useFoods'
import { useNavigate } from 'react-router-dom'


export default function FoodCreatePage() {
  const { createFood } = useFoods()
  const navigate = useNavigate()

  
  const handleSubmit = async (data) => {
    await createFood(data)
    navigate('/foods', { replace: true })
  }

  return (
    <div className="bg-[#DBF3F6] min-h-screen">
      {}
      <header className="fixed top-0 left-0 w-full bg-[#DBF3F6] shadow-sm z-10">
        <div className="flex justify-center py-3">
          <img
            src="/assets/images/logo.png"
            alt="App Logo"
            className="w-[150px] h-[50px] object-contain"
          />
        </div>
      </header>

      {}
      <main className="pt-20 px-4 pb-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Food</h2>
        <FoodForm
          initialData={{ name: '', brand: '', specifications: [], weight: '', buyLinks: [] }}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/foods')}
        />
      </main>
    </div>
  )
}
