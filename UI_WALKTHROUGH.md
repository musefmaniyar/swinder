# Swinder App - Quick Start Guide

## PowerShell Execution Policy Issue

You're getting blocked because Windows PowerShell's execution policy prevents running npm.

## **SOLUTION: Use Command Prompt Instead**

### **Option 1: Run in Command Prompt (CMD)** ✅ RECOMMENDED

1. **Open Command Prompt:**
   - Press `Win + R`
   - Type: `cmd`
   - Press Enter

2. **Navigate to project:**
   ```cmd
   cd c:\Users\musef\.gemini\antigravity\playground\charged-sagan
   ```

3. **Install dependencies:**
   ```cmd
   npm install
   ```
   (This will take 2-3 minutes)

4. **Start the app:**
   ```cmd
   npm run dev
   ```

5. **Open in browser:**
   - Go to: http://localhost:3000

---

### **Option 2: Fix PowerShell (If you prefer PowerShell)**

Run PowerShell as Administrator, then:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then run in the project folder:
```powershell
npm install
npm run dev
```

---

## **Once Running - UI/UX Walkthrough**

### **🎯 Page 1: Login** (http://localhost:3000)
You'll see:
- 🎾 Swinder logo (gradient)
- "Find Your Padel Partner" tagline
- Phone input field (pre-filled with +971)
- "Send OTP" button

**Try it:**
1. Enter any phone: `+971501234567`
2. Click "Send OTP"
3. Enter OTP: `123456` (always works in demo mode)
4. Click "Verify & Continue"

**What happens:**
- If NEW number → Goes to profile setup
- If EXISTING number → Goes straight to home

---

### **🎯 Page 2: Profile Setup** (http://localhost:3000/setup)
6-step onboarding flow:

**Step 1 - Personal Info:**
- Name: Your name
- Age: 25-35
- Gender: Male/Female/Other
- → Click "Continue"

**Step 2 - Skill Level:**
- Click a skill level (1-5)
- 1 = Beginner, 5 = Expert
- Beautiful skill cards with hover effects
- → Click "Continue"

**Step 3 - Availability:**
- Select times: Morning/Afternoon/Evening/Night
- Multi-select chips (click multiple)
- → Click "Continue"

**Step 4 - Preferred Areas:**
- Select Dubai locations
- Dubai Marina, JBR, Business Bay, etc.
- → Click "Continue"

**Step 5 - Avatar:**
- Choose from 8 profile photos
- Grid layout
- Active photo has cyan border
- → Click "Continue"

**Step 6 - Bio:**
- Write about yourself (optional)
- Character counter (0/200)
- → Click "Complete Setup"

**Watch:**
- Progress bar at top fills as you advance
- "Step X of 6" indicator
- Back buttons work
- Validation prevents skipping required fields

---

### **🎯 Page 3: Home/Swipe** (http://localhost:3000/home) ⭐ **MAIN FEATURE**

**What you'll see:**
- Large profile card (like Tinder)
- Profile photo background
- Name + Age at bottom
- Skill level badge (glowing cyan)
- Location icons
- Time preferences
- Bio text
- Two big buttons: ✕ (Pass) and ❤️ (Like)

**Try this:**
1. **Click ❤️ (Like button)**
   - Card slides RIGHT with rotation
   - Smooth animation
   - Next card appears
   - 20% chance to see "It's a Match!" modal

2. **Click ✕ (Pass button)**
   - Card slides LEFT with rotation
   - Next card appears

3. **When you get a match:**
   - 💖 celebration modal appears
   - "It's a Match!" with gradient text
   - "Send Message" button
   - Auto-closes after 3 seconds

4. **When cards run out:**
   - Empty state shows
   - 😔 emoji
   - "No More Players" message
   - "Reload" button

**Watch for:**
- Smooth swipe animations
- Card rotation effect
- Modal fade-in animation
- Pulsing heart icon in match modal

---

### **🎯 Page 4: Matches** (Click 💬 tab)

**What you'll see:**
- "💬 Matches" header
- "3 matches" counter
- List of matched users:
  - Profile photo (circular, 60px)
  - Name
  - Skill level
  - → Arrow indicator

**Try this:**
1. Click any match card
2. Opens chat page
3. Hover effect: card slides right slightly

---

### **🎯 Page 5: Chat** (Click a match)

**What you'll see:**
- Header with:
  - ← Back button
  - Match name
  - Skill level
- Chat messages:
  - Received (left, gray bubble)
  - Sent (right, cyan bubble)
  - Timestamps
