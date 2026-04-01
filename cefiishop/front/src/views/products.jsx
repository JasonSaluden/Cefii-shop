import { useState, useMemo } from 'react'
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
    Rating,
    Chip,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import SearchBar from '../components/SearchBar'

// Mock data - à remplacer par une API plus tard
const MOCK_PRODUCTS = [
    {
        id: 1,
        name: 'Canapé Moderne Orange',
        category: 'Meubles',
        price: 899,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop',
        rating: 4.5,
        reviews: 128,
    },
    {
        id: 2,
        name: 'Perceuse Électrique Pro',
        category: 'Bricolage',
        price: 149,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop',
        rating: 4.8,
        reviews: 45,
    },
    {
        id: 3,
        name: 'Smartphone dernière génération',
        category: 'Électronique',
        price: 999,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop',
        rating: 4.6,
        reviews: 312,
    },
    {
        id: 4,
        name: 'Appareil Photo Mirrorless',
        category: 'Photo & Vidéo',
        price: 1299,
        image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=400&fit=crop',
        rating: 4.9,
        reviews: 87,
    },
    {
        id: 5,
        name: 'Manette Gaming Wireless',
        category: 'Jeux vidéo',
        price: 79,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop',
        rating: 4.7,
        reviews: 234,
    },
    {
        id: 6,
        name: 'Chaise Gamer Ergonomique',
        category: 'Meubles',
        price: 349,
        image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=400&fit=crop',
        rating: 4.4,
        reviews: 156,
    },
    {
        id: 7,
        name: 'Écran 4K 27 pouces',
        category: 'Électronique',
        price: 499,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=400&fit=crop',
        rating: 4.5,
        reviews: 98,
    },
    {
        id: 8,
        name: 'Clavier Mécanique RGB',
        category: 'Électronique',
        price: 149,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop',
        rating: 4.3,
        reviews: 207,
    },
    {
        id: 9,
        name: 'Sofa Design Contemporain',
        category: 'Meubles',
        price: 1499,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop',
        rating: 4.6,
        reviews: 67,
    },
    {
        id: 10,
        name: 'Foreuse Perceuse 18V',
        category: 'Bricolage',
        price: 189,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop',
        rating: 4.7,
        reviews: 102,
    },
    {
        id: 11,
        name: 'Objectif Grand Angle',
        category: 'Photo & Vidéo',
        price: 599,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop',
        rating: 4.8,
        reviews: 54,
    },
    {
        id: 12,
        name: 'Console Jeux Dernière Génération',
        category: 'Jeux vidéo',
        price: 499,
        image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=500&h=400&fit=crop',
        rating: 4.9,
        reviews: 421,
    },
]

const CATEGORIES = [
    'Meubles',
    'Bricolage',
    'Électronique',
    'Photo & Vidéo',
    'Jeux vidéo',
]

export default function Products() {
    const theme = useTheme()
    const [searchQuery, setSearchQuery] = useState('')
    const [priceRange, setPriceRange] = useState([0, 2000])
    const [selectedCategories, setSelectedCategories] = useState([])

    // Filtrer les produits
    const filteredProducts = useMemo(() => {
        return MOCK_PRODUCTS.filter((product) => {
            const matchesSearch =
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesPrice =
                product.price >= priceRange[0] && product.price <= priceRange[1]

            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(product.category)

            return matchesSearch && matchesPrice && matchesCategory
        })
    }, [searchQuery, priceRange, selectedCategories])

    const handleCategoryToggle = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        )
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* SearchBar */}
            <Box sx={{ mb: 4 }}>
                <SearchBar
                    placeholder="Chercher un produit, marque, catégorie..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Box>

            <Grid container spacing={4}>
                {/* Sidebar Filtres */}
                <Grid item xs={12} md={6}>
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
                                {CATEGORIES.map((category) => (
                                    <FormControlLabel
                                        key={category}
                                        control={
                                            <Checkbox
                                                checked={selectedCategories.includes(category)}
                                                onChange={() => handleCategoryToggle(category)}
                                                sx={{
                                                    color: theme.palette.primary.main,
                                                    '&.Mui-checked': {
                                                        color: theme.palette.secondary.main,
                                                    },
                                                }}
                                            />
                                        }
                                        label={category}
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
                                max={2000}
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
                <Grid item xs={12} md={8}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {filteredProducts.length} produit(s) trouvé(s)
                        </Typography>
                    </Box>

                    <Grid container spacing={2.5} sx={{ justifyContent: 'center' }}>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <Grid item xs={12} sm={6} lg={4} key={product.id} sx={{ display: 'flex' }}>
                                    <Card
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
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
                                            image={product.image}
                                            alt={product.name}
                                            sx={{
                                                objectFit: 'cover',
                                                transition: 'transform 0.3s ease',
                                                '&:hover': {
                                                    transform: 'scale(1.05)',
                                                },
                                            }}
                                        />

                                        {/* Contenu Produit */}
                                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '280px' }}>
                                            {/* Catégorie Badge */}
                                            <Chip
                                                label={product.category}
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
                                                {product.name}
                                            </Typography>

                                            {/* Rating */}
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                    mb: 2,
                                                }}
                                            >
                                                <Rating
                                                    value={product.rating}
                                                    readOnly
                                                    size="small"
                                                    sx={{
                                                        '& .MuiRating-iconFilled': {
                                                            color: theme.palette.secondary.main,
                                                        },
                                                    }}
                                                />
                                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                    ({product.reviews})
                                                </Typography>
                                            </Box>

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
                                                    {product.price}€
                                                </Typography>
                                            </Box>

                                            {/* Bouton Ajouter au panier */}
                                            <Box sx={{ mt: 'auto' }}>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
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
                            <Grid item xs={12}>
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
