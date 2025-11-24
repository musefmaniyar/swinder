import { NextResponse } from 'next/server'
import { recordSwipe } from '@/lib/db'
import { cookies } from 'next/headers'

export async function POST(request) {
    try {
        const cookieStore = cookies()
        const userId = cookieStore.get('userId')?.value

        if (!userId) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
        }

        const { swiped_id, direction } = await request.json()

        if (!swiped_id || !direction) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const result = await recordSwipe(userId, swiped_id, direction)

        return NextResponse.json(result)
    } catch (error) {
        console.error('Swipe error:', error)
        return NextResponse.json({ error: 'Failed to record swipe' }, { status: 500 })
    }
}
