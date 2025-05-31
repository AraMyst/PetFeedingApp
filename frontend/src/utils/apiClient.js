// src/utils/apiClient.js

// The base URL for all API requests.
// Ensure you set VITE_API_URL in your Vercel environment variables
// to your Render backend URL (e.g., "https://petfeedingapp.onrender.com").
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

/**
 * Generic helper for making HTTP requests to your API.
 *
 * @param {string} endpoint  - The API path (e.g., '/auth/register')
 * @param {object} options   - Fetch options (method, headers, body, etc.)
 * @returns {Promise<any>}    - Resolves with parsed JSON data or rejects with an Error
 */
async function request(endpoint, options = {}) {
  // Retrieve stored JWT (if any)
  const token = localStorage.getItem('token')

  // Build headers, including Authorization if we have a token
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  // Perform the fetch against the full URL
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    // Include credentials if you're using HTTP-only cookies for auth
    credentials: 'include',
  })

  // Parse JSON body (may throw if body is not JSON)
  const data = await response.json()

  // If the response wasn't ok, throw an error with the API message
  if (!response.ok) {
    throw new Error(data.message || 'API request failed')
  }

  return data
}

// Export convenience methods for each HTTP verb
export const apiClient = {
  get:    (endpoint)         => request(endpoint, { method: 'GET' }),
  post:   (endpoint, body)   => request(endpoint, { method: 'POST',   body: JSON.stringify(body) }),
  put:    (endpoint, body)   => request(endpoint, { method: 'PUT',    body: JSON.stringify(body) }),
  delete: (endpoint)         => request(endpoint, { method: 'DELETE' }),
}
