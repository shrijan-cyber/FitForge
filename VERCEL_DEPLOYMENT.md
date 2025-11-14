# 🚀 Vercel Deployment Guide - FitForge

## 📋 Pre-Deployment Checklist

Before deploying to Vercel, ensure:

- ✅ Project builds successfully locally (`npm run build`)
- ✅ All environment variables are ready
- ✅ Firebase project is set up and configured
- ✅ Git repository is created and pushed to GitHub/GitLab/Bitbucket

---

## 🔧 Step-by-Step Deployment

### **Step 1: Prepare Your Repository**

```powershell
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "feat: complete FitForge fitness tracking app with AI"

# Create GitHub repo and push
# (Create repo on GitHub first, then:)
git remote add origin https://github.com/YOUR_USERNAME/FitForge.git
git branch -M main
git push -u origin main
```

---

### **Step 2: Deploy to Vercel**

#### **Option A: Via Vercel Dashboard (Recommended)**

1. **Go to Vercel:**
   - Visit: https://vercel.com/
   - Sign in with GitHub

2. **Import Project:**
   - Click **"Add New..."** → **"Project"**
   - Select your **FitForge** repository
   - Click **"Import"**

3. **Configure Project:**
   - **Framework Preset:** Vite (auto-detected)
   - **Root Directory:** `./` (leave as is)
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `dist` (auto-filled)
   - **Install Command:** `npm install` (auto-filled)

4. **Add Environment Variables:**
   Click **"Environment Variables"** and add:

   ```
   VITE_FIREBASE_API_KEY = AIzaSyCo4TSIgsZqVcv6e-pM8DpGm54GYRKPp6w
   VITE_FIREBASE_AUTH_DOMAIN = fitforge-1155f.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID = fitforge-1155f
   VITE_FIREBASE_STORAGE_BUCKET = fitforge-1155f.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID = 1080735504650
   VITE_FIREBASE_APP_ID = 1:1080735504650:web:596a7940ba7d9be22c82f3
   VITE_GEMINI_API_KEY = AIzaSyBYjX-NgdSmu9pBWnjR2AT5-yEEMagpiSw
   VITE_FUNCTIONS_URL = https://your-functions-url (or leave empty for now)
   ```

   ⚠️ **Important:** Add these to **ALL environments** (Production, Preview, Development)

5. **Deploy:**
   - Click **"Deploy"**
   - Wait 2-3 minutes for build to complete

6. **Visit Your Site:**
   - Vercel will provide a URL like: `https://fitforge-xxx.vercel.app`

---

#### **Option B: Via Vercel CLI**

```powershell
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
cd D:\Project-intern\FitForge
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name? fitforge
# - Directory? ./
# - Override settings? N

# Deploy to production
vercel --prod
```

---

## 🐛 Common Issues & Solutions

### **Issue 1: Build Fails - "Module not found"**

**Solution:**
```powershell
# Delete node_modules and reinstall
rm -r node_modules
rm package-lock.json
npm install
npm run build
```

Then commit and push:
```powershell
git add .
git commit -m "fix: reinstall dependencies"
git push
```

---

### **Issue 2: Blank Page After Deployment**

**Causes:**
- Environment variables not set
- Firebase domain not authorized

**Solution:**

1. **Check Environment Variables in Vercel:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Verify ALL variables are present
   - Redeploy: Deployments → Three dots → Redeploy

2. **Add Vercel Domain to Firebase:**
   - Go to Firebase Console
   - Authentication → Settings → Authorized domains
   - Add your Vercel domain: `fitforge-xxx.vercel.app`
   - Add custom domain if you have one

---

### **Issue 3: "Failed to fetch" on Workout Plan Generator**

**Solution:**

Your app uses direct Gemini API calls for local dev, which works in production too! But if you want to use Cloud Functions:

1. Deploy Firebase Functions:
   ```powershell
   firebase deploy --only functions
   ```

2. Update Vercel environment variable:
   ```
   VITE_FUNCTIONS_URL = https://us-central1-fitforge-1155f.cloudfunctions.net
   ```

3. Redeploy on Vercel

---

### **Issue 4: 404 on Refresh (Routes Not Working)**

**Solution:**

The `vercel.json` file (already created) handles this. If still having issues:

1. Verify `vercel.json` exists in root
2. Check the rewrites section exists
3. Redeploy

---

### **Issue 5: CORS Errors**

**Solution:**

Add your Vercel domain to Firebase:
1. Firebase Console → Authentication → Settings → Authorized domains
2. Add: `your-app.vercel.app`

