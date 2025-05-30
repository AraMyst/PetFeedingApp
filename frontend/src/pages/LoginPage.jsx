// src/pages/LoginPage.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';

/**
 * LoginPage renders a centered login box with company logo.
 */
export default function LoginPage() {
  const { token, loading } = useAuth();
  const navigate = useNavigate();

  // redirect if already authenticated
  useEffect(() => {
    if (!loading && token) {
      navigate('/dashboard', { replace: true });
    }
  }, [token, loading, navigate]);

  if (loading) {
    return <div className="p-4 text-center">Checking authentication...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        {/* company logo */}
        <img
          src="/favicon.ico"
          alt="Pet Feeding App Logo"
          className="mx-auto mb-6 w-24 h-24"
        />
        <LoginForm />
      </div>
    </div>
  );
}
