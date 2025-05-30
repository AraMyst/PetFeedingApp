// src/components/Layout/NavBar.jsx
import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * NavBar provides navigation links and logout button,
 * but is hidden on /login and /register pages.
 */
export default function NavBar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // hide navbar on auth pages
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="bg-white shadow p-4 flex items-center justify-between">
      <div className="flex space-x-4">
        {token && (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-3 py-1 font-medium ${isActive ? 'text-blue-600' : 'text-gray-700'}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/foods"
              className={({ isActive }) =>
                `px-3 py-1 font-medium ${isActive ? 'text-blue-600' : 'text-gray-700'}`
              }
            >
              Foods
            </NavLink>
            <NavLink
              to="/pets"
              className={({ isActive }) =>
                `px-3 py-1 font-medium ${isActive ? 'text-blue-600' : 'text-gray-700'}`
              }
            >
              Pets
            </NavLink>
            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                `px-3 py-1 font-medium ${isActive ? 'text-blue-600' : 'text-gray-700'}`
              }
            >
              Notifications
            </NavLink>
          </>
        )}
      </div>
      <div>
        {token ? (
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
);
}
