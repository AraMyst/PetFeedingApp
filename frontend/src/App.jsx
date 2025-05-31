// src/App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { NotificationProvider } from './contexts/NotificationContext'
import PrivateRoute from './routes/PrivateRoute'
import NavBar from './components/Layout/NavBar'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import FoodsPage from './pages/FoodsPage'
import PetsPage from './pages/PetsPage'
import NotificationsPage from './pages/NotificationsPage'
import './index.css'

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          {/* Persistent navigation bar */}
          <NavBar />

          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/foods" element={<FoodsPage />} />
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
