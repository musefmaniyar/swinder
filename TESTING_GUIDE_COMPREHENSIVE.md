# 🧪 SWINDER - COMPREHENSIVE TESTING GUIDE

**Live App:** https://swinder-jf8f.vercel.app  
**Created:** November 28, 2025  
**Status:** App is LIVE - Ready for Testing

---

## 📋 TESTING OVERVIEW

### **Test Credentials**
```
8 Pre-loaded Test Users:

Phone: +971501234567 (Ahmed, Male, Skill 4)
Phone: +971502345678 (Sara, Female, Skill 3)
Phone: +971503456789 (Mohammed, Male, Skill 5)
Phone: +971504567890 (Fatima, Female, Skill 4)
Phone: +971505678901 (Omar, Male, Skill 3)
Phone: +971506789012 (Layla, Female, Skill 2)
Phone: +971507890123 (Khalid, Male, Skill 5)
Phone: +971508901234 (Amira, Female, Skill 3)

OTP: Always 123456 (demo mode)
```

### **Testing Tools**
- **Browser:** Chrome/Firefox (use Incognito for multiple users)
- **Mobile Viewport:** Use browser DevTools (F12 → Device toolbar)
- **Console:** Keep open to spot errors (F12 → Console tab)
- **Network Tab:** Monitor API calls (F12 → Network tab)

---

## 🎯 CRITICAL TESTS (Must Pass Before Android Build)

### ✅ **TEST 1: Authentication Flow**

#### **Test 1A: New User Login**
- [ ] Go to: https://swinder-jf8f.vercel.app
- [ ] Should redirect to `/login`
- [ ] Enter phone: `+971509999999` (new user)
- [ ] Click "Send OTP"
- [ ] Enter OTP: `123456`
- [ ] Click "Verify OTP"
- [ ] **Expected:** Redirects to `/setup` (profile setup)

#### **Test 1B: Existing User Login**
- [ ] Open new incognito window
- [ ] Go to: https://swinder-jf8f.vercel.app/login
- [ ] Enter phone: `+971501234567` (Ahmed - existing)
- [ ] OTP: `123456`
- [ ] **Expected:** Redirects to `/home` (swipe page)

#### **Test 1C: Logout**
- [ ] Login as any user
- [ ] Go to Profile tab
- [ ] Click "Logout"
- [ ] **Expected:** Redirects to `/login`, session cleared

**Pass Criteria:** All login flows work, redirects are correct

---

### ✅ **TEST 2: Profile Setup (6 Steps)**

#### **Setup Flow**
- [ ] Login as new user (see Test 1A)
- [ ] **Step 1 - Personal Info:**
  - [ ] Enter name, age, select gender
  - [ ] Click "Continue"
  - [ ] Data should be saved
- [ ] **Step 2 - Skill Level:**
  - [ ] Select skill level (1-5)
  - [ ] Click "Continue"
- [ ] **Step 3 - Availability:**
  - [ ] Select 1-2 time slots
  - [ ] Click "Continue"
- [ ] **Step 4 - Preferred Areas:**
  - [ ] Select 1-2 areas
  - [ ] Click "Continue"
- [ ] **Step 5 - Avatar:**
  - [ ] Click on an avatar
  - [ ] Should be highlighted
  - [ ] Click "Continue"
- [ ] **Step 6 - Bio:**
  - [ ] Enter bio text (optional)
  - [ ] Click "Complete Setup"
- [ ] **Expected:** Redirects to `/home` (swipe page)

#### **Verify Profile Saved**
- [ ] Go to Profile tab
- [ ] All entered data should display correctly
- [ ] Photo should show selected avatar

**Pass Criteria:** 6-step flow completes, data saves, redirects to home

---

### ✅ **TEST 3: Swipe & Matching**

#### **Test 3A: View Candidates**
- [ ] Login as Ahmed (`+971501234567`)
- [ ] Go to Home tab
- [ ] **Expected:** See profile cards of other users
- [ ] Should show: Photo, Name, Age, Skill level, Bio

