import { NextResponse } from 'next/server'
import { verifyMatchResult } from '@/lib/db'
import { cookies } from 'next/headers'

export async function PUT(request, { params }) {
    try {
        const cookieStore = cookies()
        const userId = cookieStore.get('userId')?.value

        if (!userId) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
        }

        const { id } = params
        const result = await verifyMatchResult(id, userId)

        return NextResponse.json({ result })
    } catch (error) {
        console.error('Verify result error:', error)
        return NextResponse.json({ error: 'Failed to verify result' }, { status: 500 })
    }
}
