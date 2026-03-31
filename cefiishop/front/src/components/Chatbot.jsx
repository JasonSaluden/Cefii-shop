import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

export default function Chatbot({ title = "Assistant", placeholder = "Posez une question...", collapsedInitially = true }) {
    const [open, setOpen] = useState(!collapsedInitially);
    const [messages, setMessages] = useState([
        { id: 1, from: 'bot', text: `Bonjour ! Je peux aider à trouver des produits ou répondre aux questions.` }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (open && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, open]);

    function toggleOpen() {
        setOpen(v => !v);
    }

    function sendMessage(e) {
        e && e.preventDefault();
        const txt = input.trim();
        if (!txt) return;
        const userMsg = { id: Date.now(), from: 'user', text: txt };
        setMessages(m => [...m, userMsg]);
        setInput('');

        // Simulate reply (replace this with real API call)
        setTimeout(() => {
            const reply = { id: Date.now() + 1, from: 'bot', text: `Vous avez demandé : "${txt}" — voici une suggestion de produit similaire.` };
            setMessages(m => [...m, reply]);
        }, 700);
    }

    return (
        <>
            {/* Floating FAB when closed */}
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
                            <div ref={messagesEndRef} />
                        </div>

                        <form className="chatbot-form" onSubmit={sendMessage}>
                            <input
                                className="chatbot-input"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder={placeholder}
                                aria-label="Message"
                            />
                            <button className="chatbot-send" type="submit">Envoyer</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}
