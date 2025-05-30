// src/routes/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * PrivateRoute protects routes that require authentication.
 * If the user is not logged in, redirects to the login page.
 */
export default function PrivateRoute() {
  const { token, loading } = useAuth();

  // While checking auth status, you can render a loading state
  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render child routes
  return <Outlet />;
}
