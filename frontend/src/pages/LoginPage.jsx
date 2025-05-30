// src/pages/LoginPage.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';

export default function LoginPage() {
  const { token, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (!loading && token) {
      navigate('/dashboard', { replace: true });
    }
  }, [token, loading, navigate]);

  if (loading) {
    return <div className="p-4 text-center">Checking authentication...</div>;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#D9F0E2' }} // match the exact background color of your logo
    >
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <img
          src="/assets/images/logo.png"
          alt="Pet Feeding App Logo"
          className="block mx-auto mb-4 w-16 h-16"
        />
        <LoginForm />
      </div>
    </div>
  );
}
