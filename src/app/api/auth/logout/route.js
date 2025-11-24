import { NextResponse } from 'next/server'

export async function POST(request) {
    const response = NextResponse.json({ success: true })

    // Clear session cookie
    response.cookies.delete('userId')

    return response
}
