import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sql } from '@/lib/db'

export async function GET(request) {
    try {
        const cookieStore = cookies()
        const userId = cookieStore.get('userId')?.value

        if (!userId) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
        }

        const result = await sql`SELECT * FROM users WHERE id = ${userId}`
        const user = result.rows[0]

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        return NextResponse.json({ user })
    } catch (error) {
        console.error('Get user error:', error)
        return NextResponse.json({ error: 'Failed to get user' }, { status: 500 })
    }
}
