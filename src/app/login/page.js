'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './login.module.css'

export default function LoginPage() {
    const router = useRouter()
    const [step, setStep] = useState('phone')
    const [phone, setPhone] = useState('+971')
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSendOTP = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        // DEMO MODE: Skip API call
        setTimeout(() => {
            setStep('otp')
            setLoading(false)
        }, 500)
    }

    const handleVerifyOTP = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        setTimeout(() => {
            if (otp !== '123456') {
                setError('Invalid OTP. Use 123456')
                setLoading(false)
                return
            }

            localStorage.setItem('demoUser', JSON.stringify({ phone }))
            localStorage.setItem('isLoggedIn', 'true')
            router.push(`/setup?phone=${encodeURIComponent(phone)}`)
            setLoading(false)
        }, 500)
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.logo}>
                    <h1>🎾 Swinder</h1>
                    <p>Find Your Padel Partner</p>
                </div>

                {step === 'phone' ? (
                    <form onSubmit={handleSendOTP} className={styles.form}>
                        <h2>Welcome!</h2>
                        <p className="text-muted">Enter your phone number to get started</p>

                        <input
                            type="tel"
                            className="input"
                            placeholder="+971 50 123 4567"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />

                        {error && <p className={styles.error}>{error}</p>}

                        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>

                        <p className={styles.hint}>
                            💡 Demo Mode: OTP is always <strong>123456</strong>
                        </p>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOTP} className={styles.form}>
                        <h2>Enter OTP</h2>
                        <p className="text-muted">We sent a code to {phone}</p>

                        <input
                            type="text"
                            className="input"
                            placeholder="123456"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength={6}
                            required
                            autoFocus
                        />

                        {error && <p className={styles.error}>{error}</p>}

                        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify & Continue'}
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary w-full"
                            onClick={() => setStep('phone')}
                        >
                            ← Change Number
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}
