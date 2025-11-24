import { NextResponse } from 'next/server'
import { sendMessage } from '@/lib/db'
import { cookies } from 'next/headers'

export async function POST(request, { params }) {
    try {
        const cookieStore = cookies()
        const userId = cookieStore.get('userId')?.value

        if (!userId) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
        }

        const { matchId } = params
        const { content } = await request.json()

        if (!content) {
            return NextResponse.json({ error: 'Message content required' }, { status: 400 })
        }

        const message = await sendMessage(matchId, userId, content)

        return NextResponse.json({ message })
    } catch (error) {
        console.error('Send message error:', error)
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }
}
