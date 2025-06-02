// src/components/Notifications/NotificationBanner.jsx
import React from 'react'

/**
 * NotificationBanner displays a grid of low-stock alert cards.
 * @param {{ alerts: Array<{petId: string, petName: string, daysRemaining: number, message: string}> }} props
 */
export default function NotificationBanner({ alerts }) {
  if (!alerts || alerts.length === 0) return null

  return (
    <div className="food-grid gap-4">
      {alerts.map((alert) => (
        <div
          key={alert.petId}
          className="h-full bg-[#F3CF9F] rounded-lg shadow-sm p-4 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-lg font-semibold mb-1">{alert.petName}</h3>
            <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
            <p className="text-sm text-gray-500">
              {alert.daysRemaining} day
              {alert.daysRemaining !== 1 ? 's' : ''} remaining
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
