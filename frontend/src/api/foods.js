// src/api/foods.js
import { apiClient } from '../utils/apiClient'

/**
 * Fetch all foods.
 * @returns {Promise<Array<Object>>} - Resolves with an array of food objects.
 */
export async function getFoods() {
  const response = await apiClient.get('/api/foods')
  return response.data
}

/**
 * Fetch a single food by its ID.
 * @param {string} id - Food ID
 * @returns {Promise<Object>} - Resolves with the food object.
 */
export async function getFoodById(id) {
  const response = await apiClient.get(`/api/foods/${id}`)
  return response.data
}

/**
 * Create a new food entry.
 * @param {{ name: string, brand: string, specifications: string[], weight: number, buyLinks?: string[] }} foodData
 * @returns {Promise<Object>} - Resolves with the newly created food object.
 */
export async function createFood(foodData) {
  const response = await apiClient.post('/api/foods', foodData)
  return response.data
}

/**
 * Update an existing food entry.
 * @param {string} id - Food ID
 * @param {{ name?: string, brand?: string, specifications?: string[], weight?: number, buyLinks?: string[], isOpen?: boolean, openedAt?: string|null }} foodData
 * @returns {Promise<Object>} - Resolves with the updated food object.
 */
export async function updateFood(id, foodData) {
  const response = await apiClient.put(`/api/foods/${id}`, foodData)
  return response.data
}

/**
 * Delete a food by its ID.
 * @param {string} id - Food ID
 * @returns {Promise<void>} - Resolves when deletion succeeds.
 */
export async function deleteFood(id) {
  await apiClient.delete(`/api/foods/${id}`)
}

/**
 * Toggle open/close state for a given food item.
 * @param {string} id - Food ID
 * @returns {Promise<Object>} - Resolves with the updated food object.
 */
export async function toggleOpenFood(id) {
  const response = await apiClient.patch(`/api/foods/${id}/toggle-open`)
  return response.data
}
