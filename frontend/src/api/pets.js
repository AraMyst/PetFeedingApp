// src/api/pets.js
import { apiClient } from '../utils/apiClient'

/**
 * Fetch all pets (with populated food details).
 * @returns {Promise<Array<Object>>} - Resolves with an array of pet objects.
 */
export async function getPets() {
  // The backend’s GET /api/pets should return a JSON array of pets directly:
  const response = await apiClient.get('/api/pets')
  // If your backend sometimes wraps in { data: [...] }, check for that:
  if (Array.isArray(response.data)) {
    return response.data
  }
  // Otherwise assume response itself is an array:
  if (Array.isArray(response)) {
    return response
  }
  // Fallback to empty array
  return []
}

/**
 * Fetch a single pet by its ID.
 * @param {string} id - Pet ID
 * @returns {Promise<Object>} - Resolves with the pet object.
 */
export async function getPetById(id) {
  const response = await apiClient.get(`/api/pets/${id}`)
  // If wrapped in { data: petObj }, extract .data:
  return response.data || response
}

/**
 * Create a new pet entry.
 * @param {{
 *   name: string,
 *   age: number,
 *   allergies: string[],
 *   gramsPerMeal: number,
 *   mealsPerDay: number,
 *   food: string  // Food ID
 * }} petData
 * @returns {Promise<Object>} - Resolves with the newly created pet object.
 */
export async function createPet(petData) {
  const response = await apiClient.post('/api/pets', petData)
  return response.data || response
}

/**
 * Update an existing pet entry.
 * @param {string} id - Pet ID
 * @param {{
 *   name?: string,
 *   age?: number,
 *   allergies?: string[],
 *   gramsPerMeal?: number,
 *   mealsPerDay?: number,
 *   food?: string
 * }} petData
 * @returns {Promise<Object>} - Resolves with the updated pet object.
 */
export async function updatePet(id, petData) {
  const response = await apiClient.put(`/api/pets/${id}`, petData)
  return response.data || response
}

/**
 * Delete a pet by its ID.
 * @param {string} id - Pet ID
 * @returns {Promise<void>} - Resolves when deletion succeeds.
 */
export async function deletePet(id) {
  await apiClient.delete(`/api/pets/${id}`)
}
