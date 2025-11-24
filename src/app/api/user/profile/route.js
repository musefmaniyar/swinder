import { NextResponse } from 'next/server'
import { updateUser } from '@/lib/db'
import { cookies } from 'next/headers'

export async function PUT(request) {
    try {
        const cookieStore = cookies()
        const userId = cookieStore.get('userId')?.value

        if (!userId) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
        }

        const data = await request.json()
        const user = await updateUser(userId, data)

        return NextResponse.json({ user })
    } catch (error) {
        console.error('Update profile error:', error)
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
    }
}
