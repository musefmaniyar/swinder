'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import styles from './chat.module.css'

export default function ChatPage() {
    const router = useRouter()
    const params = useParams()
    const matchId = params.matchId

    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const [error, setError] = useState(null)
    const [matchUser, setMatchUser] = useState(null)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        if (matchId) {
            fetchMessages()
            // Poll for new messages every 3 seconds
            const interval = setInterval(fetchMessages, 3000)
            return () => clearInterval(interval)
        }
    }, [matchId])

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const fetchMessages = async () => {
        try {
            const res = await fetch(`/api/chat/${matchId}/messages`)

            if (!res.ok) {
                throw new Error('Failed to load messages')
            }

            const data = await res.json()
            setMessages(data.messages || [])

            // Set match user from first message if available
            if (data.messages && data.messages.length > 0) {
                const firstMsg = data.messages[0]
                if (!matchUser) {
                    setMatchUser({
                        name: firstMsg.sender_name || 'Match',
                        photo: firstMsg.sender_photo || 'https://i.pravatar.cc/300'
                    })
                }
            }
        } catch (err) {
            console.error('Fetch messages error:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSend = async (e) => {
        e.preventDefault()

        if (!newMessage.trim() || sending) return

        setSending(true)
        const messageText = newMessage
        setNewMessage('') // Clear input immediately

        try {
            const res = await fetch(`/api/chat/${matchId}/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: messageText })
            })

            if (!res.ok) {
                throw new Error('Failed to send message')
            }

            // Refresh messages to show the new one
            await fetchMessages()
        } catch (err) {
            console.error('Send message error:', err)
            alert('Failed to send message')
            setNewMessage(messageText) // Restore message on error
        } finally {
            setSending(false)
        }
    }

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <button className={styles.backButton} onClick={() => router.push('/matches')}>
                        ← Back
                    </button>
                    <h1>Chat</h1>
                </div>
                <div className="flex items-center justify-center" style={{ flex: 1 }}>
                    <div className="spinner"></div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={() => router.push('/matches')}>
                    ← Back
                </button>
                {matchUser && (
                    <div className={styles.matchInfo}>
                        <img src={matchUser.photo} alt={matchUser.name} className={styles.avatar} />
                        <h1>{matchUser.name}</h1>
                    </div>
                )}
            </div>

            <div className={styles.messageList}>
                {error ? (
                    <div className={styles.errorState}>
                        <p>😕 {error}</p>
                        <button className="btn btn-primary" onClick={fetchMessages}>
                            Try Again
                        </button>
                    </div>
                ) : messages.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>👋 Say hello to start the conversation!</p>
                    </div>
                ) : (
                    messages.map((msg, idx) => (
                        <div
                            key={msg.id || idx}
                            className={`${styles.message} ${msg.is_sender ? styles.sent : styles.received}`}
                        >
                            <div className={styles.messageContent}>
                                {msg.content}
                            </div>
                            <div className={styles.messageTime}>
                                {new Date(msg.created_at).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className={styles.inputContainer}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    disabled={sending}
                />
                <button
                    type="submit"
                    className={styles.sendButton}
                    disabled={!newMessage.trim() || sending}
                >
                    {sending ? '...' : '→'}
                </button>
            </form>
        </div>
    )
}
