// src/hooks/useFoods.js
import { useState, useEffect, useCallback } from 'react'
import * as foodsApi from '../api/foods'

/**
 * useFoods hook provides food data and CRUD operations.
 * Returns:
 *  - foods: array of food objects
 *  - loading: boolean
 *  - error: Error|null
 *  - fetchFoods(): reload list
 *  - createFood(data): create new food
 *  - updateFood(id, data): update existing food
 *  - deleteFood(id): delete food
 */
export function useFoods() {
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // fetchFoods: useCallback to maintain stable reference
  const fetchFoods = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // foodsApi.getFoods returns an array of food objects
      const data = await foodsApi.getFoods()
      setFoods(data)
    } catch (err) {
      setError(err)
      setFoods([]) // on error, keep list empty
    } finally {
      setLoading(false)
    }
  }, [])

  // Load foods on hook mount
  useEffect(() => {
    fetchFoods()
  }, [fetchFoods])

  async function createFood(foodData) {
    setLoading(true)
    setError(null)
    try {
      const newFood = await foodsApi.createFood(foodData)
      setFoods(prev => [...prev, newFood])
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
      const updatedFood = await foodsApi.updateFood(id, foodData)
      setFoods(prev => prev.map(f => (f._id === id ? updatedFood : f)))
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
      setFoods(prev => prev.filter(f => f._id !== id))
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
