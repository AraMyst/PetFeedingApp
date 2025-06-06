// src/pages/DashboardPage.jsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFoods } from '../hooks/useFoods'
import { usePets } from '../hooks/usePets'
import { useNotifications } from '../hooks/useNotifications'
import { useAuth } from '../contexts/AuthContext'

/**
 * DashboardPage displays three main cards side by side:
 *  - Food: shows number of registered foods and a button to manage foods
 *  - Pets: shows number of registered pets and a button to manage pets
 *  - Notifications: shows number of alerts and a button to manage notifications
 *
 * Features:
 *  - Fixed header at the top with a logo and a logout button
 *  - Responsive grid layout using .food-grid:
 *      • Each card has a minimum width of 300px and expands equally (auto-fit)
 *      • 1rem gap between rows and columns
 *  - Each card centers its image, section title, count, and button
 *  - Buttons change color on hover and have a focus ring
 *  - Background color matches the login/register pages (#DBF3F6)
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
          {/* Logo links to /dashboard */}
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
        Main content uses .main-content so that the fixed header
        (64px tall) does not overlap page content. 
        Additional padding-left/right and bottom padding are applied here.
      */}
      <main className="main-content px-4 pb-8">
        {/*
          Responsive grid container using .food-grid:
            - auto-fit columns with min 300px
            - 1rem gap between items
          .max-w-5xl and .mx-auto center the grid and limit its width.
        */}
        <div className="food-grid max-w-5xl mx-auto">
          {/* Card: Food */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
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
              onClick={() => navigate('/foods')}
              className="py-2 px-6 bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
            >
              Manage Foods
            </button>
          </div>

          {/* Card: Pets */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
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
              onClick={() => navigate('/pets')}
              className="py-2 px-6 bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
            >
              Manage Pets
            </button>
          </div>

          {/* Card: Notifications */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
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
              onClick={() => navigate('/notifications')}
              className="py-2 px-6 bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
            >
              View Notifications
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
