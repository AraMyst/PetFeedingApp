// src/pages/LoginPage.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';

export default function LoginPage() {
  const { token, loading } = useAuth();
  const navigate = useNavigate();

  // Se já estiver logado, redireciona
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
      style={{ backgroundColor: '#D0EFF3' }}
    >
      <div className="w-64 p-6 bg-white rounded-2xl shadow-xl">
        <img
          src="/assets/images/logo.png"
          alt="Pet Feeding App Logo"
          className="block mx-auto mb-8 w-20 h-20"
        />
        <LoginForm />
      </div>
    </div>
  );
}
