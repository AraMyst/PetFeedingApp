// src/hooks/useFoods.js
import { useState, useEffect, useCallback } from 'react'
import {
  getFoods,
  createFood,
  updateFood,
  deleteFood,
  toggleOpenFood
} from '../api/foods'

/**
 * useFoods hook provides food data and CRUD operations, plus toggleOpen().
 * Returns:
 *  - foods: array of food objects
 *  - loading: boolean
 *  - error: Error|null
 *  - fetchFoods(): reload list
 *  - createFood(data): create new food
 *  - updateFood(id, data): update existing food
 *  - deleteFood(id): delete food
 *  - toggleOpen(id): open/close a food package
 */
export function useFoods() {
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchFoods = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getFoods()
      setFoods(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err)
      setFoods([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFoods()
  }, [fetchFoods])

  async function createNewFood(foodData) {
    setLoading(true)
    setError(null)
    try {
      const newFood = await createFood(foodData)
      setFoods(prev => [...prev, newFood])
      return newFood
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function updateExistingFood(id, foodData) {
    setLoading(true)
    setError(null)
    try {
      const updated = await updateFood(id, foodData)
      setFoods(prev => prev.map(f => (f._id === id ? updated : f)))
      return updated
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function deleteExistingFood(id) {
    setLoading(true)
    setError(null)
    try {
      await deleteFood(id)
      setFoods(prev => prev.filter(f => f._id !== id))
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * Toggle the open/close state of a food.
   * Backend will flip isOpen and set/clear openedAt.
   */
  const toggleOpen = useCallback(
    async (foodId) => {
      setLoading(true)
      setError(null)
      try {
        const updatedFood = await toggleOpenFood(foodId)
        // Replace that item in our local list
        setFoods(prev => prev.map(f => (f._id === updatedFood._id ? updatedFood : f)))
        return updatedFood
      } catch (err) {
        setError(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return {
    foods,
    loading,
    error,
    fetchFoods,
    createFood: createNewFood,
    updateFood: updateExistingFood,
    deleteFood: deleteExistingFood,
    toggleOpen
  }
}
