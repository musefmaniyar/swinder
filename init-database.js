// Database initialization script for Swinder
// Run this after deploying to create tables and add test data

const { sql } = require('@vercel/postgres');

async function initDatabase() {
  try {
    console.log('🗄️  Starting database initialization...');
    
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        phone TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        age INTEGER,
        gender TEXT,
        skill_level INTEGER DEFAULT 3,
        preferred_times TEXT[] DEFAULT ARRAY[]::TEXT[],
        preferred_areas TEXT[] DEFAULT ARRAY[]::TEXT[],
        bio TEXT,
        photo_url TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('✅ Users table created');

    // Create swipes table
    await sql`
      CREATE TABLE IF NOT EXISTS swipes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        swiper_id UUID REFERENCES users(id) ON DELETE CASCADE,
        swiped_id UUID REFERENCES users(id) ON DELETE CASCADE,
        direction TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(swiper_id, swiped_id)
      )
    `;
    console.log('✅ Swipes table created');

    // Create matches table
    await sql`
      CREATE TABLE IF NOT EXISTS matches (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user1_id UUID REFERENCES users(id) ON DELETE CASCADE,
        user2_id UUID REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user1_id, user2_id)
      )
    `;
    console.log('✅ Matches table created');

    // Create messages table
    await sql`
      CREATE TABLE IF NOT EXISTS messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
        sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('✅ Messages table created');

    // Create match_results table
    await sql`
      CREATE TABLE IF NOT EXISTS match_results (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
        winner_id UUID REFERENCES users(id) ON DELETE SET NULL,
        loser_id UUID REFERENCES users(id) ON DELETE SET NULL,
        result_type TEXT NOT NULL,
        score TEXT,
        recorded_by UUID REFERENCES users(id) ON DELETE CASCADE,
        verified_by UUID REFERENCES users(id) ON DELETE SET NULL,
        verification_status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW(),
        verified_at TIMESTAMP
      )
    `;
    console.log('✅ Match results table created');

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_swipes_swiper ON swipes(swiper_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_swipes_swiped ON swipes(swiped_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_matches_user1 ON matches(user1_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_matches_user2 ON matches(user2_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_messages_match ON messages(match_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_results_match ON match_results(match_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_results_status ON match_results(verification_status)`;
    console.log('✅ Indexes created');

    // Insert test users
    const testUsers = [
      { name: 'Ahmed', phone: '+971501234567', age: 28, gender: 'Male', skill: 4, times: ['Morning', 'Evening'], areas: ['Dubai Marina', 'JBR'], bio: 'Passionate Padel player!', photo: 'https://i.pravatar.cc/300?img=12' },
      { name: 'Sara', phone: '+971502345678', age: 25, gender: 'Female', skill: 3, times: ['Evening'], areas: ['Dubai Marina', 'Business Bay'], bio: 'Love playing Padel after work', photo: 'https://i.pravatar.cc/300?img=45' },
      { name: 'Mohammed', phone: '+971503456789', age: 32, gender: 'Male', skill: 5, times: ['Morning', 'Afternoon'], areas: ['Sports City', 'Arabian Ranches'], bio: 'Competitive player!', photo: 'https://i.pravatar.cc/300?img=33' },
      { name: 'Fatima', phone: '+971504567890', age: 27, gender: 'Female', skill: 4, times: ['Morning'], areas: ['JBR', 'Jumeirah'], bio: 'Beginner-intermediate', photo: 'https://i.pravatar.cc/300?img=23' },
      { name: 'Omar', phone: '+971505678901', age: 30, gender: 'Male', skill: 3, times: ['Evening', 'Night'], areas: ['Dubai Marina', 'Downtown'], bio: 'Looking for partners', photo: 'https://i.pravatar.cc/300?img=51' },
      { name: 'Layla', phone: '+971506789012', age: 24, gender: 'Female', skill: 2, times: ['Afternoon', 'Evening'], areas: ['Business Bay', 'Downtown'], bio: 'New to Padel!', photo: 'https://i.pravatar.cc/300?img=38' },
      { name: 'Khalid', phone: '+971507890123', age: 35, gender: 'Male', skill: 5, times: ['Morning'], areas: ['Sports City', 'Arabian Ranches'], bio: 'Tournament ready', photo: 'https://i.pravatar.cc/300?img=61' },
      { name: 'Amira', phone: '+971508901234', age: 26, gender: 'Female', skill: 3, times: ['Evening'], areas: ['Dubai Marina', 'JBR'], bio: 'Social player', photo: 'https://i.pravatar.cc/300?img=44' }
    ];

    for (const user of testUsers) {
      await sql`
        INSERT INTO users (name, phone, age, gender, skill_level, preferred_times, preferred_areas, bio, photo_url)
        VALUES (${user.name}, ${user.phone}, ${user.age}, ${user.gender}, ${user.skill}, ${user.times}, ${user.areas}, ${user.bio}, ${user.photo})
        ON CONFLICT (phone) DO NOTHING
      `;
    }
    console.log('✅ Test users added (8 users)');

    console.log('🎉 Database initialization complete!');
    return { success: true, message: 'Database initialized successfully!' };

  } catch (error) {
    console.error('❌ Database initialization error:', error);
    return { success: false, error: error.message };
  }
}

module.exports = { initDatabase };
