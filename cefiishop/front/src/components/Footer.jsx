import { useState } from 'react'
import './Footer.css'
import logo from '../assets/logo.png'

export default function Footer() {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleNewsletterSubmit = (e) => {
        e.preventDefault()
        if (email) {
            setSubscribed(true)
            setEmail('')
            setTimeout(() => setSubscribed(false), 3000)
        }
    }

    return (
        <footer className="footer">
            {/* Newsletter Section */}
            <div className="footer-newsletter">
                <div className="newsletter-content">
                    <h3>Rejoignez notre communauté</h3>
                    <p>Recevez les nouveautés dragon et offres exclusives</p>
                    <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                        <input
                            type="email"
                            placeholder="Votre email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn-subscribe">
                            S'abonner
                        </button>
                    </form>
                    {subscribed && (
                        <p className="success-message">✓ Merci! Vérifiez votre email</p>
                    )}
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="footer-content">
                <div className="footer-section footer-brand">
                    <div className="footer-logo">
                        <img src={logo} alt="CefiiShop Dragons Logo" />
                    </div>
                    <p className="brand-desc">
                        Votre destination premium pour les produits de dragons authentiques et majestueux
                    </p>
                    <div className="social-links">
                        <a href="https://facebook.com/DragonShop" className="social-icon" aria-label="Facebook">
                            f
                        </a>
                        <a href="https://instagram.com/DragonShop" className="social-icon" aria-label="Instagram">
                            📷
                        </a>
                        <a href="https://twitter.com/DragonShop" className="social-icon" aria-label="Twitter">
                            𝕏
                        </a>
                        <a href="https://discord.com/invite/DragonShop" className="social-icon" aria-label="Discord">
                            💬
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h5>Boutique</h5>
                    <ul>
                        <li>
                            <a href="/products">Tous les produits</a>
                        </li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h5>Informations</h5>
                    <ul>
                        <li>
                            <a href="#about">À propos</a>
                        </li>
                        <li>
                            <a href="#faq">FAQ</a>
                        </li>
                        <li>
                            <a href="#shipping">Livraison</a>
                        </li>
                        <li>
                            <a href="#returns">Retours</a>
                        </li>
                        <li>
                            <a href="#contact">Contact</a>
                        </li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h5>Légal</h5>
                    <ul>
                        <li>
                            <a href="/privacy">Politique de confidentialité</a>
                        </li>
                        <li>
                            <a href="/terms">Conditions d'utilisation</a>
                        </li>
                        <li>
                            <a href="/cookies">Gestion des cookies</a>
                        </li>
                        <li>
                            <a href="/mentions">Mentions légales</a>
                        </li>
                    </ul>
                </div>

                <div className="footer-section footer-contact">
                    <h5>Nous contacter</h5>
                    <div className="contact-info">
                        <p>
                            📧 <a href="mailto:hello@DragonShop.com">hello@DragonShop.com</a>
                        </p>
                        <p>📞 +33 (0)1 23 45 67 89</p>
                        <p>📍 42 Rue du Dragon, 75004 Paris</p>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p className="copyright">
                        &copy; {new Date().getFullYear()} CefiiShop Dragons. Tous droits réservés.
                    </p>
                    <div className="payment-methods">
                        <span className="payment-label">Paiements acceptés :</span>
                        <span className="payment-icon">💳</span>
                        <span className="payment-icon">🏦</span>
                        <span className="payment-icon">📱</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
