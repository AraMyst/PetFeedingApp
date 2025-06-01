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
      const data = await notificationsApi.getLowStockAlerts(thresholdDays)
      setAlerts(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err)
      setAlerts([])
    } finally {
      setLoading(false)
    }
  }

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
