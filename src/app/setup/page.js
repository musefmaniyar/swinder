'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function QuickStartPage() {
    const router = useRouter()

    useEffect(() => {
        // Skip setup for demo, go directly to home
        localStorage.setItem('isLoggedIn', 'true')
        router.push('/home')
    }, [router])

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a0a0a',
            color: '#ffffff'
        }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎾</div>
                <h1>Loading Swinder...</h1>
                <p style={{ color: '#b0b0b0', marginTop: '10px' }}>Taking you to the app</p>
            </div>
        </div>
    )
}
