// src/utils/apiClient.js

// The base URL for all API requests.
// In Vercel, set VITE_API_URL to your backend's URL (e.g. "https://petfeedingapp.onrender.com")
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

/**
 * Generic helper for making HTTP requests to your API.
 * Each call automatically reads `localStorage.getItem('token')`
 * and sets the Authorization header if a token exists.
 *
 * @param {string} endpoint  - The API path (e.g., '/auth/login')
 * @param {object} options   - Fetch options (method, headers, body, etc.)
 * @returns {Promise<any>}    - Resolves with parsed JSON data or rejects with an Error
 */
async function request(endpoint, options = {}) {
  // Read the JWT token from localStorage (if present)
  const token = localStorage.getItem('token') || null

  // Build our headers object, including Authorization if token exists
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  // Perform the fetch against the full URL (API_URL + endpoint)
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    // Include credentials only if you need cookies; here we send JWT in header
    credentials: 'include',
  })

  // Attempt to parse the JSON body (if any)
  let data = null
  try {
    data = await response.json()
  } catch {
    // If body is not JSON, ignore parse error
  }

  // If response not OK (status 4xx or 5xx), throw an Error
  if (!response.ok) {
    const errorMessage = (data && data.message) || 'API request failed'
    throw new Error(errorMessage)
  }

  // Return parsed JSON
  return data
}

// Export convenience methods for each HTTP verb
export const apiClient = {
  get:    (endpoint)       => request(endpoint, { method: 'GET' }),
  post:   (endpoint, body) => request(endpoint, { method: 'POST',   body: JSON.stringify(body) }),
  put:    (endpoint, body) => request(endpoint, { method: 'PUT',    body: JSON.stringify(body) }),
  delete: (endpoint)       => request(endpoint, { method: 'DELETE' }),
}
