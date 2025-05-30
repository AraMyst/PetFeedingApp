// src/components/Layout/NavBar.jsx
import React from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function NavBar() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // Don’t show the top bar on the login or register pages
  if (pathname === '/login' || pathname === '/register') {
    return null
  }

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <nav className="bg-white shadow px-4 py-3 flex items-center justify-between">
      <NavLink to="/dashboard" className="text-xl font-bold text-gray-800">
        PetFeedingApp
      </NavLink>
      <div className="flex items-center space-x-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-3 py-1 font-medium ${
              isActive ? 'text-blue-600' : 'text-gray-700'
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/foods"
          className={({ isActive }) =>
            `px-3 py-1 font-medium ${
              isActive ? 'text-blue-600' : 'text-gray-700'
            }`
          }
        >
          Foods
        </NavLink>
        <NavLink
          to="/pets"
          className={({ isActive }) =>
            `px-3 py-1 font-medium ${
              isActive ? 'text-blue-600' : 'text-gray-700'
            }`
          }
        >
          Pets
        </NavLink>
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `px-3 py-1 font-medium ${
              isActive ? 'text-blue-600' : 'text-gray-700'
            }`
          }
        >
          Notifications
        </NavLink>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
