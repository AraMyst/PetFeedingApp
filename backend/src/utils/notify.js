/**
 * Calculate days remaining before food runs out.
 * @param {number} weightInGrams - Total weight of the food package.
 * @param {number} gramsPerMeal - Grams the pet eats per meal.
 * @param {number} mealsPerDay - Number of meals per day.
 * @returns {number} Days remaining.
 */
function calculateDaysRemaining(weightInGrams, gramsPerMeal, mealsPerDay) {
  if (gramsPerMeal <= 0 || mealsPerDay <= 0) return 0;
  const dailyConsumption = gramsPerMeal * mealsPerDay;
  return Math.floor(weightInGrams / dailyConsumption);
}

/**
 * Determine if notification should be sent based on threshold.
 * @param {number} daysRemaining - Days left until food runs out.
 * @param {number} thresholdDays - Days before running out to trigger alert.
 * @returns {boolean}
 */
function shouldNotify(daysRemaining, thresholdDays) {
  return daysRemaining <= thresholdDays;
}

module.exports = {
  calculateDaysRemaining,
  shouldNotify
};
