import { sql } from '@vercel/postgres'

export { sql }

// Helper to get current user from session (we'll implement sessions in auth)
export async function getCurrentUser(request) {
    // For now, return mock user - will implement proper sessions later
    const userId = request.cookies.get('userId')?.value
    if (!userId) return null

    const result = await sql`
    SELECT * FROM users WHERE id = ${userId}
  `
    return result.rows[0] || null
}

// Get user by phone
export async function getUserByPhone(phone) {
    const result = await sql`
    SELECT * FROM users WHERE phone = ${phone}
  `
    return result.rows[0] || null
}

// Create new user
export async function createUser(data) {
    const { phone, name, age, gender, skill_level, preferred_times, preferred_areas, bio, photo_url } = data

    const result = await sql`
    INSERT INTO users (phone, name, age, gender, skill_level, preferred_times, preferred_areas, bio, photo_url)
    VALUES (${phone}, ${name}, ${age || null}, ${gender || null}, ${skill_level || 3}, ${preferred_times || []}, ${preferred_areas || []}, ${bio || null}, ${photo_url || null})
    RETURNING *
  `
    return result.rows[0]
}

// Update user
export async function updateUser(userId, data) {
    const { name, age, gender, skill_level, preferred_times, preferred_areas, bio, photo_url } = data

    const result = await sql`
    UPDATE users 
    SET name = ${name}, 
        age = ${age}, 
        gender = ${gender}, 
        skill_level = ${skill_level},
        preferred_times = ${preferred_times},
        preferred_areas = ${preferred_areas},
        bio = ${bio},
        photo_url = ${photo_url}
    WHERE id = ${userId}
    RETURNING *
  `
    return result.rows[0]
}

// Get candidates for swiping (exclude already swiped and matched users)
export async function getCandidates(userId, limit = 20) {
    const result = await sql`
    SELECT u.* FROM users u
    WHERE u.id != ${userId}
      AND u.id NOT IN (
        SELECT swiped_id FROM swipes WHERE swiper_id = ${userId}
      )
      AND u.id NOT IN (
        SELECT CASE 
          WHEN user1_id = ${userId} THEN user2_id 
          ELSE user1_id 
        END
        FROM matches 
        WHERE user1_id = ${userId} OR user2_id = ${userId}
      )
    ORDER BY RANDOM()
    LIMIT ${limit}
  `
    return result.rows
}

// Record a swipe
export async function recordSwipe(swiperId, swipedId, direction) {
    await sql`
    INSERT INTO swipes (swiper_id, swiped_id, direction)
    VALUES (${swiperId}, ${swipedId}, ${direction})
    ON CONFLICT (swiper_id, swiped_id) DO UPDATE SET direction = ${direction}
  `

    // Check if it's a match (both swiped right)
    if (direction === 'right') {
        const result = await sql`
      SELECT * FROM swipes 
      WHERE swiper_id = ${swipedId} AND swiped_id = ${swiperId} AND direction = 'right'
    `

        if (result.rows.length > 0) {
            // Create match
            await sql`
        INSERT INTO matches (user1_id, user2_id)
        VALUES (${Math.min(swiperId, swipedId)}, ${Math.max(swiperId, swipedId)})
        ON CONFLICT DO NOTHING
      `
            return { matched: true }
        }
    }

    return { matched: false }
}

// Get all matches for a user
export async function getMatches(userId) {
    const result = await sql`
    SELECT 
      m.*,
      CASE 
        WHEN m.user1_id = ${userId} THEN u2.id
        ELSE u1.id
      END as match_user_id,
      CASE 
        WHEN m.user1_id = ${userId} THEN u2.name
        ELSE u1.name
      END as match_user_name,
      CASE 
        WHEN m.user1_id = ${userId} THEN u2.photo_url
        ELSE u1.photo_url
      END as match_user_photo,
      CASE 
        WHEN m.user1_id = ${userId} THEN u2.skill_level
        ELSE u1.skill_level
      END as match_user_skill
    FROM matches m
    JOIN users u1 ON m.user1_id = u1.id
    JOIN users u2 ON m.user2_id = u2.id
    WHERE m.user1_id = ${userId} OR m.user2_id = ${userId}
    ORDER BY m.created_at DESC
  `
    return result.rows
}

// Get messages for a match
export async function getMessages(matchId) {
    const result = await sql`
    SELECT m.*, u.name as sender_name, u.photo_url as sender_photo
    FROM messages m
    JOIN users u ON m.sender_id = u.id
    WHERE m.match_id = ${matchId}
    ORDER BY m.created_at ASC
  `
    return result.rows
}

