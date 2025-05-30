import React from 'react';

/**
 * NotificationBanner displays a list of low-stock alerts.
 * @param {{ alerts: Array<{petId: string, petName: string, daysRemaining: number, message: string}> }} props
 */
export default function NotificationBanner({ alerts }) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
      <strong className="font-bold">Low Stock Alerts:</strong>
      <ul className="mt-2 list-disc list-inside">
        {alerts.map((alert) => (
          <li key={alert.petId} className="text-sm">
            {alert.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
