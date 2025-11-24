import { NextResponse } from 'next/server'
import { getUserByPhone } from '@/lib/db'

export async function POST(request) {
    try {
        const { phone, otp } = await request.json()

        if (!phone || !otp) {
            return NextResponse.json({ error: 'Phone and OTP required' }, { status: 400 })
        }

        // Mock OTP verification (accept any OTP for demo)
        // In production, verify against stored OTP
        if (otp !== '123456') {
            return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 })
        }

        // Check if user exists
        const existingUser = await getUserByPhone(phone)

        const response = NextResponse.json({
            success: true,
            isNewUser: !existingUser,
            user: existingUser || null
        })

        // Set session cookie
        if (existingUser) {
            response.cookies.set('userId', existingUser.id, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 30 // 30 days
            })
        }

        return response
    } catch (error) {
        console.error('Verify OTP error:', error)
        return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 })
    }
}
