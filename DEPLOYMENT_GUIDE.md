# Swinder Deployment Guide

## 🚀 Deploy to Vercel from GitHub

### Option 1: One-Click Deploy (Easiest)

1. **Push to GitHub first** (see instructions below)
2. Go to [Vercel Dashboard](https://vercel.com/new)
3. Click "Import Project"
4. Select your GitHub repository
5. Vercel will auto-detect Next.js
6. Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## 📦 Push to GitHub

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Repository name: `swinder`
3. Description: "Padel matchmaking app for UAE"
4. Keep it **Private** or **Public**
5. **Don't initialize** with README (we have one)
6. Click "Create repository"

### Step 2: Push Your Code

GitHub will show you commands. Use these:

```bash
git add .
git commit -m "Initial commit - Swinder app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/swinder.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## ⚙️ Configure Vercel

### Environment Variables (IMPORTANT!)

After deploying, add these in Vercel Dashboard → Settings → Environment Variables:

#### From Vercel Postgres:
```
POSTGRES_URL
POSTGRES_PRISMA_URL  
POSTGRES_URL_NON_POOLING
POSTGRES_USER
POSTGRES_HOST
POSTGRES_PASSWORD
POSTGRES_DATABASE
```

#### Custom:
```
SESSION_SECRET=your-random-secret-key-here
NODE_ENV=production
```

### Get Postgres Credentials:

1. In Vercel Dashboard, go to "Storage"
2. Create Postgres database (if not exists)
3. Click your database → ".env.local" tab
4. Copy all environment variables
5. Paste into Vercel project settings

---

## 🗄️ Initialize Database

### After deploying:

1. Go to your Vercel Postgres database
2. Click "Query" tab
3. Copy contents of `schema.sql`
4. Paste and run
5. Database is ready!

---

## 📱 Mobile App Deployment

### Configure for Production

Update `capacitor.config.json`:

```json
{
  "appId": "com.swinder.app",
  "appName": "Swinder",
  "webDir": "out",
  "server": {
    "url": "https://your-app.vercel.app",
    "cleartext": false
  }
}
```

### Build for Production

```bash
# Build Next.js
npm run build

# Export static files
npm run build && npx next export

# Sync to mobile
npx cap sync

# iOS
npx cap open ios

# Android  
npx cap open android
```

---

## ✅ Deployment Checklist

Before going live:

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables configured
- [ ] Postgres database created
- [ ] Schema.sql executed
- [ ] Test deployment works
- [ ] Mobile apps built
- [ ] App Store/Play Store ready

---

## 🔧 Troubleshooting

### "Database connection failed"
- Check environment variables in Vercel
- Ensure Postgres database is in same region
- Verify connection strings are correct

### "Build failed"
- Check build logs in Vercel
- Ensure all dependencies in package.json
- Verify Node version (18+)

### "Mobile app can't connect"
- Update capacitor.config.json with production URL
- Re-sync: `npx cap sync`
- Rebuild mobile apps

---

## 📊 Post-Deployment

### Monitor Your App:

- **Vercel Analytics:** Track performance
- **Vercel Logs:** Debug issues  
- **Postgres Metrics:** Monitor database

### Updates:

```bash
# Make changes
git add .
git commit -m "Update: feature XYZ"
git push

# Vercel auto-deploys!
```

---

**Need help?** Check Vercel docs or open an issue!
