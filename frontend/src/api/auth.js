// src/api/auth.js

import { apiClient } from '../utils/apiClient'

/**
 * Log in a user and receive a JWT token.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<any>} Resolves with { token, user, ... }
 */
export function login({ email, password }) {
  // Matches backend route: app.use('/api/auth', authRoutes)
  return apiClient.post('/api/auth/login', { email, password })
}

/**
 * Register a new user and receive a JWT token.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<any>} Resolves with { token, user, ... }
 */
export function register({ email, password }) {
  // Matches backend route: app.use('/api/auth', authRoutes)
  return apiClient.post('/api/auth/register', { email, password })
}
