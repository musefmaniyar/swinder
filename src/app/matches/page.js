'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './matches.module.css'

export default function MatchesPage() {
    const router = useRouter()
    const [matches, setMatches] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchMatches()
    }, [])

    const fetchMatches = async () => {
        setLoading(true)
        setError(null)

        try {
            const res = await fetch('/api/matches/list')

            if (!res.ok) {
                throw new Error('Failed to load matches')
            }

            const data = await res.json()
            setMatches(data.matches || [])
        } catch (err) {
            console.error('Fetch matches error:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>💬 Matches</h1>
                </div>
                <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
                    <div className="spinner"></div>
                </div>
                <nav className={styles.nav}>
                    <button className={styles.navItem} onClick={() => router.push('/home')}>
                        <span>🏠</span>
                        <span>Home</span>
                    </button>
                    <button className={styles.navItem + ' ' + styles.active}>
                        <span>💬</span>
                        <span>Matches</span>
                    </button>
                    <button className={styles.navItem} onClick={() => router.push('/records')}>
                        <span>📊</span>
                        <span>Records</span>
                    </button>
                    <button className={styles.navItem} onClick={() => router.push('/leaderboard')}>
                        <span>🏆</span>
                        <span>Leaderboard</span>
                    </button>
                    <button className={styles.navItem} onClick={() => router.push('/profile')}>
                        <span>👤</span>
                        <span>Profile</span>
                    </button>
                </nav>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>💬 Matches</h1>
                <p className="text-muted">{matches.length} {matches.length === 1 ? 'match' : 'matches'}</p>
            </div>

            <div className={styles.matchList}>
                {error ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>😕</div>
                        <h2>Error Loading Matches</h2>
                        <p className="text-muted">{error}</p>
                        <button className="btn btn-primary" onClick={fetchMatches}>
                            Try Again
                        </button>
                    </div>
                ) : matches.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>😔</div>
                        <h2>No Matches Yet</h2>
                        <p className="text-muted">Start swiping to find Padel partners!</p>
                        <button className="btn btnprimary" onClick={() => router.push('/home')}>
                            Start Swiping
                        </button>
                    </div>
                ) : (
                    matches.map(match => (
                        <div
                            key={match.id}
                            className={styles.matchCard}
                            onClick={() => router.push(`/chat/${match.id}`)}
                        >
                            <div className={styles.matchPhoto}>
                                <img src={match.match_user_photo} alt={match.match_user_name} />
                            </div>

                            <div className={styles.matchInfo}>
                                <h3>{match.match_user_name}</h3>
                                <p className="text-sm text-muted">Skill Level: {match.match_user_skill}/5</p>
                            </div>

                            <div className={styles.matchAction}>
                                <span>→</span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <nav className={styles.nav}>
                <button className={styles.navItem} onClick={() => router.push('/home')}>
                    <span>🏠</span>
                    <span>Home</span>
                </button>
                <button className={styles.navItem + ' ' + styles.active}>
                    <span>💬</span>
                    <span>Matches</span>
                </button>
                <button className={styles.navItem} onClick={() => router.push('/records')}>
                    <span>📊</span>
                    <span>Records</span>
                </button>
                <button className={styles.navItem} onClick={() => router.push('/leaderboard')}>
                    <span>🏆</span>
                    <span>Leaderboard</span>
                </button>
                <button className={styles.navItem} onClick={() => router.push('/profile')}>
                    <span>👤</span>
                    <span>Profile</span>
                </button>
            </nav>
        </div>
    )
}
