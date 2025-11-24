# 🗄️ Database Setup Guide - Vercel Postgres

## Step 1: Create Vercel Postgres Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on the **Storage** tab (or **Data** depending on your UI)
3. Click **Create Database**
4. Select **Postgres**
5. Enter database name: `swinder-db`
6. Select region: **iad1 (Washington, D.C., USA)** - closest to UAE with good latency
7. Click **Create**

## Step 2: Get Connection String

After database is created:
1. Click on your database (`swinder-db`)
2. Go to the **.env.local** tab
3. You'll see environment variables like:
   ```
   POSTGRES_URL="postgres://..."
   POSTGRES_PRISMA_URL="postgres://..."
   POSTGRES_URL_NON_POOLING="postgres://..."
   POSTGRES_USER="..."
   POSTGRES_HOST="..."
   POSTGRES_PASSWORD="..."
   POSTGRES_DATABASE="..."
   ```
4. **Copy all these variables**

## Step 3: Add to Local Environment

1. In your project, create a file called `.env.local` (if not exists)
2. Paste all the Vercel Postgres environment variables
3. Add session secret:
   ```
   SESSION_SECRET="your-super-secret-random-string-12345"
   ```

Your `.env.local` should look like:
```env
POSTGRES_URL="postgres://default:..."
POSTGRES_PRISMA_URL="postgres://..."
POSTGRES_URL_NON_POOLING="postgres://..."
POSTGRES_USER="default"
POSTGRES_HOST="..."
POSTGRES_PASSWORD="..."
POSTGRES_DATABASE="verceldb"
SESSION_SECRET="your-super-secret-random-string-12345"
```

## Step 4: Initialize Database Schema

1. In Vercel Dashboard, go to your database
2. Click on the **Query** tab
3. Copy the contents of `schema.sql` file from your project
4. Paste into the query editor
5. Click **Run Query**

You should see success messages for:
- ✅ Created users table
- ✅ Created swipes table
- ✅ Created matches table
- ✅ Created messages table
- ✅ Created match_results table
- ✅ Created indexes
- ✅ Inserted sample users

## Step 5: Verify Data

1. Still

 in the **Query** tab, run:
   ```sql
   SELECT * FROM users;
   ```
2. You should see 8 test users (Ahmed, Sara, Mohammed, etc.)

## Step 6: Install Dependencies

Back in your project terminal:
```bash
npm install
```

This will install:
- `next` - Next.js framework
- `@vercel/postgres` - Postgres driver
- `swr` - Data fetching
- `bcrypt` - Password hashing (for future use)
- `uuid` - UUID generation
- `@capacitor/*` - Mobile app dependencies

## Step 7: Test Connection

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## ✅ You're Done!

Your database is now:
- ✅ Created on Vercel
- ✅ Schema initialized
- ✅ Sample data loaded
- ✅ Connected to your local app
- ✅ Ready for development!

---

## 🔧 Troubleshooting

### Error: "Connection refused"
- Check that `.env.local` exists and has correct connection strings
- Restart your dev server: `npm run dev`

### Error: "relation does not exist"
- Schema wasn't initialized properly
- Go back to Step 4 and run schema.sql again

### Error: "No database selected"
- Your Vercel Postgres database might not be created yet
- Go back to Step 1

---

## 📊 Database Schema Summary

**Tables:**
- `users` - User profiles (name, phone, skill level, etc.)
- `swipes` - Swipe history (who swiped whom)
- `matches` - Mutual matches
- `messages` - Chat messages
- `match_results` - Game results with verification

**Sample Users (for testing):**
1. Ahmed - Skill 4 (Male, Dubai Marina/JBR)
2. Sara - Skill 3 (Female, Dubai Marina/Business Bay)
3. Mohammed - Skill 5 (Male, Sports City/Arabian Ranches)
4. Fatima - Skill 4 (Female, JBR/Jumeirah)
5. Omar - Skill 3 (Male, Dubai Marina/Downtown)
6. Layla - Skill 2 (Female, Business Bay/Downtown)
7. Khalid - Skill 5 (Male, Sports City/Arabian Ranches)
8. Amira - Skill 3 (Female, Dubai Marina/JBR)

You can login as any of these users by entering their phone number!

---

**Next:** Continue with authentication system development
