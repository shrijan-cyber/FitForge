import { useState } from 'react';
import { generateFitnessPlan } from '../utils/api';
import Card from './Card';

const PlanGenerator = ({ user }) => {
  const [formData, setFormData] = useState({
    goal: 'muscle-gain',
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    activityLevel: 'moderate',
    targetCalories: '',
    duration: 7,
    experience: 'beginner',
    workoutDays: 3,
    preferredTime: 'morning',
    equipment: 'gym',
    injuries: '',
    dietaryRestrictions: ''
  });

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPlan(null);

    try {
      const result = await generateFitnessPlan(formData);
      setPlan(result.plan);
    } catch (err) {
      setError(err.message || 'Failed to generate plan. Please try again.');
      console.error('Plan generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          <i className="fas fa-magic text-primary mr-3"></i>
          Generate Custom Plan
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Goal */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Fitness Goal
              </label>
              <select name="goal" value={formData.goal} onChange={handleChange} className="input">
                <option value="muscle-gain">Muscle Gain</option>
                <option value="weight-loss">Weight Loss</option>
                <option value="maintenance">Maintenance</option>
                <option value="endurance">Endurance</option>
              </select>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Age
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
                placeholder="e.g., 25"
              />
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
                className="input"
                placeholder="e.g., 70"
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
                placeholder="e.g., 175"
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
                <option value="other">Other</option>
              </select>
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Activity Level
              </label>
              <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="input">
                <option value="sedentary">Sedentary</option>
                <option value="light">Lightly Active</option>
                <option value="moderate">Moderately Active</option>
                <option value="active">Very Active</option>
                <option value="extremely-active">Extremely Active</option>
              </select>
            </div>

            {/* Target Calories */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Target Calories (kcal/day)
              </label>
              <input
                type="number"
                name="targetCalories"
                value={formData.targetCalories}
                onChange={handleChange}
                required
                min="1000"
                max="5000"
                className="input"
                placeholder="e.g., 2500"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Plan Duration (days)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                min="1"
                max="30"
                className="input"
                placeholder="e.g., 7"
              />
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                <i className="fas fa-star text-primary mr-2"></i>
                Fitness Experience
              </label>
              <select name="experience" value={formData.experience} onChange={handleChange} className="input">
                <option value="beginner">Beginner (0-6 months)</option>
                <option value="intermediate">Intermediate (6 months - 2 years)</option>
                <option value="advanced">Advanced (2+ years)</option>
                <option value="athlete">Athlete/Competitive</option>
              </select>
            </div>

            {/* Workout Days Per Week */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                <i className="fas fa-calendar-alt text-primary mr-2"></i>
                Workouts Per Week
              </label>
              <select name="workoutDays" value={formData.workoutDays} onChange={handleChange} className="input">
                <option value="2">2 days/week</option>
                <option value="3">3 days/week</option>
                <option value="4">4 days/week</option>
                <option value="5">5 days/week</option>
                <option value="6">6 days/week</option>
              </select>
            </div>

            {/* Preferred Workout Time */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                <i className="fas fa-clock text-primary mr-2"></i>
                Preferred Workout Time
              </label>
              <select name="preferredTime" value={formData.preferredTime} onChange={handleChange} className="input">
                <option value="morning">Morning (6-10 AM)</option>
                <option value="afternoon">Afternoon (12-4 PM)</option>
                <option value="evening">Evening (5-9 PM)</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            {/* Equipment Available */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                <i className="fas fa-dumbbell text-primary mr-2"></i>
                Equipment Available
              </label>
              <select name="equipment" value={formData.equipment} onChange={handleChange} className="input">
                <option value="gym">Full Gym Access</option>
                <option value="home-basic">Home (Dumbbells/Resistance Bands)</option>
                <option value="home-none">Home (Bodyweight Only)</option>
                <option value="limited">Limited Equipment</option>
              </select>
            </div>
          </div>

          {/* Injuries/Limitations */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              <i className="fas fa-band-aid text-primary mr-2"></i>
              Injuries or Physical Limitations (Optional)
            </label>
            <textarea
              name="injuries"
              value={formData.injuries}
              onChange={handleChange}
              rows="2"
              className="input"
              placeholder="e.g., Lower back pain, knee injury, shoulder issues..."
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              This helps create a safer, more personalized plan
            </p>
          </div>

          {/* Dietary Restrictions */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              <i className="fas fa-utensils text-primary mr-2"></i>
              Dietary Restrictions/Preferences (Optional)
            </label>
            <textarea
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
              rows="2"
              className="input"
              placeholder="e.g., Vegetarian, vegan, lactose intolerant, allergies..."
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              We'll tailor your meal plan accordingly
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full text-lg"
          >
            {loading ? (
              <>
                <div className="spinner inline-block w-5 h-5 mr-2"></div>
                Generating Your Plan...
              </>
            ) : (
              <>
                <i className="fas fa-sparkles mr-2"></i>
                Generate Plan
              </>
            )}
          </button>
        </form>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500">
          <div className="flex items-start space-x-3">
            <i className="fas fa-exclamation-circle text-red-500 text-xl mt-1"></i>
            <div>
              <h3 className="font-semibold text-red-700 dark:text-red-400">Error</h3>
              <p className="text-red-600 dark:text-red-300">{error}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Plan Display */}
      {plan && (
        <Card className="animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              <i className="fas fa-file-alt text-primary mr-3"></i>
              Your Custom Plan
            </h2>
            <button
              onClick={() => setPlan(null)}
              className="btn btn-secondary text-sm"
            >
              <i className="fas fa-times mr-2"></i>
              Close
            </button>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap text-sm bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
              {plan}
            </pre>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PlanGenerator;
