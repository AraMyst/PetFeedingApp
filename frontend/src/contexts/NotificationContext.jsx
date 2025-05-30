// src/contexts/NotificationContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getLowStockAlerts } from '../api/notifications';

const NotificationContext = createContext();

/**
 * NotificationProvider fetches low-stock alerts on an interval
 * and provides alerts state to the app.
 */
export function NotificationProvider({ children, thresholdDays = 3, refreshIntervalMs = 3600000 }) {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch alerts once and then on interval
  useEffect(() => {
    let mounted = true;

    async function fetchAlerts() {
      setLoading(true);
      try {
        const data = await getLowStockAlerts(thresholdDays);
        if (mounted) setAlerts(data);
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchAlerts();
    const interval = setInterval(fetchAlerts, refreshIntervalMs);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [thresholdDays, refreshIntervalMs]);

  return (
    <NotificationContext.Provider value={{ alerts, loading, error }}>
      {children}
    </NotificationContext.Provider>
  );
}

/**
 * useNotifications hook to access low-stock alerts state.
 */
export function useNotifications() {
  return useContext(NotificationContext);
}
