// src/components/Auth/LoginForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
      >
        Sign In
      </button>
    </form>
  );
}
