# Swinder - Sports Matchmaking App - Master Development Plan

> **Created:** November 23, 2025
> **Status:** Ready for Fresh Start
> **Target Market:** UAE Launch (iOS + Android)

---

## 🎯 Product Vision

**Swinder** is a Tinder-style sports matchmaking mobile application designed to connect athletes and sports enthusiasts in the UAE for real-world matches. The app combines swipe-based matching with competitive gameplay tracking, chat functionality, and a comprehensive leaderboard system.

### Core Value Proposition
- **Match People, Not Just Dates:** Connect with sports partners based on skill level, preferred sport, location, and availability
- **Competitive Edge:** Track match results, build your reputation, and compete on leaderboards
- **Social Gaming:** Chat with matches, schedule games, and build a sports community
- **UAE-Focused:** Optimized for UAE locations, nationalities, and sports preferences

---

## 📱 Target Platforms

### Primary Platforms
- **iOS** (iOS 13.0+)
- **Android** (Android 8.0+)

### Technology Stack
- **Framework:** Next.js 14+ with Capacitor for mobile deployment
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (Vercel Postgres for production)
- **Authentication:** Phone/OTP authentication
- **Real-time:** Socket.io (for future chat enhancements)
- **Styling:** CSS with High Contrast Dark Theme
- **PWA Support:** Installable as Progressive Web App

---

## 🎨 Design Philosophy

