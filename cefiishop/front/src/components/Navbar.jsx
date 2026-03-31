import React, { useState, useEffect } from 'react'
import Olivier from '../assets/Olivier.jpg'
import './Navbar.css'

export default function Navbar() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        // prevent background scroll when mobile menu is open
        document.body.style.overflow = open ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [open])

    return (
        <nav className="navbar">
            <div className="nav-container">
                <a href="/" className="logo">
                    <img src={Olivier} alt="Cefii Shop" />
                </a>

                <div className="nav-links desktop">
                    <a href="/" className="nav-link">Accueil</a>
                    <a href="/connection" className="nav-link">Se connecter</a>
                    <a href="/register" className="nav-link">S'inscrire</a>
                </div>

                <button
                    className={`hamburger ${open ? 'active' : ''}`}
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle navigation"
                    aria-expanded={open}
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            <div className={`mobile-menu ${open ? 'open' : ''}`}
                role="dialog"
                aria-hidden={!open}
            >
                <a href="/" onClick={() => setOpen(false)} className="mobile-link">Accueil</a>
                <a href="/connection" onClick={() => setOpen(false)} className="mobile-link">Se connecter</a>
                <a href="/register" onClick={() => setOpen(false)} className="mobile-link">S'inscrire</a>
            </div>
        </nav>
    )
}
