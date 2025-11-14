import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import CalorieCalculator from '../components/CalorieCalculator';
import { calculateMacros } from '../utils/calc';

const CalorieTracker = ({ user }) => {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: ''
  });
  const [targetCalories, setTargetCalories] = useState(2000);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Load meals from localStorage
    const saved = localStorage.getItem(`meals_${user.uid}`);
    if (saved) {
      setMeals(JSON.parse(saved));
    }
  }, [user, navigate]);

  const saveMeals = (updatedMeals) => {
    setMeals(updatedMeals);
    localStorage.setItem(`meals_${user.uid}`, JSON.stringify(updatedMeals));
  };

  const handleAddMeal = (e) => {
    e.preventDefault();
    const meal = {
      id: Date.now(),
      ...newMeal,
      calories: parseFloat(newMeal.calories),
      protein: parseFloat(newMeal.protein) || 0,
      carbs: parseFloat(newMeal.carbs) || 0,
      fats: parseFloat(newMeal.fats) || 0,
      date: new Date().toISOString()
    };
    saveMeals([...meals, meal]);
    setNewMeal({ name: '', calories: '', protein: '', carbs: '', fats: '' });
  };

  const handleDeleteMeal = (id) => {
    saveMeals(meals.filter(m => m.id !== id));
  };

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFats = meals.reduce((sum, m) => sum + m.fats, 0);
  const progress = (totalCalories / targetCalories) * 100;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Calorie Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your daily nutrition and stay on target
          </p>
        </div>

        {/* Maintenance Calorie Calculator */}
        <CalorieCalculator />

        {/* Progress Overview */}
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Today's Progress
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Calories
              </span>
              <span className="text-lg font-bold text-primary">
                {Math.round(totalCalories)} / {targetCalories} kcal
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${Math.min(progress, 100)}%` }}></div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{Math.round(totalProtein)}g</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{Math.round(totalCarbs)}g</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Carbs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{Math.round(totalFats)}g</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Fats</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Add Meal Form */}
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            <i className="fas fa-plus-circle text-primary mr-3"></i>
            Log Meal
          </h2>
          <form onSubmit={handleAddMeal} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-3">
                <input
                  type="text"
                  placeholder="Meal name (e.g., Chicken breast)"
                  value={newMeal.name}
                  onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                  required
                  className="input"
                />
              </div>
              <input
                type="number"
                placeholder="Calories"
                value={newMeal.calories}
                onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
                required
                min="0"
                className="input"
              />
              <input
                type="number"
                placeholder="Protein (g)"
                value={newMeal.protein}
                onChange={(e) => setNewMeal({ ...newMeal, protein: e.target.value })}
                min="0"
                step="0.1"
                className="input"
              />
              <input
                type="number"
                placeholder="Carbs (g)"
                value={newMeal.carbs}
                onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })}
                min="0"
                step="0.1"
                className="input"
              />
              <input
                type="number"
                placeholder="Fats (g)"
                value={newMeal.fats}
                onChange={(e) => setNewMeal({ ...newMeal, fats: e.target.value })}
                min="0"
                step="0.1"
                className="input"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              <i className="fas fa-plus mr-2"></i>
              Add Meal
            </button>
          </form>
        </Card>

        {/* Meals List */}
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Today's Meals ({meals.length})
          </h2>
          {meals.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No meals logged yet. Add your first meal above!
            </p>
          ) : (
            <div className="space-y-3">
              {meals.map((meal) => (
                <div
                  key={meal.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{meal.name}</h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {meal.calories} kcal • P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fats}g
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteMeal(meal.id)}
                    className="ml-4 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CalorieTracker;
