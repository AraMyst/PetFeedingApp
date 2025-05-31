// src/pages/DashboardPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
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
 *  - Fixed header at top with a small rectangular logo
 *  - Responsive grid:
 *      • grid-cols-1 on small screens (stacked)
 *      • md:grid-cols-3 on medium+ screens (side by side)
 *  - Each section’s title is overlaid on its image
 *  - Each section image is wrapped in a Link to its page
 *  - Buttons change color on hover and have a focus ring
 *  - Background matches login/register pages (#DBF3F6)
 */
export default function DashboardPage() {
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
      {/* Fixed header with small rectangular logo */}
      <header className="fixed top-0 left-0 w-full bg-[#DBF3F6] shadow-sm z-10">
        <div className="flex justify-center py-3">
          <img
            src="/assets/images/logo.png"
            alt="App Logo"
            className="w-[150px] h-[50px] object-contain"
          />
        </div>
      </header>

      {/* Main content has top padding to avoid being hidden under header */}
      <main className="pt-20 px-4 pb-8">
        {/*
          Responsive grid container:
          - grid-cols-1: 1 column on small screens (stacked)
          - md:grid-cols-3: 3 columns on medium+ screens (side by side)
          - gap-6: spacing between cards
          - max-w-5xl mx-auto: center horizontally and constrain width
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Section: Pets */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            {/* Container for overlaid title + linked image */}
            <div className="relative mb-4">
              <Link to="/pets">
                <img
                  src="/assets/images/Pets.png"
                  alt="Pets illustration"
                  className="w-[250px] h-[250px] object-contain"
                />
              </Link>
              <h2 className="absolute top-2 left-2 text-white bg-black bg-opacity-50 px-2 rounded">
                Pets
              </h2>
            </div>
            <p className="text-4xl font-bold mb-4">{pets.length}</p>
            <button
              onClick={() => (window.location.href = '/pets')}
              className="mt-auto py-2 px-6 bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
            >
              Manage Pets
            </button>
          </div>

          {/* Section: Food */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <div className="relative mb-4">
              <Link to="/foods">
                <img
                  src="/assets/images/Food.png"
                  alt="Food illustration"
                  className="w-[250px] h-[250px] object-contain"
                />
              </Link>
              <h2 className="absolute top-2 left-2 text-white bg-black bg-opacity-50 px-2 rounded">
                Food
              </h2>
            </div>
            <p className="text-4xl font-bold mb-4">{foods.length}</p>
            <button
              onClick={() => (window.location.href = '/foods')}
              className="mt-auto py-2 px-6 bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
            >
              Manage Foods
            </button>
          </div>

          {/* Section: Notifications */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <div className="relative mb-4">
              <Link to="/notifications">
                <img
                  src="/assets/images/Notifications.png"
                  alt="Notifications illustration"
                  className="w-[250px] h-[250px] object-contain"
                />
              </Link>
              <h2 className="absolute top-2 left-2 text-white bg-black bg-opacity-50 px-2 rounded">
                Notifications
              </h2>
            </div>
            <p className="text-4xl font-bold mb-4">{alerts.length}</p>
            <button
              onClick={() => (window.location.href = '/notifications')}
              className="mt-auto py-2 px-6 bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
            >
              Manage Notifications
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