#### **Test 3B: Swipe Left (Pass)**
- [ ] On first card, swipe left OR click ✕ button
- [ ] **Expected:** Card disappears, next card appears
- [ ] No match created

#### **Test 3C: Swipe Right (Like)**
- [ ] On next card, swipe right OR click ❤️ button
- [ ] **Expected:** Card disappears, next card appears
- [ ] Like is recorded in database

#### **Test 3D: Create Match**
- [ ] Login as Sara (`+971502345678`) in incognito
- [ ] Swipe right on Ahmed
- [ ] **Expected:** "It's a Match!" modal appears
- [ ] Modal shows both profile photos
- [ ] Can close modal or click "Send Message"

#### **Test 3E: View Matches**
- [ ] Go to Matches tab
- [ ] **Expected:** Ahmed appears in matches list
- [ ] Shows profile photo, name, skill level

**Pass Criteria:** Swipe works, matches created, modal displays

---

### ✅ **TEST 4: Chat System**

#### **Test 4A: Open Chat**
- [ ] From Matches tab, click on a match
- [ ] **Expected:** Redirects to `/chat/[matchId]`
- [ ] Shows chat interface with message input

#### **Test 4B: Send Message**
- [ ] Type a message: "Hey, want to play?"
- [ ] Click Send button
- [ ] **Expected:** 
  - Message appears in chat
  - Shown as "sent" (right-aligned, different color)
  - Input field clears

#### **Test 4C: Receive Message (Simulate)**
- [ ] Open same match as other user (incognito)
- [ ] Send message from that user
- [ ] Go back to first user
- [ ] Refresh page or navigate to chat again
- [ ] **Expected:** Message appears as "received" (left-aligned)

#### **Test 4D: Multiple Messages**
- [ ] Send 5-10 messages back and forth
- [ ] **Expected:**
  - All messages display
  - Auto-scroll to latest
  - Timestamps show
  - Order is chronological

**Pass Criteria:** Chat works, messages save, display correctly

---

### ✅ **TEST 5: Match Results & Records**

#### **Test 5A: Record Match Result**
- [ ] Go to Records tab
- [ ] Click "+ Record Match" button
- [ ] **Expected:** Modal opens
- [ ] Select opponent from dropdown
- [ ] Select result (Win/Loss/Draw)
- [ ] Enter score (optional): "21-15, 21-18"
- [ ] Click "Submit"
- [ ] **Expected:** Modal closes, result appears in list

#### **Test 5B: Verify Pending Status**
- [ ] Find the match you just recorded
- [ ] **Expected:** 
  - Shows as "Pending" (yellow/orange)
  - Opponent name, score, date visible
  - "Waiting for verification" message

#### **Test 5C: Verify Match Result**
- [ ] Login as opponent (the person you recorded against)
- [ ] Go to Records tab
- [ ] **Expected:** See pending result
- [ ] Click "Verify" or "Approve" button
- [ ] **Expected:** Status changes to "Approved" (green)

#### **Test 5D: View Stats**
- [ ] Check stats dashboard at top of Records page
- [ ] **Expected:** Shows:
  - Total matches
  - Wins count
  - Losses count
  - Win rate %
  - Numbers update after verification

**Pass Criteria:** Can record results, verify works, stats calculate

---

### ✅ **TEST 6: Leaderboard**

#### **Test 6A: View Leaderboard**
- [ ] Go to Leaderboard tab
- [ ] **Expected:**
  - Shows list of players ranked by performance
  - Displays: Rank, Photo, Name, Skill level, Wins, Win rate
  - Top 3 have medal icons (🥇🥈🥉)

#### **Test 6B: Current User Highlighted**
- [ ] Find yourself in the leaderboard
- [ ] **Expected:** Your row is highlighted (different color/border)

#### **Test 6C: Ranking Logic**
- [ ] Check if ranking makes sense
- [ ] Players with more wins should rank higher
- [ ] Win rate should be accurate (wins/total matches)

**Pass Criteria:** Leaderboard displays, rankings correct, user highlighted

