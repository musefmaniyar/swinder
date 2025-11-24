# 🚀 Easy Database Setup (Without Web Interface)

Since the web interface is confusing, use this **simple script** instead!

---

## ⚡ OPTION 1: Automatic Setup Script (EASIEST)

### Step 1: Get Your Database URL from Vercel

On the screen you're looking at now:
1. Click **"Show secret"** (eyeball icon) next to POSTGRES_DATABASE
2. You'll see the full connection strings

### Step 2: Create .env.local File

Create a file called `.env.local` in your project root with this content:

**Copy the values from your Vercel screen:**

```env
POSTGRES_URL="postgres://default:..."
POSTGRES_PRISMA_URL="postgres://default:..."
POSTGRES_URL_NON_POOLING="postgres://default:..."
POSTGRES_USER="default"
POSTGRES_HOST="..."
POSTGRES_PASSWORD="..."
POSTGRES_DATABASE="..."
SESSION_SECRET="swinder-production-secret-2024"
```

### Step 3: Run the Setup Script

Open Command Prompt and run:

```cmd
cd c:\Users\musef\.gemini\antigravity\playground\charged-sagan

node setup-database.js
```

**That's it!** The script will:
- ✅ Create all 5 tables
- ✅ Create all indexes
- ✅ Add 8 test users
- ✅ Be done in 10 seconds!

---

## 📋 OPTION 2: Use Neon Console

If you prefer the web interface:

1. Click the **"Open in Neon"** button (black button, top right of your screen)
2. In Neon console, look for **"SQL Editor"** tab
3. Paste the contents of `schema.sql`
4. Click "Run"

---

## ❓ Which Option?

**I recommend Option 1** (the script) because:
- ✅ Easier - just one command
- ✅ Faster - 10 seconds
- ✅ No web interface confusion
- ✅ Automatic - does everything for you

---

## 🆘 If Script Fails

If you get an error, it's probably because `.env.local` isn't set up.

Make sure you:
1. Create `.env.local` in your project root
2. Copy ALL the environment variables from your Vercel screen
3. Click "Show secret" to see the actual values
4. Paste them into `.env.local`

---

**Try the script! It's much easier!** 🚀
