'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './setup.module.css'

function SetupForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const phone = searchParams.get('phone')

    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        phone: phone || '',
        name: '',
        age: '',
        gender: 'Male',
        skill_level: 3,
        preferred_times: [],
        preferred_areas: [],
        bio: '',
        photo_url: ''
    })

    const times = ['Morning', 'Afternoon', 'Evening', 'Night']
    const areas = ['Dubai Marina', 'JBR', 'Business Bay', 'Downtown', 'Jumeirah', 'Sports City', 'Arabian Ranches']

    const avatarOptions = [
        'https://i.pravatar.cc/300?img=12',
        'https://i.pravatar.cc/300?img=33',
        'https://i.pravatar.cc/300?img=51',
        'https://i.pravatar.cc/300?img=61',
        'https://i.pravatar.cc/300?img=23',
        'https://i.pravatar.cc/300?img=45',
        'https://i.pravatar.cc/300?img=38',
        'https://i.pravatar.cc/300?img=44',
    ]

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const toggleArrayItem = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter(item => item !== value)
                : [...prev[field], value]
        }))
    }

    const handleSubmit = async () => {
        setLoading(true)

        try {
            console.log('Submitting profile setup...', formData)

            const res = await fetch('/api/user/setup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await res.json()
            console.log('Setup response:', data)

            if (!res.ok) {
                throw new Error(data.error || 'Failed to create profile')
            }

            // Profile created successfully, redirect to home
            console.log('Profile created! Redirecting to home...')
            window.location.href = '/home' // Force full page reload
        } catch (error) {
            console.error('Setup error:', error)
            alert(error.message || 'Failed to create profile. Please try again.')
            setLoading(false)
        }
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className={styles.step}>
                        <h2>Personal Info</h2>
                        <p className="text-muted">Tell us about yourself</p>

                        <input
                            type="text"
                            className="input"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            required
                        />

                        <input
                            type="number"
                            className="input"
                            placeholder="Age"
                            value={formData.age}
                            onChange={(e) => handleChange('age', e.target.value)}
                            min="18"
                            max="99"
                        />

                        <select
                            className="input"
                            value={formData.gender}
                            onChange={(e) => handleChange('gender', e.target.value)}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>

                        <button
                            className="btn btn-primary w-full"
                            onClick={() => setStep(2)}
                            disabled={!formData.name || !formData.age}
                        >
                            Continue →
                        </button>
                    </div>
                )

            case 2:
                return (
                    <div className={styles.step}>
                        <h2>Skill Level</h2>
                        <p className="text-muted">How good are you at Padel?</p>

                        <div className={styles.skillSelector}>
                            {[1, 2, 3, 4, 5].map(level => (
                                <button
                                    key={level}
                                    type="button"
                                    className={`${styles.skillButton} ${formData.skill_level === level ? styles.active : ''}`}
                                    onClick={() => handleChange('skill_level', level)}
                                >
                                    <div className={styles.skillNumber}>{level}</div>
                                    <div className={styles.skillLabel}>
                                        {level === 1 && 'Beginner'}
                                        {level === 2 && 'Novice'}
                                        {level === 3 && 'Intermediate'}
                                        {level === 4 && 'Advanced'}
                                        {level === 5 && 'Expert'}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-md">
                            <button className="btn btn-secondary" onClick={() => setStep(1)}>
                                ← Back
                            </button>
                            <button className="btn btn-primary flex-1" onClick={() => setStep(3)}>
                                Continue →
                            </button>
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div className={styles.step}>
                        <h2>Availability</h2>
                        <p className="text-muted">When do you prefer to play?</p>

                        <div className={styles.chipGrid}>
                            {times.map(time => (
                                <button
                                    key={time}
                                    type="button"
                                    className={`${styles.chip} ${formData.preferred_times.includes(time) ? styles.active : ''}`}
                                    onClick={() => toggleArrayItem('preferred_times', time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-md">
                            <button className="btn btn-secondary" onClick={() => setStep(2)}>
                                ← Back
                            </button>
                            <button
                                className="btn btn-primary flex-1"
                                onClick={() => setStep(4)}
                                disabled={formData.preferred_times.length === 0}
                            >
                                Continue →
                            </button>
                        </div>
                    </div>
                )

            case 4:
                return (
                    <div className={styles.step}>
                        <h2>Preferred Areas</h2>
                        <p className="text-muted">Where do you like to play?</p>

                        <div className={styles.chipGrid}>
                            {areas.map(area => (
                                <button
                                    key={area}
                                    type="button"
                                    className={`${styles.chip} ${formData.preferred_areas.includes(area) ? styles.active : ''}`}
                                    onClick={() => toggleArrayItem('preferred_areas', area)}
                                >
                                    {area}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-md">
                            <button className="btn btn-secondary" onClick={() => setStep(3)}>
                                ← Back
                            </button>
                            <button
                                className="btn btn-primary flex-1"
                                onClick={() => setStep(5)}
                                disabled={formData.preferred_areas.length === 0}
                            >
                                Continue →
                            </button>
                        </div>
                    </div>
                )

            case 5:
                return (
                    <div className={styles.step}>
                        <h2>Choose Avatar</h2>
                        <p className="text-muted">Pick your profile photo</p>

                        <div className={styles.avatarGrid}>
                            {avatarOptions.map((url, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    className={`${styles.avatar} ${formData.photo_url === url ? styles.active : ''}`}
                                    onClick={() => handleChange('photo_url', url)}
                                >
                                    <img src={url} alt={`Avatar ${idx + 1}`} />
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-md">
                            <button className="btn btn-secondary" onClick={() => setStep(4)}>
                                ← Back
                            </button>
                            <button
                                className="btn btn-primary flex-1"
                                onClick={() => setStep(6)}
                                disabled={!formData.photo_url}
                            >
                                Continue →
                            </button>
                        </div>
                    </div>
                )

            case 6:
                return (
                    <div className={styles.step}>
                        <h2>Add Bio (Optional)</h2>
                        <p className="text-muted">Tell others about yourself</p>

                        <textarea
                            className="input"
                            placeholder="I love playing Padel and looking for regular partners..."
                            value={formData.bio}
                            onChange={(e) => handleChange('bio', e.target.value)}
                            rows={4}
                            maxLength={200}
                        />
                        <p className="text-sm text-muted">{formData.bio.length}/200 characters</p>

                        <div className="flex gap-md">
                            <button className="btn btn-secondary" onClick={() => setStep(5)}>
                                ← Back
                            </button>
                            <button
                                className="btn btn-primary flex-1"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? 'Creating Profile...' : 'Complete Setup →'}
                            </button>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.progress}>
                    <div className={styles.progressBar} style={{ width: `${(step / 6) * 100}%` }} />
                </div>

                <div className={styles.stepIndicator}>
                    Step {step} of 6
                </div>

                {renderStep()}
            </div>
        </div>
    )
}

export default function SetupPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center" style={{ minHeight: '100vh' }}>
                <div className="spinner"></div>
            </div>
        }>
            <SetupForm />
        </Suspense>
    )
}
