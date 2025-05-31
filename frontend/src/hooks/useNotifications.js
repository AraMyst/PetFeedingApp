// src/hooks/useNotifications.js
import { useState, useEffect } from 'react'
import * as notificationsApi from '../api/notifications'

/**
 * useNotifications hook provides low-stock alerts.
 * Returns:
 *  - alerts: array of alert objects
 *  - loading: boolean
 *  - error: any
 *  - refreshAlerts(): reload alerts
 */
export function useNotifications(thresholdDays = 3, refreshIntervalMs = 3600000) {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchAlerts() {
    setLoading(true)
    setError(null)
    try {
      // notificationsApi.getLowStockAlerts should return the array of alerts directly
      const data = await notificationsApi.getLowStockAlerts(thresholdDays)
      setAlerts(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch on mount and at specified intervals
  useEffect(() => {
    fetchAlerts()
    const interval = setInterval(fetchAlerts, refreshIntervalMs)
    return () => clearInterval(interval)
  }, [thresholdDays, refreshIntervalMs])

  return {
    alerts,
    loading,
    error,
    refreshAlerts: fetchAlerts,
  }
}
