// src/pages/DashboardPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useFoods } from '../hooks/useFoods'
import { usePets } from '../hooks/usePets'
import { useNotifications } from '../hooks/useNotifications'

/**
 * DashboardPage displays three main cards side by side on md+ screens:
 *  - Pets: shows the number of registered pets and a link to manage pets
 *  - Food: shows the number of registered foods and a link to manage foods
 *  - Notifications: shows the number of alerts and a link to manage notifications
 *
 * The background matches the login/register pages (#DBF3F6).
 * The project title (“PetFeedingApp”) is displayed with the favicon icon.
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
    <div className="bg-[#DBF3F6] min-h-screen py-8 px-4">
      {/* Project title with favicon */}
      <h1 className="flex items-center justify-center text-3xl font-bold mb-8">
        <img src="/favicon.ico" alt="App Icon" className="w-8 h-8 mr-2" />
        <span>PetFeedingApp</span>
      </h1>

      {/*
        Grid container:
        - On small screens: single column (stacked vertically)
        - On md+ screens: three equal columns (side by side)
        - Gap between items: gap-6
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Section: Pets */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Pets</h2>
          <img
            src="/assets/images/Pets.png"
            alt="Pets illustration"
            className="w-32 h-32 mb-4 object-contain"
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
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Food</h2>
          <img
            src="/assets/images/Food.png"
            alt="Food illustration"
            className="w-32 h-32 mb-4 object-contain"
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
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
          <img
            src="/assets/images/Notifications.png"
            alt="Notifications illustration"
            className="w-32 h-32 mb-4 object-contain"
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
