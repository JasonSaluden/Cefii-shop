import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#0B1020', // Deep navy (dragon body)
            light: '#1a2a3a',
            dark: '#050a12',
        },
        secondary: {
            main: '#8B1E2D', // Crimson red (dragon accent)
            light: '#a82a3a',
            dark: '#5a0f1b',
        },
        success: {
            main: '#10b981', // Emerald green
        },
        warning: {
            main: '#d4a574', // Gold accent
        },
        background: {
            default: '#f9fafb',
            paper: '#ffffff',
        },
        text: {
            primary: '#111827',
            secondary: '#6b7280',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            fontFamily: '"Playfair Display", serif',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            fontFamily: '"Playfair Display", serif',
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    padding: '10px 20px',
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(139, 30, 45, 0.3)',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    '&:hover': {
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
                        transform: 'translateY(-2px)',
                        transition: 'all 0.3s ease',
                    },
                },
            },
        },
    },
})

export default theme
