'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './leaderboard.module.css'

const MOCK_LEADERBOARD = [
    { rank: 1, id: '1', name: 'Khalid', photo_url: 'https://i.pravatar.cc/100?img=61', skill_level: 5, total_matches: 45, wins: 38, win_rate: '84.4' },
    { rank: 2, id: '2', name: 'Mohammed', photo_url: 'https://i.pravatar.cc/100?img=33', skill_level: 5, total_matches: 42, wins: 33, win_rate: '78.6' },
    { rank: 3, id: '3', name: 'Ahmed', photo_url: 'https://i.pravatar.cc/100?img=12', skill_level: 4, total_matches: 38, wins: 28, win_rate: '73.7' },
    { rank: 4, id: '4', name: 'Fatima', photo_url: 'https://i.pravatar.cc/100?img=23', skill_level: 4, total_matches: 35, wins: 24, win_rate: '68.6' },
    { rank: 5, id: '5', name: 'Omar', photo_url: 'https://i.pravatar.cc/100?img=51', skill_level: 3, total_matches: 30, wins: 19, win_rate: '63.3' },
    { rank: 6, id: '6', name: 'Sara', photo_url: 'https://i.pravatar.cc/100?img=45', skill_level: 3, total_matches: 28, wins: 17, win_rate: '60.7' },
    { rank: 7, id: '7', name: 'Amira', photo_url: 'https://i.pravatar.cc/100?img=44', skill_level: 3, total_matches: 25, wins: 14, win_rate: '56.0' },
    { rank: 8, id: '8', name: 'Layla', photo_url: 'https://i.pravatar.cc/100?img=38', skill_level: 2, total_matches: 20, wins: 10, win_rate: '50.0' },
]

export default function LeaderboardPage() {
    const router = useRouter()
    const [leaderboard] = useState(MOCK_LEADERBOARD)
    const myRank = 5 // Mock current user rank

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>🏆 Leaderboard</h1>
                <p className="text-muted">Top Padel Players</p>
            </div>

            <div className={styles.leaderboardList}>
                {leaderboard.map(player => (
                    <div
                        key={player.id}
                        className={`${styles.playerCard} ${player.rank === myRank ? styles.highlighted : ''} ${player.rank <= 3 ? styles[`top${player.rank}`] : ''}`}
                    >
                        <div className={styles.rankBadge}>
                            {player.rank <= 3 ? (
                                <span className={styles.medal}>
                                    {player.rank === 1 && '🥇'}
                                    {player.rank === 2 && '🥈'}
                                    {player.rank === 3 && '🥉'}
                                </span>
                            ) : (
                                <span>{player.rank}</span>
                            )}
                        </div>

                        <div className={styles.playerPhoto}>
                            <img src={player.photo_url} alt={player.name} />
                        </div>

                        <div className={styles.playerInfo}>
                            <h3>{player.name}</h3>
                            <p className="text-sm text-muted">Skill: {player.skill_level}/5</p>
                        </div>

                        <div className={styles.playerStats}>
                            <div className={styles.stat}>
                                <div className={styles.statValue}>{player.wins}</div>
                                <div className={styles.statLabel}>Wins</div>
                            </div>
                            <div className={styles.stat}>
                                <div className={styles.statValue}>{player.win_rate}%</div>
                                <div className={styles.statLabel}>Win Rate</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <nav className={styles.nav}>
                <button className={styles.navItem} onClick={() => router.push('/home')}>
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
                <button className={styles.navItem + ' ' + styles.active}>
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
