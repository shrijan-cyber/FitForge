import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';

// Components
import Navbar from './components/Navbar';
import AnimatedCanvas from './components/AnimatedCanvas';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import CalorieTracker from './pages/CalorieTracker';
import WorkoutPlans from './pages/WorkoutPlans';
import Powerlifting from './pages/Powerlifting';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Animated background */}
        <AnimatedCanvas />
        
        {/* Navigation */}
        <Navbar user={user} />
        
        {/* Main content */}
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/calories" element={<CalorieTracker user={user} />} />
            <Route path="/workouts" element={<WorkoutPlans user={user} />} />
            <Route path="/powerlifting" element={<Powerlifting user={user} />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="relative z-10 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 mt-20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Developed by <span className="font-semibold text-primary dark:text-primary-light">Shrijan Chhetri</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              © {new Date().getFullYear()} FitForge. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
