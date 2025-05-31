// src/utils/apiClient.js

// The base URL for all API requests.
// In Vercel, set VITE_API_URL to your backend's URL (e.g. https://petfeedingapp.onrender.com)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

/**
 * Generic helper for making HTTP requests to your API.
 * Each call automatically reads `localStorage.getItem('token')` and
 * sets the Authorization header if a token exists.
 *
 * @param {string} endpoint  - The API path (e.g., '/auth/login')
 * @param {object} options   - Fetch options (method, headers, body, etc.)
 * @returns {Promise<any>}    - Resolves with parsed JSON data or rejects with an Error
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token') || null

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  })

  let data = null
  try {
    data = await response.json()
  } catch {
    // not JSON
  }

  if (!response.ok) {
    const errorMessage = (data && data.message) || 'API request failed'
    throw new Error(errorMessage)
  }

  return data
}

export const apiClient = {
  get:    (endpoint)       => request(endpoint, { method: 'GET' }),
  post:   (endpoint, body) => request(endpoint, { method: 'POST',   body: JSON.stringify(body) }),
  put:    (endpoint, body) => request(endpoint, { method: 'PUT',    body: JSON.stringify(body) }),
  delete: (endpoint)       => request(endpoint, { method: 'DELETE' }),
}
