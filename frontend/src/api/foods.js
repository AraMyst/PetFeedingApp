// src/api/foods.js
import { apiClient } from '../utils/apiClient'

/**
 * Fetch all foods.
 * @returns {Promise<Array<Object>>} - Resolves with an array of food objects.
 */
export async function getFoods() {
  // Call GET /api/foods
  const foodsArray = await apiClient.get('/api/foods')
  return Array.isArray(foodsArray) ? foodsArray : []
}

/**
 * Fetch a single food by its ID.
 * @param {string} id - Food ID
 * @returns {Promise<Object>} - Resolves with the food object.
 */
export async function getFoodById(id) {
  // Call GET /api/foods/:id
  const food = await apiClient.get(`/api/foods/${id}`)
  return food
}

/**
 * Create a new food entry.
 * @param {{ name: string, brand: string, specifications: string[], weight: number, buyLinks?: string[] }} foodData
 * @returns {Promise<Object>} - Resolves with the newly created food object.
 */
export async function createFood(foodData) {
  // Call POST /api/foods
  const createdFood = await apiClient.post('/api/foods', foodData)
  return createdFood
}

/**
 * Update an existing food entry.
 * @param {string} id - Food ID
 * @param {{ name?: string, brand?: string, specifications?: string[], weight?: number, buyLinks?: string[] }} foodData
 * @returns {Promise<Object>} - Resolves with the updated food object.
 */
export async function updateFood(id, foodData) {
  // Call PUT /api/foods/:id
  const updatedFood = await apiClient.put(`/api/foods/${id}`, foodData)
  return updatedFood
}

/**
 * Delete a food by its ID.
 * @param {string} id - Food ID
 * @returns {Promise<void>} - Resolves when deletion succeeds.
 */
export async function deleteFood(id) {
  // Call DELETE /api/foods/:id
  await apiClient.delete(`/api/foods/${id}`)
}
