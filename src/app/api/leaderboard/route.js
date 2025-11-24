import { NextResponse } from 'next/server'
import { getLeaderboard } from '@/lib/db'

export async function GET(request) {
    try {
        const leaderboard = await getLeaderboard(100)

        return NextResponse.json({ leaderboard })
    } catch (error) {
        console.error('Get leaderboard error:', error)
        return NextResponse.json({ error: 'Failed to get leaderboard' }, { status: 500 })
    }
}
