import './App.css'
import { Toolbar } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import Connection from './views/connection'
import Products from './views/products'
import Register from './views/register'
import Home from './views/home'
import Cart from './views/cart'
import ProductDetail from './views/productDetail'
import Profile from './views/profile'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

// Composant principal de l'application qui intègre le contexte d'authentification et de panier, le routage avec React Router, 
// et les composants de navigation, pied de page et chatbot.
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Toolbar /> {/* Add spacing for fixed AppBar */}
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/connection" element={<Connection />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
            <Footer />
            <Chatbot />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
