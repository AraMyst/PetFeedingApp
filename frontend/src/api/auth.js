// src/api/auth.js

import { apiClient } from '../utils/apiClient'

/**
 * Log in a user and receive a JWT token plus basic user info.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ token: string, user: { id: string, email: string } }>}
 * @throws {Error} with message from server (e.g., "Email not registered", "Incorrect password")
 */
export async function login({ email, password }) {
  try {
    const response = await apiClient.post('/auth/login', { email, password })
    return response.data
  } catch (err) {
    // Extract server-side error message if present
    const serverMessage = err.response?.data?.error || 'Unknown error'
    throw new Error(serverMessage)
  }
}

/**
 * Register a new user and receive a JWT token plus basic user info.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ token: string, user: { id: string, email: string } }>}
 * @throws {Error} with message from server (e.g., "User already exists", "Server error")
 */
export async function register({ email, password }) {
  try {
    const response = await apiClient.post('/auth/register', { email, password })
    return response.data
  } catch (err) {
    // Extract server-side error message if present
    const serverMessage = err.response?.data?.error || 'Unknown error'
    throw new Error(serverMessage)
  }
}