---

### ✅ **TEST 7: Profile Management**

#### **Test 7A: View Profile**
- [ ] Go to Profile tab
- [ ] **Expected:** Shows all your info:
  - Name, Age, Phone
  - Skill level
  - Gender
  - Preferred times
  - Preferred areas
  - Bio
  - Avatar photo

#### **Test 7B: Edit Profile**
- [ ] Click "Edit Profile" button
- [ ] **Expected:** Modal opens with editable fields
- [ ] Change name to "Test User Updated"
- [ ] Change skill level
- [ ] Click "Save"
- [ ] **Expected:**
  - Modal closes
  - Profile updates immediately
  - New name shows on screen

#### **Test 7C: Verify Saved**
- [ ] Refresh page
- [ ] Go to Profile tab again
- [ ] **Expected:** Changes persist (saved to database)

**Pass Criteria:** Profile displays, edits save, changes persist

---

## 🎨 UI/UX TESTS (Polish Needed)

### ✅ **TEST 8: Loading States**

Check each page for loading indicators:
- [ ] **Home (Swipe):** Loading when fetching candidates?
- [ ] **Matches:** Loading when fetching matches?
- [ ] **Chat:** Loading when fetching messages?
- [ ] **Records:** Loading when fetching history?
- [ ] **Leaderboard:** Loading when fetching rankings?

**Issues Found:** _____________________________________

**Priority:** Add loading skeletons for better UX

---

### ✅ **TEST 9: Empty States**

