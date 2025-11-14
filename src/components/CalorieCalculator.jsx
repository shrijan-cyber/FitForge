import { useState } from 'react';
import Card from './Card';
import { calculateBMR, calculateTDEE, calculateMacros, calculateProteinRequirement } from '../utils/calc';

const CalorieCalculator = () => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintenance'
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCalculate = (e) => {
    e.preventDefault();

    // Calculate BMR
    const bmr = calculateBMR(
      parseFloat(formData.weight),
      parseFloat(formData.height),
      parseInt(formData.age),
      formData.gender
    );

    // Calculate TDEE (maintenance calories)
    const tdee = calculateTDEE(bmr, formData.activityLevel);

    // Calculate target calories based on goal
    let targetCalories;
    if (formData.goal === 'weight-loss') {
      targetCalories = Math.round(tdee * 0.8); // 20% deficit
    } else if (formData.goal === 'muscle-gain') {
      targetCalories = Math.round(tdee * 1.1); // 10% surplus
    } else {
      targetCalories = tdee; // maintenance
    }

    // Calculate macros
    const macros = calculateMacros(targetCalories, formData.goal);

    // Calculate protein requirement
    const proteinGoal = calculateProteinRequirement(parseFloat(formData.weight), formData.goal);

    setResults({
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      macros,
      proteinGoal,
      goal: formData.goal
    });
  };

  const activityDescriptions = {
    sedentary: 'Little to no exercise',
    light: 'Light exercise 1-3 days/week',
    moderate: 'Moderate exercise 3-5 days/week',
    active: 'Heavy exercise 6-7 days/week',
    'extremely-active': 'Very heavy exercise, physical job'
  };

  return (
    <Card>
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mr-4">
          <i className="fas fa-calculator text-white text-xl"></i>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Maintenance Calorie Calculator
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Calculate your daily calorie needs
          </p>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Age */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Age (years)
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="10"
              max="100"
              className="input"
              placeholder="25"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Gender
            </label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="input">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Weight (kg)
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
              min="30"
              max="300"
              step="0.1"
              className="input"
              placeholder="70"
            />
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Height (cm)
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
              min="100"
              max="250"
              className="input"
              placeholder="175"
            />
          </div>

          {/* Activity Level */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Activity Level
            </label>
            <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="input">
              <option value="sedentary">Sedentary - {activityDescriptions.sedentary}</option>
              <option value="light">Lightly Active - {activityDescriptions.light}</option>
              <option value="moderate">Moderately Active - {activityDescriptions.moderate}</option>
              <option value="active">Very Active - {activityDescriptions.active}</option>
              <option value="extremely-active">Extremely Active - {activityDescriptions['extremely-active']}</option>
            </select>
          </div>

          {/* Goal */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Your Goal
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, goal: 'weight-loss' })}
                className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                  formData.goal === 'weight-loss'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <i className="fas fa-weight mr-2"></i>
                Weight Loss
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, goal: 'maintenance' })}
                className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                  formData.goal === 'maintenance'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <i className="fas fa-balance-scale mr-2"></i>
                Maintain
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, goal: 'muscle-gain' })}
                className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                  formData.goal === 'muscle-gain'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <i className="fas fa-dumbbell mr-2"></i>
                Muscle Gain
              </button>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full text-lg">
          <i className="fas fa-calculator mr-2"></i>
          Calculate My Calories
        </button>
      </form>

      {/* Results */}
      {results && (
        <div className="mt-8 space-y-6 animate-slide-up">
          <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              <i className="fas fa-chart-pie text-primary mr-2"></i>
              Your Results
            </h3>

            {/* Main Calorie Numbers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-2 border-blue-500">
                <div className="text-sm text-blue-700 dark:text-blue-300 font-semibold mb-1">
                  BMR (Basal Metabolic Rate)
                </div>
                <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                  {results.bmr}
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  calories/day at rest
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-2 border-green-500">
                <div className="text-sm text-green-700 dark:text-green-300 font-semibold mb-1">
                  TDEE (Maintenance)
                </div>
                <div className="text-3xl font-bold text-green-700 dark:text-green-300">
                  {results.tdee}
                </div>
                <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                  calories/day to maintain
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border-2 border-purple-500">
                <div className="text-sm text-purple-700 dark:text-purple-300 font-semibold mb-1">
                  Your Target
                </div>
                <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                  {results.targetCalories}
                </div>
                <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                  {results.goal === 'weight-loss' && 'calories/day (20% deficit)'}
                  {results.goal === 'maintenance' && 'calories/day (maintenance)'}
                  {results.goal === 'muscle-gain' && 'calories/day (10% surplus)'}
                </div>
              </div>
            </div>

            {/* Macros Breakdown */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 p-6 rounded-lg">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <i className="fas fa-apple-alt text-primary mr-2"></i>
                Daily Macronutrient Goals
              </h4>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{results.macros.protein}g</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Protein</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {Math.round((results.macros.protein * 4 / results.targetCalories) * 100)}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{results.macros.carbs}g</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Carbs</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {Math.round((results.macros.carbs * 4 / results.targetCalories) * 100)}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{results.macros.fats}g</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Fats</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {Math.round((results.macros.fats * 9 / results.targetCalories) * 100)}%
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <p>
                  <i className="fas fa-info-circle text-primary mr-2"></i>
                  <strong>Protein Goal:</strong> {results.proteinGoal}g per day ({(results.proteinGoal / parseFloat(formData.weight)).toFixed(1)}g per kg body weight)
                </p>
                <p>
                  <i className="fas fa-lightbulb text-primary mr-2"></i>
                  <strong>Tip:</strong> Spread your protein intake evenly throughout the day for optimal muscle synthesis
                </p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-300 dark:border-yellow-700">
              <h4 className="font-bold text-yellow-900 dark:text-yellow-300 mb-2">
                <i className="fas fa-star text-yellow-500 mr-2"></i>
                Recommendations
              </h4>
              <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                {results.goal === 'weight-loss' && (
                  <>
                    <li>• Aim for 0.5-1kg weight loss per week for sustainable results</li>
                    <li>• Keep protein high to preserve muscle mass</li>
                    <li>• Track your calories for at least 2 weeks to see progress</li>
                  </>
                )}
                {results.goal === 'maintenance' && (
                  <>
                    <li>• Monitor your weight weekly - adjust calories if needed</li>
                    <li>• Focus on nutrient-dense whole foods</li>
                    <li>• Maintain consistent workout routine</li>
                  </>
                )}
                {results.goal === 'muscle-gain' && (
                  <>
                    <li>• Aim for 0.25-0.5kg weight gain per week</li>
                    <li>• Prioritize progressive overload in training</li>
                    <li>• Get adequate sleep (7-9 hours) for recovery</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default CalorieCalculator;
