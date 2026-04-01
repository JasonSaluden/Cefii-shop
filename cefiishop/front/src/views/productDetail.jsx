import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    Container,
    Grid,
    Typography,
    Box,
    Button,
    Chip,
    CircularProgress,
    Paper,
    Divider,
} from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { getProductById, getRecommendations } from '../api/productApi'
import { getProductImage } from '../assets/productImages'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const theme = useTheme()
    const [product, setProduct] = useState(null)
    const [recommendations, setRecommendations] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([getProductById(id), getRecommendations(id)])
            .then(([prod, recs]) => {
                setProduct(prod)
                setRecommendations(recs.slice(0, 4))
            })
            .finally(() => setLoading(false))
    }, [id])

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        )
    }

    if (!product) {
        return (
            <Container sx={{ mt: 6, textAlign: 'center' }}>
                <Typography variant="h5">Produit introuvable.</Typography>
                <Button onClick={() => navigate('/products')} sx={{ mt: 2 }}>
                    Retour au catalogue
                </Button>
            </Container>
        )
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/products')}
                sx={{ mb: 3, color: theme.palette.primary.main }}
            >
                Retour au catalogue
            </Button>

            <Paper sx={{ p: 4, borderRadius: 2 }}>
                <Grid container spacing={4}>
                    {/* Image */}
                    <Grid item xs={12} md={5}>
                        <Box
                            component="img"
                            src={getProductImage(product) || 'https://placehold.co/500x400?text=Produit'}
                            alt={product.nom}
                            sx={{
                                width: '100%',
                                borderRadius: 2,
                                objectFit: 'cover',
                                maxHeight: 400,
                            }}
                        />
                    </Grid>

                    {/* Infos */}
                    <Grid item xs={12} md={7}>
                        <Chip
                            label={product.categoryNom}
                            size="small"
                            sx={{
                                mb: 2,
                                backgroundColor: theme.palette.secondary.main,
                                color: 'white',
                                fontWeight: 600,
                            }}
                        />

                        <Typography variant="h4" fontWeight={700} color={theme.palette.primary.main} gutterBottom>
                            {product.nom}
                        </Typography>

                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            {product.description}
                        </Typography>

                        <Divider sx={{ mb: 3 }} />

                        <Typography variant="h4" fontWeight={700} color={theme.palette.secondary.main} sx={{ mb: 1 }}>
                            {product.prix.toFixed(2)}€
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{ mb: 3, color: product.stock > 0 ? 'success.main' : 'error.main' }}
                        >
                            {product.stock > 0 ? `En stock (${product.stock} disponibles)` : 'Rupture de stock'}
                        </Typography>

                        <Button
                            variant="contained"
                            size="large"
                            disabled={product.stock === 0}
                            onClick={() => addToCart(product, getProductImage(product))}
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: 'white',
                                fontWeight: 600,
                                px: 4,
                                '&:hover': { backgroundColor: theme.palette.primary.dark },
                            }}
                        >
                            Ajouter au panier
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Recommandations */}
            {recommendations.length > 0 && (
                <Box sx={{ mt: 6 }}>
                    <Typography variant="h5" fontWeight={700} color={theme.palette.primary.main} sx={{ mb: 3 }}>
                        Produits similaires
                    </Typography>
                    <Grid container spacing={2}>
                        {recommendations.map((rec) => (
                            <Grid item xs={12} sm={6} md={3} key={rec.idProduct}>
                                <Paper
                                    onClick={() => navigate(`/products/${rec.idProduct}`)}
                                    sx={{
                                        cursor: 'pointer',
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: `0 8px 20px ${theme.palette.primary.main}20`,
                                        },
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={getProductImage(rec) || 'https://placehold.co/300x200?text=Produit'}
                                        alt={rec.nom}
                                        sx={{ width: '100%', height: 160, objectFit: 'cover' }}
                                    />
                                    <Box sx={{ p: 2 }}>
                                        <Typography variant="subtitle2" fontWeight={700} noWrap>
                                            {rec.nom}
                                        </Typography>
                                        <Typography variant="body2" color={theme.palette.secondary.main} fontWeight={600}>
                                            {rec.prix.toFixed(2)}€
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Container>
    )
}
