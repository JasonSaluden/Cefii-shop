import React, { useState } from 'react'
import { Paper, InputBase, IconButton, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function SearchBar({
    placeholder = 'Chercher un produit...',
    onSearch = () => { }
}) {
    const [value, setValue] = useState('')

    const handleChange = (e) => {
        setValue(e.target.value)
        onSearch(e.target.value)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch(value)
        }
    }

    return (
        <Box sx={{ my: 3 }}>
            <Paper
                component="form"
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '8px',
                    border: '2px solid transparent',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(11, 16, 32, 0.1)',
                    backgroundColor: '#ffffff',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(11, 16, 32, 0.15)',
                        borderColor: '#c9a34a',
                    },
                    '&:focus-within': {
                        borderColor: '#1fbf73',
                        boxShadow: '0 4px 16px rgba(31, 191, 115, 0.2)',
                    },
                }}
                onSubmit={(e) => {
                    e.preventDefault()
                    onSearch(value)
                }}
            >
                <InputBase
                    sx={{
                        ml: 1,
                        flex: 1,
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '16px',
                        color: '#0b1020',
                        '& ::placeholder': {
                            color: '#9ca3af',
                            opacity: 0.7,
                        },
                    }}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
                <IconButton
                    type="button"
                    sx={{
                        p: '10px',
                        color: '#c9a34a',
                        '&:hover': {
                            backgroundColor: 'rgba(201, 163, 74, 0.1)',
                            color: '#d4ad52',
                        },
                        transition: 'all 0.3s ease',
                    }}
                    onClick={() => onSearch(value)}
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
        </Box>
    )
}
