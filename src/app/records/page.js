'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './records.module.css'
import BottomNav from '@/components/BottomNav'

export default function RecordsPage() {
    const router = useRouter()
    const [stats, setStats] = useState({ wins: 0, losses: 0, total_matches: 0, win_rate: 0 })
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showRecordModal, setShowRecordModal] = useState(false)
    const [recordForm, setRecordForm] = useState({
        opponent_id: '',
        result_type: 'win',
        score: ''
    })
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        fetchRecords()
    }, [])

    const fetchRecords = async () => {
        setLoading(true)
        setError(null)

        try {
            const res = await fetch('/api/records/list')

            if (!res.ok) {
                throw new Error('Failed to load records')
            }

            const data = await res.json()
            setStats(data.stats || { wins: 0, losses: 0, total_matches: 0, win_rate: 0 })
            setResults(data.results || [])
        } catch (err) {
            console.error('Fetch records error:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleRecordMatch = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const res = await fetch('/api/records/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recordForm)
            })

            if (!res.ok) {
                throw new Error('Failed to record match')
            }

            // Refresh records
            await fetchRecords()
            setShowRecordModal(false)
            setRecordForm({ opponent_id: '', result_type: 'win', score: '' })
        } catch (err) {
            console.error('Record match error:', err)
            alert(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>📊 Match Records</h1>
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
                <h1>📊 Match Records</h1>
                <button className="btn btn-primary btn-sm" onClick={() => setShowRecordModal(true)}>
                    + Record Match
                </button>
            </div>

            {error ? (
                <div className={styles.errorState}>
                    <p>😕 {error}</p>
                    <button className="btn btn-primary" onClick={fetchRecords}>
                        Try Again
                    </button>
                </div>
            ) : (
                <>
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>{stats.wins || 0}</div>
                            <div className={styles.statLabel}>Wins</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>{stats.losses || 0}</div>
                            <div className={styles.statLabel}>Losses</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>{stats.total_matches || 0}</div>
                            <div className={styles.statLabel}>Total</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>{stats.win_rate || 0}%</div>
                            <div className={styles.statLabel}>Win Rate</div>
                        </div>
                    </div>

                    <div className={styles.resultsList}>
                        <h2>Match History</h2>

                        {results.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>No matches recorded yet</p>
                                <button className="btn btn-primary" onClick={() => setShowRecordModal(true)}>
                                    Record Your First Match
                                </button>
                            </div>
                        ) : (
                            results.map(result => (
                                <div key={result.id} className={styles.resultCard}>
                                    <div className={styles.resultBadge + ' ' + (result.result_type === 'win' ? styles.win : styles.loss)}>
                                        {result.result_type === 'win' ? '✓ Win' : '✗ Loss'}
                                    </div>

                                    <div className={styles.resultInfo}>
                                        <h3>vs {result.opponent_name}</h3>
                                        <p className="text-sm text-muted">{result.score}</p>
                                    </div>

                                    <div className={styles.resultDate}>
                                        {new Date(result.created_at).toLocaleDateString()}
                                    </div>

                                    {result.verification_status && (
                                        <div className={styles.verificationBadge + ' ' + styles[result.verification_status]}>
                                            {result.verification_status}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}

            {showRecordModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Record Match Result</h2>

                        <form onSubmit={handleRecordMatch}>
                            <select
                                className="input"
                                value={recordForm.result_type}
                                onChange={(e) => setRecordForm({ ...recordForm, result_type: e.target.value })}
                                required
                            >
                                <option value="win">Win</option>
                                <option value="loss">Loss</option>
                            </select>

                            <input
                                type="text"
                                className="input"
                                placeholder="Score (e.g., 6-4, 6-3)"
                                value={recordForm.score}
                                onChange={(e) => setRecordForm({ ...recordForm, score: e.target.value })}
                                required
                            />

                            <div className="flex gap-md">
                                <button
                                    type="button"
                                    className="btn btn-secondary flex-1"
                                    onClick={() => setShowRecordModal(false)}
                                    disabled={submitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary flex-1"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Recording...' : 'Record Match'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <BottomNav />
        </div>
    )
}
