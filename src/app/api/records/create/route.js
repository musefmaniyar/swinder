import { NextResponse } from 'next/server'
import { recordMatchResult } from '@/lib/db'
import { cookies } from 'next/headers'

export async function POST(request) {
    try {
        const cookieStore = cookies()
        const userId = cookieStore.get('userId')?.value

        if (!userId) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
        }

        const data = await request.json()
        data.recorded_by = userId

        const result = await recordMatchResult(data)

        return NextResponse.json({ result })
    } catch (error) {
        console.error('Create record error:', error)
        return NextResponse.json({ error: 'Failed to create record' }, { status: 500 })
    }
}
