import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Fab,
    Paper,
    Box,
    TextField,
    Button,
    Typography,
    CircularProgress,
    useTheme,
} from '@mui/material'
import { Close as CloseIcon, Comment as CommentIcon } from '@mui/icons-material'
import { createConversation, sendMessage as sendChatMessage } from '../api/chatApi'
import { getAvailableProducts } from '../api/productApi'

// Gère l'identifiant utilisateur pour le chatbot, en utilisant localStorage pour le stocker de manière persistante. Si un utilisateur est connecté, utilise son ID,
//  sinon génère un ID aléatoire et le stocke pour les futures sessions.
function getOrCreateUserId() {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    if (user?.id) {
        return user.id.toString()
    }
    let userId = localStorage.getItem('chat_user_id')
    if (!userId) {
        userId = 'user_' + Math.random().toString(36).slice(2, 11)
        localStorage.setItem('chat_user_id', userId)
    }
    return userId
}

// Rend le message du bot en traitant les parties entourées de ** comme des produits cliquables. 
// Si le texte correspond au nom d'un produit disponible, il devient un lien qui redirige vers la page du produit.
function renderBotMessage(text, products, navigate) {
    const parts = text.split(/\*\*(.+?)\*\*/g)
    return parts.map((part, i) => {
        if (i % 2 === 1) {
            const match = products.find(p => p.nom?.toLowerCase() === part.toLowerCase())
            if (match) {
                return (
                    <span
                        key={i}
                        onClick={() => navigate(`/products/${match.idProduct}`)}
                        style={{ fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer', color: 'inherit' }}
                    >
                        {part}
                    </span>
                )
            }
            return <strong key={i}>{part}</strong>
        }
        return part
    })
}

// Composant principal du chatbot, qui gère l'état de la conversation, l'affichage des messages, et les interactions utilisateur.
export default function Chatbot({ title = "Assistant", placeholder = "Posez une question...", collapsedInitially = true }) {
    const theme = useTheme()
    const navigate = useNavigate()
    const [open, setOpen] = useState(!collapsedInitially)
    const [messages, setMessages] = useState([
        { id: 1, from: 'bot', text: `Bonjour ! Je suis l'assistant Draconnique. Je peux te recommander des produits adapté au profil de ton dragon.` }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [conversationId, setConversationId] = useState(null)
    const [products, setProducts] = useState([])
    const messagesEndRef = useRef(null)

    useEffect(() => {
        if (open && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages, open])

    useEffect(() => {
        getAvailableProducts().then(setProducts).catch(() => { })
    }, [])

    useEffect(() => {
        if (open && !conversationId) {
            const userId = getOrCreateUserId()
            createConversation(userId)
                .then(conv => setConversationId(conv.id))
                .catch(() => { })
        }
    }, [open, conversationId])

    function toggleOpen() {
        setOpen(v => !v)
    }

    async function sendMessage(e) {
        e && e.preventDefault()
        const txt = input.trim()
        if (!txt || loading || !conversationId) return

        setMessages(m => [...m, { id: Date.now(), from: 'user', text: txt }])
        setInput('')
        setLoading(true)

        try {
            const conv = await sendChatMessage(conversationId, txt)
            const lastMsg = conv.messages[conv.messages.length - 1]
            setMessages(m => [...m, { id: Date.now() + 1, from: 'bot', text: lastMsg.content }])
        } catch {
            setMessages(m => [...m, { id: Date.now() + 1, from: 'bot', text: "Désolé, une erreur s'est produite. Veuillez réessayer." }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* FAB Bouton flottant (quand fermé) */}
            {!open && (
                <Fab
                    onClick={toggleOpen}
                    aria-label="Ouvrir l'assistant DragonShop"
                    sx={{
                        position: 'fixed',
                        right: 24,
                        bottom: 24,
                        zIndex: 40,
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.primary.main,
                        fontSize: '1.5rem',
                        '&:hover': {
                            backgroundColor: theme.palette.secondary.light,
                            transform: 'scale(1.1)',
                        },
                        transition: 'transform 0.2s ease',
                    }}
                >
                    🐉
                </Fab>
            )}

            {/* Fenêtre chat (quand ouverte) */}
            {open && (
                <Paper
                    elevation={8}
                    sx={{
                        position: 'fixed',
                        right: 24,
                        bottom: 24,
                        width: '90%',
                        maxWidth: '380px',
                        height: '550px',
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 50,
                        borderRadius: 3,
                        overflow: 'hidden',
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: '#fff',
                            padding: '16px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {title}
                        </Typography>
                        <Button
                            onClick={toggleOpen}
                            aria-label="Fermer"
                            sx={{
                                minWidth: 'auto',
                                color: theme.palette.secondary.main,
                                fontSize: '1.5rem',
                                '&:hover': {
                                    backgroundColor: 'rgba(207, 159, 114, 0.2)',
                                },
                            }}
                        >
                            ✕
                        </Button>
                    </Box>

                    {/* Messages zone */}
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            backgroundColor: '#fafafa',
                        }}
                        aria-live="polite"
                    >
                        {messages.map(m => (
                            <Box
                                key={m.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: m.from === 'bot' ? 'flex-start' : 'flex-end',
                                }}
                            >
                                <Box
                                    sx={{
                                        maxWidth: '75%',
                                        padding: '10px 12px',
                                        borderRadius: '10px',
                                        backgroundColor:
                                            m.from === 'bot' ? '#e0e0e0' : theme.palette.primary.main,
                                        color: m.from === 'bot' ? theme.palette.primary.main : '#fff',
                                        fontSize: '0.875rem',
                                        lineHeight: 1.4,
                                    }}
                                >
                                    <Typography variant="body2">
                                        {m.from === 'bot'
                                            ? renderBotMessage(m.text, products, navigate)
                                            : m.text}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                        {loading && (
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <CircularProgress size={20} sx={{ color: theme.palette.primary.main }} />
                                <Typography variant="caption" sx={{ color: theme.palette.primary.main }}>
                                    Réflexion en cours...
                                </Typography>
                            </Box>
                        )}
                        <div ref={messagesEndRef} />
                    </Box>

                    {/* Input form */}
                    <Box
                        component="form"
                        onSubmit={sendMessage}
                        sx={{
                            padding: '12px',
                            borderTop: `1px solid ${theme.palette.divider}`,
                            display: 'flex',
                            gap: 1,
                        }}
                    >
                        <TextField
                            fullWidth
                            size="small"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder={placeholder}
                            aria-label="Message"
                            disabled={loading || !conversationId}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: theme.palette.secondary.main,
                                    },
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            disabled={loading || !conversationId}
                            variant="contained"
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                            }}
                        >
                            ▶
                        </Button>
                    </Box>
                </Paper>
            )}
        </>
    )
}
