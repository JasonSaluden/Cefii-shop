import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Container,
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Link,
    Alert,
    CircularProgress,
} from '@mui/material'
import { login } from '../api/authApi'

export default function Connection() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const userData = await login({ mail: formData.email, password: formData.password })
            localStorage.setItem('user', JSON.stringify(userData))
            navigate('/')
        } catch (err) {
            console.error(err)
            setError('Email ou mot de passe incorrect')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        width: '100%',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, rgba(11, 16, 32, 0.05), rgba(139, 30, 45, 0.05))',
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            mb: 1,
                            textAlign: 'center',
                            fontWeight: 700,
                            color: 'primary.main',
                        }}
                    >
                        Connexion
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}
                    >
                        Accédez à votre compte DragonShop
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            margin="normal"
                            placeholder="votre@email.com"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Mot de passe"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            margin="normal"
                            placeholder="••••••••"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                },
                            }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
                                borderRadius: '8px',
                                background: 'linear-gradient(135deg, #0B1020 0%, #1a2240 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #1a2240 0%, #0B1020 100%)',
                                },
                            }}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Se connecter'}
                        </Button>
                    </Box>

                    <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                        <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                            Pas encore inscrit ?{' '}
                            <Link
                                href="/register"
                                sx={{
                                    color: 'primary.main',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    '&:hover': { textDecoration: 'underline' },
                                }}
                            >
                                Créer un compte
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}
