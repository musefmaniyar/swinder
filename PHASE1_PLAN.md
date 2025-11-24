# 🔧 PHASE 1: DATABASE INTEGRATION PLAN

**Goal:** Connect all features to real database, remove mock data
**Time:** 2-3 hours
**Status:** In Progress

---

## 📊 CURRENT STATE ANALYSIS

### Pages Using MOCK Data (Need to Fix):
- ❌ `/home` - MOCK_CANDIDATES (3 fake users)
- ❌ `/matches` - MOCK_MATCHES (3 fake matches)
- ❌ `/chat/[matchId]` - MOCK_MESSAGES (fake messages)
- ❌ `/records` - MOCK_STATS + MOCK_RESULTS (fake stats)
- ❌ `/leaderboard` - MOCK_LEADERBOARD (fake rankings)
- ❌ `/profile` - MOCK_USER (fake profile)
- ❌ `/login` - localStorage (works but not ideal)
- ❌ `/setup` - Bypasses to home (not saving profile)

### API Routes (Already Built):
- ✅ `/api/auth/send-otp` - Mock OTP sending
- ✅ `/api/auth/verify-otp` - Real DB check
- ✅ `/api/user/me` - Get current user
- ✅ `/api/user/setup` - Create profile
- ✅ `/api/user/profile` - Update profile
- ✅ `/api/candidates` - Get swipeable users
- ✅ `/api/swipe` - Record swipe, create matches
- ✅ `/api/matches/list` - Get matches
- ✅ `/api/chat/[matchId]/messages` - Get messages
- ✅ `/api/chat/[matchId]/send` - Send message
- ✅ `/api/records/list` - Get results & stats
- ✅ `/api/records/create` - Record match
- ✅ `/api/records/[id]/verify` - Verify result
- ✅ `/api/leaderboard` - Get rankings

---

## 🎯 TASKS TO COMPLETE

### TASK 1: Fix Authentication & Session
**Files:** `login/page.js`, `setup/page.js`
**Priority:** HIGH
**Time:** 30 min

Changes:
1. ✅ Login uses API properly (already works)
2. ❌ Setup page needs to save profile to DB (currently bypasses)
3. ❌ Add proper session management
4. ❌ Add auth middleware/protection

---

### TASK 2: Connect Home/Swipe Page to Database
**File:** `home/page.js`
**Priority:** HIGH
**Time:** 45 min

Changes:
1. ❌ Remove MOCK_CANDIDATES
2. ❌ Fetch from `/api/candidates` on page load
3. ❌ Send swipes to `/api/swipe`
4. ❌ Handle match detection from API
5. ❌ Add loading state while fetching
6. ❌ Add error handling
7. ❌ Re-fetch when candidates run out

---

### TASK 3: Connect Matches Page to Database
**File:** `matches/page.js`
**Priority:** HIGH
**Time:** 20 min

Changes:
1. ❌ Remove MOCK_MATCHES
2. ❌ Fetch from `/api/matches/list` on page load
3. ❌ Add loading state
4. ❌ Add error handling
5. ❌ Show real match timestamps

---

### TASK 4: Connect Chat to Database
**File:** `chat/[matchId]/page.js`
**Priority:** HIGH
**Time:** 30 min

Changes:
1. ❌ Remove MOCK_MESSAGES
2. ❌ Fetch from `/api/chat/[matchId]/messages` on page load
3. ❌ Send messages to `/api/chat/[matchId]/send`
4. ❌ Add loading state
5. ❌ Add error handling
6. ❌ Auto-refresh messages (polling every 3 seconds)

---

### TASK 5: Connect Records to Database
**File:** `records/page.js`
**Priority:** MEDIUM
**Time:** 30 min

Changes:
1. ❌ Remove MOCK_STATS and MOCK_RESULTS
2. ❌ Fetch from `/api/records/list` on page load
3. ❌ Send new records to `/api/records/create`
4. ❌ Add loading state
5. ❌ Add error handling
6. ❌ Handle verification flow

---

### TASK 6: Connect Leaderboard to Database
**File:** `leaderboard/page.js`
**Priority:** MEDIUM
**Time:** 15 min

Changes:
1. ❌ Remove MOCK_LEADERBOARD
2. ❌ Fetch from `/api/leaderboard` on page load
3. ❌ Add loading state
4. ❌ Add error handling
5. ❌ Highlight current user position

---

### TASK 7: Connect Profile to Database
**File:** `profile/page.js`
**Priority:** MEDIUM
**Time:** 20 min

Changes:
1. ❌ Remove MOCK_USER
2. ❌ Fetch from `/api/user/me` on page load
3. ❌ Send updates to `/api/user/profile`
4. ❌ Add loading state
5. ❌ Add error handling
6. ❌ Proper logout flow

---

### TASK 8: Add Loading Skeletons
**Files:** All pages
**Priority:** LOW
**Time:** 30 min

Changes:
1. ❌ Create LoadingSkeleton component
2. ❌ Add to all data-fetching pages
3. ❌ Smooth transitions

---

### TASK 9: Add Error Handling
**Files:** All pages
**Priority:** MEDIUM
**Time:** 20 min

Changes:
1. ❌ Create ErrorMessage component
2. ❌ Add to all API calls
3. ❌ User-friendly error messages

---

### TASK 10: End-to-End Testing
**Priority:** HIGH
**Time:** 30 min

Test Flow:
1. ❌ Login with test user
2. ❌ Swipe on profiles
3. ❌ Create match
4. ❌ Send chat message
5. ❌ Record match result
6. ❌ Check leaderboard
7. ❌ Edit profile
8. ❌ Logout

---

## ⏱️ TIME BREAKDOWN

```
Task 1 (Auth):        30 min
Task 2 (Home):        45 min
Task 3 (Matches):     20 min
Task 4 (Chat):        30 min
Task 5 (Records):     30 min
Task 6 (Leaderboard): 15 min
Task 7 (Profile):     20 min
Task 8 (Loading):     30 min
Task 9 (Errors):      20 min
Task 10 (Testing):    30 min
-------------------------
TOTAL:                4 hours
```

---

## 🎯 EXECUTION ORDER

**Priority 1 (Critical):**
1. Task 1 - Auth & Setup
2. Task 2 - Home/Swipe
3. Task 3 - Matches
4. Task 4 - Chat

**Priority 2 (Important):**
5. Task 5 - Records
6. Task 7 - Profile
7. Task 9 - Error Handling

**Priority 3 (Polish):**
8. Task 6 - Leaderboard
9. Task 8 - Loading States
10. Task 10 - Testing

---

## ✅ SUCCESS CRITERIA

Phase 1 is complete when:
- ✅ All pages fetch real data from database
- ✅ No more MOCK data anywhere
- ✅ Loading states on all pages
- ✅ Error handling on all API calls
- ✅ Complete user flow works end-to-end
- ✅ Can create account, swipe, match, chat, record results
- ✅ All features persist in database

---

## 🚀 READY TO START

**First Task:** Fix Setup Page (Task 1)
**Time:** 30 minutes
**Impact:** HIGH - Enables user registration

Let's begin!
