// src/api/pets.js
import { apiClient } from '../utils/apiClient'

/**
 * Fetch all pets (with populated food details).
 * @returns {Promise<Array<Object>>} - Resolves with an array of pet objects.
 */
export async function getPets() {
  // Call GET /api/pets
  // The backend returns an object like { data: [ … ] },
  // so extract .data before returning.
  const response = await apiClient.get('/api/pets')
  // If the server uses { data: [ … ] }, then:
  if (Array.isArray(response.data)) {
    return response.data
  }
  // If the server simply returns [ … ] at top level, then response is already an array:
  if (Array.isArray(response)) {
    return response
  }
  // Otherwise default to empty array
  return []
}

/**
 * Fetch a single pet by its ID.
 * @param {string} id - Pet ID
 * @returns {Promise<Object>} - Resolves with the pet object.
 */
export async function getPetById(id) {
  // Call GET /api/pets/:id
  const response = await apiClient.get(`/api/pets/${id}`)
  // If your backend wraps it in { data: petObj }, extract .data:
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
  // Call POST /api/pets
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
  // Call PUT /api/pets/:id
  const response = await apiClient.put(`/api/pets/${id}`, petData)
  return response.data || response
}

/**
 * Delete a pet by its ID.
 * @param {string} id - Pet ID
 * @returns {Promise<void>} - Resolves when deletion succeeds.
 */
export async function deletePet(id) {
  // Call DELETE /api/pets/:id
  await apiClient.delete(`/api/pets/${id}`)
}
