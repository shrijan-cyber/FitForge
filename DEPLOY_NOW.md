# 🚀 Quick Deploy to Vercel - 5 Minutes

## ✅ Your Configuration (Ready to Use)

Your environment variables for Vercel:

```
VITE_FIREBASE_API_KEY=AIzaSyCo4TSIgsZqVcv6e-pM8DpGm54GYRKPp6w
VITE_FIREBASE_AUTH_DOMAIN=fitforge-1155f.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=fitforge-1155f
VITE_FIREBASE_STORAGE_BUCKET=fitforge-1155f.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1080735504650
VITE_FIREBASE_APP_ID=1:1080735504650:web:596a7940ba7d9be22c82f3
VITE_GEMINI_API_KEY=AIzaSyBYjX-NgdSmu9pBWnjR2AT5-yEEMagpiSw
VITE_FUNCTIONS_URL=http://localhost:5001/fitforge-1155f/us-central1
```

---

## 📋 3 Steps to Deploy

### **Step 1: Push to GitHub (if not done)**

```powershell
# In your project directory
cd D:\Project-intern\FitForge

# Initialize git (skip if already done)
git init

# Add all files
git add .

# Commit
git commit -m "feat: complete FitForge fitness app"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/FitForge.git
git branch -M main
git push -u origin main
```

---

### **Step 2: Deploy on Vercel**

1. Go to: **https://vercel.com/**
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Select **FitForge** repository
5. Click **"Import"**
6. **Add Environment Variables** (click "Environment Variables"):
   - Copy-paste each variable from above ☝️
   - Make sure to select **"Production", "Preview", and "Development"**
7. Click **"Deploy"**
8. Wait 2-3 minutes ⏱️

---

### **Step 3: Add Vercel Domain to Firebase**

1. After deployment, copy your Vercel URL (e.g., `fitforge-abc123.vercel.app`)
2. Go to: **https://console.firebase.google.com/project/fitforge-1155f/authentication/settings**
3. Scroll to **"Authorized domains"**
4. Click **"Add domain"**
5. Paste your Vercel URL (without `https://`)
6. Click **"Add"**

---

## ✅ Done!

Visit your live site: `https://your-app.vercel.app`

---

## 🐛 If Something Doesn't Work

### **Blank Page?**
→ Check Vercel Dashboard → Settings → Environment Variables
→ Make sure ALL 8 variables are added
→ Redeploy from Deployments tab

### **Auth Errors?**
→ Make sure you added Vercel domain to Firebase authorized domains
→ Go to Firebase Console → Authentication → Settings → Authorized domains

### **Build Failed?**
→ Check Vercel build logs
→ Common fix:
```powershell
cd D:\Project-intern\FitForge
rm -r node_modules, dist
npm install
npm run build
git add .
git commit -m "fix: rebuild dependencies"
git push
```

---

## 📊 What to Test After Deployment

1. ✅ Home page loads
2. ✅ Sign up works
3. ✅ Login works
4. ✅ Dark mode toggle works
5. ✅ Calorie calculator works
6. ✅ AI workout plan generator works
7. ✅ All pages navigate correctly

---

## 🎉 Success Checklist

- [ ] App deployed to Vercel
- [ ] All environment variables added
- [ ] Vercel domain added to Firebase
- [ ] Can sign up and log in
- [ ] All features work
- [ ] Shared URL with friends!

---

**Your FitForge app is production-ready!** 💪🔥

*Need detailed help? Check `VERCEL_DEPLOYMENT.md`*
