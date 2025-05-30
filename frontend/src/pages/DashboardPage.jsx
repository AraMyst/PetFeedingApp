// src/pages/DashboardPage.jsx
import React from 'react';
import { useFoods } from '../hooks/useFoods';
import { usePets } from '../hooks/usePets';
import { useNotifications } from '../hooks/useNotifications';
import NotificationBanner from '../components/Notifications/NotificationBanner';

export default function DashboardPage() {
  const { foods, loading: loadingFoods } = useFoods();
  const { pets, loading: loadingPets } = usePets();
  const { alerts, loading: loadingAlerts } = useNotifications();

  if (loadingFoods || loadingPets || loadingAlerts) {
    return <div className="p-4 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <NotificationBanner alerts={alerts} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-xl font-semibold">Total Foods</h3>
          <p className="text-3xl">{foods.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-xl font-semibold">Total Pets</h3>
          <p className="text-3xl">{pets.length}</p>
        </div>
      </div>
    </div>
  );
}
