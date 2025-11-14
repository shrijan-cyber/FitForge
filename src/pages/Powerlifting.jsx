import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { calculateOneRepMax, calculateVolume } from '../utils/calc';

const Powerlifting = ({ user }) => {
  const navigate = useNavigate();
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [oneRM, setOneRM] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (weight && reps) {
      const result = calculateOneRepMax(parseFloat(weight), parseInt(reps));
      setOneRM(result);
    }
  };

  const percentages = [95, 90, 85, 80, 75, 70, 65, 60];

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Powerlifting Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Calculate your one-rep max and training percentages
          </p>
        </div>

        {/* 1RM Calculator */}
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            <i className="fas fa-calculator text-primary mr-3"></i>
            One-Rep Max Calculator
          </h2>
          <form onSubmit={handleCalculate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Weight Lifted (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                  min="0"
                  step="0.5"
                  className="input"
                  placeholder="100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Repetitions
                </label>
                <input
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  required
                  min="1"
                  max="20"
                  className="input"
                  placeholder="5"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              <i className="fas fa-calculator mr-2"></i>
              Calculate 1RM
            </button>
          </form>

          {oneRM && (
            <div className="mt-8 p-6 bg-gradient-to-br from-primary to-accent rounded-xl text-white">
              <h3 className="text-lg font-semibold mb-2">Estimated One-Rep Max</h3>
              <div className="text-5xl font-bold mb-4">{oneRM} kg</div>
              <p className="text-sm opacity-90">
                Based on {weight}kg × {reps} reps using the Epley formula
              </p>
            </div>
          )}
        </Card>

        {/* Training Percentages */}
        {oneRM && (
          <Card>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              <i className="fas fa-percent text-primary mr-3"></i>
              Training Percentages
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {percentages.map(percent => (
                <div
                  key={percent}
                  className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {percent}%
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {Math.round((oneRM * percent) / 100)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">kg</div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                <i className="fas fa-info-circle mr-2"></i>
                Training Guidelines
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• 90-100%: Max strength (1-3 reps)</li>
                <li>• 80-90%: Strength building (4-6 reps)</li>
                <li>• 70-80%: Hypertrophy (8-12 reps)</li>
                <li>• 60-70%: Muscular endurance (12-15+ reps)</li>
              </ul>
            </div>
          </Card>
        )}

        {/* Big 3 Tracker */}
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            <i className="fas fa-trophy text-primary mr-3"></i>
            The Big 3
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Squat', 'Bench Press', 'Deadlift'].map(lift => (
              <div key={lift} className="text-center p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <i className={`fas fa-dumbbell text-4xl text-primary mb-3`}></i>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {lift}
                </h3>
                <div className="text-3xl font-bold text-primary mb-1">---</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Record your PR
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Powerlifting;
