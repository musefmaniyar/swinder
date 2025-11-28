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

        console.log('Verify OTP:', { phone, existingUser: !!existingUser })

        // Set session cookie for both new and existing users
        const response = NextResponse.json({
            success: true,
            isNewUser: !existingUser,
            user: existingUser || null,
            phone: phone // Include phone for new users
        })

        // Set session cookie if user exists
        if (existingUser) {
            response.cookies.set('userId', existingUser.id, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 30 // 30 days
            })
            console.log('Session cookie set for existing user:', existingUser.id)
        } else {
            // For new users, we'll set a temporary phone cookie
            // This will be replaced with userId after profile setup
            response.cookies.set('tempPhone', phone, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 // 1 hour (short-lived)
            })
            console.log('Temporary phone cookie set for new user')
        }

        return response
    } catch (error) {
        console.error('Verify OTP error:', error)
        return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 })
    }
}