Test empty states:
- [ ] **No Swipe Candidates:** Message displays?
- [ ] **No Matches:** Encouraging message?
- [ ] **Empty Chat:** First message prompt?
- [ ] **No Records:** CTA to record first match?
- [ ] **Empty Leaderboard:** (shouldn't happen with test data)

**Issues Found:** _____________________________________

**Priority:** Improve empty state messages

---

### ✅ **TEST 10: Error Handling**

Test error scenarios:
- [ ] **Invalid Phone:** Does validation work?
- [ ] **Wrong OTP:** Error message clear?
- [ ] **Network Offline:** Graceful degradation?
- [ ] **Database Error:** User-friendly message?
- [ ] **API Failure:** Doesn't crash app?

**Issues Found:** _____________________________________

**Priority:** Add better error messages

---

### ✅ **TEST 11: Responsive Design**

Test on different viewports:
- [ ] **Mobile (375px):** Everything fits, readable?
- [ ] **Mobile (390px - iPhone):** Good spacing?
- [ ] **Mobile (430px - iPhone Pro Max):** Looks good?
- [ ] **Tablet (768px):** Proper layout?
- [ ] **Desktop (1920px):** Not too stretched?

**Use Browser DevTools:**
- F12 → Toggle device toolbar
- Select iPhone 12/13/14
- Check all pages

**Issues Found:** _____________________________________

---

### ✅ **TEST 12: Animations & Interactions**

Check animations work:
- [ ] **Swipe Cards:** Smooth swipe animation?
- [ ] **Match Modal:** Fade in/scale effect?
- [ ] **Button Hovers:** Visual feedback?
- [ ] **Tab Switching:** Smooth transition?
- [ ] **Page Transitions:** No jarring jumps?

**Issues Found:** _____________________________________

---

## 📱 MOBILE-SPECIFIC TESTS (Before Android Build)

### ✅ **TEST 13: Touch Interactions**

- [ ] **Swipe Gestures:** Work on touch screen?
- [ ] **Button Sizes:** Easy to tap (44px minimum)?
- [ ] **Scroll:** Smooth scrolling?
- [ ] **Input Focus:** Keyboard doesn't break layout?
- [ ] **Tap Feedback:** Visual response to taps?

**Test on:** Chrome DevTools mobile viewport

---

### ✅ **TEST 14: Performance**

- [ ] **Page Load:** < 3 seconds on 3G?
- [ ] **Image Loading:** Progressive/lazy load?
- [ ] **API Calls:** Fast response (<1sec)?
- [ ] **Animations:** Smooth 60fps?
- [ ] **Memory:** No leaks (use DevTools Performance tab)?

**Tools:** Chrome DevTools → Network (throttle to Fast 3G)

---

## 🐛 BUG TRACKING

### **Critical Bugs (Must Fix):**
```
1. _________________________________________________
2. _________________________________________________
3. _________________________________________________
```

### **High Priority Bugs:**
```
1. _________________________________________________
2. _________________________________________________
3. _________________________________________________
```

### **Medium Priority (Nice to Fix):**
```
1. _________________________________________________
2. _________________________________________________
```

### **Low Priority (Can Wait):**
```
1. _________________________________________________
2. _________________________________________________
```

---

## ✅ PRE-ANDROID BUILD CHECKLIST

Before building Android app, ensure:
- [ ] All 7 critical tests pass (Tests 1-7)
- [ ] No critical bugs
- [ ] Loading states added to at least 3 screens
- [ ] Error messages are user-friendly
- [ ] Responsive design works on mobile viewport
- [ ] App feels smooth and polished

---

## 📊 TESTING REPORT TEMPLATE

### **Test Session Details:**
- **Date:** _________________
- **Tester:** _________________
- **Duration:** _________________

### **Summary:**
- **Tests Passed:** _____ / 14
- **Critical Bugs Found:** _____
- **Overall App Status:** ⭐⭐⭐⭐⭐ (1-5 stars)

### **Key Findings:**
```
1. _______________________________________________
2. _______________________________________________
3. _______________________________________________
```

### **Recommendations:**
```
1. _______________________________________________
2. _______________________________________________
3. _______________________________________________
```

---

## 🚀 NEXT STEPS AFTER TESTING

### **If 80%+ Tests Pass:**
→ **Proceed to Android build**
→ Fix remaining bugs in parallel

### **If 60-79% Tests Pass:**
→ **Fix critical bugs first**
→ Then build Android

### **If <60% Tests Pass:**
→ **Debug and fix issues**
→ Re-test before Android

---

## 💡 TESTING TIPS

1. **Test One Flow Completely:** Don't jump between features
2. **Use Incognito:** Test multiple users simultaneously
3. **Keep Console Open:** Catch JavaScript errors
4. **Take Screenshots:** Document bugs visually
5. **Clear Cache:** Sometimes fixes weird issues (Ctrl+Shift+Delete)
6. **Test Happy Path First:** Then try edge cases
7. **Note Performance:** Slow pages need optimization

---

## 📞 WHEN YOU FIND A BUG

1. **Note the URL** where it happened
2. **Describe steps to reproduce**
3. **Check browser console** for errors
4. **Take a screenshot**
5. **Classify severity:** Critical / High / Medium / Low
6. **Document in Bug Tracking section above**

---

## 🎯 TESTING GOALS

### **Phase 1: Core Functionality** (Today)
- All 7 critical tests pass
- App doesn't crash
- Basic flows work end-to-end

### **Phase 2: Polish** (Tomorrow)
- Loading states added
- Error messages improved
- Smooth animations

### **Phase 3: Mobile** (Next)
- Works on mobile viewport
- Touch interactions smooth
- Ready for Android build

---

## ✅ QUICK TEST (15 Minutes)

**For a quick sanity check, do this:**

1. **Login Test** (2 mins)
   - Login with `+971501234567`
   - Verify you reach home page

2. **Swipe Test** (3 mins)
   - Swipe right on one person
   - Check they appear in Matches

3. **Chat Test** (3 mins)
   - Open chat
   - Send a message
   - Verify it appears

4. **Records Test** (3 mins)
   - Record a match result
   - Check it appears in list

5. **Leaderboard Test** (2 mins)
   - View leaderboard
   - Verify users display

6. **Profile Test** (2 mins)
   - View profile
   - Edit name
   - Verify save

**If all 6 quick tests pass → App is working!** ✅

---

**Good luck testing! 🧪 Report back with your findings!** 🚀
