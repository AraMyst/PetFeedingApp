// src/api/foods.js
import { apiClient } from '../utils/apiClient'

/**
 * Fetch all foods.
 * @returns {Promise<Array<Object>>} - Resolves with an array of food objects.
 */
export async function getFoods() {
  const data = await apiClient.get('/api/foods')
  return data
}

/**
 * Fetch a single food by its ID.
 * @param {string} id - Food ID
 * @returns {Promise<Object>} - Resolves with the food object.
 */
export async function getFoodById(id) {
  const data = await apiClient.get(`/api/foods/${id}`)
  return data
}

/**
 * Create a new food entry.
 * @param {{ name: string, brand: string, specifications: string[], weight: number, buyLinks?: string[] }} foodData
 * @returns {Promise<Object>} - Resolves with the newly created food object.
 */
export async function createFood(foodData) {
  const data = await apiClient.post('/api/foods', foodData)
  return data
}

/**
 * Update an existing food entry.
 * @param {string} id - Food ID
 * @param {{ name?: string, brand?: string, specifications?: string[], weight?: number, buyLinks?: string[] }} foodData
 * @returns {Promise<Object>} - Resolves with the updated food object.
 */
export async function updateFood(id, foodData) {
  const data = await apiClient.put(`/api/foods/${id}`, foodData)
  return data
}

/**
 * Delete a food by its ID.
 * @param {string} id - Food ID
 * @returns {Promise<void>} - Resolves when deletion succeeds.
 */
export async function deleteFood(id) {
  await apiClient.delete(`/api/foods/${id}`)
}
