// src/components/Auth/RegisterForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-2xl font-bold">Register</h2>
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

      <div>
        <label className="block text-sm font-medium">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
      >
        Sign Up
      </button>
    </form>
  );
}
