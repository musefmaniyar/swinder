// Database Setup Script - Run this to initialize your database
// This script will create all tables and add test users

const { sql } = require('@vercel/postgres');

async function setupDatabase() {
    console.log('🚀 Starting database setup...\n');

    try {
        // Create users table
        console.log('Creating users table...');
        await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        phone VARCHAR(20) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        age INTEGER,
        gender VARCHAR(20),
        skill_level INTEGER CHECK (skill_level >= 1 AND skill_level <= 5),
        preferred_times TEXT[],
        preferred_areas TEXT[],
        bio TEXT,
        photo_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
        console.log('✅ Users table created');

        // Create swipes table
        console.log('Creating swipes table...');
        await sql`
      CREATE TABLE IF NOT EXISTS swipes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        swiper_id UUID REFERENCES users(id) ON DELETE CASCADE,
        swiped_id UUID REFERENCES users(id) ON DELETE CASCADE,
        direction VARCHAR(10) CHECK (direction IN ('left', 'right')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(swiper_id, swiped_id)
      );
    `;
        console.log('✅ Swipes table created');

        // Create matches table
        console.log('Creating matches table...');
        await sql`
      CREATE TABLE IF NOT EXISTS matches (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user1_id UUID REFERENCES users(id) ON DELETE CASCADE,
        user2_id UUID REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user1_id, user2_id)
      );
    `;
        console.log('✅ Matches table created');

        // Create messages table
        console.log('Creating messages table...');
        await sql`
      CREATE TABLE IF NOT EXISTS messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
        sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
        console.log('✅ Messages table created');

        // Create match_results table
        console.log('Creating match_results table...');
        await sql`
      CREATE TABLE IF NOT EXISTS match_results (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
        winner_id UUID REFERENCES users(id),
        loser_id UUID REFERENCES users(id),
        result_type VARCHAR(20) CHECK (result_type IN ('win', 'loss', 'draw')),
        score VARCHAR(50),
        recorded_by UUID REFERENCES users(id),
        verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'disputed')),
        verified_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
        console.log('✅ Match results table created');

        // Create indexes
        console.log('Creating indexes...');
        await sql`CREATE INDEX IF NOT EXISTS idx_swipes_swiper ON swipes(swiper_id);`;
        await sql`CREATE INDEX IF NOT EXISTS idx_swipes_swiped ON swipes(swiped_id);`;
        await sql`CREATE INDEX IF NOT EXISTS idx_matches_user1 ON matches(user1_id);`;
        await sql`CREATE INDEX IF NOT EXISTS idx_matches_user2 ON matches(user2_id);`;
        await sql`CREATE INDEX IF NOT EXISTS idx_messages_match ON messages(match_id);`;
        await sql`CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);`;
        console.log('✅ Indexes created');

        // Insert sample users
        console.log('\nInserting sample users...');

        const users = [
            { phone: '+971501234567', name: 'Ahmed', age: 28, gender: 'Male', skill: 4, times: ['Morning', 'Evening'], areas: ['Dubai Marina', 'JBR'], bio: 'Passionate Padel player!', photo: 'https://i.pravatar.cc/300?img=12' },
            { phone: '+971502345678', name: 'Sara', age: 25, gender: 'Female', skill: 3, times: ['Evening'], areas: ['Dubai Marina', 'Business Bay'], bio: 'Love playing after work', photo: 'https://i.pravatar.cc/300?img=45' },
            { phone: '+971503456789', name: 'Mohammed', age: 32, gender: 'Male', skill: 5, times: ['Morning', 'Afternoon'], areas: ['Sports City', 'Arabian Ranches'], bio: 'Competitive player', photo: 'https://i.pravatar.cc/300?img=33' },
            { phone: '+971504567890', name: 'Fatima', age: 27, gender: 'Female', skill: 4, times: ['Morning', 'Evening'], areas: ['JBR', 'Business Bay'], bio: 'Looking for doubles partners', photo: 'https://i.pravatar.cc/300?img=23' },
            { phone: '+971505678901', name: 'Omar', age: 35, gender: 'Male', skill: 3, times: ['Evening', 'Night'], areas: ['Downtown', 'Business Bay'], bio: 'Play for fun!', photo: 'https://i.pravatar.cc/300?img=51' },
            { phone: '+971506789012', name: 'Layla', age: 24, gender: 'Female', skill: 2, times: ['Afternoon', 'Evening'], areas: ['Jumeirah', 'Dubai Marina'], bio: 'Beginner looking to improve', photo: 'https://i.pravatar.cc/300?img=38' },
            { phone: '+971507890123', name: 'Khalid', age: 30, gender: 'Male', skill: 5, times: ['Morning', 'Afternoon', 'Evening'], areas: ['Sports City', 'Arabian Ranches', 'Dubai Marina'], bio: 'Ex-pro player', photo: 'https://i.pravatar.cc/300?img=61' },
            { phone: '+971508901234', name: 'Amira', age: 26, gender: 'Female', skill: 3, times: ['Evening', 'Night'], areas: ['Downtown', 'JBR'], bio: 'Weekend warrior', photo: 'https://i.pravatar.cc/300?img=44' }
        ];

        for (const user of users) {
            await sql`
        INSERT INTO users (phone, name, age, gender, skill_level, preferred_times, preferred_areas, bio, photo_url)
        VALUES (${user.phone}, ${user.name}, ${user.age}, ${user.gender}, ${user.skill}, 
                ${user.times}, ${user.areas}, ${user.bio}, ${user.photo})
        ON CONFLICT (phone) DO NOTHING
      `;
            console.log(`✅ Added user: ${user.name}`);
        }

        console.log('\n🎉 Database setup complete!');
        console.log('\n📊 Summary:');
        console.log('   - 5 tables created');
        console.log('   - 6 indexes created');
        console.log('   - 8 test users added');
        console.log('\n✅ Your database is ready to use!');

    } catch (error) {
        console.error('❌ Error setting up database:', error);
        throw error;
    }
}

// Run the setup
setupDatabase()
    .then(() => {
        console.log('\n👍 All done! You can now deploy your app.');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Setup failed:', error.message);
        process.exit(1);
    });
