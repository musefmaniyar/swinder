import { NextResponse } from 'next/server'
import { createUser } from '@/lib/db'

export async function POST(request) {
    try {
        const data = await request.json()

        console.log('Setup request received:', { phone: data.phone, name: data.name })

        // Validate required fields
        if (!data.phone || !data.name) {
            console.error('Validation failed: missing phone or name')
            return NextResponse.json({ error: 'Phone and name are required' }, { status: 400 })
        }

        // Create user
        console.log('Creating user in database...')
        const user = await createUser(data)
        console.log('User created successfully:', user.id)

        // Set session cookie
        const response = NextResponse.json({ success: true, user })
        response.cookies.set('userId', user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 30 // 30 days
        })

        console.log('Session cookie set for user:', user.id)
        return response
    } catch (error) {
        console.error('Setup user error:', error)
        console.error('Error details:', error.message, error.stack)
        return NextResponse.json({
            error: 'Failed to create user: ' + error.message
        }, { status: 500 })
    }
}
