# FitForge - Smart Fitness & Diet Web App

A comprehensive fitness tracking web application built with React, Vite, Firebase, and Google Gemini AI.

**Developed by Shrijan Chhetri**

---

## 🚀 Features

- **🔐 Authentication**: Email/password and Google Sign-In via Firebase Auth
- **📊 Calorie Tracker**: Log meals with macros and track daily progress
- **💪 Workout Plans**: Sample routines and AI-generated custom plans
- **🏋️ Powerlifting Tools**: One-rep max calculator with training percentages
- **📈 Progress Tracking**: BMI, BMR, TDEE calculations with visual displays
- **🤖 AI-Powered Plans**: Generate personalized fitness and diet plans using Gemini AI
- **🌓 Dark/Light Mode**: Beautiful theme switcher with persistent preference
- **📱 Responsive Design**: Mobile-first design with Tailwind CSS
- **✨ Animations**: GSAP-powered scroll animations and particle background

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **GSAP** - Animations
- **Chart.js** - Data visualization
- **FontAwesome** - Icons

### Backend
- **Firebase Authentication** - User management
- **Cloud Firestore** - Database
- **Cloud Functions** - Serverless API proxy
- **Google Gemini AI** - Plan generation

---

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Firebase account** (free tier works)
- **Google AI Studio API key** (for Gemini)

---

## 🔧 Installation & Setup

### 1. Clone the Repository

```powershell
cd D:\Project-intern
git clone <your-repo-url> FitForge
cd FitForge
```

### 2. Install Dependencies

```powershell
# Install frontend dependencies
npm install

# Install Firebase Functions dependencies
cd functions
npm install
cd ..
```

### 3. Firebase Setup

#### A. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Enable **Authentication** → Email/Password and Google providers
4. Enable **Cloud Firestore** → Start in test mode
5. Enable **Cloud Functions** (Blaze plan required for external API calls)

#### B. Get Firebase Config

1. In Firebase Console, go to **Project Settings** → **General**
2. Scroll to "Your apps" → Click "Web" icon
3. Register your app and copy the config object

#### C. Configure Environment Variables

Create `.env.local` in the root directory:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSy...your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123

# Cloud Functions URL (update after deployment)
# For local development:
VITE_FUNCTIONS_URL=http://localhost:5001/your-project-id/us-central1

# For production (after deployment):
# VITE_FUNCTIONS_URL=https://us-central1-your-project-id.cloudfunctions.net
```

### 4. Gemini AI Setup

#### A. Get API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key: `AIzaSyBYjX-NgdSmu9pBWnjR2AT5-yEEMagpiSw`

#### B. Configure Firebase Functions

```powershell
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in project
firebase init

# Select:
# - Functions (configure Cloud Functions)
# - Firestore (configure Firestore)
# Choose existing project
# Select JavaScript
# Install dependencies: Yes

# Set Gemini API key in Cloud Functions config
firebase functions:config:set generative.key="AIzaSyBYjX-NgdSmu9pBWnjR2AT5-yEEMagpiSw"
```

### 5. Local Development

#### Option A: Frontend Only (without Cloud Functions)

```powershell
npm run dev
```

Visit: http://localhost:3000

⚠️ **Note**: AI plan generation won't work without Cloud Functions running.

#### Option B: Full Stack (with Cloud Functions Emulator)

**Terminal 1** - Start Functions Emulator:
```powershell
# Get functions config for local emulator
firebase functions:config:get > functions\.runtimeconfig.json

# Start functions emulator
firebase emulators:start --only functions
```

**Terminal 2** - Start Vite Dev Server:
```powershell
npm run dev
```

Update `.env.local` to use emulator:
```
VITE_FUNCTIONS_URL=http://localhost:5001/your-project-id/us-central1
```

---

## 🚀 Deployment

### 1. Deploy Cloud Functions

```powershell
# Deploy functions to Firebase
npm run functions:deploy

# Or use Firebase CLI directly
firebase deploy --only functions
```

After deployment, update `.env.local` with production URL:
```
VITE_FUNCTIONS_URL=https://us-central1-your-project-id.cloudfunctions.net
```

### 2. Build & Deploy Frontend

```powershell
# Build for production
npm run build

# Deploy to Firebase Hosting (optional)
firebase deploy --only hosting

