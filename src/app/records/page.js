'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './records.module.css'

const MOCK_STATS = {
    total_matches: 12,
    wins: 8,
    losses: 3,
    draws: 1,
    win_rate: '66.7'
}

const MOCK_RESULTS = [
    { id: '1', opponent_name: 'Ahmed', opponent_photo: 'https://i.pravatar.cc/100?img=12', result_type: 'win', score: '6-3, 6-4', verification_status: 'approved', created_at: new Date().toISOString() },
    { id: '2', opponent_name: 'Sara', opponent_photo: 'https://i.pravatar.cc/100?img=45', result_type: 'loss', score: '4-6, 3-6', verification_status: 'approved', created_at: new Date(Date.now() - 86400000).toISOString() },
    { id: '3', opponent_name: 'Mohammed', opponent_photo: 'https://i.pravatar.cc/100?img=33', result_type: 'win', score: '6-2, 7-5', verification_status: 'pending', created_at: new Date(Date.now() - 172800000).toISOString() },
]

export default function RecordsPage() {
    const router = useRouter()
    const [stats] = useState(MOCK_STATS)
    const [results] = useState(MOCK_RESULTS)
    const [showRecordModal, setShowRecordModal] = useState(false)

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>📊 Records & Stats</h1>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statValue}>{stats.total_matches}</div>
                    <div className={styles.statLabel}>Total Matches</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statValue} style={{ color: 'var(--success)' }}>{stats.wins}</div>
                    <div className={styles.statLabel}>Wins</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statValue} style={{ color: 'var(--error)' }}>{stats.losses}</div>
                    <div className={styles.statLabel}>Losses</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statValue} style={{ color: 'var(--accent-cyan)' }}>{stats.win_rate}%</div>
                    <div className={styles.statLabel}>Win Rate</div>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Match History</h2>
                    <button className="btn btn-primary btn-sm" onClick={() => setShowRecordModal(true)}>
                        + Record Match
                    </button>
                </div>

                <div className={styles.resultsList}>
                    {results.map(result => (
                        <div key={result.id} className={styles.resultCard}>
                            <div className={styles.opponent}>
                                <img src={result.opponent_photo} alt={result.opponent_name} />
                                <div>
                                    <h3>{result.opponent_name}</h3>
                                    <p className="text-sm text-muted">{result.score}</p>
                                </div>
                            </div>

                            <div className={styles.resultInfo}>
                                <div className={`${styles.resultBadge} ${styles[result.result_type]}`}>
                                    {result.result_type.toUpperCase()}
                                </div>
                                <div className={`${styles.statusBadge} ${styles[result.verification_status]}`}>
                                    {result.verification_status === 'approved' ? '✓ Verified' : '⏳ Pending'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showRecordModal && (
                <div className={styles.modal} onClick={() => setShowRecordModal(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Record Match Result</h2>
                            <button className={styles.closeButton} onClick={() => setShowRecordModal(false)}>×</button>
                        </div>

                        <form className={styles.form}>
                            <select className="input">
                                <option>Select Opponent</option>
                                <option>Ahmed</option>
                                <option>Sara</option>
                                <option>Mohammed</option>
                            </select>

                            <select className="input">
                                <option>Result</option>
                                <option value="win">Win</option>
                                <option value="loss">Loss</option>
                                <option value="draw">Draw</option>
                            </select>

                            <input className="input" placeholder="Score (optional)" />

                            <div className="flex gap-md">
                                <button type="button" className="btn btn-secondary flex-1" onClick={() => setShowRecordModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary flex-1">
                                    Record Match
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <nav className={styles.nav}>
                <button className={styles.navItem} onClick={() => router.push('/home')}>
                    <span>🏠</span>
                    <span>Home</span>
                </button>
                <button className={styles.navItem} onClick={() => router.push('/matches')}>
                    <span>💬</span>
                    <span>Matches</span>
                </button>
                <button className={styles.navItem + ' ' + styles.active}>
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