---

## 🔒 Security Checklist for Production

### **Before Going Live:**

1. ✅ **Review Environment Variables**
   - All API keys in Vercel dashboard (NOT in code)
   - `.env.local` in `.gitignore` (already done)

2. ✅ **Firebase Security Rules**
   - Update Firestore rules from test mode to production
   - Go to Firebase Console → Firestore → Rules:

   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       match /workouts/{workoutId} {
         allow create: if request.auth != null;
         allow read, update, delete: if request.auth != null && 
           resource.data.userId == request.auth.uid;
       }
       match /meals/{mealId} {
         allow create: if request.auth != null;
         allow read, update, delete: if request.auth != null && 
           resource.data.userId == request.auth.uid;
       }
     }
   }
   ```

3. ✅ **Add Custom Domain** (Optional)
   - Vercel Dashboard → Your Project → Settings → Domains
   - Add your custom domain
   - Update Firebase authorized domains

4. ✅ **Enable Production Mode**
   - Remove any console.logs
   - Enable analytics if needed

---

## 📊 Vercel Dashboard - What to Check

After deployment, verify:

1. **Deployments Tab:**
   - Status: ✅ Ready
   - Build time: ~2-3 minutes
   - No error logs

2. **Settings → Environment Variables:**
   - All 8 variables present
   - Applied to all environments

3. **Settings → Domains:**
   - Default domain active
   - Custom domain configured (if applicable)

4. **Analytics:**
   - Page views tracking
   - Performance metrics

---

## 🔄 Redeploying After Changes

### **Automatic Deployment:**
Every time you push to GitHub, Vercel auto-deploys:

```powershell
git add .
git commit -m "feat: add new feature"
git push
```

### **Manual Deployment:**
From Vercel Dashboard:
- Deployments → Three dots → Redeploy

---

## 🎯 Post-Deployment Testing

After deployment, test:

1. ✅ **Home Page** - Loads correctly
2. ✅ **Sign Up** - Can create account
3. ✅ **Login** - Can log in
4. ✅ **Dark Mode** - Toggle works
5. ✅ **Profile** - Can update info
6. ✅ **Calorie Calculator** - Calculations work
7. ✅ **Calorie Tracker** - Can add meals
8. ✅ **Workout Plans** - AI generator works
9. ✅ **Powerlifting** - 1RM calculator works
10. ✅ **Mobile** - Responsive design works

---

## 📱 Custom Domain Setup (Optional)

### **Add Custom Domain:**

1. **Buy domain** (Namecheap, GoDaddy, etc.)

2. **Add to Vercel:**
   - Settings → Domains → Add
   - Enter: `fitforge.com` or `www.fitforge.com`

3. **Update DNS:**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or A record to Vercel IP

4. **Update Firebase:**
   - Add custom domain to authorized domains

5. **SSL Certificate:**
   - Vercel handles this automatically (Let's Encrypt)

---

## 📈 Performance Optimization

### **Already Implemented:**
- ✅ Vite for fast builds
- ✅ Code splitting
- ✅ Asset compression
- ✅ CDN via Vercel Edge Network

### **Optional Improvements:**

```javascript
// vite.config.js - Add these optimizations
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          'charts': ['chart.js', 'react-chartjs-2'],
          'animations': ['gsap']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

---

## 🆘 Still Having Issues?

### **Check Build Logs:**
1. Vercel Dashboard → Deployments → Failed deployment
2. Click "View Build Logs"
3. Look for error messages

### **Common Error Messages:**

**"Cannot find module 'X'"**
→ Run `npm install` and commit `package-lock.json`

**"Build exceeded maximum duration"**
→ Upgrade Vercel plan or optimize build

**"Environment variable not defined"**
→ Add missing variables in Vercel settings

---

## ✅ Deployment Checklist

Before marking deployment as complete:

- [ ] Build succeeds locally
- [ ] All environment variables added to Vercel
- [ ] Firebase domains authorized
- [ ] Test login/signup works
- [ ] Test all features work
- [ ] Mobile responsive verified
- [ ] Dark mode works
- [ ] No console errors in browser
- [ ] SSL certificate active (https://)
- [ ] Custom domain configured (if applicable)

---

## 🎉 Success!

Your FitForge app is now live on Vercel!

**Share your deployment:**
- URL: `https://fitforge-xxx.vercel.app`
- Add to portfolio
- Share on social media

---

**Need help?** Check:
- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev/guide/
- Firebase Docs: https://firebase.google.com/docs

---

*Deployed with ❤️ by Shrijan Chhetri*
