// src/pages/DashboardPage.jsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFoods } from '../hooks/useFoods'
import { usePets } from '../hooks/usePets'
import { useNotifications } from '../hooks/useNotifications'
import { useAuth } from '../contexts/AuthContext'

/**
 * DashboardPage displays three main cards:
 *  - Pets: shows number of registered pets and a button to manage pets
 *  - Food: shows number of registered foods and a button to manage foods
 *  - Notifications: shows number of alerts and a button to manage notifications
 *
 * Features:
 *  - Fixed header at top with a small rectangular logo and logout button
 *  - Responsive flex layout:
 *      • flex-col on small screens (stacked vertically)
 *      • md:flex-row on medium+ screens (side by side)
 *  - Section title centered under its image
 *  - Count centered under title
 *  - Button centered under count
 *  - Buttons change color on hover and have a focus ring
 *  - Background matches login/register pages (#DBF3F6)
 */
export default function DashboardPage() {
  const { foods, loading: loadingFoods } = useFoods()
  const { pets, loading: loadingPets } = usePets()
  const { alerts, loading: loadingAlerts } = useNotifications()
  const { logout } = useAuth()
  const navigate = useNavigate()

  // While any data is loading, show a centered loading message
  if (loadingFoods || loadingPets || loadingAlerts) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#DBF3F6]">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    )
  }

  // Handle user logout
  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="bg-[#DBF3F6] min-h-screen">
      {/* Fixed header with logo and logout button */}
      <header className="fixed top-0 left-0 w-full bg-[#DBF3F6] shadow-sm z-10 h-16">
        <div className="h-full flex items-center justify-between px-4">
          {/* Logo links to Dashboard */}
          <Link to="/dashboard">
            <img
              src="/assets/images/logo.png"
              alt="App Logo"
              className="w-[150px] h-[50px] object-contain"
            />
          </Link>

          {/* Discreet logout button in turquoise-blue */}
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-teal-400 text-white rounded hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300 text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content has top padding to avoid being hidden under header */}
      <main className="pt-20 px-4 pb-8">
        {/*
          Responsive flex container:
          - flex-col on small screens (cards stack vertically)
          - md:flex-row on medium+ screens (side by side)
          - gap-6: spacing between cards
          - max-w-5xl mx-auto: center horizontally and constrain width
        */}
        <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
          {/* Section: Pets */}
          <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <Link to="/pets">
              <img
                src="/assets/images/Pets.png"
                alt="Pets illustration"
                className="w-[250px] h-[250px] mb-4 object-contain"
              />
            </Link>
            <h2 className="text-2xl font-semibold mb-2 text-center">Pets</h2>
            <p className="text-4xl font-bold mb-4 text-center">{pets.length}</p>
            <button
              onClick={() => (window.location.href = '/pets')}
              className="py-2 px-6 bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
            >
              Manage Pets
            </button>
          </div>

          {/* Section: Food */}
          <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <Link to="/foods">
              <img
                src="/assets/images/Food.png"
                alt="Food illustration"
                className="w-[250px] h-[250px] mb-4 object-contain"
              />
            </Link>
            <h2 className="text-2xl font-semibold mb-2 text-center">Food</h2>
            <p className="text-4xl font-bold mb-4 text-center">{foods.length}</p>
            <button
              onClick={() => (window.location.href = '/foods')}
              className="py-2 px-6 bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
            >
              Manage Foods
            </button>
          </div>

          {/* Section: Notifications */}
          <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <Link to="/notifications">
              <img
                src="/assets/images/Notifications.png"
                alt="Notifications illustration"
                className="w-[250px] h-[250px] mb-4 object-contain"
              />
            </Link>
            <h2 className="text-2xl font-semibold mb-2 text-center">Notifications</h2>
            <p className="text-4xl font-bold mb-4 text-center">{alerts.length}</p>
            <button
              onClick={() => (window.location.href = '/notifications')}
              className="py-2 px-6 bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
            >
              Manage Notifications
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
