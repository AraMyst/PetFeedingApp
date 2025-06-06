// src/utils/calculateDaysRemaining.js

/**
 * Calculate how many days of food remain.
 * @param {number} weightInGrams - Total weight of the food package in grams.
 * @param {number} gramsPerMeal - Grams consumed per meal.
 * @param {number} mealsPerDay - Number of meals per day.
 * @returns {number} Number of full days remaining.
 */
export function calculateDaysRemaining(weightInGrams, gramsPerMeal, mealsPerDay) {
  if (gramsPerMeal <= 0 || mealsPerDay <= 0) {
    return 0;
  }
  const dailyConsumption = gramsPerMeal * mealsPerDay;
  return Math.floor(weightInGrams / dailyConsumption);
}

/**
 * Determine if a low-stock notification should fire.
 * @param {number} daysRemaining - Days left until food runs out.
 * @param {number} thresholdDays - Days before running out to trigger the alert.
 * @returns {boolean}
 */
export function shouldNotify(daysRemaining, thresholdDays) {
  return daysRemaining <= thresholdDays;
}
