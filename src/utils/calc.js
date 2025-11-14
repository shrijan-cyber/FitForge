/**
 * Fitness and nutrition calculation utilities
 */

/**
 * Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @param {number} age - Age in years
 * @param {string} gender - 'male' or 'female'
 * @returns {number} BMR in calories/day
 */
export const calculateBMR = (weight, height, age, gender) => {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

/**
 * Activity level multipliers for TDEE calculation
 */
const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,        // Little to no exercise
  light: 1.375,          // Light exercise 1-3 days/week
  moderate: 1.55,        // Moderate exercise 3-5 days/week
  active: 1.725,         // Heavy exercise 6-7 days/week
  'extremely-active': 1.9 // Very heavy exercise, physical job
};

/**
 * Calculate TDEE (Total Daily Energy Expenditure)
 * @param {number} bmr - Basal Metabolic Rate
 * @param {string} activityLevel - Activity level key
 * @returns {number} TDEE in calories/day
 */
export const calculateTDEE = (bmr, activityLevel) => {
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.55;
  return Math.round(bmr * multiplier);
};

/**
 * Calculate calorie target based on goal
 * @param {number} tdee - Total Daily Energy Expenditure
 * @param {string} goal - 'muscle-gain', 'weight-loss', 'maintenance'
 * @returns {number} Target calories
 */
export const calculateCalorieTarget = (tdee, goal) => {
  switch (goal) {
    case 'weight-loss':
      return Math.round(tdee * 0.8); // 20% deficit
    case 'muscle-gain':
      return Math.round(tdee * 1.1); // 10% surplus
    case 'maintenance':
    default:
      return tdee;
  }
};

/**
 * Calculate BMI (Body Mass Index)
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @returns {number} BMI
 */
export const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100;
  return (weight / (heightInMeters * heightInMeters)).toFixed(1);
};

/**
 * Get BMI category
 * @param {number} bmi - BMI value
 * @returns {Object} Category and color
 */
export const getBMICategory = (bmi) => {
  if (bmi < 18.5) {
    return { category: 'Underweight', color: 'text-yellow-600' };
  } else if (bmi < 25) {
    return { category: 'Normal', color: 'text-green-600' };
  } else if (bmi < 30) {
    return { category: 'Overweight', color: 'text-orange-600' };
  } else {
    return { category: 'Obese', color: 'text-red-600' };
  }
};

/**
 * Calculate macronutrient distribution
 * @param {number} calories - Total calories
 * @param {string} goal - Fitness goal
 * @returns {Object} Protein, carbs, and fat in grams
 */
export const calculateMacros = (calories, goal) => {
  let proteinPercent, carbsPercent, fatPercent;

  switch (goal) {
    case 'muscle-gain':
      proteinPercent = 0.30;
      carbsPercent = 0.45;
      fatPercent = 0.25;
      break;
    case 'weight-loss':
      proteinPercent = 0.35;
      carbsPercent = 0.35;
      fatPercent = 0.30;
      break;
    default: // maintenance
      proteinPercent = 0.25;
      carbsPercent = 0.45;
      fatPercent = 0.30;
  }

  return {
    protein: Math.round((calories * proteinPercent) / 4), // 4 cal/g
    carbs: Math.round((calories * carbsPercent) / 4),     // 4 cal/g
    fats: Math.round((calories * fatPercent) / 9)         // 9 cal/g
  };
};

/**
 * Calculate one-rep max (1RM) using Epley formula
 * @param {number} weight - Weight lifted
 * @param {number} reps - Number of repetitions
 * @returns {number} Estimated 1RM
 */
export const calculateOneRepMax = (weight, reps) => {
  if (reps === 1) return weight;
  return Math.round(weight * (1 + reps / 30));
};

/**
 * Calculate training volume
 * @param {number} weight - Weight used
 * @param {number} sets - Number of sets
 * @param {number} reps - Reps per set
 * @returns {number} Total volume
 */
export const calculateVolume = (weight, sets, reps) => {
  return weight * sets * reps;
};

/**
 * Get recommended water intake in liters
 * @param {number} weight - Weight in kg
 * @param {string} activityLevel - Activity level
 * @returns {number} Water intake in liters
 */
export const calculateWaterIntake = (weight, activityLevel) => {
  const baseWater = weight * 0.033; // 33ml per kg
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1;
  return (baseWater * (multiplier / 1.5)).toFixed(1);
};

/**
 * Calculate protein requirement
 * @param {number} weight - Weight in kg
 * @param {string} goal - Fitness goal
 * @returns {number} Protein in grams
 */
export const calculateProteinRequirement = (weight, goal) => {
  let multiplier;
  
  switch (goal) {
    case 'muscle-gain':
      multiplier = 2.2; // 2.2g per kg
      break;
    case 'weight-loss':
      multiplier = 2.0; // 2.0g per kg
      break;
    default:
      multiplier = 1.6; // 1.6g per kg
  }
  
  return Math.round(weight * multiplier);
};
