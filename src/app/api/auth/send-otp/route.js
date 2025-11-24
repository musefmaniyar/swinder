import { NextResponse } from 'next/server'
import { getUserByPhone } from '@/lib/db'

// Mock OTP sending (for development speed)
// In production, integrate with Twilio/Firebase
export async function POST(request) {
    try {
        const { phone } = await request.json()

        if (!phone) {
            return NextResponse.json({ error: 'Phone number required' }, { status: 400 })
        }

        // Mock OTP - in production, send real SMS
        const otp = '123456' // Always use this for demo

        // In production, you would:
        // 1. Generate random 6-digit OTP
        // 2. Store in database with expiry
        // 3. Send via Twilio/Firebase
        // const otp = Math.floor(100000 + Math.random() * 900000).toString()
        // await twilioClient.messages.create({ to: phone, body: `Your Swinder code: ${otp}` })

        console.log(`📱 OTP for ${phone}: ${otp}`)

        return NextResponse.json({
            success: true,
            message: 'OTP sent successfully',
            // For demo purposes, return OTP (REMOVE IN PRODUCTION)
            otp: '123456'
        })
    } catch (error) {
        console.error('Send OTP error:', error)
        return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 })
    }
}
