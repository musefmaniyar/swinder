import { NextResponse } from 'next/server'
import { getCandidates } from '@/lib/db'
import { cookies } from 'next/headers'

export async function GET(request) {
    try {
        const cookieStore = cookies()
        const userId = cookieStore.get('userId')?.value

        if (!userId) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
        }

        const candidates = await getCandidates(userId, 20)

        return NextResponse.json({ candidates })
    } catch (error) {
        console.error('Get candidates error:', error)
        return NextResponse.json({ error: 'Failed to get candidates' }, { status: 500 })
    }
}
