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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ email, password });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-xs space-y-4"
    >
      {/* Display error message */}
      {error && (
        <div className="text-red-600 text-sm text-center">
          {error}
        </div>
      )}

      {/* Email input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 w-full border border-gray-300 rounded-md py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Password input */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 w-full border border-gray-300 rounded-md py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
      >
        Sign In
      </button>
    </form>
  );
}