- Message input at bottom
- Send button (→ in circle)

**Try this:**
1. Type a message
2. Press Enter or click send
3. Watch it appear in cyan bubble
4. Auto-scrolls to bottom
5. Click ← to go back

**Watch for:**
- Message bubbles with different colors
- Smooth scroll animation
- Send button hover effect (grows)

---

### **🎯 Page 6: Records** (Click 📊 tab)

**What you'll see:**

**Stats Grid (top):**
- 4 cards in 2x2 grid:
  - Total Matches: 12
  - Wins: 8 (green)
  - Losses: 3 (red)
  - Win Rate: 66.7% (cyan)

**Match History:**
- "Record Match" button (top right)
- List of results:
  - Opponent photo + name
  - Score (e.g., "6-3, 6-4")
  - WIN/LOSS badge (green/red)
  - ✓ Verified or ⏳ Pending badge

**Try this:**
1. Click "+ Record Match"
2. Modal opens:
   - Select opponent dropdown
   - Result dropdown (Win/Loss/Draw)
   - Score input
   - Submit button
3. Click outside to close

**Watch for:**
- Color-coded result badges
- Verification status indicators
- Modal slide-in animation

---

### **🎯 Page 7: Leaderboard** (Click 🏆 tab)

**What you'll see:**
- "🏆 Leaderboard" header
- "Top Padel Players" subtitle
- Ranked list:
  - **Rank 1:** 🥇 Gold medal
  - **Rank 2:** 🥈 Silver medal
  - **Rank 3:** 🥉 Bronze medal
  - **Rank 5:** YOU (highlighted in cyan)
  - Each shows:
    - Photo
    - Name
    - Skill level
    - Wins
    - Win rate %

**Watch for:**
- Medals for top 3
- Your position highlighted
- Gradient background on top 3
- Stats on the right side

---

### **🎯 Page 8: Profile** (Click 👤 tab)

**What you'll see:**
- Large circular profile photo (150px)
- Cyan border around photo
- Name + Age
- Phone number
- Info grid (2x2):
  - Skill Level
  - Gender
  - Preferred Times
  - Preferred Areas
- Bio section
- "Edit Profile" button
- "Logout" button

**Try this:**
1. Click "Edit Profile"
2. Modal opens with form fields
3. Try changing values
4. Click "Save" or "Cancel"
5. Click "Logout" → Redirects to login

**Watch for:**
- Clean grid layout
- Modal animation
- Logout confirmation

---

## **🧭 Navigation**

**Bottom Tab Bar** (visible on all main pages):
- 🏠 Home (cyan when active)
- 💬 Matches
- 📊 Records
- 🏆 Leaderboard
- 👤 Profile

**Try clicking around!** Smooth transitions between pages.

---

## **🎨 Design Features to Notice:**

✅ **Dark Theme:**
- Deep black background (#0a0a0a)
- Card backgrounds (#1f1f1f)
- High contrast, easy to read

✅ **Vibrant Accents:**
- Cyan (#00d4ff) - Primary actions
- Pink (#ff006e) - Like buttons
- Yellow (#ffd60a) - Warnings/pending

✅ **Animations:**
- Swipe cards rotate + slide
- Match modal fades + scales
- Match icon pulses
- Buttons grow on hover
- Smooth page transitions

✅ **Typography:**
- System fonts (clean, fast)
- Proper sizing hierarchy
- Good line spacing

✅ **Spacing:**
- Consistent padding/margins
- Breathing room
- Not cramped

✅ **Mobile-Optimized:**
- Touch-friendly buttons
- Proper sizing
- Scrollable content

---

## **💡 Testing Tips:**

1. **Try the swipe feature** - This is the core UX!
2. **Watch animations** - Smooth 60fps
3. **Test navigation** - All tabs work
4. **Check responsive** - Resize browser
5. **Look for details** - Hover effects, badges, colors

---

## **📱 What You're Seeing:**

Remember: This is running with **mock data**. Once you connect the database:
- Login will verify real users
- Swipes will fetch actual candidates
- Matches will be real
- Chat will save messages
- Records will persist
- Leaderboard will be live

But the **UI/UX is complete** and matches the final product!

---

## **🚀 Ready?**

**Run these commands in Command Prompt (CMD):**

```cmd
cd c:\Users\musef\.gemini\antigravity\playground\charged-sagan
npm install
npm run dev
```

Then open: **http://localhost:3000**

**Enjoy the walkthrough!** 🎉
