'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './profile.module.css'

export default function ProfilePage() {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editForm, setEditForm] = useState({})
    const [updating, setUpdating] = useState(false)

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        setLoading(true)
        setError(null)

        try {
            const res = await fetch('/api/user/me')

            if (!res.ok) {
                throw new Error('Failed to load profile')
            }

            const data = await res.json()
            setUser(data.user)
            setEditForm(data.user || {})
        } catch (err) {
            console.error('Fetch user error:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        setUpdating(true)

        try {
            const res = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm)
            })

            if (!res.ok) {
                throw new Error('Failed to update profile')
            }

            // Refresh user data
            await fetchUser()
            setShowEditModal(false)
        } catch (err) {
            console.error('Update profile error:', err)
            alert(err.message)
        } finally {
            setUpdating(false)
        }
    }

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
            router.push('/login')
        } catch (err) {
            console.error('Logout error:', err)
            router.push('/login')
        }
    }

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>👤 Profile</h1>
                </div>
                <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
                    <div className="spinner"></div>
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

    if (error || !user) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>👤 Profile</h1>
                </div>
                <div className={styles.errorState}>
                    <p>😕 {error || 'Failed to load profile'}</p>
                    <button className="btn btn-primary" onClick={fetchUser}>
                        Try Again
                    </button>
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

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>👤 Profile</h1>
                <button className="btn btn-secondary btn-sm" onClick={() => setShowEditModal(true)}>
                    Edit Profile
                </button>
            </div>

            <div className={styles.profileCard}>
                <div className={styles.profilePhoto}>
                    <img src={user.photo_url} alt={user.name} />
                </div>

                <h2>{user.name}, {user.age}</h2>
                <p className="text-muted">{user.phone}</p>

                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Gender</span>
                        <span className={styles.infoValue}>{user.gender}</span>
                    </div>

                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Skill Level</span>
                        <span className={styles.infoValue}>{user.skill_level}/5</span>
                    </div>

                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Preferred Times</span>
                        <span className={styles.infoValue}>{user.preferred_times?.join(', ') || 'Not set'}</span>
                    </div>

                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Preferred Areas</span>
                        <span className={styles.infoValue}>{user.preferred_areas?.join(', ') || 'Not set'}</span>
                    </div>
                </div>

                {user.bio && (
                    <div className={styles.bio}>
                        <h3>About</h3>
                        <p>{user.bio}</p>
                    </div>
                )}

                <button className="btn btn-secondary w-full" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {showEditModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Edit Profile</h2>

                        <form onSubmit={handleUpdateProfile}>
                            <input
                                type="text"
                                className="input"
                                placeholder="Name"
                                value={editForm.name || ''}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                required
                            />

                            <input
                                type="number"
                                className="input"
                                placeholder="Age"
                                value={editForm.age || ''}
                                onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                                min="18"
                                max="99"
                            />

                            <textarea
                                className="input"
                                placeholder="Bio"
                                value={editForm.bio || ''}
                                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                                rows={4}
                                maxLength={200}
                            />

                            <div className="flex gap-md">
                                <button
                                    type="button"
                                    className="btn btn-secondary flex-1"
                                    onClick={() => setShowEditModal(false)}
                                    disabled={updating}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary flex-1"
                                    disabled={updating}
                                >
                                    {updating ? 'Saving...' : 'Save Changes'}
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
