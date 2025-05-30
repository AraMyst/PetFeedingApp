// src/utils/apiClient.js
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

/**
 * Generic request helper using fetch.
 * @param {string} path 
 * @param {object} options 
 * @returns {Promise<any>} parsed JSON data
 */
async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(BASE_URL + path, {
    ...options,
    headers,
  });

  const data = await res.json();
  if (!res.ok) {
    // throw whole response data or a generic error
    throw new Error(data.message || 'API request failed');
  }
  return data;
}

export const apiClient = {
  get:    (path)           => request(path, { method: 'GET' }),
  post:   (path, body)     => request(path, { method: 'POST',   body: JSON.stringify(body) }),
  put:    (path, body)     => request(path, { method: 'PUT',    body: JSON.stringify(body) }),
  delete: (path)           => request(path, { method: 'DELETE' })
};
