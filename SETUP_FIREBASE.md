# 🔥 Firebase Setup - Complete Guide

## ⚡ Quick Steps (5 Minutes)

### Step 1️⃣: Create Firebase Project

1. **Open Firebase Console:**
   - Go to: https://console.firebase.google.com/
   - Sign in with your Google account

2. **Create New Project:**
   - Click the **"Create a project"** or **"Add project"** button
   - Project name: `FitForge` (or any name you like)
   - Click **Continue**
   
3. **Google Analytics (Optional):**
   - Toggle OFF "Enable Google Analytics" (not needed for now)
   - Click **Create project**
   - Wait 30 seconds for project creation
   - Click **Continue** when ready

---

### Step 2️⃣: Enable Authentication

1. **Navigate to Authentication:**
   - In left sidebar: Click **Build** → **Authentication**
   - Click **Get started** button

2. **Enable Email/Password:**
   - Click **Email/Password** from the list
   - Toggle **Enable** switch to ON
   - Click **Save**

3. **Enable Google Sign-In:**
   - Click **Google** from the sign-in providers list
   - Toggle **Enable** switch to ON
   - Select a **Project support email** (your email)
   - Click **Save**

✅ Authentication is now enabled!

---

### Step 3️⃣: Enable Firestore Database

1. **Navigate to Firestore:**
   - In left sidebar: Click **Build** → **Firestore Database**
   - Click **Create database** button

2. **Set Security Rules:**
   - Select **"Start in test mode"**
   - Click **Next**

3. **Choose Location:**
   - Select your region (e.g., `us-central` or closest to you)
   - Click **Enable**
   - Wait for database creation (~1 minute)

✅ Firestore Database is ready!

---

### Step 4️⃣: Get Firebase Configuration

1. **Go to Project Settings:**
   - Click the **⚙️ gear icon** (top left, next to "Project Overview")
   - Click **Project settings**

2. **Register Web App:**
   - Scroll down to **"Your apps"** section
   - Click the **`</>`** icon (Web platform)

3. **Register App:**
   - App nickname: `FitForge Web`
   - ❌ **DO NOT** check "Also set up Firebase Hosting"
   - Click **Register app**

4. **Copy Configuration:**
   You'll see a code snippet like this:

   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyC-aBcDeFgHiJkLmNoPqRsTuVwXyZ12345",
     authDomain: "fitforge-12345.firebaseapp.com",
     projectId: "fitforge-12345",
     storageBucket: "fitforge-12345.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef123456789012"
   };
   ```

   **📋 COPY ALL THESE VALUES!** You'll need them next.

5. Click **Continue to console**

✅ Configuration copied!

---

### Step 5️⃣: Update Your Project

**Now copy YOUR values from Firebase and paste them below:**

```
My Firebase Config:
-------------------
apiKey: _________________________________
authDomain: _________________________________
projectId: _________________________________
storageBucket: _________________________________
messagingSenderId: _________________________________
appId: _________________________________
```

---

## 🔧 Next: Tell Me Your Values

Once you have your Firebase config values, send me:
1. Your `projectId` (e.g., "fitforge-12345")

Or send all values and I'll update the `.env.local` file for you!

---

## ❓ Having Trouble?

**Can't find something?**
- Tell me which step you're stuck on
- Send a screenshot if needed

**Don't want to share values?**
- I can show you exactly which file to edit
- You can update it yourself

---

## 🎯 What Happens After Setup

Once configured, your app will have:
- ✅ User signup/login with email
- ✅ Google Sign-In button
- ✅ Profile data saved to Firestore
- ✅ Calorie tracking
- ✅ Workout plans
- ✅ All features unlocked!

---

**Ready? Let's do this! 🚀**
