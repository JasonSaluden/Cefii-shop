import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Container,
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Alert,
    CircularProgress,
    Divider,
    Chip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    useTheme,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useAuth } from '../context/AuthContext'
import { getUserById, updateUser } from '../api/userApi'
import { getUserOrders } from '../api/orderApi'

export default function Profile() {
    const theme = useTheme()
    const navigate = useNavigate()
    const { user, login, logout } = useAuth()

    const [profile, setProfile] = useState(null)
    const [orders, setOrders] = useState([])
    const [loadingProfile, setLoadingProfile] = useState(true)
    const [loadingOrders, setLoadingOrders] = useState(true)

    const [formData, setFormData] = useState({ mail: '', password: '' })
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [updateError, setUpdateError] = useState('')
    const [updating, setUpdating] = useState(false)

    useEffect(() => {
        if (!user) {
            navigate('/connection')
            return
        }

        getUserById(user.id)
            .then((data) => {
                setProfile(data)
                setFormData({ mail: data.mail, password: '' })
            })
            .finally(() => setLoadingProfile(false))

        getUserOrders(user.id)
            .then(setOrders)
            .finally(() => setLoadingOrders(false))
    }, [user, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        setUpdateError('')
        setUpdateSuccess(false)
        setUpdating(true)
        try {
            const updated = await updateUser(user.id, formData)
            login({ ...user, mail: updated.mail })
            setUpdateSuccess(true)
            setFormData(prev => ({ ...prev, password: '' }))
        } catch {
            setUpdateError('Erreur lors de la mise à jour.')
        } finally {
            setUpdating(false)
        }
    }

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const statusColor = (status) => {
        switch (status) {
            case 'EN_ATTENTE': return 'warning'
            case 'PAYE': return 'info'
            case 'EXPEDIE': return 'primary'
            case 'LIVRE': return 'success'
            case 'ANNULE': return 'error'
            default: return 'default'
        }
    }

    const statusLabel = (status) => {
        switch (status) {
            case 'EN_ATTENTE': return 'En attente'
            case 'PAYE': return 'Payée'
            case 'EXPEDIE': return 'Expédiée'
            case 'LIVRE': return 'Livrée'
            case 'ANNULE': return 'Annulée'
            default: return status
        }
    }

    if (loadingProfile) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 10 }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box sx={{ minHeight: '100vh', py: 6, backgroundColor: '#f5f5f5' }}>
            <Container maxWidth="md">
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: theme.palette.primary.main }}>
                    Mon profil
                </Typography>

                {/* Infos du compte */}
                <Paper elevation={2} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: theme.palette.primary.main }}>
                        Informations du compte
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', mb: 3 }}>
                        <Box>
                            <Typography variant="caption" color="textSecondary">Email</Typography>
                            <Typography fontWeight={600}>{profile?.mail}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" color="textSecondary">Rôle</Typography>
                            <Typography fontWeight={600} sx={{ textTransform: 'capitalize' }}>{profile?.role?.toLowerCase()}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" color="textSecondary">Membre depuis</Typography>
                            <Typography fontWeight={600}>
                                {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('fr-FR') : '—'}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                        Modifier mes informations
                    </Typography>

                    {updateSuccess && <Alert severity="success" sx={{ mb: 2 }}>Informations mises à jour.</Alert>}
                    {updateError && <Alert severity="error" sx={{ mb: 2 }}>{updateError}</Alert>}

                    <Box component="form" onSubmit={handleUpdate} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Email"
                            name="mail"
                            type="email"
                            value={formData.mail}
                            onChange={handleChange}
                            required
                            size="small"
                        />
                        <TextField
                            label="Nouveau mot de passe"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            size="small"
                            placeholder="Laisser vide pour ne pas changer"
                        />
                        <Box>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={updating}
                                sx={{ backgroundColor: theme.palette.primary.main }}
                            >
                                {updating ? <CircularProgress size={20} /> : 'Enregistrer'}
                            </Button>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleLogout}
                    >
                        Se déconnecter
                    </Button>
                </Paper>

                {/* Historique des commandes */}
                <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                        Mes commandes
                    </Typography>

                    {loadingOrders ? (
                        <CircularProgress size={24} />
                    ) : orders.length === 0 ? (
                        <Typography color="textSecondary">Aucune commande pour le moment.</Typography>
                    ) : (
                        orders.map((order) => (
                            <Accordion key={order.id} sx={{ mb: 1, borderRadius: '8px !important', '&:before': { display: 'none' } }} elevation={1}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', flexWrap: 'wrap' }}>
                                        <Typography fontWeight={600}>Commande #{order.id}</Typography>
                                        <Chip
                                            label={statusLabel(order.status)}
                                            color={statusColor(order.status)}
                                            size="small"
                                        />
                                        <Typography variant="body2" color="textSecondary" sx={{ ml: 'auto' }}>
                                            {new Date(order.createdAt).toLocaleDateString('fr-FR')} — {parseFloat(order.total).toFixed(2)} €
                                        </Typography>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {order.orderLines?.map((line, i) => (
                                        <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
                                            <Typography variant="body2">
                                                {line.productNom || `Produit #${line.productId}`} × {line.quantite}
                                            </Typography>
                                            <Typography variant="body2" fontWeight={600}>
                                                {(parseFloat(line.prixUnitaire) * line.quantite).toFixed(2)} €
                                            </Typography>
                                        </Box>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        ))
                    )}
                </Paper>
            </Container>
        </Box>
    )
}
