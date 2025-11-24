import { NextResponse } from 'next/server'
import { getMessages } from '@/lib/db'

export async function GET(request, { params }) {
    try {
        const { matchId } = params
        const messages = await getMessages(matchId)

        return NextResponse.json({ messages })
    } catch (error) {
        console.error('Get messages error:', error)
        return NextResponse.json({ error: 'Failed to get messages' }, { status: 500 })
    }
}
