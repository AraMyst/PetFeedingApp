// src/components/Layout/NavBar.jsx
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function NavBar() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <nav className="bg-white shadow px-4 py-3 flex items-center justify-between">
      <NavLink to="/" className="text-xl font-bold text-gray-800">
        PetFeedingApp
      </NavLink>

      <div className="space-x-4">
        {token ? (
          <>
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
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-3 py-1 font-medium ${
                  isActive ? 'bg-blue-500 text-white' : 'text-blue-500'
                } rounded hover:bg-blue-600 hover:text-white`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `px-3 py-1 font-medium ${
                  isActive ? 'bg-green-500 text-white' : 'text-green-600'
                } rounded hover:bg-green-600 hover:text-white`
              }
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  )
}
