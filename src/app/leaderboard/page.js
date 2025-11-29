'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './leaderboard.module.css'
import BottomNav from '@/components/BottomNav'

export default function LeaderboardPage() {
    const router = useRouter()
    const [leaderboard, setLeaderboard] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentUserId, setCurrentUserId] = useState(null)

    useEffect(() => {
        fetchLeaderboard()
        fetchCurrentUser()
    }, [])

    const fetchCurrentUser = async () => {
        try {
            const res = await fetch('/api/user/me')
            if (res.ok) {
                const data = await res.json()
                setCurrentUserId(data.user?.id)
            }
        } catch (err) {
            console.error('Fetch current user error:', err)
        }
    }

    const fetchLeaderboard = async () => {
        setLoading(true)
        setError(null)

        try {
            const res = await fetch('/api/leaderboard')

            if (!res.ok) {
                throw new Error('Failed to load leaderboard')
            }

            const data = await res.json()
            setLeaderboard(data.leaderboard || [])
        } catch (err) {
            console.error('Fetch leaderboard error:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const getMedalIcon = (rank) => {
        if (rank === 1) return '🥇'
        if (rank === 2) return '🥈'
        if (rank === 3) return '🥉'
        return rank
    }

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>🏆 Leaderboard</h1>
                </div>
                <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
                    <div className="spinner"></div>
                </div>
                <BottomNav />
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>🏆 Leaderboard</h1>
                <p className="text-muted">Top Players</p>
            </div>

            <div className={styles.leaderboardList}>
                {error ? (
                    <div className={styles.errorState}>
                        <p>😕 {error}</p>
                        <button className="btn btn-primary" onClick={fetchLeaderboard}>
                            Try Again
                        </button>
                    </div>
                ) : leaderboard.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>No rankings yet</p>
                        <button className="btn btn-primary" onClick={() => router.push('/records')}>
                            Record Matches to Join
                        </button>
                    </div>
                ) : (
                    leaderboard.map((player, index) => {
                        const rank = index + 1
                        const isCurrentUser = player.id === currentUserId
                        const isTopThree = rank <= 3

                        return (
                            <div
                                key={player.id}
                                className={`${styles.playerCard} ${isTopThree ? styles.topThree : ''} ${isCurrentUser ? styles.currentUser : ''}`}
                            >
                                <div className={styles.rank}>
                                    {getMedalIcon(rank)}
                                </div>

                                <div className={styles.playerPhoto}>
                                    <img src={player.photo_url} alt={player.name} />
                                </div>

                                <div className={styles.playerInfo}>
                                    <h3>{player.name} {isCurrentUser && '(You)'}</h3>
                                    <p className="text-sm text-muted">
                                        Skill: {player.skill_level}/5 • Win Rate: {player.win_rate}%
                                    </p>
                                </div>

                                <div className={styles.playerStats}>
                                    <div className={styles.statValue}>{player.wins || 0}</div>
                                    <div className={styles.statLabel}>Wins</div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>

            <BottomNav />
        </div>
    )
}
