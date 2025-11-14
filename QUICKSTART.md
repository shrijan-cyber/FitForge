# FitForge Quick Start Guide

## ✅ What's Already Done

- ✅ All dependencies installed
- ✅ Gemini API key configured (in `.env.local`)
- ✅ Project structure created
- ✅ All components and pages ready

## 🚀 Next Steps to Run Locally

### 1. Set Up Firebase (Required)

You need to create a Firebase project to use authentication and database features:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** → Name it "FitForge" → Continue
3. Disable Google Analytics (optional) → Create project

### 2. Enable Firebase Services

**A. Authentication:**
1. In Firebase Console → **Authentication** → **Get Started**
2. Enable **Email/Password** sign-in method
3. Enable **Google** sign-in method

**B. Firestore Database:**
1. In Firebase Console → **Firestore Database** → **Create database**
2. Choose **Start in test mode** → Select location → Enable

**C. Get Firebase Config:**
1. Go to **Project Settings** (gear icon) → **General**
2. Scroll to "Your apps" → Click **Web** icon `</>`
3. Register app → Name it "FitForge Web"
4. **Copy the config object**

### 3. Update .env.local File

Open `D:\Project-intern\FitForge\.env.local` and replace with your Firebase config:

```env
VITE_FIREBASE_API_KEY=AIzaSy...your_actual_key
VITE_FIREBASE_AUTH_DOMAIN=your-project-123.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-123
VITE_FIREBASE_STORAGE_BUCKET=your-project-123.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456

# Keep this for local testing (no Cloud Functions needed for basic testing)
VITE_FUNCTIONS_URL=http://localhost:5001/your-project-123/us-central1

# Gemini key already set
VITE_GEMINI_API_KEY=AIzaSyBYjX-NgdSmu9pBWnjR2AT5-yEEMagpiSw
```

### 4. Run the App!

```powershell
cd D:\Project-intern\FitForge
npm run dev
```

Visit: **http://localhost:3000**

## 🎉 What You Can Do Now

Without Cloud Functions (basic features):
- ✅ Sign up / Log in with email or Google
- ✅ View home page and navigation
- ✅ Update your profile
- ✅ Track calories (saved locally)
- ✅ View sample workout plans
- ✅ Use powerlifting calculators
- ✅ Toggle dark/light mode
- ⚠️ AI plan generation won't work (needs Cloud Functions)

## 🚀 Optional: Enable AI Plan Generation

To use the AI-powered plan generator, you need Cloud Functions:

### A. Install Firebase CLI

```powershell
npm install -g firebase-tools
```

### B. Login and Initialize

```powershell
firebase login
firebase init

# Select:
# ✓ Functions
# ✓ Firestore
# Choose existing project: your-project-123
# Use JavaScript
# Install dependencies: Yes
```

### C. Set Gemini API Key

```powershell
firebase functions:config:set generative.key="AIzaSyBYjX-NgdSmu9pBWnjR2AT5-yEEMagpiSw"
```

### D. Deploy Functions

```powershell
firebase deploy --only functions
```

### E. Update .env.local

After deployment, update Functions URL:
```env
VITE_FUNCTIONS_URL=https://us-central1-your-project-123.cloudfunctions.net
```

Restart dev server: `npm run dev`

## 🎨 Features Included

### Dark/Light Mode
- Click sun/moon icon in navbar
- Preference saved automatically
- Works across all pages

### Authentication
- Email/password signup and login
- Google Sign-In button
- Protected routes (redirects to login)

### Pages
- **Home** - Hero, features, stats with GSAP animations
- **Profile** - Edit info, view BMI/BMR/TDEE
- **Calories** - Track meals with macros
- **Workouts** - Sample plans + AI generator (with Functions)
- **Powerlifting** - 1RM calculator, training percentages

## 🔧 Troubleshooting

### "Firebase: Error (auth/...)"
→ Check Firebase config in `.env.local`
→ Make sure Auth providers are enabled in Firebase Console

### "Failed to generate plan"
→ Cloud Functions not deployed or API key not set
→ Use `firebase deploy --only functions`

### Dark mode not working
→ Clear browser cache and localStorage
→ Hard refresh (Ctrl+Shift+R)

### Port 3000 already in use
→ Edit `vite.config.js` and change port to 3001

## 📚 Learn More

- Full README: `README.md`
- Firebase Console: https://console.firebase.google.com/
- Google AI Studio: https://makersuite.google.com/
- Tailwind Docs: https://tailwindcss.com/docs

---

**Happy coding! 💪🔥**

*Developed by Shrijan Chhetri*
