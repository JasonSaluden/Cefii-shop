import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Button,
    IconButton,
    useTheme,
    useMediaQuery,
} from '@mui/material'
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCategories } from '../api/categoryApi'
import { getAllProducts } from '../api/productApi'
import { getHomeRecommendations } from '../api/userBehavior'
import { useAuth } from '../context/AuthContext'
import productImages from '../assets/productImages'
import { getCategoryImage } from '../assets/categoryImages'

// Carousel affichant des images lambda si pas connecté ou si aucune recommandation disponible
const staticSlides = [
    {
        id: 's1',
        title: 'Équipez votre dragon pour l\'aventure',
        subtitle: 'Selles, harnais, armures — tout pour voler en sécurité',
        bg: 'https://images.pexels.com/photos/5691635/pexels-photo-5691635.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
    {
        id: 's2',
        title: 'Prenez soin de votre compagnon',
        subtitle: 'Produits d\'hygiène et de soin adaptés aux dragons',
        bg: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
    {
        id: 's3',
        title: 'Nouveautés & Promos',
        subtitle: 'Découvrez nos dernières offres pour cavaliers et dragons',
        bg: 'https://images.pexels.com/photos/286973/pexels-photo-286973.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
]

// Page d'accueil affichant un carousel de recommandations personnalisées (ou statiques si non connecté) et une section de catégories de produits.
function Home() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const navigate = useNavigate()
    const { user } = useAuth()

    const [current, setCurrent] = useState(0)
    const [categories, setCategories] = useState([])
    const [categoryImages, setCategoryImages] = useState({})
    const [recommendations, setRecommendations] = useState([])

    useEffect(() => {
        if (user?.id) {
            getHomeRecommendations(user.id).then(setRecommendations).catch(() => { })
        } else {
            setRecommendations([])
        }
    }, [user])

    useEffect(() => {
        getAllCategories().then(setCategories)
        getAllProducts().then((products) => {
            const imgMap = {}
            categories.forEach((cat) => {
                const categoryImg = getCategoryImage(cat.idCategory)
                if (categoryImg) {
                    imgMap[cat.idCategory] = categoryImg
                } else {
                    const firstProduct = products.find((p) => p.idCategory === cat.idCategory)
                    if (firstProduct && productImages[firstProduct.idProduct]) {
                        imgMap[cat.idCategory] = productImages[firstProduct.idProduct]
                    }
                }
            })
            setCategoryImages(imgMap)
        })
    }, [categories])

    // Slides dynamiques si recommandations disponibles, sinon slides statiques
    const slides = recommendations.length > 0
        ? recommendations.map((p) => ({
            id: p.idProduct,
            title: p.nom,
            subtitle: `${p.categoryNom} — ${p.prix.toFixed(2)} €`,
            bg: productImages[p.idProduct] || 'https://placehold.co/1600x500?text=Produit',
            productId: p.idProduct,
        }))
        : staticSlides

    // Reset index si le nombre de slides change
    useEffect(() => {
        setCurrent(0)
    }, [slides.length])

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length)
        }, 4500)
        return () => clearInterval(timer)
    }, [slides.length])

    const handlePrev = () => setCurrent((current - 1 + slides.length) % slides.length)
    const handleNext = () => setCurrent((current + 1) % slides.length)

    return (
        <Box component="section">

            {/* === CAROUSEL === */}
            <Box sx={{ mt: 4 }} />
            {recommendations.length > 0 && (
                <Container maxWidth="lg" sx={{ mb: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                        Recommandé pour vous
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                        D'après vos récentes recherches
                    </Typography>
                </Container>
            )}
            <Box
                sx={{
                    position: 'relative',
                    width: '90%',
                    mx: 'auto',
                    height: isMobile ? 'auto' : '420px',
                    borderRadius: '24px',
                    mb: 6,
                    mt: 2,
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    backgroundColor: '#0B1020',
                }}
            >
                {/* Côté image */}
                <Box
                    sx={{
                        width: isMobile ? '100%' : '55%',
                        height: isMobile ? '240px' : '100%',
                        flexShrink: 0,
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {slides.map((slide, idx) => (
                        <Box
                            key={slide.id}
                            component="img"
                            src={slide.bg}
                            alt={slide.title}
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                backgroundColor: '#111',
                                opacity: idx === current ? 1 : 0,
                                transition: 'opacity 0.8s ease-in-out',
                            }}
                        />
                    ))}
                </Box>

                {/* Côté infos */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        px: isMobile ? 3 : 5,
                        py: isMobile ? 3 : 4,
                        color: '#fff',
                    }}
                >
                    <Typography
                        variant={isMobile ? 'h5' : 'h4'}
                        sx={{ fontWeight: 700, mb: 2, lineHeight: 1.3 }}
                    >
                        {slides[current].title}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ color: 'rgba(255,255,255,0.75)', mb: slides[current].productId ? 4 : 0 }}
                    >
                        {slides[current].subtitle}
                    </Typography>
                    {slides[current].productId && (
                        <Button
                            variant="contained"
                            onClick={() => navigate(`/products/${slides[current].productId}`)}
                            sx={{ alignSelf: 'flex-start', backgroundColor: '#cf9f72', color: '#0B1020', fontWeight: 700, '&:hover': { backgroundColor: '#d4ad52' } }}
                        >
                            Voir le produit
                        </Button>
                    )}

                    {/* Dots */}
                    <Box sx={{ display: 'flex', gap: 1, mt: 4 }}>
                        {slides.map((_, idx) => (
                            <Box
                                key={idx}
                                onClick={() => setCurrent(idx)}
                                sx={{
                                    width: idx === current ? '24px' : '10px',
                                    height: '10px',
                                    borderRadius: '5px',
                                    backgroundColor: idx === current ? '#cf9f72' : 'rgba(255,255,255,0.3)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                }}
                            />
                        ))}
                    </Box>
                </Box>

                {/* Flèches */}
                <IconButton
                    onClick={handlePrev}
                    sx={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', zIndex: 3, backgroundColor: 'rgba(207,159,114,0.8)', color: '#fff', '&:hover': { backgroundColor: 'rgba(207,159,114,1)' } }}
                >
                    <ChevronLeftIcon />
                </IconButton>
                <IconButton
                    onClick={handleNext}
                    sx={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', zIndex: 3, backgroundColor: 'rgba(207,159,114,0.8)', color: '#fff', '&:hover': { backgroundColor: 'rgba(207,159,114,1)' } }}
                >
                    <ChevronRightIcon />
                </IconButton>
            </Box>

            {/* === CATEGORIES === */}
            <Container maxWidth="lg" sx={{ mb: 8 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: theme.palette.primary.main }}>
                    Nos catégories
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(180px, 1fr))', gap: 3 }}>
                    {categories.map((cat) => (
                        <Card
                            key={cat.idCategory}
                            onClick={() => navigate(`/products?category=${encodeURIComponent(cat.nom)}`)}
                            sx={{ cursor: 'pointer', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }, borderRadius: 2, overflow: 'hidden', height: '100%' }}
                        >
                            <CardMedia
                                component="img"
                                height="160"
                                image={categoryImages[cat.idCategory] || 'https://placehold.co/300x160?text=Catégorie'}
                                alt={cat.nom}
                                onError={(e) => { e.target.src = 'https://placehold.co/300x160?text=Catégorie' }}
                                sx={{ objectFit: 'cover' }}
                            />
                            <CardContent sx={{ backgroundColor: '#f5f5f5', py: 2 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                                    {cat.nom}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>
        </Box>
    )
}

export default Home
