// src/pages/RegisterPage.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/Auth/RegisterForm';

export default function RegisterPage() {
  const { token, loading } = useAuth();
  const navigate = useNavigate();

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
      <RegisterForm />
    </div>
  );
}
