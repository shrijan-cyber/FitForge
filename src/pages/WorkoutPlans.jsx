import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanGenerator from '../components/PlanGenerator';
import Card from '../components/Card';

const WorkoutPlans = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const sampleWorkouts = [
    {
      title: 'Push Day',
      exercises: [
        { name: 'Bench Press', sets: 4, reps: '8-10' },
        { name: 'Overhead Press', sets: 3, reps: '8-12' },
        { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12' },
        { name: 'Lateral Raises', sets: 3, reps: '12-15' },
        { name: 'Tricep Dips', sets: 3, reps: '10-12' }
      ]
    },
    {
      title: 'Pull Day',
      exercises: [
        { name: 'Deadlift', sets: 4, reps: '6-8' },
        { name: 'Pull-ups', sets: 3, reps: '8-10' },
        { name: 'Barbell Rows', sets: 4, reps: '8-10' },
        { name: 'Face Pulls', sets: 3, reps: '15-20' },
        { name: 'Bicep Curls', sets: 3, reps: '10-12' }
      ]
    },
    {
      title: 'Leg Day',
      exercises: [
        { name: 'Squats', sets: 4, reps: '8-10' },
        { name: 'Romanian Deadlift', sets: 3, reps: '10-12' },
        { name: 'Leg Press', sets: 3, reps: '12-15' },
        { name: 'Leg Curls', sets: 3, reps: '12-15' },
        { name: 'Calf Raises', sets: 4, reps: '15-20' }
      ]
    }
  ];

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Workout Plans
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Build strength with structured workout routines
          </p>
        </div>

        {/* AI Plan Generator */}
        <PlanGenerator user={user} />

        {/* Sample Workouts */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            <i className="fas fa-fire text-primary mr-3"></i>
            Sample Workout Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleWorkouts.map((workout, index) => (
              <Card key={index}>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  {workout.title}
                </h3>
                <div className="space-y-3">
                  {workout.exercises.map((ex, i) => (
                    <div key={i} className="flex justify-between items-start">
                      <span className="text-gray-700 dark:text-gray-300">{ex.name}</span>
                      <span className="text-sm font-semibold text-primary">
                        {ex.sets}x{ex.reps}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlans;
