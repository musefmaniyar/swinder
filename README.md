# 🎾 Swinder - Sports Matchmaking App

**Tinder-style Padel matchmaking platform for UAE** 

Find your perfect Padel partner, match with players, chat, play, and compete on leaderboards!

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Vercel-darkblue)
![Capacitor](https://img.shields.io/badge/Capacitor-6-lightblue)

## 🌟 Features

- **🏠 Swipe Interface** - Tinder-style matching for Padel players
- **💬 Chat System** - Message your matches in real-time
- **📊 Match Records** - Track game results with verification system
- **🏆 Leaderboard** - Compete and climb the rankings
- **👤 Profile Management** - Edit your profile and preferences
- **📱 Mobile Apps** - iOS & Android via Capacitor

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Vercel account (for database)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/swinder.git
cd swinder

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your Vercel Postgres credentials to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

### 1. Create Vercel Postgres Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Storage" → "Create Database"
3. Select "Postgres"
4. Name it `swinder-db`
5. Choose your region

### 2. Initialize Schema

1. In Vercel, go to your database → "Query" tab
2. Run the SQL from `schema.sql`
3. This creates all tables and sample data

### 3. Configure Environment

Copy connection strings from Vercel to `.env.local`:

```env
POSTGRES_URL="..."
POSTGRES_PRISMA_URL="..."
POSTGRES_URL_NON_POOLING="..."
POSTGRES_USER="..."
POSTGRES_HOST="..."
POSTGRES_PASSWORD="..."
POSTGRES_DATABASE="..."
SESSION_SECRET="your-secret-key"
```

## 📱 Mobile Build

### iOS

```bash
npx cap add ios
npx cap sync
npx cap open ios
```

Build in Xcode for App Store

### Android

```bash
npx cap add android
npx cap sync
npx cap open android
```

Build APK/AAB in Android Studio

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/swinder)

Or manually:

```bash
vercel
```

### Environment Variables

Set in Vercel Dashboard:
- All `POSTGRES_*` variables from your database
- `SESSION_SECRET` - Random secure string

## 🎨 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Frontend:** React 18
- **Styling:** CSS Modules + Global Styles
- **Database:** PostgreSQL (Vercel Postgres)
- **Mobile:** Capacitor 6
- **Deployment:** Vercel

## 📁 Project Structure

```
swinder/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── chat/          # Chat page
│   │   ├── home/          # Swipe interface
│   │   ├── leaderboard/   # Rankings
│   │   ├── login/         # Authentication
│   │   ├── matches/       # Match list
│   │   ├── profile/       # User profile
│   │   ├── records/       # Match results
│   │   └── setup/         # Onboarding
│   └── lib/
│       └── db.js          # Database utilities
├── schema.sql             # Database schema
└── package.json
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎯 Demo Credentials

**Demo Mode:** OTP is always `123456`

**Test Users** (after schema.sql):
- Ahmed: `+971501234567`
- Sara: `+971502345678`
- Mohammed: `+971503456789`

## 📝 Features Roadmap

### ✅ Completed
- Swipe-based matchmaking
- Chat system
- Match result tracking
- Leaderboard
- Profile management
- Mobile app support

### 🔄 Coming Soon
- Real-time chat (Socket.io)
- Push notifications
- Team/doubles matches
- Advanced filters
- Venue recommendations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ for the Padel community in UAE**
