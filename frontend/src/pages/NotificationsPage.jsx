// src/pages/NotificationsPage.jsx
import React, { useEffect } from 'react'
import { useNotifications } from '../hooks/useNotifications'
import NotificationBanner from '../components/Notifications/NotificationBanner'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

/**
 * NotificationsPage displays:
 *   - A fixed header with a logo linking to Dashboard and a logout button
 *   - Below the header: a Notifications illustration + “Refresh” button
 *   - A grid of cream-colored cards, one per low-stock alert
 *   - If no alerts, show “No notifications at this time.”
 */
export default function NotificationsPage() {
  const { alerts, loading, error, refreshAlerts } = useNotifications()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Always fetch/refresh when path changes
  useEffect(() => {
    refreshAlerts()
  }, [location.pathname, refreshAlerts])

  // Logout and redirect to login
  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="bg-[#DBF3F6] min-h-screen">
      {/* Fixed header with logo linking to Dashboard and logout button */}
      <header className="fixed top-0 left-0 w-full bg-[#DBF3F6] shadow-sm z-10 h-16">
        <div className="h-full flex items-center justify-between px-4">
          <Link to="/dashboard">
            <img
              src="/assets/images/logo.png"
              alt="PetPaunch App Logo"
              className="w-[150px] h-[50px] object-contain"
            />
          </Link>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-teal-400 text-white rounded hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300 text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content (padding-top so header doesn’t overlap) */}
      <main className="main-content px-4 pb-8 max-w-5xl mx-auto">
        {/* Illustration + “Refresh” button */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="/assets/images/Notifications.png"
            alt="Notifications Illustration"
            className="w-[200px] h-[200px] mb-4 object-contain"
          />
          <button
            onClick={refreshAlerts}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          >
            Refresh
          </button>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="p-4 text-center text-gray-500">
            Loading notifications...
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="p-4 text-center text-red-500">
            Error loading notifications. Please try again later.
          </div>
        )}

        {/* No notifications message */}
        {!loading && !error && alerts.length === 0 && (
          <p className="text-center text-gray-500">No notifications at this time.</p>
        )}

        {/* Notification cards */}
        {!loading && !error && alerts.length > 0 && (
          <NotificationBanner alerts={alerts} />
        )}
      </main>
    </div>
  )
}
