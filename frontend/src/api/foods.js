import apiClient from '../utils/apiClient';

/**
 * Fetch all foods.
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function getFoods() {
  return apiClient.get('/api/foods');
}

/**
 * Fetch a single food by its ID.
 * @param {string} id - Food ID
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function getFoodById(id) {
  return apiClient.get(`/api/foods/${id}`);
}

/**
 * Create a new food entry.
 * @param {{ name: string, brand: string, specifications: string[], weight: number, buyLinks?: string[] }} foodData
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function createFood(foodData) {
  return apiClient.post('/api/foods', foodData);
}

/**
 * Update an existing food entry.
 * @param {string} id - Food ID
 * @param {{ name?: string, brand?: string, specifications?: string[], weight?: number, buyLinks?: string[] }} foodData
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function updateFood(id, foodData) {
  return apiClient.put(`/api/foods/${id}`, foodData);
}

/**
 * Delete a food by its ID.
 * @param {string} id - Food ID
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function deleteFood(id) {
  return apiClient.delete(`/api/foods/${id}`);
}
