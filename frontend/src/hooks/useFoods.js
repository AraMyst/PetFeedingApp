// src/hooks/useFoods.js
import { useState, useEffect } from 'react'
import * as foodsApi from '../api/foods'

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
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load all foods on mount
  useEffect(() => {
    fetchFoods()
  }, [])

  async function fetchFoods() {
    setLoading(true)
    setError(null)
    try {
      // foodsApi.getFoods() should return the array of foods directly
      const data = await foodsApi.getFoods()
      setFoods(data)
    } catch (err) {
      // If an error occurs, store it in `error` and reset `foods` to empty
      setError(err)
      setFoods([])
    } finally {
      setLoading(false)
    }
  }

  async function createFood(foodData) {
    setLoading(true)
    setError(null)
    try {
      // Assume createFood returns the new food object directly
      const newFood = await foodsApi.createFood(foodData)
      // Append the new food to state so list is immediately updated
      setFoods((prev) => [...prev, newFood])
      return newFood
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function updateFood(id, foodData) {
    setLoading(true)
    setError(null)
    try {
      // Assume updateFood returns the updated food object directly
      const updatedFood = await foodsApi.updateFood(id, foodData)
      setFoods((prev) =>
        prev.map((f) => (f._id === id ? updatedFood : f))
      )
      return updatedFood
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function deleteFood(id) {
    setLoading(true)
    setError(null)
    try {
      await foodsApi.deleteFood(id)
      setFoods((prev) => prev.filter((f) => f._id !== id))
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    foods,
    loading,
    error,
    fetchFoods,
    createFood,
    updateFood,
    deleteFood,
  }
}
