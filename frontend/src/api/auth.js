// src/api/auth.js

import { apiClient } from '../utils/apiClient'

/**
 * Log in a user and receive a JWT token.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<any>} Resolves with { token, user, ... }
 */
export function login({ email, password }) {
  // Agora bate com: app.use('/auth', authRoutes) no backend
  return apiClient.post('/auth/login', { email, password })
}

/**
 * Register a new user and receive a JWT token.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<any>} Resolves with { token, user, ... }
 */
export function register({ email, password }) {
  // Também bate com: app.use('/auth', authRoutes)
  return apiClient.post('/auth/register', { email, password })
}
