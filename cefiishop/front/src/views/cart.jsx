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
    useTheme,
    useMediaQuery,
} from '@mui/material'
import { Delete as DeleteIcon, Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material'
import { useState } from 'react'

function Cart() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    // État du panier (exemple)
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Canapé Orange Luxe',
            category: 'Meubles',
            price: 1299.99,
            quantity: 1,
            image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1300',
        },
        {
            id: 2,
            name: 'Perceuse Dewalt Pro',
            category: 'Bricolage',
            price: 149.99,
            quantity: 2,
            image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1300',
        },
        {
            id: 3,
            name: 'Smartphone XZY Pro',
            category: 'Électronique',
            price: 799.99,
            quantity: 1,
            image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1300',
        },
    ])

    // Fonctions de gestion
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return
        setCartItems(cartItems.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id))
    }

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shipping = subtotal > 50 ? 0 : 9.99
    const tax = subtotal * 0.2
    const total = subtotal + shipping + tax

    return (
        <Box sx={{ minHeight: '100vh', py: 6, backgroundColor: '#f5f5f5' }}>
            <Container maxWidth="lg">
                {/* Titre */}
                <Typography
                    variant="h3"
                    sx={{
                        mb: 4,
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                        textAlign: 'center',
                    }}
                >
                    Votre Panier
                </Typography>

                {cartItems.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                        <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
                            Votre panier est vide
                        </Typography>
                        <Button variant="contained" sx={{ backgroundColor: theme.palette.info.main }} href="/">
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
                                            <TableCell align="center" sx={{ color: 'white', fontWeight: 700 }}>
                                                Prix
                                            </TableCell>
                                            <TableCell align="center" sx={{ color: 'white', fontWeight: 700 }}>
                                                Quantité
                                            </TableCell>
                                            <TableCell align="center" sx={{ color: 'white', fontWeight: 700 }}>
                                                Total
                                            </TableCell>
                                            <TableCell align="center" sx={{ color: 'white', fontWeight: 700 }}>
                                                Action
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cartItems.map(item => (
                                            <TableRow key={item.id} sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            style={{
                                                                width: 60,
                                                                height: 60,
                                                                borderRadius: 8,
                                                                objectFit: 'cover',
                                                            }}
                                                        />
                                                        <Box>
                                                            <Typography sx={{ fontWeight: 600 }}>{item.name}</Typography>
                                                            <Typography variant="caption" color="textSecondary">
                                                                {item.category}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 600 }}>
                                                    {item.price.toFixed(2)} €
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            sx={{ color: theme.palette.info.main }}
                                                        >
                                                            <RemoveIcon fontSize="small" />
                                                        </IconButton>
                                                        <Typography sx={{ fontWeight: 600, minWidth: 30, textAlign: 'center' }}>
                                                            {item.quantity}
                                                        </Typography>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            sx={{ color: theme.palette.info.main }}
                                                        >
                                                            <AddIcon fontSize="small" />
                                                        </IconButton>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 600 }}>
                                                    {(item.price * item.quantity).toFixed(2)} €
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => removeItem(item.id)}
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

                                    {/* Détails */}
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography>Sous-total:</Typography>
                                        <Typography sx={{ fontWeight: 600 }}>{subtotal.toFixed(2)} €</Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography>Livraison:</Typography>
                                        <Typography sx={{ fontWeight: 600 }}>
                                            {shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} €`}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, pb: 2, borderBottom: `2px solid ${theme.palette.divider}` }}>
                                        <Typography>Taxes (20%):</Typography>
                                        <Typography sx={{ fontWeight: 600 }}>{tax.toFixed(2)} €</Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                            Total:
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 700,
                                                color: theme.palette.info.main,
                                            }}
                                        >
                                            {total.toFixed(2)} €
                                        </Typography>
                                    </Box>

                                    {/* Boutons action */}
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            backgroundColor: theme.palette.info.main,
                                            mb: 2,
                                            py: 1.5,
                                            fontWeight: 600,
                                            '&:hover': {
                                                backgroundColor: theme.palette.info.dark,
                                            },
                                        }}
                                    >
                                        Procéder à la commande
                                    </Button>

                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        sx={{
                                            borderColor: theme.palette.primary.main,
                                            color: theme.palette.primary.main,
                                            py: 1.5,
                                            fontWeight: 600,
                                        }}
                                        href="/"
                                    >
                                        Continuer le shopping
                                    </Button>

                                    {/* Info livraison gratuite */}
                                    {shipping > 0 && (
                                        <Box sx={{ mt: 3, p: 2, backgroundColor: '#f0f7ff', borderRadius: 2, borderLeft: `4px solid ${theme.palette.info.main}` }}>
                                            <Typography variant="caption" sx={{ color: theme.palette.info.main, fontWeight: 600 }}>
                                                💡 Livraison gratuite à partir de 50 €
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
