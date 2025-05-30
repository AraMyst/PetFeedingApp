// src/hooks/useFoods.js
import { useState, useEffect } from 'react';
import * as foodsApi from '../api/foods';

/**
 * useFoods hook provides food data and CRUD operations.
 * Returns:
 *  - foods: array of food objects
 *  - loading: boolean
 *  - error: any
 *  - fetchFoods(): reload list
 *  - createFood(data): create new food
 *  - updateFood(id, data): update existing food
 *  - deleteFood(id): delete food
 */
export function useFoods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // load all foods on mount
  useEffect(() => {
    fetchFoods();
  }, []);

  async function fetchFoods() {
    setLoading(true);
    setError(null);
    try {
      const response = await foodsApi.getFoods();
      setFoods(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  async function createFood(foodData) {
    setLoading(true);
    setError(null);
    try {
      const response = await foodsApi.createFood(foodData);
      setFoods((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function updateFood(id, foodData) {
    setLoading(true);
    setError(null);
    try {
      const response = await foodsApi.updateFood(id, foodData);
      setFoods((prev) =>
        prev.map((f) => (f._id === id ? response.data : f))
      );
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function deleteFood(id) {
    setLoading(true);
    setError(null);
    try {
      await foodsApi.deleteFood(id);
      setFoods((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    foods,
    loading,
    error,
    fetchFoods,
    createFood,
    updateFood,
    deleteFood
  };
}
