import { NextResponse } from 'next/server'
import { getMatches } from '@/lib/db'
import { cookies } from 'next/headers'

export async function GET(request) {
    try {
        const cookieStore = cookies()
        const userId = cookieStore.get('userId')?.value

        if (!userId) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
        }

        const matches = await getMatches(userId)

        return NextResponse.json({ matches })
    } catch (error) {
        console.error('Get matches error:', error)
        return NextResponse.json({ error: 'Failed to get matches' }, { status: 500 })
    }
}
