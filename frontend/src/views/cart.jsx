import React from 'react'
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    IconButton,
    Alert,
    CircularProgress,
    useTheme,
    useMediaQuery,
} from '@mui/material'
import { Delete as DeleteIcon, Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { createOrder } from '../api/orderApi'

function Cart() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const navigate = useNavigate()
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart()
    const { user } = useAuth()
    const [orderSuccess, setOrderSuccess] = React.useState(false)
    const [orderError, setOrderError] = React.useState('')
    const [ordering, setOrdering] = React.useState(false)

    const handleCheckout = async () => {
        if (!user) {
            navigate('/connection')
            return
        }
        setOrderError('')
        setOrdering(true)
        try {
            const orderLines = cartItems.map(item => ({
                productId: item.idProduct,
                quantite: item.quantity,
                prixUnitaire: item.prix,
            }))
            await createOrder(user.id, { orderLines })
            clearCart()
            setOrderSuccess(true)
        } catch {
            setOrderError('Une erreur est survenue lors de la commande.')
        } finally {
            setOrdering(false)
        }
    }

    const subtotal = cartItems.reduce((acc, item) => acc + item.prix * item.quantity, 0)
    const shipping = subtotal > 50 ? 0 : 9.99
    const tax = subtotal * 0.2
    const total = subtotal + shipping + tax

    return (
        <Box sx={{ minHeight: '100vh', py: 6, backgroundColor: '#f5f5f5' }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h3"
                    sx={{ mb: 4, fontWeight: 700, color: theme.palette.primary.main, textAlign: 'center' }}
                >
                    Votre Panier
                </Typography>

                {orderSuccess ? (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                        <Alert severity="success" sx={{ mb: 3, justifyContent: 'center' }}>
                            Commande passée avec succès ! Merci pour votre achat.
                        </Alert>
                        <Button variant="contained" sx={{ backgroundColor: theme.palette.primary.main }} onClick={() => navigate('/products')}>
                            Continuer le shopping
                        </Button>
                        <Button variant="outlined" sx={{ ml: 2, borderColor: theme.palette.primary.main, color: theme.palette.primary.main }} onClick={() => navigate('/profile')}>
                            Voir mes commandes
                        </Button>
                    </Box>
                ) : cartItems.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                        <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
                            Votre panier est vide
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: theme.palette.primary.main }}
                            onClick={() => navigate('/products')}
                        >
                            Continuer le shopping
                        </Button>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {/* Tableau produits */}
                        <Grid item xs={12} md={8}>
                            <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                                            <TableCell sx={{ color: 'white', fontWeight: 700 }}>Produit</TableCell>
                                            {!isMobile && <TableCell align="center" sx={{ color: 'white', fontWeight: 700 }}>Prix</TableCell>}
                                            <TableCell align="center" sx={{ color: 'white', fontWeight: 700 }}>Quantité</TableCell>
                                            <TableCell align="center" sx={{ color: 'white', fontWeight: 700 }}>Total</TableCell>
                                            <TableCell align="center" sx={{ color: 'white', fontWeight: 700 }}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cartItems.map(item => (
                                            <TableRow key={item.idProduct} sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <Box
                                                            component="img"
                                                            src={item.image || 'https://placehold.co/60x60?text=?'}
                                                            alt={item.nom}
                                                            sx={{ width: 60, height: 60, borderRadius: 1, objectFit: 'cover', cursor: 'pointer' }}
                                                            onClick={() => navigate(`/products/${item.idProduct}`)}
                                                        />
                                                        <Box>
                                                            <Typography
                                                                sx={{ fontWeight: 600, cursor: 'pointer', '&:hover': { color: theme.palette.secondary.main } }}
                                                                onClick={() => navigate(`/products/${item.idProduct}`)}
                                                            >
                                                                {item.nom}
                                                            </Typography>
                                                            <Typography variant="caption" color="textSecondary">
                                                                {item.categoryNom}
                                                            </Typography>
                                                            {isMobile && (
                                                                <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.secondary.main }}>
                                                                    {item.prix.toFixed(2)} €
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                {!isMobile && (
                                                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                                                        {item.prix.toFixed(2)} €
                                                    </TableCell>
                                                )}
                                                <TableCell align="center">
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => updateQuantity(item.idProduct, item.quantity - 1)}
                                                            sx={{ color: theme.palette.primary.main }}
                                                        >
                                                            <RemoveIcon fontSize="small" />
                                                        </IconButton>
                                                        <Typography sx={{ fontWeight: 600, minWidth: 24, textAlign: 'center' }}>
                                                            {item.quantity}
                                                        </Typography>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => updateQuantity(item.idProduct, item.quantity + 1)}
                                                            disabled={item.quantity >= item.stock}
                                                            sx={{ color: theme.palette.primary.main }}
                                                        >
                                                            <AddIcon fontSize="small" />
                                                        </IconButton>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 600 }}>
                                                    {(item.prix * item.quantity).toFixed(2)} €
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => removeFromCart(item.idProduct)}
                                                        sx={{ color: 'error.main' }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                        {/* Résumé commande */}
                        <Grid item xs={12} md={4}>
                            <Card sx={{ borderRadius: 3, position: 'sticky', top: 100 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                        Résumé de la commande
                                    </Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography>Sous-total :</Typography>
                                        <Typography sx={{ fontWeight: 600 }}>{subtotal.toFixed(2)} €</Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography>Livraison :</Typography>
                                        <Typography sx={{ fontWeight: 600 }}>
                                            {shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} €`}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, pb: 2, borderBottom: `2px solid ${theme.palette.divider}` }}>
                                        <Typography>Taxes (20%) :</Typography>
                                        <Typography sx={{ fontWeight: 600 }}>{tax.toFixed(2)} €</Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>Total :</Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
                                            {total.toFixed(2)} €
                                        </Typography>
                                    </Box>

                                    {orderError && <Alert severity="error" sx={{ mb: 2 }}>{orderError}</Alert>}
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={handleCheckout}
                                        disabled={ordering}
                                        sx={{
                                            backgroundColor: theme.palette.primary.main,
                                            mb: 2,
                                            py: 1.5,
                                            fontWeight: 600,
                                            '&:hover': { backgroundColor: theme.palette.primary.dark },
                                        }}
                                    >
                                        {ordering ? <CircularProgress size={22} sx={{ color: 'white' }} /> : user ? 'Commander' : 'Se connecter pour commander'}
                                    </Button>

                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() => navigate('/products')}
                                        sx={{
                                            borderColor: theme.palette.primary.main,
                                            color: theme.palette.primary.main,
                                            py: 1.5,
                                            fontWeight: 600,
                                        }}
                                    >
                                        Continuer le shopping
                                    </Button>

                                    {shipping > 0 && (
                                        <Box sx={{ mt: 3, p: 2, backgroundColor: '#f0f7ff', borderRadius: 2, borderLeft: `4px solid ${theme.palette.secondary.main}` }}>
                                            <Typography variant="caption" sx={{ color: theme.palette.secondary.main, fontWeight: 600 }}>
                                                Livraison gratuite à partir de 50 €
                                            </Typography>
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Box>
    )
}

export default Cart
