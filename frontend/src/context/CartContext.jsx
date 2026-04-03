import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

// Fournit le contexte du panier pour l'application, permettant de gérer les produits ajoutés au panier, 
// les quantités, et les fonctions d'ajout/suppression/mise à jour du panier. 
// Le panier est également synchronisé avec le localStorage pour persister les données entre les sessions.
export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('cart')) || []
        } catch {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (product, image) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.idProduct === product.idProduct)
            if (existing) {
                return prev.map(i =>
                    i.idProduct === product.idProduct
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                )
            }
            return [...prev, {
                idProduct: product.idProduct,
                nom: product.nom,
                prix: product.prix,
                categoryNom: product.categoryNom,
                stock: product.stock,
                image,
                quantity: 1,
            }]
        })
    }

    const removeFromCart = (idProduct) => {
        setCartItems(prev => prev.filter(i => i.idProduct !== idProduct))
    }

    const updateQuantity = (idProduct, quantity) => {
        if (quantity < 1) return
        setCartItems(prev =>
            prev.map(i => i.idProduct === idProduct ? { ...i, quantity } : i)
        )
    }

    const clearCart = () => setCartItems([])

    const totalItems = cartItems.reduce((acc, i) => acc + i.quantity, 0)

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)
