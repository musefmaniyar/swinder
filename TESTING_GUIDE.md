# 🧪 COMPLETE APP TESTING GUIDE

**App URL:** https://swinder-sable.vercel.app
**Status:** ✅ DEPLOYED & LIVE
**Phase:** 1 Complete - Full Database Integration

---

## 🎯 TESTING PLAN

We'll test the complete user journey from registration to all features.

---

## TEST 1: NEW USER REGISTRATION ⏱️ 5 min

### Step 1.1: Navigate to App
1. Open browser
2. Go to: `https://swinder-sable.vercel.app`
3. Should redirect to `/login`

**✅ Expected:** Login page loads with Swinder logo

### Step 1.2: Enter Phone Number
1. Enter phone: `+971509999999` (new number)
2. Click "Send OTP"

**✅ Expected:** Moves to OTP screen

### Step 1.3: Enter OTP
1. Enter OTP: `123456`
2. Click "Verify & Continue"

**✅ Expected:** Redirects to `/setup` (6-step form)

### Step 1.4: Complete Profile Setup

**Step 1 - Personal Info:**
- Name: `Test User`
- Age: `25`
- Gender: `Male`
- Click "Continue →"

**Step 2 - Skill Level:**
- Select skill level: `3` (Intermediate)
- Click "Continue →"

**Step 3 - Availability:**
- Select times: `Evening`, `Night`
- Click "Continue →"

**Step 4 - Preferred Areas:**
- Select areas: `Dubai Marina`, `JBR`
- Click "Continue →"

**Step 5 - Choose Avatar:**
- Click any avatar photo
- Click "Continue →"

**Step 6 - Add Bio:**
- Type: "Looking for regular Padel partners!"
- Click "Complete Setup →"

**✅ Expected:** 
- Profile saves to database
- Redirects to `/home`

---

## TEST 2: HOME/SWIPE FUNCTIONALITY ⏱️ 3 min

### Step 2.1: View Candidates
**✅ Expected:**
- See profile card with photo
- Name, age, skill level displayed
- Location and times shown
- Bio visible (if available)

### Step 2.2: Swipe Right (Like)
1. Click the ❤️ button
2. Card slides away
3. Next profile appears

**✅ Expected:**
- Card animates smoothly
- Next candidate loads
- Swipe recorded in database

### Step 2.3: Swipe Left (Pass)
1. Click the ✕ button
2. Card slides away

**✅ Expected:**
- Card animates smoothly
- Next candidate loads

### Step 2.4: Get a Match (Random 20% chance)
Keep swiping right until you get:

**✅ Expected:**
- "It's a Match!" modal appears
- Shows matched user's name
- Heart animation
- "Send Message" button

---

## TEST 3: MATCHES & CHAT ⏱️ 3 min

### Step 3.1: View Matches
1. Click bottom nav: "💬 Matches"

**✅ Expected:**
- See list of matched users
- Shows match photos and names
- Shows skill levels

### Step 3.2: Open Chat
1. Click on any match

**✅ Expected:**
- Opens chat interface
- Shows match user's name and photo
- Message input at bottom

### Step 3.3: Send Message
1. Type: "Hey! Want to play Padel?"
2. Click send button (→)

**✅ Expected:**
- Message appears in chat
- Timestamp shown
- Message saved to database
- Auto-scrolls to bottom

### Step 3.4: Verify Message Persistence
1. Go back to matches
2. Return to same chat

**✅ Expected:**
- Previous message still there
- Loaded from database

---

## TEST 4: MATCH RECORDS ⏱️ 3 min

### Step 4.1: View Records Page
1. Click bottom nav: "📊 Records"

**✅ Expected:**
- See stats dashboard (W/L/Total/Win Rate)
- Match history list
- "+ Record Match" button

### Step 4.2: Record a Match
1. Click "+ Record Match"
2. Select result: `Win`
3. Enter score: `6-4, 6-3`
4. Click "Record Match"

