// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { apiClient } from '../utils/apiClient';

const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {}
});

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [token, setToken]     = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      _fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch logged-in user profile
  const _fetchCurrentUser = async () => {
    try {
      const res = await apiClient.get('/auth/me');
      setUser(res.data.user);
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Login action
  const login = async ({ email, password }) => {
    const res = await apiClient.post('/auth/login', { email, password });
    const newToken = res.data.token;
    localStorage.setItem('token', newToken);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    setToken(newToken);
    await _fetchCurrentUser();
  };

  // Register action
  const register = async ({ email, password }) => {
    const res = await apiClient.post('/auth/register', { email, password });
    const newToken = res.data.token;
    localStorage.setItem('token', newToken);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    setToken(newToken);
    await _fetchCurrentUser();
  };

  // Logout action
  const logout = () => {
    localStorage.removeItem('token');
    delete apiClient.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useAuth() {
  return useContext(AuthContext);
}
