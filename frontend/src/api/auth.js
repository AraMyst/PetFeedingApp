// src/api/auth.js

import { apiClient } from '../utils/apiClient'

/**
 * Log in a user and receive a JWT token plus basic user info.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ token: string, user: { id: string, email: string } }>}
 */
export function login({ email, password }) {
  // ⚠️ Must match app.use('/auth', authRoutes) in your backend
  return apiClient.post('/auth/login', { email, password })
}

/**
 * Register a new user and receive a JWT token plus basic user info.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ token: string, user: { id: string, email: string } }>}
 */
export function register({ email, password }) {
  // ⚠️ Must match app.use('/auth', authRoutes) in your backend
  return apiClient.post('/auth/register', { email, password })
}
