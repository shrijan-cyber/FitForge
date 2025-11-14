/**
 * API utility functions for backend communication
 * Handles calls to Firebase Cloud Functions for Gemini AI integration
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

const FUNCTIONS_URL = import.meta.env.VITE_FUNCTIONS_URL || 'http://localhost:5001';

/**
 * Generate a fitness and diet plan using Gemini AI
 * @param {Object} userData - User data for plan generation
 * @returns {Promise<Object>} Generated plan
 */
export const generateFitnessPlan = async (userData) => {
  // For local development, use direct Gemini API
  // For production, use Cloud Functions
  const useDirectAPI = !FUNCTIONS_URL.includes('cloudfunctions.net');
  
  if (useDirectAPI) {
    console.log('🔧 Development mode: Using direct Gemini API');
    return generatePlanDirect(userData);
  }
  
  // Production: Use Cloud Functions
  try {
    const response = await fetch(`${FUNCTIONS_URL}/generatePlan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate plan');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * ⚠️ DEVELOPMENT ONLY - Direct Gemini API call
 * This exposes your API key in the frontend bundle
 * DO NOT use this in production!
 * 
 * For production, always use the Cloud Function above
 */
export const generatePlanDirect = async (userData) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('Gemini API key not configured');
  }

  console.warn('⚠️ WARNING: Using direct API call. This exposes your API key!');
  console.warn('Use Cloud Function (generateFitnessPlan) in production instead.');

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Enhanced trainer-style prompt
    const prompt = `As a professional fitness trainer and nutritionist, create a comprehensive ${userData.duration}-day ${userData.goal} fitness and diet plan based on this client assessment:

**CLIENT PROFILE:**
- Age: ${userData.age} years
- Weight: ${userData.weight} kg
- Height: ${userData.height} cm
- Gender: ${userData.gender || 'not specified'}
- Fitness Experience: ${userData.experience || 'beginner'}
- Activity Level: ${userData.activityLevel || 'moderate'}
- Target Calories: ${userData.targetCalories} kcal/day

**TRAINING PREFERENCES:**
- Workout Frequency: ${userData.workoutDays || 3} days per week
- Preferred Workout Time: ${userData.preferredTime || 'flexible'}
- Equipment Available: ${userData.equipment || 'gym'}
${userData.injuries ? `- Injuries/Limitations: ${userData.injuries}` : ''}

**DIETARY INFORMATION:**
${userData.dietaryRestrictions ? `- Dietary Restrictions/Preferences: ${userData.dietaryRestrictions}` : '- No dietary restrictions'}

**CREATE A PERSONALIZED PLAN INCLUDING:**

1. **WORKOUT PROGRAM** (${userData.workoutDays || 3} days/week):
   - Specific exercises tailored to ${userData.experience || 'beginner'} level
   - Sets, reps, and rest periods
   - Exercise demonstrations/tips
   - Progression recommendations
   ${userData.injuries ? '- Safe alternatives for injury management' : ''}
   - Warm-up and cool-down routines

2. **NUTRITION PLAN** (${userData.targetCalories} kcal/day):
   - ${userData.duration} days of complete meal plans
   - Exact foods, portions, and meal timing
   - Macronutrient breakdown (protein, carbs, fats)
   ${userData.dietaryRestrictions ? `- All meals adapted for: ${userData.dietaryRestrictions}` : ''}
   - Snack options and meal prep tips
   - Hydration recommendations

3. **RECOVERY & LIFESTYLE:**
   - Rest day activities
   - Sleep recommendations
   - Stress management tips
   - Supplement suggestions (if appropriate)

4. **PROGRESS TRACKING:**
   - Key metrics to monitor
   - When and how to progress
   - Warning signs to watch for

Format the response clearly with day-by-day breakdown. Make it practical, safe, and achievable for a ${userData.experience || 'beginner'} with ${userData.equipment || 'gym'}.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const plan = response.text();

    return {
      success: true,
      plan,
      metadata: {
        goal: userData.goal,
        duration: userData.duration,
        generatedAt: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Direct API Error:', error);
    throw error;
  }
};

/**
 * Health check endpoint
 */
export const healthCheck = async () => {
  try {
    const response = await fetch(`${FUNCTIONS_URL}/healthCheck`);
    return await response.json();
  } catch (error) {
    console.error('Health check failed:', error);
    return { status: 'error', error: error.message };
  }
};
