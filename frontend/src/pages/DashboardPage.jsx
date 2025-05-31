// src/pages/DashboardPage.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFoods } from '../hooks/useFoods'
import { usePets } from '../hooks/usePets'
import { useNotifications } from '../hooks/useNotifications'

/**
 * DashboardPage displays three main cards:
 *  - Pets: shows number of registered pets and a button to manage pets
 *  - Food: shows number of registered foods and a button to manage foods
 *  - Notifications: shows number of alerts and a button to manage notifications
 *
 * Features:
 *  - Fixed header at top with logo image
 *  - Responsive grid:
 *      • grid-cols-1 on small screens (stacked)
 *      • md:grid-cols-3 on medium+ screens (side by side)
 *  - Buttons change background color on hover (like login page)
 *  - Background matches login/register (#DBF3F6)
 */
export default function DashboardPage() {
  const navigate = useNavigate()
  const { foods, loading: loadingFoods } = useFoods()
  const { pets, loading: loadingPets } = usePets()
  const { alerts, loading: loadingAlerts } = useNotifications()

  // While any data is loading, show a centered loading message
  if (loadingFoods || loadingPets || loadingAlerts) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#DBF3F6]">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="bg-[#DBF3F6] min-h-screen">
      {/* Fixed header with small square logo */}
      <header className="fixed top-0 left-0 w-full bg-[#DBF3F6] shadow-sm z-10">
        <div className="flex justify-center py-2">
          <img
            src="/assets/images/logo.png"
            alt="App Logo"
            className="w-[100px] h-[40px] object-contain"
          />
        </div>
      </header>

      {/* Main content needs top padding to avoid header overlap */}
      <main className="pt-16 px-4 pb-8">
        {/*
          Responsive grid:
          - grid-cols-1: 1 column on small screens
          - md:grid-cols-3: 3 columns on medium+ screens
          - gap-6: spacing between cards
          - max-w-5xl mx-auto: center horizontally, constrain width
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Section: Pets */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">Pets</h2>
            <img
              src="/assets/images/Pets.png"
              alt="Pets illustration"
              className="w-[250px] h-[250px] mb-4 object-contain"
            />
            <p className="text-4xl font-bold mb-4">{pets.length}</p>
            <button
              onClick={() => navigate('/pets')}
              className="mt-auto py-2 px-6 bg-green-500 hover:bg-green-700 text-white rounded-full shadow-md transition-colors"
            >
              Manage Pets
            </button>
          </div>

          {/* Section: Food */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">Food</h2>
            <img
              src="/assets/images/Food.png"
              alt="Food illustration"
              className="w-[250px] h-[250px] mb-4 object-contain"
            />
            <p className="text-4xl font-bold mb-4">{foods.length}</p>
            <button
              onClick={() => navigate('/foods')}
              className="mt-auto py-2 px-6 bg-green-500 hover:bg-green-700 text-white rounded-full shadow-md transition-colors"
            >
              Manage Foods
            </button>
          </div>

          {/* Section: Notifications */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
            <img
              src="/assets/images/Notifications.png"
              alt="Notifications illustration"
              className="w-[250px] h-[250px] mb-4 object-contain"
            />
            <p className="text-4xl font-bold mb-4">{alerts.length}</p>
            <button
              onClick={() => navigate('/notifications')}
              className="mt-auto py-2 px-6 bg-green-500 hover:bg-green-700 text-white rounded-full shadow-md transition-colors"
            >
              Manage Notifications
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
