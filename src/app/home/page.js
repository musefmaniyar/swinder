'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './home.module.css'

// Mock data for UI preview (will be replaced with real API data)
const MOCK_CANDIDATES = [
    {
        id: '1',
        name: 'Ahmed',
        age: 28,
        gender: 'Male',
        skill_level: 4,
        preferred_times: ['Morning', 'Evening'],
        preferred_areas: ['Dubai Marina', 'JBR'],
        bio: 'Passionate Padel player looking for partners!',
        photo_url: 'https://i.pravatar.cc/400?img=12'
    },
    {
        id: '2',
        name: 'Sara',
        age: 25,
        gender: 'Female',
        skill_level: 3,
        preferred_times: ['Evening'],
        preferred_areas: ['Dubai Marina', 'Business Bay'],
        bio: 'Love playing Padel after work',
        photo_url: 'https://i.pravatar.cc/400?img=45'
    },
    {
        id: '3',
        name: 'Mohammed',
        age: 32,
        gender: 'Male',
        skill_level: 5,
        preferred_times: ['Morning', 'Afternoon'],
        preferred_areas: ['Sports City', 'Arabian Ranches'],
        bio: 'Competitive player, let\'s play!',
        photo_url: 'https://i.pravatar.cc/400?img=33'
    }
]

export default function HomePage() {
    const router = useRouter()
    const [candidates, setCandidates] = useState(MOCK_CANDIDATES)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [swipeDirection, setSwipeDirection] = useState(null)
    const [showMatch, setShowMatch] = useState(false)
    const [loading, setLoading] = useState(false)

    const currentCandidate = candidates[currentIndex]

    const handleSwipe = async (direction) => {
        if (loading || !currentCandidate) return

        setSwipeDirection(direction)
        setLoading(true)

        // Simulate API call
        setTimeout(async () => {
            try {
                // In real app: await fetch('/api/swipe', { method: 'POST', body: { swiped_id: currentCandidate.id, direction } })

                // Simulate match (20% chance)
                const isMatch = direction === 'right' && Math.random() > 0.8

                if (isMatch) {
                    setShowMatch(true)
                    setTimeout(() => setShowMatch(false), 3000)
                }

                // Move to next candidate
                setTimeout(() => {
                    setCurrentIndex(prev => prev + 1)
                    setSwipeDirection(null)
                    setLoading(false)
                }, 300)
            } catch (error) {
                console.error('Swipe error:', error)
                setLoading(false)
            }
        }, 500)
    }

    if (!currentCandidate) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>🎾 Swinder</h1>
                </div>

                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>😔</div>
                    <h2>No More Players</h2>
                    <p className="text-muted">Check back later for more Padel partners!</p>
                    <button className="btn btn-primary" onClick={() => setCandidates(MOCK_CANDIDATES)}>
                        Reload
                    </button>
                </div>

                <nav className={styles.nav}>
                    <button className={styles.navItem + ' ' + styles.active}>
                        <span>🏠</span>
                        <span>Home</span>
                    </button>
                    <button className={styles.navItem} onClick={() => router.push('/matches')}>
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
                <h1>🎾 Swinder</h1>
                <p className="text-muted">Find Your Padel Partner</p>
            </div>

            <div className={styles.cardContainer}>
                <div className={`${styles.card} ${swipeDirection ? styles[`swipe${swipeDirection === 'right' ? 'Right' : 'Left'}`] : ''}`}>
                    <div className={styles.cardImage}>
                        <img src={currentCandidate.photo_url} alt={currentCandidate.name} />
                    </div>

                    <div className={styles.cardContent}>
                        <h2>{currentCandidate.name}, {currentCandidate.age}</h2>

                        <div className={styles.skillBadge}>
                            <span className={styles.skillLabel}>Skill Level:</span>
                            <span className={styles.skillValue}>{currentCandidate.skill_level}/5</span>
                        </div>

                        <div className={styles.info}>
                            <div className={styles.infoItem}>
                                <span>📍</span>
                                <span>{currentCandidate.preferred_areas.join(', ')}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span>🕒</span>
                                <span>{currentCandidate.preferred_times.join(', ')}</span>
                            </div>
                        </div>

                        {currentCandidate.bio && (
                            <p className={styles.bio}>{currentCandidate.bio}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <button
                    className={`${styles.actionButton} ${styles.pass}`}
                    onClick={() => handleSwipe('left')}
                    disabled={loading}
                >
                    <span>✕</span>
                </button>
                <button
                    className={`${styles.actionButton} ${styles.like}`}
                    onClick={() => handleSwipe('right')}
                    disabled={loading}
                >
                    <span>❤️</span>
                </button>
            </div>

            {showMatch && (
                <div className={styles.matchModal}>
                    <div className={styles.matchContent}>
                        <div className={styles.matchIcon}>💖</div>
                        <h2>It's a Match!</h2>
                        <p>You and {currentCandidate.name} liked each other</p>
                        <button className="btn btn-primary" onClick={() => router.push('/matches')}>
                            Send Message
                        </button>
                    </div>
                </div>
            )}

            <nav className={styles.nav}>
                <button className={styles.navItem + ' ' + styles.active}>
                    <span>🏠</span>
                    <span>Home</span>
                </button>
                <button className={styles.navItem} onClick={() => router.push('/matches')}>
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
