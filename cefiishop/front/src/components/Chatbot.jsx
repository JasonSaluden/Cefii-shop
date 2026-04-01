import React, { useState, useRef, useEffect } from 'react';
import { createConversation, sendMessage as sendChatMessage } from '../api/chatApi';
import './Chatbot.css';

function getOrCreateUserId() {
    let userId = localStorage.getItem('chatbot_user_id');
    if (!userId) {
        userId = 'user_' + Math.random().toString(36).slice(2, 11);
        localStorage.setItem('chatbot_user_id', userId);
    }
    return userId;
}

export default function Chatbot({ title = "Assistant", placeholder = "Posez une question...", collapsedInitially = true }) {
    const [open, setOpen] = useState(!collapsedInitially);
    const [messages, setMessages] = useState([
        { id: 1, from: 'bot', text: `Bonjour ! Je peux aider à trouver des produits ou répondre aux questions.` }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [conversationId, setConversationId] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (open && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, open]);

    useEffect(() => {
        if (open && !conversationId) {
            const userId = getOrCreateUserId();
            createConversation(userId)
                .then(conv => setConversationId(conv.id))
                .catch(() => {});
        }
    }, [open, conversationId]);

    function toggleOpen() {
        setOpen(v => !v);
    }

    async function sendMessage(e) {
        e && e.preventDefault();
        const txt = input.trim();
        if (!txt || loading || !conversationId) return;

        setMessages(m => [...m, { id: Date.now(), from: 'user', text: txt }]);
        setInput('');
        setLoading(true);

        try {
            const conv = await sendChatMessage(conversationId, txt);
            const lastMsg = conv.messages[conv.messages.length - 1];
            setMessages(m => [...m, { id: Date.now() + 1, from: 'bot', text: lastMsg.content }]);
        } catch {
            setMessages(m => [...m, { id: Date.now() + 1, from: 'bot', text: "Une erreur s'est produite. Veuillez réessayer." }]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {!open && (
                <button
                    className="chatbot-fab"
                    onClick={toggleOpen}
                    aria-label="Ouvrir l'assistant"
                    title="Assistant"
                >
                    <span className="fab-icon">💬</span>
                    <span className="fab-label">{title}</span>
                </button>
            )}

            <div className={`chatbot ${open ? 'chatbot-open' : 'chatbot-closed'}`} aria-hidden={!open}>
                <div className="chatbot-header">
                    <div className="chatbot-title">{title}</div>
                    <button className="chatbot-toggle" onClick={toggleOpen} aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}>{open ? '✕' : '💬'}</button>
                </div>

                {open && (
                    <div className="chatbot-body">
                        <div className="chatbot-messages" aria-live="polite">
                            {messages.map(m => (
                                <div key={m.id} className={`chatbot-msg ${m.from === 'bot' ? 'bot' : 'user'}`}>
                                    <div className="chatbot-msg-text">{m.text}</div>
                                </div>
                            ))}
                            {loading && (
                                <div className="chatbot-msg bot">
                                    <div className="chatbot-msg-text chatbot-typing">...</div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form className="chatbot-form" onSubmit={sendMessage}>
                            <input
                                className="chatbot-input"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder={placeholder}
                                aria-label="Message"
                                disabled={loading || !conversationId}
                            />
                            <button className="chatbot-send" type="submit" disabled={loading || !conversationId}>Envoyer</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}
