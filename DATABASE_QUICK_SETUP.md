# 🗄️ DATABASE QUICK SETUP - MANUAL STEPS

**Time:** 5-10 minutes  
**Current:** You have database "swinder-db" created

---

## ✅ STEP-BY-STEP GUIDE

### **Step 1: Open Database Details**

In your browser at: https://vercel.com/mushebs-projects/swinder-jf8f/stores

1. Look for **"swinder-db"** in the list
2. If you see a **"Connect"** button → Click it → Click "Connect" in modal
3. Click the **"View"** button next to swinder-db

### **Step 2: Go to Query Tab**

1. You should now be on the database details page
2. Look for tabs at the top: **Data | Query | .env.local | Settings**
3. Click the **"Query"** tab

### **Step 3: Run Schema SQL**

1. In the Query editor, **DELETE any existing text**
2. **Copy ALL** the SQL below (scroll down)
3. **Paste** into the Query editor
4. Click **"Run Query"** button
5. You should see: **"Query executed successfully"** or similar
6. **Expected result:** 8 users created (Ahmed, Sara, Mohammed, etc.)

---

## 📋 SQL TO COPY (Copy Everything Below This Line)

```sql
-- Swinder Database Schema for Vercel Postgres (Padel-focused)

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  age INTEGER,
  gender TEXT,
  skill_level INTEGER DEFAULT 3, -- 1-5 for Padel
  preferred_times TEXT[] DEFAULT ARRAY[]::TEXT[], -- ['Morning', 'Evening']
  preferred_areas TEXT[] DEFAULT ARRAY[]::TEXT[], -- ['Dubai Marina', 'JBR']
  bio TEXT,
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Swipes table
CREATE TABLE IF NOT EXISTS swipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  swiper_id UUID REFERENCES users(id) ON DELETE CASCADE,
  swiped_id UUID REFERENCES users(id) ON DELETE CASCADE,
  direction TEXT NOT NULL, -- 'right' or 'left'
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(swiper_id, swiped_id)
);

-- Matches table
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user2_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user1_id, user2_id)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Match Results table
CREATE TABLE IF NOT EXISTS match_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  winner_id UUID REFERENCES users(id) ON DELETE SET NULL,
  loser_id UUID REFERENCES users(id) ON DELETE SET NULL,
  result_type TEXT NOT NULL, -- 'win', 'loss', 'draw'
  score TEXT,
  recorded_by UUID REFERENCES users(id) ON DELETE CASCADE,
  verified_by UUID REFERENCES users(id) ON DELETE SET NULL,
  verification_status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'disputed'
  created_at TIMESTAMP DEFAULT NOW(),
  verified_at TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_swipes_swiper ON swipes(swiper_id);
CREATE INDEX IF NOT EXISTS idx_swipes_swiped ON swipes(swiped_id);
CREATE INDEX IF NOT EXISTS idx_matches_user1 ON matches(user1_id);
CREATE INDEX IF NOT EXISTS idx_matches_user2 ON matches(user2_id);
CREATE INDEX IF NOT EXISTS idx_messages_match ON messages(match_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_results_match ON match_results(match_id);
CREATE INDEX IF NOT EXISTS idx_results_status ON match_results(verification_status);

-- Sample data for testing
INSERT INTO users (name, phone, age, gender, skill_level, preferred_times, preferred_areas, bio, photo_url)
VALUES 
  ('Ahmed', '+971501234567', 28, 'Male', 4, ARRAY['Morning', 'Evening'], ARRAY['Dubai Marina', 'JBR'], 'Passionate Padel player looking for partners!', 'https://i.pravatar.cc/300?img=12'),
  ('Sara', '+971502345678', 25, 'Female', 3, ARRAY['Evening'], ARRAY['Dubai Marina', 'Business Bay'], 'Love playing Padel after work', 'https://i.pravatar.cc/300?img=45'),
  ('Mohammed', '+971503456789', 32, 'Male', 5, ARRAY['Morning', 'Afternoon'], ARRAY['Sports City', 'Arabian Ranches'], 'Competitive player, let''s play!', 'https://i.pravatar.cc/300?img=33'),
  ('Fatima', '+971504567890', 27, 'Female', 4, ARRAY['Morning'], ARRAY['JBR', 'Jumeirah'], 'Beginner-intermediate player', 'https://i.pravatar.cc/300?img=23'),
  ('Omar', '+971505678901', 30, 'Male', 3, ARRAY['Evening', 'Night'], ARRAY['Dubai Marina', 'Downtown'], 'Looking for regular Padel partners', 'https://i.pravatar.cc/300?img=51'),
  ('Layla', '+971506789012', 24, 'Female', 2, ARRAY['Afternoon', 'Evening'], ARRAY['Business Bay', 'Downtown'], 'New to Padel, learning fast!', 'https://i.pravatar.cc/300?img=38'),
  ('Khalid', '+971507890123', 35, 'Male', 5, ARRAY['Morning'], ARRAY['Sports City', 'Arabian Ranches'], 'Advanced player, tournament ready', 'https://i.pravatar.cc/300?img=61'),
  ('Amira', '+971508901234', 26, 'Female', 3, ARRAY['Evening'], ARRAY['Dubai Marina', 'JBR'], 'Social Padel player', 'https://i.pravatar.cc/300?img=44')
ON CONFLICT (phone) DO NOTHING;
```

---

### **Step 4: Get Environment Variables**

1. Still in database details, click the **".env.local"** tab
2. You'll see several variables like:
   ```
   POSTGRES_URL="..."
   POSTGRES_PRISMA_URL="..."
   POSTGRES_URL_NON_POOLING="..."
   etc.
   ```
3. Click the **"Copy Snippet"** button (or manually copy all variables)

### **Step 5: Add to Vercel Project**

1. Go back to your project: https://vercel.com/mushebs-projects/swinder-jf8f
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in left sidebar
4. For EACH variable from Step 4:
   - Click **"Add New"**
   - Paste **Name** (e.g., `POSTGRES_URL`)
   - Paste **Value** (the actual connection string)
   - Leave **Environment** as "All" or select "Production"
   - Click **"Save"**

5. **ALSO ADD THIS ONE** (important!):
   - Name: `SESSION_SECRET`
   - Value: `swinder-production-2025-uae-launch-secret-key`
   - Click **"Save"**

### **Step 6: Redeploy**

1. Go to **"Deployments"** tab
2. Find the latest deployment (topmost one)
3. Click the **"..."** (three dots) button
4. Click **"Redeploy"**
5. Wait 1-2 minutes for redeployment to complete

---

## ✅ VERIFICATION

### After redeployment, your app should:
- ✅ Have working database connection
- ✅ Be able to log in
- ✅ Show 8 test users in leaderboard
- ✅ Allow swiping on profiles

### Test It:
1. Open your Vercel URL (find in Deployments tab)
2. Login with phone: `+971501234567`
3. OTP: `123456`
4. Should work! 🎉

---

## 🆘 TROUBLESHOOTING

**Issue:** "Can't connect to database"
- ✅ Make sure you ran the schema SQL
- ✅ Make sure all env vars are added
- ✅ Make sure you redeployed after adding env vars

**Issue:** "No users found"
- ✅ Run the schema SQL again (it's safe to run multiple times)
- ✅ Check the "Data" tab to see if users table has data

**Issue:** "Still not working"
- ✅ Check Vercel deployment logs for errors
- ✅ Make sure database is "Connected" not just "Created"
- ✅ Try redeploying again

---

**That's it! After these steps, your app should be LIVE and working! 🚀**

Let me know when you're done with each step!
