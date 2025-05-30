import { apiClient } from '../utils/apiClient';

/**
 * Log in a user and receive a JWT token.
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function login({ email, password }) {
  return apiClient.post('/api/auth/login', { email, password });
}

/**
 * Register a new user and receive a JWT token.
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function register({ email, password }) {
  return apiClient.post('/api/auth/register', { email, password });
}
