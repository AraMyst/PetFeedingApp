// src/pages/DashboardPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useFoods } from '../hooks/useFoods'
import { usePets } from '../hooks/usePets'
import { useNotifications } from '../hooks/useNotifications'

/**
 * DashboardPage displays three main sections side by side:
 *  - Pets: shows number of registered pets and a button to manage pets
 *  - Food: shows number of registered foods and a button to manage foods
 *  - Notifications: shows number of alerts and a button to manage notifications
 * 
 * Background is set to match login/register pages (#D9F0F1). 
 * The project title (“PetFeedingApp”) is displayed with favicon.
 */
export default function DashboardPage() {
  const { foods, loading: loadingFoods } = useFoods()
  const { pets, loading: loadingPets } = usePets()
  const { alerts, loading: loadingAlerts } = useNotifications()

  // While any data is loading, show a centered loading message
  if (loadingFoods || loadingPets || loadingAlerts) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#D9F0F1]">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="bg-[#D9F0F1] min-h-screen py-8 px-4">
      {/* Project title with favicon */}
      <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center space-x-2">
        <img
          src="/favicon.ico"
          alt="App Icon"
          className="w-8 h-8"
        />
        <span>PetFeedingApp</span>
      </h1>

      {/* 
        Container with flexbox to display three cards side by side on md+ screens,
        and stacked in a column on small screens.
      */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 max-w-5xl mx-auto">
        {/* Pets Section */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center flex-1">
          <h2 className="text-2xl font-semibold mb-4">Pets</h2>
          <img
            src="/assets/images/Pets.png"
            alt="Pets illustration"
            className="w-[250px] h-[250px] mb-4 object-contain"
          />
          <p className="text-4xl font-bold mb-4">{pets.length}</p>
          <Link
            to="/pets"
            className="mt-auto py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Manage Pets
          </Link>
        </div>

        {/* Food Section */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center flex-1">
          <h2 className="text-2xl font-semibold mb-4">Food</h2>
          <img
            src="/assets/images/Food.png"
            alt="Food illustration"
            className="w-[250px] h-[250px] mb-4 object-contain"
          />
          <p className="text-4xl font-bold mb-4">{foods.length}</p>
          <Link
            to="/foods"
            className="mt-auto py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Manage Foods
          </Link>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center flex-1">
          <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
          <img
            src="/assets/images/Notifications.png"
            alt="Notifications illustration"
            className="w-[250px] h-[250px] mb-4 object-contain"
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