# Or deploy to your preferred hosting service (Vercel, Netlify, etc.)
```

---

## 🔐 Security Best Practices

### ⚠️ CRITICAL SECURITY WARNINGS

1. **NEVER commit API keys to git**
   - `.env.local` is gitignored
   - Never hardcode keys in source files
   - Rotate keys immediately if exposed

2. **Use Cloud Functions for API calls**
   - Frontend should NEVER call Gemini API directly
   - Always proxy through Cloud Functions
   - API keys stay server-side only

3. **Firebase Security Rules**

Update Firestore rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Workouts collection (example)
    match /workouts/{workoutId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

### Key Rotation

If your API key is exposed:

1. **Immediately revoke** the old key in Google AI Studio
2. Generate a new key
3. Update Cloud Functions config:
   ```powershell
   firebase functions:config:set generative.key="NEW_KEY_HERE"
   firebase deploy --only functions
   ```

---

## 📁 Project Structure

```
FitForge/
├── functions/              # Firebase Cloud Functions
│   ├── index.js           # Gemini API proxy function
│   └── package.json
├── public/
│   └── vite.svg
├── src/
│   ├── components/        # Reusable React components
│   │   ├── Navbar.jsx    # Navigation with theme toggle
│   │   ├── AnimatedCanvas.jsx  # GSAP particle background
│   │   ├── Card.jsx      # Styled card component
│   │   └── PlanGenerator.jsx   # AI plan form
│   ├── contexts/         # React Context providers
│   │   └── ThemeContext.jsx    # Dark/light mode state
│   ├── firebase/         # Firebase configuration
│   │   └── firebaseConfig.js
│   ├── pages/            # Route pages
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Profile.jsx
│   │   ├── CalorieTracker.jsx
│   │   ├── WorkoutPlans.jsx
│   │   └── Powerlifting.jsx
│   ├── utils/            # Utility functions
│   │   ├── api.js        # Backend API calls
│   │   └── calc.js       # Fitness calculations
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles (Tailwind)
├── .env.local            # Environment variables (DO NOT COMMIT!)
├── .env.local.example    # Template for env variables
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#1e40af',  // Change your primary color
        light: '#3b82f6',
        dark: '#1e3a8a'
      }
    }
  }
}
```

### Fonts

Update `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap');

body {
  font-family: 'YourFont', sans-serif;
}
```

---

## 🧪 Testing

```powershell
# Run linter
npm run lint

# Build for production (test for errors)
npm run build

# Preview production build
npm run preview
```

---

## 📊 Example Gemini Prompts

The AI plan generator uses prompts like:

```
Create a comprehensive 7-day muscle-gain fitness and diet plan for:
- Age: 25 years
- Weight: 70 kg
- Height: 175 cm
- Gender: male
- Activity Level: moderate
- Target Calories: 2500 kcal/day

Please provide:
1. Daily meal plans with specific foods, portions, and macros (protein, carbs, fats)
2. 7 workout routines with 5-6 exercises per day, including sets and reps
3. Rest days and recovery recommendations
4. Hydration and supplement suggestions
5. Progress tracking tips

Format the response in a clear, structured way with sections for each day.
```

---

## 🐛 Troubleshooting

### Issue: Cloud Functions not working locally

**Solution**:
```powershell
firebase functions:config:get > functions\.runtimeconfig.json
firebase emulators:start --only functions
```

### Issue: Gemini API key error

**Check**:
1. Key is set: `firebase functions:config:get`
2. Key is valid in Google AI Studio
3. Cloud Functions are deployed

### Issue: Dark mode not persisting

**Solution**: Check browser localStorage is enabled

### Issue: Firebase auth errors

**Solution**: 
1. Verify Firebase config in `.env.local`
2. Enable auth providers in Firebase Console
3. Check domain is authorized in Firebase settings

---

## 📝 Available Scripts

```powershell
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Run ESLint

# Firebase Functions
npm run functions:serve   # Start functions emulator
npm run functions:deploy  # Deploy functions to Firebase
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Developer

**Shrijan Chhetri**

- Portfolio: [Your Website]
- GitHub: [@YourGitHub]
- LinkedIn: [Your LinkedIn]

---

## 🙏 Acknowledgments

- **Google Gemini AI** for plan generation
- **Firebase** for backend infrastructure
- **Tailwind CSS** for styling system
- **GSAP** for smooth animations
- **FontAwesome** for icons

---

## 📮 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Email: your.email@example.com

---

**Built with ❤️ and lots of ☕ by Shrijan Chhetri**
