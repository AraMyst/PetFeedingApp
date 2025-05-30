import { apiClient } from '../utils/apiClient';

/**
 * Fetch all pets (with populated food details).
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function getPets() {
  return apiClient.get('/api/pets');
}

/**
 * Fetch a single pet by its ID.
 * @param {string} id - Pet ID
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function getPetById(id) {
  return apiClient.get(`/api/pets/${id}`);
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
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function createPet(petData) {
  return apiClient.post('/api/pets', petData);
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
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function updatePet(id, petData) {
  return apiClient.put(`/api/pets/${id}`, petData);
}

/**
 * Delete a pet by its ID.
 * @param {string} id - Pet ID
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function deletePet(id) {
  return apiClient.delete(`/api/pets/${id}`);
}
