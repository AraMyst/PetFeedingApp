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
 * useFoods hook provides:
 *   - foods: array of food objects
 *   - loading: boolean
 *   - error: Error|null
 *   - fetchFoods(): reload list from server
 *   - createFood(data): create a new food
 *   - updateFood(id, data): update an existing food
 *   - deleteFood(id): delete a food
 *   - toggleOpen(id): open or close a food package
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
      console.error('Error fetching foods:', err)
      setError(err)
      setFoods([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Load once on mount (and any time fetchFoods changes, which is never in practice)
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
      console.error('Error creating food:', err)
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
      console.error('Error updating food:', err)
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
      console.error('Error deleting food:', err)
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * Toggle the open/close state of a food.
   * Backend will flip isOpen and set/clear openedAt timestamp.
   */
  const toggleOpen = useCallback(
    async (foodId) => {
      setLoading(true)
      setError(null)
      try {
        const updatedFood = await toggleOpenFood(foodId)
        setFoods(prev => prev.map(f => (f._id === updatedFood._id ? updatedFood : f)))
        return updatedFood
      } catch (err) {
        console.error('Error toggling open/close:', err)
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
