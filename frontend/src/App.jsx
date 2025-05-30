import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// example pages — we’ll create these next
import LoginPage from './pages/LoginPage';
import FoodsPage from './pages/FoodsPage';
import PetsPage from './pages/PetsPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/foods" element={<FoodsPage />} />
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* redirect root to /dashboard when authenticated */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          {/* 404 fallback */}
          <Route path="*" element={<p className="p-4">Page not found</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
