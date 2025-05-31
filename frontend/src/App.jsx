// src/App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { NotificationProvider } from './contexts/NotificationContext'
import PrivateRoute from './routes/PrivateRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import FoodsPage from './pages/FoodsPage'
import PetsPage from './pages/PetsPage'
import NotificationsPage from './pages/NotificationsPage'
import './index.css'

/**
 * App wraps the entire application in AuthProvider and NotificationProvider.
 * It defines public and protected routes. NavBar has been removed
 * so that no white top bar appears on any page.
 */
export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            {/* Redirect the root (“/”) to the login page */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Public routes (accessible without a token) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes (require a valid token) */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/foods" element={<FoodsPage />} />
              <Route path="/pets" element={<PetsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </Route>

            {/* 404 fallback for any unmatched routes */}
            <Route
              path="*"
              element={<p className="p-4 text-center">Page not found</p>}
            />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  )
}
