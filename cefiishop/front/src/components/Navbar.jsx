import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
    AppBar,
    Toolbar,
    Box,
    Link,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Olivier from '../assets/logo.png'

export default function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
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
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
                    <Link
                        component={RouterLink}
                        to="/"
                        sx={{
                            color: '#f0f0f0',
                            textDecoration: 'none',
                            fontWeight: 500,
                            transition: 'color 0.3s',
                            '&:hover': { color: '#D4AF37' },
                        }}
                    >
                        Accueil
                    </Link>
                    <Link
                        component={RouterLink}
                        to="/products"
                        sx={{
                            color: '#f0f0f0',
                            textDecoration: 'none',
                            fontWeight: 500,
                            transition: 'color 0.3s',
                            '&:hover': { color: '#D4AF37' },
                        }}
                    >
                        Produits
                    </Link>
                    <Link
                        component={RouterLink}
                        to="/connection"
                        sx={{
                            color: '#f0f0f0',
                            textDecoration: 'none',
                            fontWeight: 500,
                            transition: 'color 0.3s',
                            '&:hover': { color: '#D4AF37' },
                        }}
                    >
                        Connexion
                    </Link>
                    <Link
                        component={RouterLink}
                        to="/register"
                        sx={{
                            color: '#f0f0f0',
                            textDecoration: 'none',
                            fontWeight: 500,
                            transition: 'color 0.3s',
                            '&:hover': { color: '#D4AF37' },
                        }}
                    >
                        S'inscrire
                    </Link>
                </Box>

                {/* Icons */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <IconButton sx={{ color: '#D4AF37' }}>
                        <PersonIcon />
                    </IconButton>
                    <IconButton
                        component={RouterLink}
                        to="/cart"
                        sx={{ color: '#D4AF37', textDecoration: 'none', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }}
                    >
                        <ShoppingCartIcon />
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
                    <MenuItem component={RouterLink} to="/" onClick={handleMenuClose}>
                        Accueil
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/products" onClick={handleMenuClose}>
                        Produits
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/cart" onClick={handleMenuClose}>
                        Panier
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/connection" onClick={handleMenuClose}>
                        Connexion
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/register" onClick={handleMenuClose}>
                        S'inscrire
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}
