import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET() {
    try {
        // Test database connection
        const result = await sql`SELECT COUNT(*) as count FROM users`

        return NextResponse.json({
            status: 'OK',
            database: 'Connected',
            users: result.rows[0].count,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        return NextResponse.json({
            status: 'ERROR',
            database: 'Disconnected',
            error: error.message,
            hint: 'Check Vercel environment variables',
            timestamp: new Date().toISOString()
        }, { status: 500 })
    }
}
