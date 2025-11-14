import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import Card from '../components/Card';
import { calculateBMI, getBMICategory, calculateBMR, calculateTDEE } from '../utils/calc';

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    goal: 'maintenance',
    activityLevel: 'moderate'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile({
            name: data.name || '',
            weight: data.profile?.weight || '',
            height: data.profile?.height || '',
            age: data.profile?.age || '',
            gender: data.profile?.gender || 'male',
            goal: data.profile?.goal || 'maintenance',
            activityLevel: data.profile?.activityLevel || 'moderate'
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        name: profile.name,
        profile: {
          weight: parseFloat(profile.weight) || null,
          height: parseFloat(profile.height) || null,
          age: parseInt(profile.age) || null,
          gender: profile.gender,
          goal: profile.goal,
          activityLevel: profile.activityLevel
        },
        updatedAt: new Date().toISOString()
      });

      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating profile. Please try again.');
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  // Calculate stats if data available
  const bmi = profile.weight && profile.height ? calculateBMI(profile.weight, profile.height) : null;
  const bmiCategory = bmi ? getBMICategory(bmi) : null;
  const bmr = profile.weight && profile.height && profile.age ? 
    calculateBMR(profile.weight, profile.height, profile.age, profile.gender) : null;
  const tdee = bmr ? calculateTDEE(bmr, profile.activityLevel) : null;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Your Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your personal information and fitness goals
          </p>
        </div>

        {message && (
          <Card className={`${
            message.includes('success') 
              ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500' 
              : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-500'
          }`}>
            <p className={`${
              message.includes('success') 
                ? 'text-green-700 dark:text-green-400' 
                : 'text-red-700 dark:text-red-400'
            }`}>
              <i className={`fas fa-${message.includes('success') ? 'check' : 'exclamation'}-circle mr-2`}></i>
              {message}
            </p>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                <i className="fas fa-user mr-3 text-primary"></i>
                Personal Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    required
                    className="input"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={profile.weight}
                      onChange={handleChange}
                      min="30"
                      max="300"
                      step="0.1"
                      className="input"
                      placeholder="70"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={profile.height}
                      onChange={handleChange}
                      min="100"
                      max="250"
                      className="input"
                      placeholder="175"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={profile.age}
                      onChange={handleChange}
                      min="10"
                      max="100"
                      className="input"
                      placeholder="25"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Gender
                    </label>
                    <select name="gender" value={profile.gender} onChange={handleChange} className="input">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Fitness Goal
                    </label>
                    <select name="goal" value={profile.goal} onChange={handleChange} className="input">
                      <option value="weight-loss">Weight Loss</option>
                      <option value="muscle-gain">Muscle Gain</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="endurance">Endurance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Activity Level
                    </label>
                    <select name="activityLevel" value={profile.activityLevel} onChange={handleChange} className="input">
                      <option value="sedentary">Sedentary</option>
                      <option value="light">Lightly Active</option>
                      <option value="moderate">Moderately Active</option>
                      <option value="active">Very Active</option>
                      <option value="extremely-active">Extremely Active</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary w-full"
                >
                  {saving ? (
                    <>
                      <div className="spinner inline-block w-5 h-5 mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save mr-2"></i>
                      Save Changes
                    </>
                  )}
                </button>
              </form>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {bmi && (
              <Card>
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                  BMI
                </h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{bmi}</div>
                  <div className={`font-semibold ${bmiCategory.color}`}>
                    {bmiCategory.category}
                  </div>
                </div>
              </Card>
            )}

            {bmr && (
              <Card>
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                  BMR
                </h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {Math.round(bmr)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    calories/day
                  </div>
                </div>
              </Card>
            )}

            {tdee && (
              <Card>
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                  TDEE
                </h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {tdee}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    calories/day
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
