// src/api/auth.js

import { apiClient } from '../utils/apiClient'

/**
 * Log in a user and receive a JWT token.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<any>} Resolves with { token, user, ... }
 */
export function login({ email, password }) {
  // Note: your backend login route is /auth/login
  return apiClient.post('/auth/login', { email, password })
}

/**
 * Register a new user and receive a JWT token.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<any>} Resolves with { token, user, ... }
 */
export function register({ email, password }) {
  // Note: your backend register route is /auth/register
  return apiClient.post('/auth/register', { email, password })
}
