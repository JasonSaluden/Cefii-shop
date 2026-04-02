import React from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
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
} from '@mui/material'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
    const { totalItems } = useCart()
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    // Menu hamburger mobile
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget)
    const handleMenuClose = () => setAnchorEl(null)

    // Menu déroulant icône profil
    const [anchorElUser, setAnchorElUser] = React.useState(null)
    const userMenuOpen = Boolean(anchorElUser)

    const handleUserMenuOpen = (event) => setAnchorElUser(event.currentTarget)
    const handleUserMenuClose = () => setAnchorElUser(null)

    const handleLogout = () => {
        logout()
        handleMenuClose()
        handleUserMenuClose()
        navigate('/')
    }

    const navLinkSx = {
        color: '#f0f0f0',
        textDecoration: 'none',
        fontWeight: 500,
        transition: 'color 0.3s',
        '&:hover': { color: '#D4AF37' },
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
                    <Link component={RouterLink} to="/" sx={navLinkSx}>Accueil</Link>
                    <Link component={RouterLink} to="/products" sx={navLinkSx}>Produits</Link>
                </Box>

                {/* Icons */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
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
                    <IconButton
                        component={RouterLink}
                        to="/cart"
                        sx={{ color: '#D4AF37', textDecoration: 'none', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }}
                    >
                        <Badge badgeContent={totalItems} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>

                    {/* Mobile Menu Button */}
                    <IconButton
                        sx={{ display: { md: 'none' }, color: '#D4AF37' }}
                        onClick={handleMenuOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>

                {/* Mobile Menu Dropdown */}
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    sx={{ display: { md: 'none' } }}
                >
                    <MenuItem component={RouterLink} to="/" onClick={handleMenuClose}>Accueil</MenuItem>
                    <MenuItem component={RouterLink} to="/products" onClick={handleMenuClose}>Produits</MenuItem>
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
