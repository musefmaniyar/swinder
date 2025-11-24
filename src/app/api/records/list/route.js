import { NextResponse } from 'next/server'
import { getMatchResults, getUserStats } from '@/lib/db'
import { cookies } from 'next/headers'

export async function GET(request) {
    try {
        const cookieStore = cookies()
        const userId = cookieStore.get('userId')?.value

        if (!userId) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
        }

        const results = await getMatchResults(userId)
        const stats = await getUserStats(userId)

        return NextResponse.json({ results, stats })
    } catch (error) {
        console.error('Get records error:', error)
        return NextResponse.json({ error: 'Failed to get records' }, { status: 500 })
    }
}
