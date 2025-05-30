// src/api/auth.js

import { apiClient } from '../utils/apiClient'

/**
 * Log in a user and receive a JWT token.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<any>}
 */
export function login({ email, password }) {
  // ⚠️ Must match app.use('/api/auth', ...) in your backend
  return apiClient.post('/api/auth/login', { email, password })
}

/**
 * Register a new user and receive a JWT token.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<any>}
 */
export function register({ email, password }) {
  // ⚠️ Must match app.use('/api/auth', ...) in your backend
  return apiClient.post('/api/auth/register', { email, password })
}
