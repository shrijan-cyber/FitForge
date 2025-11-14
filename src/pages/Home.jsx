import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card from '../components/Card';

gsap.registerPlugin(ScrollTrigger);

const Home = ({ user }) => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    // Hero animation
    gsap.from(heroRef.current.children, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });

    // Features scroll animation
    const features = featuresRef.current.querySelectorAll('.feature-card');
    features.forEach((feature, index) => {
      gsap.from(feature, {
        scrollTrigger: {
          trigger: feature,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1
      });
    });
  }, []);

  const features = [
    {
      icon: 'fa-calculator',
      title: 'Calorie Tracker',
      description: 'Track your daily calorie intake with precision and manage your nutrition goals effectively.'
    },
    {
      icon: 'fa-dumbbell',
      title: 'Workout Plans',
      description: 'Get personalized workout routines tailored to your fitness level and goals.'
    },
    {
      icon: 'fa-chart-line',
      title: 'Progress Tracking',
      description: 'Monitor your fitness journey with detailed analytics and visual progress reports.'
    },
    {
      icon: 'fa-brain',
      title: 'AI-Powered Plans',
      description: 'Generate custom fitness and diet plans using advanced AI technology.'
    },
    {
      icon: 'fa-weight',
      title: 'Powerlifting Tools',
      description: 'Calculate your one-rep max, track volume, and optimize your strength training.'
    },
    {
      icon: 'fa-users',
      title: 'Community Support',
      description: 'Join a community of fitness enthusiasts and share your progress.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div ref={heroRef} className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-responsive-xl font-extrabold text-gray-900 dark:text-white">
            Transform Your Body with{' '}
            <span className="text-gradient">FitForge</span>
          </h1>
          
          <p className="text-responsive-md text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your ultimate fitness companion. Track calories, plan workouts, and achieve your health goals with AI-powered insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <>
                <Link to="/calories" className="btn btn-primary text-lg">
                  <i className="fas fa-fire mr-2"></i>
                  Start Tracking
                </Link>
                <Link to="/workouts" className="btn btn-outline text-lg">
                  <i className="fas fa-dumbbell mr-2"></i>
                  View Workouts
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup" className="btn btn-primary text-lg">
                  <i className="fas fa-rocket mr-2"></i>
                  Get Started Free
                </Link>
                <Link to="/login" className="btn btn-outline text-lg">
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Log In
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary">10K+</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Active Users</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary">50K+</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Workouts Logged</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary">95%</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="bg-gray-50 dark:bg-gray-800/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-responsive-lg font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive tools and features to help you reach your fitness goals faster
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`fas ${feature.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="text-center max-w-3xl mx-auto bg-gradient-to-br from-primary to-accent text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who have transformed their lives with FitForge
          </p>
          {!user && (
            <Link to="/signup" className="btn bg-white text-primary hover:bg-gray-100 text-lg">
              <i className="fas fa-user-plus mr-2"></i>
              Create Free Account
            </Link>
          )}
        </Card>
      </section>
    </div>
  );
};

export default Home;
