// src/routes/PrivateRoute.jsx
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

/**
 * PrivateRoute wraps any routes that require authentication.
 * If the user is not logged in (no valid token), redirect to "/login".
 */
export default function PrivateRoute() {
  const { token, loading } = useAuth()

  // While the authentication state is initializing, show a loading indicator
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-4 text-gray-500">
        Loading…
      </div>
    )
  }

  // If there is no valid token, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // If the user is authenticated, render the child routes via <Outlet>
  return <Outlet />
}
