// src/api/notifications.js
import { getPets } from './pets'
import { calculateDaysRemaining, shouldNotify } from '../utils/calculateDaysRemaining'

/**
 * Retrieve low‐stock alerts for pets, based on remaining days and a threshold.
 * @param {number} thresholdDays - Number of days before running out to trigger an alert.
 * @returns {Promise<Array<{
 *   petId: string,
 *   petName: string,
 *   daysRemaining: number,
 *   message: string
 * }>>}
 */
export async function getLowStockAlerts(thresholdDays = 10) { // ← Default is now 10
  const pets = await getPets()

  return pets
    .map((pet) => {
      const {
        _id: petId,
        name: petName,
        gramsPerMeal,
        mealsPerDay,
        food,
      } = pet

      // Only consider if there is a food assigned AND it is currently open
      if (!food || !food.isOpen) return null

      const weightInGrams = food.weight || 0
      const daysRemaining = calculateDaysRemaining(
        weightInGrams,
        gramsPerMeal,
        mealsPerDay
      )

      if (!shouldNotify(daysRemaining, thresholdDays)) return null

      const message = `${petName} has only ${daysRemaining} day${
        daysRemaining !== 1 ? 's' : ''
      } of food left.`

      return { petId, petName, daysRemaining, message }
    })
    .filter((alert) => alert !== null)
}
