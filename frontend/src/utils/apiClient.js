// src/utils/apiClient.js

// The base URL for all API requests.
// Set VITE_API_URL in your Vercel environment variables to:
//   https://petfeedingapp.onrender.com
// or to your local backend (e.g., http://localhost:4000)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

/**
 * Helper for making HTTP requests to your API using fetch.
 * Automatically attaches Authorization header if a JWT is stored.
 *
 * @param {string} endpoint  - The API path (e.g., '/auth/register' or '/api/foods')
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
    // Include credentials if your backend uses cookies for auth
    credentials: 'include',
  })

  // Attempt to parse JSON response (may throw if the body is empty or invalid JSON)
  let data
  try {
    data = await response.json()
  } catch {
    data = null
  }

  // If the response was not ok, throw an error with the API message
  if (!response.ok) {
    // If the backend returned a JSON object with a "message" field, use it
    const message = data && data.message ? data.message : 'API request failed'
    throw new Error(message)
  }

  return data
}

// Export convenience methods for each HTTP verb
export const apiClient = {
  get:    (endpoint)       => request(endpoint, { method: 'GET' }),
  post:   (endpoint, body) => request(endpoint, { method: 'POST',   body: JSON.stringify(body) }),
  put:    (endpoint, body) => request(endpoint, { method: 'PUT',    body: JSON.stringify(body) }),
  delete: (endpoint)       => request(endpoint, { method: 'DELETE' }),
}
