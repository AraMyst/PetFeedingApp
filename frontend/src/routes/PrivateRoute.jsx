// src/routes/PrivateRoute.jsx
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

/**
 * PrivateRoute protects routes that require authentication.
 * If the user is not logged in, redirects to the login page.
 */
export default function PrivateRoute() {
  const { token, loading } = useAuth()

  // While auth state is being initialized, show a loading indicator
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-4 text-gray-500">
        Loading…
      </div>
    )
  }

  // If there's no valid token, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // If authenticated, render the child routes
  return <Outlet />
}
