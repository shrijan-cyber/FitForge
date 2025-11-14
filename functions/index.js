const functions = require('firebase-functions');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors')({ origin: true });

/**
 * Cloud Function to generate fitness and diet plans using Gemini API
 * This keeps the API key secure on the server side
 * 
 * Setup:
 * 1. Set API key: firebase functions:config:set generative.key="YOUR_GEMINI_API_KEY"
 * 2. Deploy: firebase deploy --only functions
 * 
 * Local testing:
 * 1. Get config: firebase functions:config:get > .runtimeconfig.json
 * 2. Run emulator: firebase emulators:start --only functions
 */
exports.generatePlan = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      // Get API key from Firebase config (set via CLI)
      const apiKey = functions.config().generative?.key;
      
      if (!apiKey) {
        console.error('Gemini API key not configured');
        return res.status(500).json({ 
          error: 'Server configuration error',
          message: 'API key not set. Run: firebase functions:config:set generative.key="YOUR_KEY"'
        });
      }

      // Extract request parameters
      const { 
        goal,          // e.g., "muscle gain", "weight loss", "maintenance"
        age,
        weight,
        height,
        gender,
        activityLevel, // e.g., "sedentary", "moderate", "active"
        targetCalories,
        duration = 7,  // plan duration in days
        experience = 'beginner',
        workoutDays = 3,
        preferredTime = 'flexible',
        equipment = 'gym',
        injuries = '',
        dietaryRestrictions = ''
      } = req.body;

      // Validate required fields
      if (!goal || !age || !weight || !height) {
        return res.status(400).json({ 
          error: 'Missing required fields',
          required: ['goal', 'age', 'weight', 'height']
        });
      }

      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      // Construct detailed prompt for Gemini like a professional trainer
      const prompt = `As a professional fitness trainer and nutritionist, create a comprehensive ${duration}-day ${goal} fitness and diet plan based on this client assessment:

**CLIENT PROFILE:**
- Age: ${age} years
- Weight: ${weight} kg
- Height: ${height} cm
- Gender: ${gender || 'not specified'}
- Fitness Experience: ${experience}
- Activity Level: ${activityLevel || 'moderate'}
- Target Calories: ${targetCalories} kcal/day

**TRAINING PREFERENCES:**
- Workout Frequency: ${workoutDays} days per week
- Preferred Workout Time: ${preferredTime}
- Equipment Available: ${equipment}
${injuries ? `- Injuries/Limitations: ${injuries}` : ''}

**DIETARY INFORMATION:**
${dietaryRestrictions ? `- Dietary Restrictions/Preferences: ${dietaryRestrictions}` : '- No dietary restrictions'}

**CREATE A PERSONALIZED PLAN INCLUDING:**

1. **WORKOUT PROGRAM** (${workoutDays} days/week):
   - Specific exercises tailored to ${experience} level
   - Sets, reps, and rest periods
   - Exercise demonstrations/tips
   - Progression recommendations
   ${injuries ? '- Safe alternatives for injury management' : ''}
   - Warm-up and cool-down routines

2. **NUTRITION PLAN** (${targetCalories} kcal/day):
   - ${duration} days of complete meal plans
   - Exact foods, portions, and meal timing
   - Macronutrient breakdown (protein, carbs, fats)
   ${dietaryRestrictions ? `- All meals adapted for: ${dietaryRestrictions}` : ''}
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

Format the response clearly with day-by-day breakdown. Make it practical, safe, and achievable for a ${experience} with ${equipment}.`;

      // Generate content from Gemini
      console.log('Generating plan for:', { goal, age, weight, height });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const plan = response.text();

      // Return the generated plan
      return res.status(200).json({
        success: true,
        plan: plan,
        metadata: {
          goal,
          duration,
          generatedAt: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('Error generating plan:', error);
      return res.status(500).json({ 
        error: 'Failed to generate plan',
        message: error.message 
      });
    }
  });
});

/**
 * Health check endpoint
 */
exports.healthCheck = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    res.status(200).json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'FitForge Cloud Functions'
    });
  });
});
