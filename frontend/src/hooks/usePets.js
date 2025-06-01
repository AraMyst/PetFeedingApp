// src/hooks/usePets.js
import { useState, useEffect, useCallback } from 'react'
import * as petsApi from '../api/pets'

/**
 * usePets hook provides pet data and CRUD operations.
 * Returns:
 *   - pets: array of pet objects
 *   - loading: boolean
 *   - error: any
 *   - fetchPets(): reload list
 *   - createPet(data): create new pet
 *   - updatePet(id, data): update existing pet
 *   - deletePet(id): delete pet
 */
export function usePets() {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // fetchPets is wrapped in useCallback so its identity is stable
  const fetchPets = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // petsApi.getPets() now returns Array<Object>
      const dataArray = await petsApi.getPets()
      // Ensure we actually got an array; otherwise default to []
      setPets(Array.isArray(dataArray) ? dataArray : [])
    } catch (err) {
      console.error('Error fetching pets:', err)
      setError(err)
      setPets([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Load all pets on mount
  useEffect(() => {
    fetchPets()
  }, [fetchPets])

  async function createPet(petData) {
    setLoading(true)
    setError(null)
    try {
      const newPet = await petsApi.createPet(petData)
      // Add the newly created pet into our local state
      setPets((prev) => [...prev, newPet])
      return newPet
    } catch (err) {
      console.error('Error creating pet:', err)
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function updatePet(id, petData) {
    setLoading(true)
    setError(null)
    try {
      const updatedPet = await petsApi.updatePet(id, petData)
      setPets((prev) =>
        prev.map((p) => (p._id === id ? updatedPet : p))
      )
      return updatedPet
    } catch (err) {
      console.error('Error updating pet:', err)
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function deletePet(id) {
    setLoading(true)
    setError(null)
    try {
      await petsApi.deletePet(id)
      setPets((prev) => prev.filter((p) => p._id !== id))
    } catch (err) {
      console.error('Error deleting pet:', err)
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    pets,
    loading,
    error,
    fetchPets,
    createPet,
    updatePet,
    deletePet,
  }
}
