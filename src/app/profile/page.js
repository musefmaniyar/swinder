'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './profile.module.css'

const MOCK_USER = {
    name: 'You',
    age: 28,
    gender: 'Male',
    phone: '+971501234567',
    skill_level: 3,
    preferred_times: ['Morning', 'Evening'],
    preferred_areas: ['Dubai Marina', 'JBR'],
    bio: 'Love playing Padel! Looking for regular partners.',
    photo_url: 'https://i.pravatar.cc/300?img=51'
}

export default function ProfilePage() {
    const router = useRouter()
    const [user] = useState(MOCK_USER)
    const [showEditModal, setShowEditModal] = useState(false)

    const handleLogout = async () => {
        if (confirm('Are you sure you want to logout?')) {
            // await fetch('/api/auth/logout', { method: 'POST' })
            router.push('/login')
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>👤 Profile</h1>
            </div>

            <div className={styles.content}>
                <div className={styles.profilePhoto}>
                    <img src={user.photo_url} alt={user.name} />
                </div>

                <h2 className={styles.name}>{user.name}, {user.age}</h2>
                <p className="text-muted">{user.phone}</p>

                <div className={styles.infoGrid}>
                    <div className={styles.infoCard}>
                        <div className={styles.infoLabel}>Skill Level</div>
                        <div className={styles.infoValue}>{user.skill_level}/5</div>
                    </div>

                    <div className={styles.infoCard}>
                        <div className={styles.infoLabel}>Gender</div>
                        <div className={styles.infoValue}>{user.gender}</div>
                    </div>

                    <div className={styles.infoCard}>
                        <div className={styles.infoLabel}>Preferred Times</div>
                        <div className={styles.infoValue}>{user.preferred_times.join(', ')}</div>
                    </div>

                    <div className={styles.infoCard}>
                        <div className={styles.infoLabel}>Preferred Areas</div>
                        <div className={styles.infoValue}>{user.preferred_areas.join(', ')}</div>
                    </div>
                </div>

                {user.bio && (
                    <div className={styles.bioSection}>
                        <h3>Bio</h3>
                        <p>{user.bio}</p>
                    </div>
                )}

                <div className={styles.actions}>
                    <button className="btn btn-primary w-full" onClick={() => setShowEditModal(true)}>
                        Edit Profile
                    </button>
                    <button className="btn btn-secondary w-full" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            {showEditModal && (
                <div className={styles.modal} onClick={() => setShowEditModal(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Edit Profile</h2>
                            <button className={styles.closeButton} onClick={() => setShowEditModal(false)}>×</button>
                        </div>

                        <form className={styles.form}>
                            <input className="input" defaultValue={user.name} placeholder="Name" />
                            <input type="number" className="input" defaultValue={user.age} placeholder="Age" />
                            <select className="input" defaultValue={user.skill_level}>
                                <option value="1">Skill Level: 1 - Beginner</option>
                                <option value="2">Skill Level: 2 - Novice</option>
                                <option value="3">Skill Level: 3 - Intermediate</option>
                                <option value="4">Skill Level: 4 - Advanced</option>
                                <option value="5">Skill Level: 5 - Expert</option>
                            </select>
                            <textarea className="input" defaultValue={user.bio} placeholder="Bio" rows={4} />

                            <div className="flex gap-md">
                                <button type="button" className="btn btn-secondary flex-1" onClick={() => setShowEditModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary flex-1">
                                    Save Changes
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
                <button className={styles.navItem} onClick={() => router.push('/records')}>
                    <span>📊</span>
                    <span>Records</span>
                </button>
                <button className={styles.navItem} onClick={() => router.push('/leaderboard')}>
                    <span>🏆</span>
                    <span>Leaderboard</span>
                </button>
                <button className={styles.navItem + ' ' + styles.active}>
                    <span>👤</span>
                    <span>Profile</span>
                </button>
            </nav>
        </div>
    )
}
