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
import photo from '../assets/logo.png'
import SearchBar from '../components/SearchBar'

const slides = [
    {
        id: 1,
        title: 'Livraison gratuite sur milliers d\'articles',
        subtitle: 'Sans abonnement, sans engagement',
        bg: 'https://images.pexels.com/photos/5691635/pexels-photo-5691635.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
    {
        id: 2,
        title: 'Nouveautés haute technologie',
        subtitle: 'Smartphones, objets connectés et plus',
        bg: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
    {
        id: 3,
        title: 'Promos exceptionnelles',
        subtitle: 'Foncez sur nos meilleures offres',
        bg: 'https://images.pexels.com/photos/286973/pexels-photo-286973.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
]

const categories = [
    { id: 1, title: 'Meubles', img: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1300' },
    { id: 2, title: 'Bricolage', img: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1300' },
    { id: 3, title: 'Électronique', img: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1300' },
    { id: 4, title: 'Photo & Vidéo', img: 'https://images.pexels.com/photos/606933/pexels-photo-606933.jpeg?auto=compress&cs=tinysrgb&w=1300' },
    { id: 5, title: 'Jeux vidéo', img: 'https://images.pexels.com/photos/3945657/pexels-photo-3945657.jpeg?auto=compress&cs=tinysrgb&w=1300' },
]

function Home() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length)
        }, 4500)
        return () => clearInterval(timer)
    }, [])

    const handlePrev = () => setCurrent((current - 1 + slides.length) % slides.length)
    const handleNext = () => setCurrent((current + 1) % slides.length)

    return (
        <Box component="section">
            {/* === SEARCH BAR === */}
            <Container maxWidth="lg">
                <SearchBar
                    placeholder="Chercher un produit, marque, catégorie..."
                    onSearch={(query) => console.log('Searching for:', query)}
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
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 3,
                    }}
                >
                    {categories.map((cat) => (
                        <Card
                            key={cat.id}
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
                                height="200"
                                image={cat.img}
                                alt={cat.title}
                                sx={{
                                    objectFit: 'cover',
                                }}
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
                                    {cat.title}
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
