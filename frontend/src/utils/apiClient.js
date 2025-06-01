// src/utils/apiClient.js

// Base URL for all API requests.
// In production, set VITE_API_URL to your backend’s full URL (e.g., "https://my-backend.vercel.app").
// If VITE_API_URL is not defined, we default to an empty string so that requests go to the same origin.
const API_URL = import.meta.env.VITE_API_URL || ''

/**
 * Generic helper for making HTTP requests to your API.
 * Automatically reads `localStorage.getItem('token')` for a JWT
 * and sets the Authorization header if a token exists.
 *
 * @param {string} endpoint  - The API path (e.g., '/api/pets', '/api/auth/login')
 * @param {object} options   - Fetch options (method, headers, body, etc.)
 * @returns {Promise<any>}    - Resolves with parsed JSON data or rejects with an Error
 */
async function request(endpoint, options = {}) {
  // Read the JWT token from localStorage (if present)
  const token = localStorage.getItem('token') || null

  // Build headers, including Authorization if token exists
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  // Perform the fetch against the full URL (API_URL + endpoint)
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include', // Include credentials if you use cookies; otherwise JWT is enough
  })

  // Attempt to parse JSON response body (if any)
  let data = null
  try {
    data = await response.json()
  } catch {
    // If no JSON body, ignore parse error
  }

  // If response is not OK (status 4xx or 5xx), throw an Error
  if (!response.ok) {
    const errorMessage = (data && data.message) || 'API request failed'
    throw new Error(errorMessage)
  }

  // Return parsed JSON (or null if no body)
  return data
}

// Export convenience methods for each HTTP verb
export const apiClient = {
  get:    (endpoint)       => request(endpoint, { method: 'GET' }),
  post:   (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put:    (endpoint, body) => request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint)       => request(endpoint, { method: 'DELETE' }),
}
