import { useState } from 'react'

export default function Navbar() {
    const [open, setOpen] = useState(false)
  
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center">
              <img
                src="/assets/logo-Hermine.png"
                alt="Hermine Assainissement"
                className="h-16 sm:h-18"
              />
            </a>
  
            {/* Desktop nav */}
            <div className="hidden items-center gap-8 md:flex">
              <a href="#categories" className="text-sm font-medium text-text hover:text-primary-light transition-colors">
                Catégories
              </a>
              <a href="#panier" className="text-sm font-medium text-text hover:text-primary-light transition-colors">
                Panier
              </a>
              <a href="#myAccount" className="text-sm font-medium text-text hover:text-primary-light transition-colors">
                Mon compte
              </a>
              <a href="#contact" className="text-sm font-medium text-text hover:text-primary-light transition-colors">
                Contact
              </a>
            </div>
  
            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="text-2xl text-primary md:hidden"
              aria-label="Menu"
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
  
        {/* Mobile menu */}
        {open && (
          <div className="border-t border-gray-100 bg-white px-4 pb-4 md:hidden">
            <a href="#services" onClick={() => setOpen(false)} className="block py-3 text-sm font-medium text-text hover:text-primary-light">
              Services
            </a>
            <a href="#zone" onClick={() => setOpen(false)} className="block py-3 text-sm font-medium text-text hover:text-primary-light">
              Zone d'intervention
            </a>
            <a href="#presse" onClick={() => setOpen(false)} className="block py-3 text-sm font-medium text-text hover:text-primary-light">
              Ils parlent de nous
            </a>
            <a href="#contact" onClick={() => setOpen(false)} className="block py-3 text-sm font-medium text-text hover:text-primary-light">
              Contact
            </a>
            <a
              href={PHONE_LINK}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-urgent px-4 py-3 text-sm font-bold text-white"
            >
              <FiPhone />
              URGENCE : {PHONE}
            </a>
          </div>
        )}
      </nav>
    )
  }
  