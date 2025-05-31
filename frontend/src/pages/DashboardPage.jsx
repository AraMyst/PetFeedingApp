// src/pages/DashboardPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useFoods } from '../hooks/useFoods'
import { usePets } from '../hooks/usePets'
import { useNotifications } from '../hooks/useNotifications'

import petsImage from '../images/Pets.png'
import foodImage from '../images/Food.png'
import notificationsImage from '../images/Notifications.png'

export default function DashboardPage() {
  const { foods, loading: loadingFoods } = useFoods()
  const { pets, loading: loadingPets } = usePets()
  const { alerts, loading: loadingAlerts } = useNotifications()

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
      <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Pets Section */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Pets</h2>
          <img src={petsImage} alt="Pets illustration" className="w-32 h-32 mb-4" />
          <p className="text-4xl font-bold mb-4">{pets.length}</p>
          <Link
            to="/pets"
            className="mt-auto py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Manage Pets
          </Link>
        </div>

        {/* Food Section */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Food</h2>
          <img src={foodImage} alt="Food illustration" className="w-32 h-32 mb-4" />
          <p className="text-4xl font-bold mb-4">{foods.length}</p>
          <Link
            to="/foods"
            className="mt-auto py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Manage Foods
          </Link>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
          <img
            src={notificationsImage}
            alt="Notifications illustration"
            className="w-32 h-32 mb-4"
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
