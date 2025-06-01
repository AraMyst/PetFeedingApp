// src/api/pets.js
import { apiClient } from '../utils/apiClient'

/**
 * Fetch all pets (with populated food details).
 * @returns {Promise<Array<Object>>} - Resolves with an array of pet objects.
 */
export async function getPets() {
  // apiClient.get('/api/pets') already returns parsed JSON (an array)
  const petsArray = await apiClient.get('/api/pets')
  return Array.isArray(petsArray) ? petsArray : []
}

/**
 * Fetch a single pet by its ID.
 * @param {string} id - Pet ID
 * @returns {Promise<Object>} - Resolves with the pet object.
 */
export async function getPetById(id) {
  const pet = await apiClient.get(`/api/pets/${id}`)
  return pet
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
  const createdPet = await apiClient.post('/api/pets', petData)
  return createdPet
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
  const updatedPet = await apiClient.put(`/api/pets/${id}`, petData)
  return updatedPet
}

/**
 * Delete a pet by its ID.
 * @param {string} id - Pet ID
 * @returns {Promise<void>} - Resolves when deletion succeeds.
 */
export async function deletePet(id) {
  await apiClient.delete(`/api/pets/${id}`)
}
