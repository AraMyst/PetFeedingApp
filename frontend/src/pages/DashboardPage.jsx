// src/pages/DashboardPage.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFoods } from '../hooks/useFoods'
import { usePets } from '../hooks/usePets'
import { useNotifications } from '../hooks/useNotifications'

/**
 * DashboardPage displays three cards:
 *  - Pets: shows number of registered pets and a button to manage pets
 *  - Food: shows number of registered foods and a button to manage foods
 *  - Notifications: shows number of alerts and a button to manage notifications
 *
 * Uses a flex container:
 *  - Each card is w-full on very small screens (stacked)
 *  - w-1/2 on small+ screens
 *  - w-1/3 on medium+ screens (side by side)
 *
 * The background matches the login/register pages (#DBF3F6).
 * Only a very small rectangular logo image is displayed at the top.
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
    <div className="bg-[#DBF3F6] min-h-screen py-8 px-4">
      {/* Very small rectangular logo at the top */}
      <div className="flex justify-center mb-8">
        <img
          src="/assets/images/logo.png"
          alt="App Logo"
          className="w-32 h-8 object-contain" /* very small rectangle */
        />
      </div>

      {/*
        Flex container:
        - flex-wrap to allow cards to wrap on small screens
        - gap-6 for spacing between cards
        - max-w-5xl mx-auto to center and constrain width
      */}
      <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
        {/* Section: Pets */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center w-full sm:w-1/2 md:w-1/3">
          <h2 className="text-xl font-semibold mb-4">Pets</h2>
          <img
            src="/assets/images/Pets.png"
            alt="Pets illustration"
            className="w-16 h-16 mb-4 object-contain" /* 64×64px */
          />
          <p className="text-2xl font-bold mb-4">{pets.length}</p>
          <button
            onClick={() => navigate('/pets')}
            className="mt-auto py-2 px-6 bg-green-500 hover:bg-green-600 text-white rounded-full shadow transform hover:-translate-y-1 transition-all"
          >
            Manage Pets
          </button>
        </div>

        {/* Section: Food */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center w-full sm:w-1/2 md:w-1/3">
          <h2 className="text-xl font-semibold mb-4">Food</h2>
          <img
            src="/assets/images/Food.png"
            alt="Food illustration"
            className="w-16 h-16 mb-4 object-contain" /* 64×64px */
          />
          <p className="text-2xl font-bold mb-4">{foods.length}</p>
          <button
            onClick={() => navigate('/foods')}
            className="mt-auto py-2 px-6 bg-green-500 hover:bg-green-600 text-white rounded-full shadow transform hover:-translate-y-1 transition-all"
          >
            Manage Foods
          </button>
        </div>

        {/* Section: Notifications */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center w-full sm:w-1/2 md:w-1/3">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <img
            src="/assets/images/Notifications.png"
            alt="Notifications illustration"
            className="w-16 h-16 mb-4 object-contain" /* 64×64px */
          />
          <p className="text-2xl font-bold mb-4">{alerts.length}</p>
          <button
            onClick={() => navigate('/notifications')}
            className="mt-auto py-2 px-6 bg-green-500 hover:bg-green-600 text-white rounded-full shadow transform hover:-translate-y-1 transition-all"
          >
            Manage Notifications
          </button>
        </div>
      </div>
    </div>
  )
}
