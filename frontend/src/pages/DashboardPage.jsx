// src/pages/DashboardPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useFoods } from '../hooks/useFoods'
import { usePets } from '../hooks/usePets'
import { useNotifications } from '../hooks/useNotifications'

export default function DashboardPage() {
  const { foods, loading: loadingFoods } = useFoods()
  const { pets, loading: loadingPets } = usePets()
  const { alerts, loading: loadingAlerts } = useNotifications()

  // Enquanto os dados estiverem carregando, exibe um spinner ou mensagem
  if (loadingFoods || loadingPets || loadingAlerts) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: '#D9F0F1' }}
      >
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ backgroundColor: '#D9F0F1' }}
    >
      {/* Título da página */}
      <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>

      {/* Container flexível para posicionar as três seções lado a lado */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-5xl mx-auto">
        {/* Section: Pets */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center w-full md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Pets</h2>
          <img
            src="/assets/images/Pets.png"
            alt="Pets illustration"
            className="w-72 h-72 mb-4 object-contain"
          />
          <p className="text-4xl font-bold mb-4">{pets.length}</p>
          <Link
            to="/pets"
            className="mt-auto py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Manage Pets
          </Link>
        </div>

        {/* Section: Food */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center w-full md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Food</h2>
          <img
            src="/assets/images/Food.png"
            alt="Food illustration"
            className="w-72 h-72 mb-4 object-contain"
          />
          <p className="text-4xl font-bold mb-4">{foods.length}</p>
          <Link
            to="/foods"
            className="mt-auto py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Manage Foods
          </Link>
        </div>

        {/* Section: Notifications */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center w-full md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
          <img
            src="/assets/images/Notifications.png"
            alt="Notifications illustration"
            className="w-72 h-72 mb-4 object-contain"
          />
          <p className="text-4xl font-bold mb-4">{alerts.length}</p>
          <Link
            to="/notifications"
            className="mt-auto py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Manage Notifications
          </Link>
        </div>
      </div>
    </div>
  )
}
