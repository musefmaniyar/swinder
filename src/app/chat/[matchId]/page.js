'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useParams } from 'next/navigation'
import styles from './chat.module.css'

const MOCK_MESSAGES = [
    { id: '1', sender_id: 'other', sender_name: 'Ahmed', content: 'Hey! Want to play Padel this weekend?', created_at: new Date(Date.now() - 3600000).toISOString() },
    { id: '2', sender_id: 'me', sender_name: 'Me', content: 'Sure! What time works for you?', created_at: new Date(Date.now() - 3000000).toISOString() },
    { id: '3', sender_id: 'other', sender_name: 'Ahmed', content: 'How about Saturday morning at Dubai Marina?', created_at: new Date(Date.now() - 1800000).toISOString() },
]

function ChatContent() {
    const router = useRouter()
    const params = useParams()
    const [messages, setMessages] = useState(MOCK_MESSAGES)
    const [newMessage, setNewMessage] = useState('')
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = () => {
        if (!newMessage.trim()) return

        const message = {
            id: Date.now().toString(),
            sender_id: 'me',
            sender_name: 'Me',
            content: newMessage,
            created_at: new Date().toISOString()
        }

        setMessages([...messages, message])
        setNewMessage('')
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={() => router.push('/matches')}>
                    ←
                </button>
                <div className={styles.headerInfo}>
                    <h2>Ahmed</h2>
                    <p className="text-sm text-muted">Skill Level: 4</p>
                </div>
            </div>

            <div className={styles.messages}>
                {messages.map(msg => (
                    <div
                        key={msg.id}
                        className={`${styles.message} ${msg.sender_id === 'me' ? styles.sent : styles.received}`}
                    >
                        <div className={styles.messageBubble}>
                            <p>{msg.content}</p>
                            <span className={styles.messageTime}>
                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className={styles.inputContainer}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button className={styles.sendButton} onClick={handleSend}>
                    <span>→</span>
                </button>
            </div>
        </div>
    )
}

export default function ChatPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center" style={{ minHeight: '100vh' }}><div className="spinner"></div></div>}>
            <ChatContent />
        </Suspense>
    )
}
