// src/pages/NotificationsPage.jsx
import React from 'react';
import { useNotifications } from '../hooks/useNotifications';
import NotificationBanner from '../components/Notifications/NotificationBanner';

export default function NotificationsPage() {
  const { alerts, loading, error, refreshAlerts } = useNotifications();

  if (loading) {
    return <div className="p-4 text-center">Loading notifications...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Error loading notifications.
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Notifications</h2>
        <button
          onClick={refreshAlerts}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          Refresh
        </button>
      </div>
      <NotificationBanner alerts={alerts} />
      {alerts.length === 0 && (
        <p className="text-center text-gray-500">No notifications at this time.</p>
      )}
    </div>
  );
}
