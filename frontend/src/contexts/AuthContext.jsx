// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authApi from '../api/auth';
import { apiClient } from '../utils/apiClient';

const AuthContext = createContext();

/**
 * AuthProvider wraps the app and provides authentication state and actions.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);     // you can store more user info if API returns it
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      apiClient.defaults.headers.Authorization = `Bearer ${storedToken}`;
      setUser({}); // optionally fetch user details here
    }
    setLoading(false);
  }, []);

  // Login action
  async function login({ email, password }) {
    const response = await authApi.login({ email, password });
    const newToken = response.data.token;
    localStorage.setItem('token', newToken);
    apiClient.defaults.headers.Authorization = `Bearer ${newToken}`;
    setToken(newToken);
    setUser({}); // optionally fetch user details here
  }

  // Register action
  async function register({ email, password }) {
    const response = await authApi.register({ email, password });
    const newToken = response.data.token;
    localStorage.setItem('token', newToken);
    apiClient.defaults.headers.Authorization = `Bearer ${newToken}`;
    setToken(newToken);
    setUser({});
  }

  // Logout action
  function logout() {
    localStorage.removeItem('token');
    delete apiClient.defaults.headers.Authorization;
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth hook to access authentication state and actions.
 */
export function useAuth() {
  return useContext(AuthContext);
}