### Visual Identity
- **Color Palette:**
  - Primary: Vibrant Accent Colors (#00d4ff, #ff006e, #ffd60a)
  - Dark Theme: Deep blacks (#0a0a0a, #1a1a1a) with high contrast
  - Card Backgrounds: Subtle dark grays (#1f1f1f, #2a2a2a)
  
### Design Principles
1. **High Contrast:** Premium dark theme with vibrant accent colors
2. **Glassmorphism:** Subtle blur effects and transparency
3. **Micro-animations:** Smooth transitions and interactive feedback
4. **Mobile-First:** Touch-optimized interface with gesture support
5. **Performance:** Fast loading with skeleton screens and optimistic UI

---

## 🏗️ Feature Specifications

### Phase 1: MVP Core Features

#### 1. **Authentication & Onboarding**
- Phone number input with country code (+971 for UAE)
- OTP verification (6-digit code)
- Multi-step profile setup:
  - Personal Info (Name, Age, Gender, Nationality)
  - Sports Preferences (Multiple sports selection)
  - Skill Levels (Per-sport rating 1-5)
  - Availability (Preferred times: Morning/Afternoon/Evening/Night)
  - Location (Preferred areas in UAE)
  - Bio & Profile Photo

**Key UX:**
- Progressive disclosure (one screen at a time)
- Validation at each step
- Photo upload with preview
- Skip option for bio

#### 2. **Home Screen - Swipe Interface**
- Tinder-style card stack
- Sport filter dropdown (show potential matches for selected sport)
- Match cards display:
  - Profile photo (full-size background)
  - Name, Age, Gender
  - Sport being displayed
  - Skill level for that sport
  - Preferred times & areas
  - Bio (expandable)
  
**Swipe Actions:**
- Swipe Right / Tap ❤️ = Like
- Swipe Left / Tap ✕ = Pass
- Smooth card animations
- "It's a Match!" celebration modal when mutual like occurs

**Filtering:**
- Filter by sport
- Filter by preferred area (optional enhancement)
- Smart matching algorithm considers:
  - Similar skill levels (±1 level)
  - Compatible availability
  - Geographic proximity

#### 3. **Matches Screen**
- List of all mutual matches
- Filter by sport
- Each match card shows:
  - Profile photo thumbnail
  - Name
  - Sports in common
  - Last message preview (if chat exists)
  - "Chat Now" button

**Empty State:**
- Encouraging message to keep swiping
- Illustration or icon

#### 4. **Chat Interface**
- One-on-one chat per match
- Real-time message delivery (simulated for MVP, Socket.io for Phase 3)
- Message composer with send button
- Message bubbles (sent/received styling)
- Timestamp display
- Auto-scroll to latest message
- Push notification simulation for new messages

**Chat Features:**
- "Record Match" quick action button
- Date/time scheduling (future enhancement)

#### 5. **Records & Stats Page**
- **Personal Stats Overview:**
  - Total matches played
  - Win rate %
  - Favorite sport
  - Current streak
  
- **Match History:**
  - Searchable list of all recorded matches
  - Search by opponent name or sport
  - Each record shows:
    - Opponent profile photo & name
    - Sport played
    - Result (Win/Loss/Draw)
    - Score
    - Date
    - Verification status (Pending/Approved/Disputed)
    
- **Record Match Modal:**
  - Select opponent from matches
  - Select sport
  - Enter result (Win/Loss/Draw)
  - Optional: Enter score
  - Submit for opponent verification
  
**Verification System:**
- Match results must be approved by opponent
- Pending results appear in golden/yellow
- Approved results appear in green
- Only approved results count toward stats and leaderboard

#### 6. **Leaderboard Page**
- **Sport-Segregated Rankings:**
  - Separate leaderboard for each sport
  - Dropdown to switch between sports
  
- **Leaderboard Display:**
  - Top 100 players per sport
  - Player rank, photo, name
  - Win rate %
  - Total matches played
  - Points/Elo rating (calculated based on wins/losses)
  
- **User's Position:**
  - Highlighted row showing current user
  - "Scroll to My Position" button if not in top 10
  
**Ranking Logic:**
- Points based on verified wins
- Higher skill level matches worth more points
- Decay over time for inactive players (future enhancement)

#### 7. **Profile Screen**
- View own profile
- Edit profile modal:
  - Update all profile fields
  - Change sports & skill levels
  - Update availability & preferred areas
  - Edit bio
  - Change profile photo
  
- **Account Actions:**
  - Logout
  - Delete account (future)
  
- **Settings (Future):**
  - Notification preferences
  - Privacy settings
  - Blocked users

---

### Phase 2: Enhancements

#### Enhanced Matchmaking
- **Advanced Filters:**
  - Filter by multiple sports
  - Filter by preferred area
  - Filter by skill level range
  - Filter by age range
  - Filter by gender preference
  
#### Profile Enhancements
- **Photo Gallery:**
  - Multiple photos (up to 5)
  - Swipeable photo gallery in cards
  
- **Verification Badge:**
  - Verified user status
  - Verified skill level (community-voted)
  
#### Social Features
- **Activity Feed:**
  - Recent matches in your network
  - Leaderboard updates
  - Match results

#### Performance Tracking
- **Advanced Stats:**
  - Per-sport win rates
  - Performance trends over time
  - Head-to-head records
  - Streak tracking

---

### Phase 3: Advanced Features

#### Real-time Chat
- Socket.io implementation
- Typing indicators
- Online/offline status
- Read receipts
- Message reactions

#### Push Notifications
- Real push notifications (FCM/APNs)
- New match notifications
- New message alerts
- Match result verification requests
- Leaderboard position changes

#### Match Scheduling
- Calendar integration
- Send match invites with date/time/location
- RSVP system
- Reminders

#### Team/Doubles Support
- Create teams
- Team vs team matching
- Doubles matchmaking
- Team leaderboards

#### Location-Based Features
- Nearby players map view
- Venue recommendations
- Check-in at sports venues

#### Social Proof
- User reviews/ratings
- Badge system (achievements)
- Player reputation score
- Community guidelines & reporting

---

## 🗄️ Database Schema

### Core Tables

#### `users`
```sql
- id (UUID, Primary Key)
- phone (Unique, Not Null)
- name (Not Null)
- age (Integer)
- gender (Text)
- nationality (Text)
- sports (JSON Array) - ["Padel", "Football", "Cricket"]
- skill_levels (JSON Object) - {"Padel": 4, "Football": 3}
- preferred_times (JSON Array) - ["Morning", "Evening"]
- preferred_areas (JSON Array) - ["Dubai Marina", "JBR"]
- bio (Text)
- photo_url (Text)
- created_at (Timestamp)
- updated_at (Timestamp)
```

#### `swipes`
```sql
- id (UUID, Primary Key)
- swiper_id (UUID, Foreign Key → users.id)
- swiped_id (UUID, Foreign Key → users.id)
- sport (Text) - Sport context for the swipe
- direction (Text) - 'right' (like) or 'left' (pass)
- created_at (Timestamp)
- Unique constraint on (swiper_id, swiped_id, sport)
```

#### `matches`
```sql
- id (UUID, Primary Key)
- user1_id (UUID, Foreign Key → users.id)
- user2_id (UUID, Foreign Key → users.id)
- sport (Text) - Sport they matched on
- created_at (Timestamp)
- Unique constraint ensuring no duplicate matches
```

#### `messages`
```sql
- id (UUID, Primary Key)
- match_id (UUID, Foreign Key → matches.id)
- sender_id (UUID, Foreign Key → users.id)
- content (Text, Not Null)
- created_at (Timestamp)
- read (Boolean, Default: false)
```

#### `match_results`
```sql
- id (UUID, Primary Key)
- match_id (UUID, Foreign Key → matches.id)
- sport (Text, Not Null)
- winner_id (UUID, Foreign Key → users.id) - NULL for draw
- loser_id (UUID, Foreign Key → users.id) - NULL for draw
- result_type (Text) - 'win', 'loss', 'draw'
- score (Text) - Optional score like "21-15, 21-18"
- recorded_by (UUID, Foreign Key → users.id)
- verified_by (UUID, Foreign Key → users.id) - NULL if pending
- verification_status (Text) - 'pending', 'approved', 'disputed'
- created_at (Timestamp)
- verified_at (Timestamp)
```

#### `leaderboard_stats`
Materialized view or computed table:
```sql
- user_id (UUID)
- sport (Text)
- total_matches (Integer)
- wins (Integer)
- losses (Integer)
- draws (Integer)
- win_rate (Decimal)
- points (Integer)
- rank (Integer)
- updated_at (Timestamp)
```

---

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to phone number
- `POST /api/auth/verify-otp` - Verify OTP and create/login user
- `POST /api/auth/logout` - Logout current user

### User Management
- `GET /api/user/profile` - Get current user profile
- `PUT /api/user/profile` - Update user profile
- `POST /api/user/setup` - Complete onboarding setup

### Matchmaking
- `GET /api/candidates?sport={sport}&area={area}` - Get potential matches
- `POST /api/swipe` - Record a swipe (like/pass)
- `GET /api/matches/list` - Get all matches for current user
- `GET /api/matches/:id` - Get specific match details

### Chat
- `GET /api/chat/:matchId/messages` - Get messages for a match
- `POST /api/chat/:matchId/send` - Send a message
- `PUT /api/chat/:matchId/read` - Mark messages as read

### Records & Stats
- `GET /api/records` - Get match results for current user
- `POST /api/records/create` - Record a match result
- `PUT /api/records/:id/verify` - Verify/approve a match result
- `GET /api/stats` - Get personal statistics

### Leaderboard
- `GET /api/leaderboard?sport={sport}` - Get sport-specific leaderboard
- `GET /api/leaderboard/position?sport={sport}` - Get user's rank

---

## 📐 UI/UX Flow

### User Journey

```
1. Download App / Open PWA
   ↓
2. Enter Phone Number → Receive OTP
   ↓
3. Enter OTP → Verify
   ↓
4. NEW USER:
   - Profile Setup (Name, Age, Gender, Nationality)
   - Select Sports
   - Set Skill Levels
   - Choose Availability
   - Select Preferred Areas
   - Add Photo & Bio
   ↓
5. RETURNING USER:
   - Go directly to Home Screen
   ↓
6. HOME SCREEN (Swipe Interface)
   - Select sport from dropdown
   - Swipe through potential matches
   - Match celebration on mutual like
   ↓
7. MATCHES TAB
   - View all matches
   - Tap to open chat
   ↓
8. CHAT
   - Send messages
   - Record match results
   ↓
9. RECORDS TAB
   - View match history
   - See stats overview
   - Record new matches
   ↓
10. LEADERBOARD TAB
    - View rankings by sport
    - Check personal rank
    ↓
11. PROFILE TAB
    - Edit profile
    - View settings
    - Logout
```

---

## 🎯 Success Metrics (KPIs)

### Engagement Metrics
- Daily Active Users (DAU)
- Monthly Active Users (MAU)
- Average session duration
- Swipes per session
- Match rate (matches/swipes)
- Chat engagement (messages/match)

### Retention Metrics
- Day 1, Day 7, Day 30 retention
- Churn rate
- Time to first match
- Time to first recorded game

### Quality Metrics
- Match result recording rate
- Verification approval rate
- Average matches played per user
- User satisfaction score

---

## 🚀 Development Roadmap

### Sprint 1: Foundation (Week 1-2)
- ✅ Project setup (Next.js + Capacitor)
- ✅ Database schema design
- ✅ Authentication flow (Phone/OTP)
- ✅ User profile setup screens
- ✅ Basic navigation structure

### Sprint 2: Core Matchmaking (Week 3-4)
- ✅ Swipe interface implementation
- ✅ Candidate fetching algorithm
- ✅ Match creation logic
- ✅ Match celebration UI
- ✅ Matches list screen

### Sprint 3: Communication (Week 5-6)
- ✅ Chat interface
- ✅ Message sending/receiving
- ✅ Real-time simulation
- ✅ Push notification simulation

### Sprint 4: Competition (Week 7-8)
- ✅ Match result recording
- ✅ Verification system
- ✅ Personal stats calculation
- ✅ Leaderboard implementation
- ✅ Search & filters

### Sprint 5: Polish & Testing (Week 9-10)
- ✅ UI/UX refinements
- ✅ High contrast dark theme
- ✅ Micro-animations
- ✅ Loading states & skeletons
- ✅ Error handling
- ✅ Performance optimization

### Sprint 6: Mobile Deployment (Week 11-12)
- ✅ Capacitor iOS setup
- ✅ Capacitor Android setup
- ✅ Production database (Vercel Postgres)
- ✅ API migration for production
- 🔄 App Store preparation
- 🔄 Play Store preparation

### Sprint 7: Production Launch (Week 13-14)
- 🔄 Beta testing
- 🔄 Bug fixes
- 🔄 App Store submission
- 🔄 Play Store submission
- 🔄 Marketing materials
- 🔄 Launch!

---

## 🔧 Technical Considerations

### Performance
- Image optimization (WebP, lazy loading)
- Code splitting for faster initial load
- Skeleton screens for perceived performance
- Optimistic UI updates
- Caching strategies

### Security
- Secure OTP generation and validation
- Session management with httpOnly cookies
- SQL injection prevention (parameterized queries)
- XSS protection
- CORS configuration
- Rate limiting on API endpoints

### Scalability
- Database indexing on frequently queried fields
- Connection pooling for Postgres
- CDN for static assets
- API response caching where appropriate
- Pagination for large result sets

### Accessibility
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Touch target sizing (minimum 44x44px)

### Testing Strategy
- Unit tests for business logic
- Integration tests for API routes
- E2E tests for critical user flows
- Manual testing on real devices
- Beta testing program

---

## 📱 Deployment Strategy

### Web Deployment (PWA)
- **Platform:** Vercel
- **Database:** Vercel Postgres
- **Environment:**
  - Production: `https://swinder.vercel.app`
  - Staging: `https://swinder-staging.vercel.app`
  
### Mobile Deployment

#### iOS (App Store)
- **Requirements:**
  - Apple Developer Account ($99/year)
  - Xcode on macOS
  - App Store Connect setup
  
- **Build Process:**
  1. Deploy web app to production
  2. Update `capacitor.config.json` with production URL
  3. Run `npx cap sync`
  4. Open Xcode: `npx cap open ios`
  5. Configure signing & capabilities
  6. Build & archive
  7. Upload to App Store Connect
  8. Submit for review

#### Android (Play Store)
- **Requirements:**
  - Google Play Developer Account ($25 one-time)
  - Android Studio
  - Play Console setup
  
- **Build Process:**
  1. Deploy web app to production
  2. Update `capacitor.config.json` with production URL
  3. Run `npx cap sync`
  4. Open Android Studio: `npx cap open android`
  5. Generate signed APK/AAB
  6. Upload to Play Console
  7. Submit for review

---

## 🎨 Brand Assets Needed

### Visual Assets
- App Icon (1024x1024)
- Splash Screen (2048x2732)
- App Store Screenshots (various sizes)
- Play Store Screenshots (various sizes)
- Marketing materials
- Social media assets

### Copy/Content
- App Store description
- Play Store description
- Keywords for ASO
- Privacy Policy
- Terms of Service
- User Guide/FAQ

---

## 🌍 Localization (Future)

### Target Languages
1. English (Primary)
2. Arabic (UAE market)
3. Hindi (expat community)
4. Urdu (expat community)

### Localization Strategy
- i18n implementation with next-i18next
- RTL support for Arabic
- Culturally appropriate imagery
- Local sports preferences

---

## 💰 Monetization Strategy (Future Considerations)

### Potential Revenue Streams
1. **Freemium Model:**
   - Free: Basic matching, limited swipes/day
   - Premium: Unlimited swipes, advanced filters, profile boost
   
2. **Venue Partnerships:**
   - Sponsored venue recommendations
   - Booking integration with courts/facilities
   
3. **Events & Tournaments:**
   - Paid tournament entries
   - Event ticketing
   
4. **Coaching/Training:**
   - Connect with certified coaches
   - Training program recommendations

---

## 📝 Current Status & Next Steps

### ✅ Completed
- MVP core features fully implemented
- Database schema with SQLite & Postgres support
- Authentication & user management
- Swipe-based matchmaking
- Chat functionality
- Match result tracking with verification
- Leaderboards with sport segregation
- Profile editing
- High contrast dark theme UI
- Capacitor mobile setup (iOS & Android)
- Deployment guides

### 🔄 In Progress
- Vercel Postgres production setup
- Mobile app testing on real devices
- App Store preparation

### 🎯 Next Steps for Fresh Start

1. **Environment Setup**
   - Install Node.js 18+ and npm
   - Install Git
   - Set up code editor (VS Code recommended)
   
2. **Initialize Project**
   - Create Next.js app: `npx create-next-app@latest ./ --use-npm`
   - Install dependencies:
     ```bash
     npm install @vercel/postgres bcrypt uuid
     npm install -D @capacitor/cli @capacitor/core @capacitor/ios @capacitor/android
     ```
   
3. **Database Setup**
   - Set up Vercel Postgres database
   - Run schema initialization
   - Seed with test data
   
4. **Core Development**
   - Follow Sprint 1-6 roadmap
   - Implement features incrementally
   - Test continuously on web and mobile
   
5. **Deployment**
   - Deploy web app to Vercel
   - Build iOS app and test on simulator
   - Build Android app and test on emulator
   - Submit to App Stores

---

## 📚 Resources & References

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Play Store Guidelines](https://support.google.com/googleplay/android-developer/answer/9859455)

### Design Inspiration
- Tinder (swipe mechanics)
- Bumble (profile quality)
- Strava (stats & leaderboards)
- Discord (chat UX)

### Sports Categories for UAE Market
1. **Padel** (Very popular in UAE)
2. **Football** (Soccer)
3. **Cricket** (Large expat community)
4. **Tennis**
5. **Basketball**
6. **Volleyball**
7. **Running**
8. **Cycling**
9. **Swimming**
10. **Badminton**

---

## 🎉 Vision Statement

**Swinder aims to become the #1 sports matchmaking platform in the UAE, connecting thousands of athletes and creating a vibrant sports community where everyone can find their perfect match, compete, and build lasting friendships through the sports they love.**

---

**Document End** | Ready to build something amazing! 🚀