**✅ Expected:**
- Modal closes
- Match appears in history
- Stats update (wins +1, total +1)
- Database updated

### Step 4.3: Verify Stats Calculation
**✅ Expected:**
- Win rate % calculated correctly
- Total matches incremented
- Recent match shown in list

---

## TEST 5: LEADERBOARD ⏱️ 2 min

### Step 5.1: View Leaderboard
1. Click bottom nav: "🏆 Leaderboard"

**✅ Expected:**
- See ranked list of players
- Top 3 have medals (🥇🥈🥉)
- Shows wins, skill level, win rate
- Your profile highlighted (if in list)

### Step 5.2: Check Real Data
**✅ Expected:**
- Rankings based on real wins
- Data from database
- Updates when matches recorded

---

## TEST 6: PROFILE MANAGEMENT ⏱️ 2 min

### Step 6.1: View Profile
1. Click bottom nav: "👤 Profile"

**✅ Expected:**
- Your photo displayed
- All info shown correctly
- Gender, skill, times, areas
- Bio displayed

### Step 6.2: Edit Profile
1. Click "Edit Profile"
2. Change bio to: "Updated bio - love Padel!"
3. Click "Save Changes"

**✅ Expected:**
- Modal closes
- Bio updates on screen
- Database updated

### Step 6.3: Logout
1. Click "Logout" button

**✅ Expected:**
- Redirects to `/login`
- Session cleared

---

## TEST 7: EXISTING USER LOGIN ⏱️ 2 min

### Step 7.1: Login with Existing User
1. Go to `/login`
2. Enter phone: `+971501234567` (test user from database)
3. Click "Send OTP"
4. Enter OTP: `123456`
5. Click "Verify & Continue"

**✅ Expected:**
- Skips setup (user exists)
- Goes directly to `/home`
- Shows user's actual profile

### Step 7.2: Verify Persisted Data
1. Check matches page
2. Check records page
3. Check profile

**✅ Expected:**
- All previous data still there
- Loaded from database

---

## 🎯 COMPLETE TEST RESULTS CHECKLIST

After testing, mark each:

### Core Features:
- [ ] Registration & profile setup works
- [ ] Profile saves to database
- [ ] Swipe interface loads real users
- [ ] Swipes create matches in DB
- [ ] Match detection works
- [ ] Matches list loads from DB
- [ ] Chat messages save to DB
- [ ] Messages persist after refresh
- [ ] Match recording works
- [ ] Stats calculate correctly
- [ ] Leaderboard shows real data
- [ ] Profile editing works
- [ ] Logout works
- [ ] Login with existing user works

### UI/UX:
- [ ] Loading states show
- [ ] Errors handled gracefully
- [ ] Empty states display
- [ ] Animations smooth
- [ ] Navigation works
- [ ] Mobile responsive

### Database:
- [ ] All data persists
- [ ] Real-time updates work
- [ ] No mock data visible
- [ ] Queries fast

---

## 🐛 COMMON ISSUES & FIXES

### Issue: "Failed to load"
**Fix:** 
- Check database is connected
- Verify environment variables
- Check Vercel logs

### Issue: No candidates appear
**Fix:**
- Database has 8 test users
- Check if already swiped all
- Reload page to start over

### Issue: Message won't send
**Fix:**
- Check match_id is valid
- Verify session active
- Check browser console

---

## ✅ SUCCESS CRITERIA

**Phase 1 is successful if:**
- ✅ All 14 features work
- ✅ Data persists in database
- ✅ No errors in console
- ✅ Complete user journey works
- ✅ Can create account → swipe → match → chat → record → leaderboard

---

## 📊 TESTING SUMMARY

**Total Tests:** 7 categories
**Total Steps:** ~40 steps
**Time Required:** ~20 minutes
**Critical Path:** Registration → Swipe → Match → Chat

---

**Start testing now!**
**Report any issues you find!**

**URL:** https://swinder-sable.vercel.app
