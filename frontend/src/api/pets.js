// src/api/pets.js
import { apiClient } from '../utils/apiClient'

/**
 * Fetch all pets (with populated food details).
 * @returns {Promise<Array<Object>>} - Resolves with an array of pet objects.
 */
export async function getPets() {
  // Call GET /pets (no "/api" prefix)
  const petsArray = await apiClient.get('/pets')
  return Array.isArray(petsArray) ? petsArray : []
}

/**
 * Fetch a single pet by its ID.
 * @param {string} id - Pet ID
 * @returns {Promise<Object>} - Resolves with the pet object.
 */
export async function getPetById(id) {
  // Call GET /pets/:id
  const pet = await apiClient.get(`/pets/${id}`)
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
  // Call POST /pets
  const createdPet = await apiClient.post('/pets', petData)
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
  // Call PUT /pets/:id
  const updatedPet = await apiClient.put(`/pets/${id}`, petData)
  return updatedPet
}

/**
 * Delete a pet by its ID.
 * @param {string} id - Pet ID
 * @returns {Promise<void>} - Resolves when deletion succeeds.
 */
export async function deletePet(id) {
  // Call DELETE /pets/:id
  await apiClient.delete(`/pets/${id}`)
}
