// src/contexts/NotificationContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import { getLowStockAlerts } from '../api/notifications'

const NotificationContext = createContext()

/**
 * NotificationProvider fetches low‐stock alerts on an interval
 * and provides alerts state to the app.
 */
export function NotificationProvider({
  children,
  thresholdDays = 10,          // ← Default threshold is now 10
  refreshIntervalMs = 3600000,  // 1 hour
}) {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    async function fetchAlerts() {
      setLoading(true)
      try {
        const data = await getLowStockAlerts(thresholdDays)
        if (mounted) setAlerts(data)
      } catch (err) {
        if (mounted) setError(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchAlerts()
    const interval = setInterval(fetchAlerts, refreshIntervalMs)

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [thresholdDays, refreshIntervalMs])

  return (
    <NotificationContext.Provider value={{ alerts, loading, error, refreshAlerts: () => getLowStockAlerts(thresholdDays) }}>
      {children}
    </NotificationContext.Provider>
  )
}

/**
 * useNotifications hook to access low‐stock alerts state.
 */
export function useNotifications() {
  return useContext(NotificationContext)
}
