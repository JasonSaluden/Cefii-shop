import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Slider,
    FormControlLabel,
    Checkbox,
    Paper,
    Button,
    Chip,
    CircularProgress,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import SearchBar from '../components/SearchBar'
import { getAllProducts } from '../api/productApi'
import { getAllCategories } from '../api/categoryApi'
import { getProductImage } from '../assets/productImages'
import { useCart } from '../context/CartContext'

// Affiche une liste de produits avec des options de filtrage par catégorie et par prix.
export default function Products() {
    const theme = useTheme()
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const [searchParams] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
    const [priceRange, setPriceRange] = useState([0, 2000])
    const [maxPrice, setMaxPrice] = useState(2000)
    const [selectedCategories, setSelectedCategories] = useState(
        searchParams.get('category') ? [searchParams.get('category')] : []
    )
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([getAllProducts(), getAllCategories()])
            .then(([prods, cats]) => {
                setProducts(prods)
                setCategories(cats)
                const maxPrice = Math.max(...prods.map(p => p.prix), 2000)
                setMaxPrice(maxPrice)
                setPriceRange([0, maxPrice])
            })
            .finally(() => setLoading(false))
    }, [])

    // Filtrer les produits
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch =
                product.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.categoryNom.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesPrice =
                product.prix >= priceRange[0] && product.prix <= priceRange[1]

            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(product.categoryNom)

            return matchesSearch && matchesPrice && matchesCategory
        })
    }, [searchQuery, priceRange, selectedCategories, products])

    const handleCategoryToggle = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        )
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* SearchBar */}
            <Box sx={{ mb: 4 }}>
                <SearchBar
                    placeholder="Chercher un produit, catégorie..."
                    onSearch={(query) => setSearchQuery(query)}
                />
            </Box>

            <Grid container spacing={4}>
                {/* Sidebar Filtres */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <Paper
                        sx={{
                            p: 3,
                            backgroundColor: 'rgba(11, 16, 32, 0.05)',
                            borderRadius: 2,
                            border: `1px solid ${theme.palette.primary.main}20`,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 3,
                                fontWeight: 700,
                                color: theme.palette.primary.main,
                            }}
                        >
                            Filtres
                        </Typography>

                        {/* Filtre Catégorie */}
                        <Box sx={{ mb: 4 }}>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    mb: 2,
                                    fontWeight: 600,
                                    color: theme.palette.primary.main,
                                }}
                            >
                                Catégorie
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {categories.map((cat) => (
                                    <FormControlLabel
                                        key={cat.idCategory}
                                        control={
                                            <Checkbox
                                                checked={selectedCategories.includes(cat.nom)}
                                                onChange={() => handleCategoryToggle(cat.nom)}
                                                sx={{
                                                    color: theme.palette.primary.main,
                                                    '&.Mui-checked': {
                                                        color: theme.palette.secondary.main,
                                                    },
                                                }}
                                            />
                                        }
                                        label={cat.nom}
                                    />
                                ))}
                            </Box>
                        </Box>

                        {/* Filtre Prix */}
                        <Box>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    mb: 2,
                                    fontWeight: 600,
                                    color: theme.palette.primary.main,
                                }}
                            >
                                Prix
                            </Typography>
                            <Slider
                                value={priceRange}
                                onChange={(e, newValue) => setPriceRange(newValue)}
                                min={0}
                                max={maxPrice}
                                step={50}
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => `${value}€`}
                                sx={{
                                    color: theme.palette.secondary.main,
                                    '& .MuiSlider-thumb': {
                                        backgroundColor: theme.palette.secondary.main,
                                        boxShadow: `0 0 8px ${theme.palette.secondary.main}40`,
                                    },
                                }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                <Typography variant="caption">{priceRange[0]}€</Typography>
                                <Typography variant="caption">{priceRange[1]}€</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                {/* Grille Produits */}
                <Grid size={{ xs: 12, md: 9 }}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {filteredProducts.length} produit(s) trouvé(s)
                        </Typography>
                    </Box>

                    <Grid container spacing={2.5} sx={{ justifyContent: 'center' }}>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={product.idProduct} sx={{ display: 'flex' }}>
                                    <Card
                                        onClick={() => navigate(`/products/${product.idProduct}`)}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: `0 12px 24px ${theme.palette.primary.main}20`,
                                            },
                                            borderRadius: 2,
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {/* Image Produit */}
                                        <CardMedia
                                            component="img"
                                            height="240"
                                            image={getProductImage(product) || 'https://placehold.co/400x240?text=Produit'}
                                            alt={product.nom}
                                            sx={{
                                                objectFit: 'cover',
                                                transition: 'transform 0.3s ease',
                                                '&:hover': {
                                                    transform: 'scale(1.05)',
                                                },
                                            }}
                                        />

                                        {/* Contenu Produit */}
                                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '200px' }}>
                                            {/* Catégorie Badge */}
                                            <Chip
                                                label={product.categoryNom}
                                                size="small"
                                                sx={{
                                                    mb: 1,
                                                    backgroundColor: theme.palette.secondary.main,
                                                    color: 'white',
                                                    fontWeight: 600,
                                                }}
                                            />

                                            {/* Nom Produit */}
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    mb: 1,
                                                    fontWeight: 700,
                                                    display: '-webkit-box',
                                                    overflow: 'hidden',
                                                    WebkitBoxOrient: 'vertical',
                                                    WebkitLineClamp: 2,
                                                    color: theme.palette.primary.main,
                                                }}
                                            >
                                                {product.nom}
                                            </Typography>

                                            {/* Stock */}
                                            <Typography variant="caption" sx={{ color: product.stock > 0 ? 'success.main' : 'error.main', mb: 1 }}>
                                                {product.stock > 0 ? `En stock (${product.stock})` : 'Rupture de stock'}
                                            </Typography>

                                            {/* Prix */}
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'baseline',
                                                    gap: 1,
                                                    mb: 2,
                                                }}
                                            >
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        fontWeight: 700,
                                                        color: theme.palette.secondary.main,
                                                    }}
                                                >
                                                    {product.prix.toFixed(2)}€
                                                </Typography>
                                            </Box>

                                            {/* Bouton Ajouter au panier */}
                                            <Box sx={{ mt: 'auto' }}>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    disabled={product.stock === 0}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        addToCart(product, getProductImage(product))
                                                    }}
                                                    sx={{
                                                        backgroundColor: theme.palette.primary.main,
                                                        color: 'white',
                                                        fontWeight: 600,
                                                        '&:hover': {
                                                            backgroundColor: theme.palette.primary.dark,
                                                        },
                                                    }}
                                                >
                                                    Ajouter au panier
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Grid size={12}>
                                <Paper
                                    sx={{
                                        p: 4,
                                        textAlign: 'center',
                                        backgroundColor: 'rgba(11, 16, 32, 0.05)',
                                    }}
                                >
                                    <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                                        Aucun produit trouvé avec les filtres actuels
                                    </Typography>
                                </Paper>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
