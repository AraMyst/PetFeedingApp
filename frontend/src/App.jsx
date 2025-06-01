import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { NotificationProvider } from './contexts/NotificationContext'
import PrivateRoute from './routes/PrivateRoute'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'

import FoodsPage from './pages/FoodsPage'
import FoodCreatePage from './pages/FoodCreatePage'
import FoodEditPage from './pages/FoodEditPage'

import PetsPage from './pages/PetsPage'
import NotificationsPage from './pages/NotificationsPage'
import './index.css'

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            {/* Redirect root “/” to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes require authentication */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />

              {/* Foods routes */}
              <Route path="/foods" element={<FoodsPage />} />
              <Route path="/foods/new" element={<FoodCreatePage />} />
              <Route path="/foods/:id/edit" element={<FoodEditPage />} />

              {/* Pets and Notifications */}
              <Route path="/pets" element={<PetsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </Route>

            {/* 404 fallback */}
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
