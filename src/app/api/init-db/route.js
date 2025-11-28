// API endpoint to initialize database
// Visit: /api/init-db to run this once after deployment

import { sql } from '@vercel/postgres';

export async function GET(request) {
    try {
        console.log('🗄️ Starting database initialization...');

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

        // Create indexes
        await sql`CREATE INDEX IF NOT EXISTS idx_swipes_swiper ON swipes(swiper_id)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_swipes_swiped ON swipes(swiped_id)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_matches_user1 ON matches(user1_id)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_matches_user2 ON matches(user2_id)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_messages_match ON messages(match_id)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_results_match ON match_results(match_id)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_results_status ON match_results(verification_status)`;

        // Insert test users
        const testUsers = [
            ['Ahmed', '+971501234567', 28, 'Male', 4, ['Morning', 'Evening'], ['Dubai Marina', 'JBR'], 'Passionate Padel player!', 'https://i.pravatar.cc/300?img=12'],
            ['Sara', '+971502345678', 25, 'Female', 3, ['Evening'], ['Dubai Marina', 'Business Bay'], 'Love playing Padel after work', 'https://i.pravatar.cc/300?img=45'],
            ['Mohammed', '+971503456789', 32, 'Male', 5, ['Morning', 'Afternoon'], ['Sports City', 'Arabian Ranches'], 'Competitive player!', 'https://i.pravatar.cc/300?img=33'],
            ['Fatima', '+971504567890', 27, 'Female', 4, ['Morning'], ['JBR', 'Jumeirah'], 'Beginner-intermediate', 'https://i.pravatar.cc/300?img=23'],
            ['Omar', '+971505678901', 30, 'Male', 3, ['Evening', 'Night'], ['Dubai Marina', 'Downtown'], 'Looking for partners', 'https://i.pravatar.cc/300?img=51'],
            ['Layla', '+971506789012', 24, 'Female', 2, ['Afternoon', 'Evening'], ['Business Bay', 'Downtown'], 'New to Padel!', 'https://i.pravatar.cc/300?img=38'],
            ['Khalid', '+971507890123', 35, 'Male', 5, ['Morning'], ['Sports City', 'Arabian Ranches'], 'Tournament ready', 'https://i.pravatar.cc/300?img=61'],
            ['Amira', '+971508901234', 26, 'Female', 3, ['Evening'], ['Dubai Marina', 'JBR'], 'Social player', 'https://i.pravatar.cc/300?img=44']
        ];

        let usersAdded = 0;
        for (const [name, phone, age, gender, skill, times, areas, bio, photo] of testUsers) {
            try {
                await sql`
          INSERT INTO users (name, phone, age, gender, skill_level, preferred_times, preferred_areas, bio, photo_url)
          VALUES (${name}, ${phone}, ${age}, ${gender}, ${skill}, ${times}, ${areas}, ${bio}, ${photo})
          ON CONFLICT (phone) DO NOTHING
        `;
                usersAdded++;
            } catch (err) {
                console.log(`User ${name} might already exist`);
            }
        }

        return Response.json({
            success: true,
            message: 'Database initialized successfully!',
            details: {
                tables: ['users', 'swipes', 'matches', 'messages', 'match_results'],
                indexes: 8,
                usersAdded: usersAdded
            }
        });

    } catch (error) {
        console.error('Database initialization error:', error);
        return Response.json({
            success: false,
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
