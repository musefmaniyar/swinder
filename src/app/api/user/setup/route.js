import { NextResponse } from 'next/server'
import { createUser } from '@/lib/db'

export async function POST(request) {
    try {
        const data = await request.json()

        // Validate required fields
        if (!data.phone || !data.name) {
            return NextResponse.json({ error: 'Phone and name are required' }, { status: 400 })
        }

        // Create user
        const user = await createUser(data)

        // Set session cookie
        const response = NextResponse.json({ success: true, user })
        response.cookies.set('userId', user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 30 // 30 days
        })

        return response
    } catch (error) {
        console.error('Setup user error:', error)
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }
}
