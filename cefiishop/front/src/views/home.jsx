import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    IconButton,
    useTheme,
    useMediaQuery,
} from '@mui/material'
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { getAllCategories } from '../api/categoryApi'
import { getAllProducts } from '../api/productApi'
import { getHomeRecommendations } from '../api/userBehavior'
import productImages from '../assets/productImages'

const slides = [
    {
        id: 1,
        title: 'Équipez votre dragon pour l\'aventure',
        subtitle: 'Selles, harnais, armures — tout pour voler en sécurité',
        bg: 'https://images.pexels.com/photos/5691635/pexels-photo-5691635.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
    {
        id: 2,
        title: 'Prenez soin de votre compagnon',
        subtitle: 'Produits d\'hygiène et de soin adaptés aux dragons',
        bg: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
    {
        id: 3,
        title: 'Nouveautés & Promos',
        subtitle: 'Découvrez nos dernières offres pour cavaliers et dragons',
        bg: 'https://images.pexels.com/photos/286973/pexels-photo-286973.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
]

function Home() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const navigate = useNavigate()
    const [current, setCurrent] = useState(0)
    const [categories, setCategories] = useState([])
    const [categoryImages, setCategoryImages] = useState({})
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length)
        }, 4500)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || 'null')
        if (user?.id) {
            getHomeRecommendations(user.id).then(setSuggestions).catch(() => {})
        }
    }, [])

    useEffect(() => {
        getAllCategories().then(setCategories)
        getAllProducts().then((products) => {
            const imgMap = {}
            products.forEach((p) => {
                if (!imgMap[p.idCategory] && productImages[p.idProduct]) {
                    imgMap[p.idCategory] = productImages[p.idProduct]
                }
            })
            setCategoryImages(imgMap)
        })
    }, [])

    const handlePrev = () => setCurrent((current - 1 + slides.length) % slides.length)
    const handleNext = () => setCurrent((current + 1) % slides.length)

    return (
        <Box component="section">
            {/* === SEARCH BAR === */}
            <Container maxWidth="lg">
                <SearchBar
                    placeholder="Chercher un produit, catégorie..."
                    onSearch={(query) => navigate(`/products${query ? `?search=${encodeURIComponent(query)}` : ''}`)}
                />
            </Container>

            {/* === CAROUSEL === */}
            <Box
                sx={{
                    position: 'relative',
                    width: '90%',
                    mx: 'auto',
                    height: isMobile ? '300px' : '500px',
                    backgroundColor: '#1a1a1a',
                    overflow: 'hidden',
                    borderRadius: '24px',
                    mb: 6,
                    mt: 2,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    transition: 'box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 16px 48px rgba(207, 159, 114, 0.15)',
                    },
                }}
            >
                {/* Slide images */}
                {slides.map((slide, idx) => (
                    <Box
                        key={slide.id}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url('${slide.bg}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: idx === current ? 1 : 0,
                            transition: 'opacity 0.8s ease-in-out',
                        }}
                    />
                ))}

                {/* Gradient overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background:
                            'linear-gradient(135deg, rgba(139, 30, 45, 0.7) 0%, rgba(0,0,0,0.3) 100%)',
                        zIndex: 1,
                    }}
                />

                {/* Slide content */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        color: '#fff',
                        zIndex: 2,
                        width: '90%',
                    }}
                >
                    <Typography
                        variant={isMobile ? 'h4' : 'h2'}
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                            textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                        }}
                    >
                        {slides[current].title}
                    </Typography>
                    <Typography
                        variant={isMobile ? 'body2' : 'body1'}
                        sx={{
                            textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
                        }}
                    >
                        {slides[current].subtitle}
                    </Typography>
                </Box>

                {/* Navigation Buttons */}
                <IconButton
                    onClick={handlePrev}
                    sx={{
                        position: 'absolute',
                        left: 20,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 3,
                        backgroundColor: 'rgba(207, 159, 114, 0.8)',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: 'rgba(207, 159, 114, 1)',
                        },
                    }}
                >
                    <ChevronLeftIcon />
                </IconButton>
                <IconButton
                    onClick={handleNext}
                    sx={{
                        position: 'absolute',
                        right: 20,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 3,
                        backgroundColor: 'rgba(207, 159, 114, 0.8)',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: 'rgba(207, 159, 114, 1)',
                        },
                    }}
                >
                    <ChevronRightIcon />
                </IconButton>

                {/* Dots indicator */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: 1,
                        zIndex: 3,
                    }}
                >
                    {slides.map((_, idx) => (
                        <Box
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            sx={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor:
                                    idx === current ? '#cf9f72' : 'rgba(255,255,255,0.5)',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                                '&:hover': {
                                    backgroundColor: '#cf9f72',
                                },
                            }}
                        />
                    ))}
                </Box>
            </Box>

            {/* === CATEGORIES SECTION === */}
            <Container maxWidth="lg" sx={{ mb: 8 }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        mb: 4,
                        textAlign: 'center',
                        color: theme.palette.primary.main,
                    }}
                >
                    Nos rayons
                </Typography>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: 3,
                    }}
                >
                    {categories.map((cat) => (
                        <Card
                            key={cat.idCategory}
                            onClick={() => navigate(`/products?category=${encodeURIComponent(cat.nom)}`)}
                            sx={{
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                                },
                                borderRadius: 2,
                                overflow: 'hidden',
                                height: '100%',
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="160"
                                image={categoryImages[cat.idCategory] || 'https://placehold.co/300x160?text=Catégorie'}
                                alt={cat.nom}
                                
                                onError={(e) => { e.target.src = 'https://placehold.co/300x160?text=Catégorie' }}
                                sx={{ objectFit: 'cover' }}
                            />
                            <CardContent
                                sx={{
                                    textAlign: 'center',
                                    backgroundColor: '#f5f5f5',
                                    py: 2,
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontWeight: 600,
                                        color: theme.palette.primary.main,
                                    }}
                                >
                                    {cat.nom}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>

            {/* === SUGGESTIONS PERSONNALISÉES === */}
            {suggestions.length > 0 && (
                <Container maxWidth="lg" sx={{ mb: 8 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            mb: 4,
                            textAlign: 'center',
                            color: theme.palette.primary.main,
                        }}
                    >
                        Suggestions pour vous
                    </Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: 3,
                        }}
                    >
                        {suggestions.map((product) => (
                            <Card
                                key={product.idProduct}
                                onClick={() => navigate(`/products/${product.idProduct}`)}
                                sx={{
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                                    },
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="160"
                                    image={productImages[product.idProduct] || 'https://placehold.co/300x160?text=Produit'}
                                    alt={product.nom}
                                    onError={(e) => { e.target.src = 'https://placehold.co/300x160?text=Produit' }}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent sx={{ backgroundColor: '#f5f5f5', py: 2 }}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{ fontWeight: 600, color: theme.palette.primary.main }}
                                        noWrap
                                    >
                                        {product.nom}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 600, color: theme.palette.secondary.main }}
                                    >
                                        {product.prix.toFixed(2)}€
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Container>
            )}
        </Box>
    )
}

export default Home