// Send message
export async function sendMessage(matchId, senderId, content) {
    const result = await sql`
    INSERT INTO messages (match_id, sender_id, content)
    VALUES (${matchId}, ${senderId}, ${content})
    RETURNING *
  `
    return result.rows[0]
}

// Record match result
export async function recordMatchResult(data) {
    const { match_id, winner_id, loser_id, result_type, score, recorded_by } = data

    const result = await sql`
    INSERT INTO match_results (match_id, winner_id, loser_id, result_type, score, recorded_by)
    VALUES (${match_id}, ${winner_id || null}, ${loser_id || null}, ${result_type}, ${score || null}, ${recorded_by})
    RETURNING *
  `
    return result.rows[0]
}

// Verify match result
export async function verifyMatchResult(resultId, verifierId) {
    const result = await sql`
    UPDATE match_results
    SET verified_by = ${verifierId}, verification_status = 'approved', verified_at = NOW()
    WHERE id = ${resultId}
    RETURNING *
  `
    return result.rows[0]
}

// Get match results for a user
export async function getMatchResults(userId) {
    const result = await sql`
    SELECT 
      mr.*,
      m.user1_id,
      m.user2_id,
      CASE 
        WHEN mr.winner_id = ${userId} THEN 
          (SELECT name FROM users WHERE id = mr.loser_id)
        WHEN mr.loser_id = ${userId} THEN
          (SELECT name FROM users WHERE id = mr.winner_id)
        ELSE
          (SELECT name FROM users WHERE id != ${userId} AND (id = m.user1_id OR id = m.user2_id) LIMIT 1)
      END as opponent_name,
      CASE 
        WHEN mr.winner_id = ${userId} THEN 
          (SELECT photo_url FROM users WHERE id = mr.loser_id)
        WHEN mr.loser_id = ${userId} THEN
          (SELECT photo_url FROM users WHERE id = mr.winner_id)
        ELSE
          (SELECT photo_url FROM users WHERE id != ${userId} AND (id = m.user1_id OR id = m.user2_id) LIMIT 1)
      END as opponent_photo
    FROM match_results mr
    JOIN matches m ON mr.match_id = m.id
    WHERE m.user1_id = ${userId} OR m.user2_id = ${userId}
    ORDER BY mr.created_at DESC
  `
    return result.rows
}

// Get user stats
export async function getUserStats(userId) {
    const result = await sql`
    SELECT 
      COUNT(*) as total_matches,
      SUM(CASE WHEN winner_id = ${userId} THEN 1 ELSE 0 END) as wins,
      SUM(CASE WHEN loser_id = ${userId} THEN 1 ELSE 0 END) as losses,
      SUM(CASE WHEN result_type = 'draw' THEN 1 ELSE 0 END) as draws
    FROM match_results mr
    JOIN matches m ON mr.match_id = m.id
    WHERE (m.user1_id = ${userId} OR m.user2_id = ${userId})
      AND verification_status = 'approved'
  `

    const stats = result.rows[0]
    const winRate = stats.total_matches > 0 ? (stats.wins / stats.total_matches * 100).toFixed(1) : 0

    return {
        ...stats,
        win_rate: winRate
    }
}

// Get leaderboard
export async function getLeaderboard(limit = 100) {
    const result = await sql`
    SELECT 
      u.id,
      u.name,
      u.photo_url,
      u.skill_level,
      COUNT(mr.id) as total_matches,
      SUM(CASE WHEN mr.winner_id = u.id THEN 1 ELSE 0 END) as wins,
      SUM(CASE WHEN mr.loser_id = u.id THEN 1 ELSE 0 END) as losses,
      CASE 
        WHEN COUNT(mr.id) > 0 
        THEN ROUND(SUM(CASE WHEN mr.winner_id = u.id THEN 1 ELSE 0 END)::numeric / COUNT(mr.id)::numeric * 100, 1)
        ELSE 0
      END as win_rate
    FROM users u
    LEFT JOIN matches m ON u.id = m.user1_id OR u.id = m.user2_id
    LEFT JOIN match_results mr ON mr.match_id = m.id AND mr.verification_status = 'approved'
    GROUP BY u.id, u.name, u.photo_url, u.skill_level
    HAVING COUNT(mr.id) > 0
    ORDER BY wins DESC, win_rate DESC
    LIMIT ${limit}
  `

    return result.rows.map((row, index) => ({
        ...row,
        rank: index + 1
    }))
}
