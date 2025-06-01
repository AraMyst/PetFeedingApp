// src/pages/DashboardPage.jsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFoods } from '../hooks/useFoods'
import { usePets } from '../hooks/usePets'
import { useNotifications } from '../hooks/useNotifications'
import { useAuth } from '../contexts/AuthContext'

/**
 * DashboardPage displays three main cards:
 *  - Food: number of registered foods + button to manage foods
 *  - Pets: number of registered pets + button to manage pets
 *  - Notifications: number of alerts + button to manage notifications
 *
 * Features:
 *  - Fixed header at top with a logo and logout button
 *  - Responsive grid layout:
 *      • 1 column on small screens (cards stack vertically)
 *      • 3 columns on medium+ screens (cards side by side)
 *  - Each section is centered under its image
 *  - Count is centered under title
 *  - Button is centered under count
 *  - Buttons change color on hover and have a focus ring
 *  - Background matches the login/register pages (#DBF3F6)
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

      {/* 
        Main content with custom top padding so the fixed header
        does not overlap the cards. .main-content = padding-top: 4.5rem
        (72px) defined in index.css. Adjust that value if your header height changes.
      */}
      <main className="main-content px-4 pb-8">
        {/*
          Responsive grid container:
            - grid-cols-1 on small screens (stacked)
            - md:grid-cols-3 on medium+ (three columns side by side)
            - gap-6: uniform spacing between all cards
            - max-w-5xl mx-auto: center container and constrain its width
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Section: Food */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <Link to="/foods">
              <img
                src="/assets/images/Food.png"
                alt="Food illustration"
                className="w-[250px] h-[250px] mb-4 object-contain"
              />
            </Link>
            <h2 className="text-2xl font-semibold mb-2 text-center">Food</h2>
            <p className="text-4xl font-bold mb-4 text-center">
              {foods.length}
            </p>
            <button
              onClick={() => navigate('/foods')}
              className="py-2 px-6 bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
            >
              Manage Foods
            </button>
          </div>

          {/* Section: Pets */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <Link to="/pets">
              <img
                src="/assets/images/Pets.png"
                alt="Pets illustration"
                className="w-[250px] h-[250px] mb-4 object-contain"
              />
            </Link>
            <h2 className="text-2xl font-semibold mb-2 text-center">Pets</h2>
            <p className="text-4xl font-bold mb-4 text-center">
              {pets.length}
            </p>
            <button
              onClick={() => navigate('/pets')}
              className="py-2 px-6 bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
            >
              Manage Pets
            </button>
          </div>

          {/* Section: Notifications */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <Link to="/notifications">
              <img
                src="/assets/images/Notifications.png"
                alt="Notifications illustration"
                className="w-[250px] h-[250px] mb-4 object-contain"
              />
            </Link>
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Notifications
            </h2>
            <p className="text-4xl font-bold mb-4 text-center">
              {alerts.length}
            </p>
            <button
              onClick={() => navigate('/notifications')}
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
