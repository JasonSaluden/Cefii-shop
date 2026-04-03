import React, { useState, useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Olivier from '../assets/logo.png'
import {
    AppBar,
    Toolbar,
    Box,
    Link,
    IconButton,
    Menu,
    MenuItem,
    Badge,
    Button,
    Divider,
    Typography,
} from '@mui/material'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { getAllCategories } from '../api/categoryApi'

const navLinkSx = {
    color: '#f0f0f0',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'color 0.3s',
    '&:hover': { color: '#D4AF37' },
}

export default function Navbar() {
    const { totalItems } = useCart()
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    // Catégories
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getAllCategories().then(setCategories).catch(() => {})
    }, [])

    // Menu hamburger mobile
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget)
    const handleMenuClose = () => { setAnchorEl(null); setShowMobileCats(false) }

    // Menu déroulant catégories (desktop)
    const [anchorElCat, setAnchorElCat] = useState(null)
    const catOpen = Boolean(anchorElCat)

    // Sous-menu catégories mobile
    const [showMobileCats, setShowMobileCats] = useState(false)

    // Menu déroulant icône profil
    const [anchorElUser, setAnchorElUser] = useState(null)
    const userMenuOpen = Boolean(anchorElUser)
    const handleUserMenuOpen = (event) => setAnchorElUser(event.currentTarget)
    const handleUserMenuClose = () => setAnchorElUser(null)

    const handleLogout = () => {
        logout()
        handleMenuClose()
        handleUserMenuClose()
        navigate('/')
    }

    const handleCatNavigate = (nom) => {
        setAnchorElCat(null)
        setAnchorEl(null)
        setShowMobileCats(false)
        navigate(nom ? `/products?category=${encodeURIComponent(nom)}` : '/products')
    }

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#0B1020' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

                {/* Logo */}
                <Link
                    component={RouterLink}
                    to="/"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        textDecoration: 'none',
                        color: 'inherit',
                        '&:hover': { opacity: 0.8 },
                    }}
                >
                    <img src={Olivier} alt="Logo" style={{ height: 40, width: 'auto' }} />
                    <Box sx={{ fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', fontWeight: 700, color: '#D4AF37', display: { xs: 'none', sm: 'block' } }}>
                        DragonShop
                    </Box>
                </Link>

                {/* Desktop Navigation */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
                    <Button
                        onClick={() => navigate('/products')}
                        variant="outlined"
                        size="small"
                        sx={{ color: '#D4AF37', borderColor: '#D4AF37', fontWeight: 600, textTransform: 'none', '&:hover': { backgroundColor: 'rgba(212,175,55,0.1)', borderColor: '#D4AF37' } }}
                    >
                        Rechercher un produit
                    </Button>

                    {/* Dropdown catégories */}
                    <Button
                        onClick={(e) => setAnchorElCat(e.currentTarget)}
                        endIcon={
                            <KeyboardArrowDownIcon sx={{ transition: 'transform 0.2s', transform: catOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        }
                        sx={{ color: '#f0f0f0', fontWeight: 500, textTransform: 'none', fontSize: '1rem', p: 0, minWidth: 0, '&:hover': { color: '#D4AF37', backgroundColor: 'transparent' } }}
                    >
                        Catégories
                    </Button>
                    <Menu
                        anchorEl={anchorElCat}
                        open={catOpen}
                        onClose={() => setAnchorElCat(null)}
                        slotProps={{ paper: { sx: { mt: 1, minWidth: 200, borderRadius: 2, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' } } }}
                    >
                        <MenuItem onClick={() => handleCatNavigate(null)} sx={{ fontWeight: 600 }}>
                            Tous les produits
                        </MenuItem>
                        <Divider />
                        {categories.map((cat) => (
                            <MenuItem key={cat.idCategory} onClick={() => handleCatNavigate(cat.nom)} sx={{ '&:hover': { color: '#8B1E2D' } }}>
                                {cat.nom}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>

                {/* Icons */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>

                    {/* Menu profil */}
                    <IconButton onClick={handleUserMenuOpen} sx={{ color: '#D4AF37' }}>
                        <PersonIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorElUser}
                        open={userMenuOpen}
                        onClose={handleUserMenuClose}
                        slotProps={{ paper: { sx: { mt: 1, minWidth: 160, borderRadius: 2 } } }}
                    >
                        {user ? (
                            [
                                <MenuItem key="profile" component={RouterLink} to="/profile" onClick={handleUserMenuClose}>Mon profil</MenuItem>,
                                <MenuItem key="logout" onClick={handleLogout} sx={{ color: 'error.main' }}>Déconnexion</MenuItem>,
                            ]
                        ) : (
                            [
                                <MenuItem key="connection" component={RouterLink} to="/connection" onClick={handleUserMenuClose}>Connexion</MenuItem>,
                                <MenuItem key="register" component={RouterLink} to="/register" onClick={handleUserMenuClose}>S'inscrire</MenuItem>,
                            ]
                        )}
                    </Menu>

                    {/* Panier */}
                    <IconButton
                        component={RouterLink}
                        to="/cart"
                        sx={{ color: '#D4AF37', textDecoration: 'none', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }}
                    >
                        <Badge badgeContent={totalItems} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>

                    {/* Bouton hamburger mobile */}
                    <IconButton sx={{ display: { md: 'none' }, color: '#D4AF37' }} onClick={handleMenuOpen}>
                        <MenuIcon />
                    </IconButton>
                </Box>

                {/* Menu mobile */}
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    sx={{ display: { md: 'none' } }}
                >
                    <MenuItem component={RouterLink} to="/" onClick={handleMenuClose}>Accueil</MenuItem>
                    <MenuItem component={RouterLink} to="/products" onClick={handleMenuClose}>Rechercher un produit</MenuItem>

                    {/* Produits + sous-menu catégories */}
                    <MenuItem onClick={() => setShowMobileCats(prev => !prev)} sx={{ fontWeight: 600 }}>
                        Produits
                        <KeyboardArrowDownIcon sx={{ ml: 'auto', transition: 'transform 0.2s', transform: showMobileCats ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </MenuItem>
                    {showMobileCats && (
                        <Box sx={{ pl: 2, borderLeft: '3px solid #D4AF37', ml: 2 }}>
                            <MenuItem onClick={() => handleCatNavigate(null)}>
                                <Typography variant="body2" fontWeight={600}>Tous les produits</Typography>
                            </MenuItem>
                            {categories.map((cat) => (
                                <MenuItem key={cat.idCategory} onClick={() => handleCatNavigate(cat.nom)}>
                                    <Typography variant="body2">{cat.nom}</Typography>
                                </MenuItem>
                            ))}
                        </Box>
                    )}

                    <MenuItem component={RouterLink} to="/cart" onClick={handleMenuClose}>Panier</MenuItem>
                    {user ? (
                        [
                            <MenuItem key="profile" component={RouterLink} to="/profile" onClick={handleMenuClose}>Mon profil</MenuItem>,
                            <MenuItem key="logout" onClick={handleLogout}>Déconnexion</MenuItem>,
                        ]
                    ) : (
                        [
                            <MenuItem key="connection" component={RouterLink} to="/connection" onClick={handleMenuClose}>Connexion</MenuItem>,
                            <MenuItem key="register" component={RouterLink} to="/register" onClick={handleMenuClose}>S'inscrire</MenuItem>,
                        ]
                    )}
                </Menu>

            </Toolbar>
        </AppBar>
    )
}
