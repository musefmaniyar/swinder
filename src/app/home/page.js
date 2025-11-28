'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './home.module.css'

export default function HomePage() {
    const router = useRouter()
    const [candidates, setCandidates] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [swipeDirection, setSwipeDirection] = useState(null)
    const [showMatch, setShowMatch] = useState(false)
    const [matchedUser, setMatchedUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const currentCandidate = candidates[currentIndex]

    // Fetch candidates on mount
    useEffect(() => {
        fetchCandidates()
    }, [])

    const fetchCandidates = async () => {
        setLoading(true)
        setError(null)

        try {
            const res = await fetch('/api/candidates')

            if (!res.ok) {
                throw new Error('Failed to load profiles')
            }

            const data = await res.json()
            setCandidates(data.candidates || [])
            setCurrentIndex(0)
        } catch (err) {
            console.error('Fetch candidates error:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSwipe = async (direction) => {
        if (!currentCandidate || swipeDirection) return

        setSwipeDirection(direction)

        try {
            const res = await fetch('/api/swipe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    swiped_id: currentCandidate.id,
                    direction
                })
            })

            if (!res.ok) {
                throw new Error('Failed to record swipe')
            }

            const data = await res.json()

            // Check if it's a match
            if (data.isMatch && data.match) {
                setMatchedUser(currentCandidate)
                setShowMatch(true)
                setTimeout(() => setShowMatch(false), 3000)
            }

            // Move to next candidate after animation
            setTimeout(() => {
                setCurrentIndex(prev => prev + 1)
                setSwipeDirection(null)
            }, 300)

        } catch (err) {
            console.error('Swipe error:', err)
            setSwipeDirection(null)
            alert('Failed to record swipe. Please try again.')
        }
    }

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Swinder</h1>
                </div>
                <div className="flex items-center justify-center" style={{ flex: 1 }}>
                    <div className="spinner"></div>
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

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Swinder</h1>
                </div>
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>😕</div>
                    <h2>Oops!</h2>
                    <p className="text-muted">{error}</p>
                    <button className="btn btn-primary" onClick={fetchCandidates}>
                        Try Again
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

    if (!currentCandidate) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Swinder</h1>
                </div>

                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>😔</div>
                    <h2>No More Players</h2>
                    <p className="text-muted">Check back later for more Padel partners!</p>
                    <button className="btn btn-primary" onClick={fetchCandidates}>
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
                <h1>Swinder</h1>
                <p className="text-muted">Find Your Sports Partner</p>
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
                                <span>{currentCandidate.preferred_areas?.join(', ') || 'Not specified'}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span>🕒</span>
                                <span>{currentCandidate.preferred_times?.join(', ') || 'Not specified'}</span>
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
                    disabled={swipeDirection !== null}
                >
                    <span>✕</span>
                </button>
                <button
                    className={`${styles.actionButton} ${styles.like}`}
                    onClick={() => handleSwipe('right')}
                    disabled={swipeDirection !== null}
                >
                    <span>❤️</span>
                </button>
            </div>

            {showMatch && matchedUser && (
                <div className={styles.matchModal}>
                    <div className={styles.matchContent}>
                        <div className={styles.matchIcon}>💖</div>
                        <h2>It's a Match!</h2>
                        <p>You and {matchedUser.name} liked each other</p>
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
