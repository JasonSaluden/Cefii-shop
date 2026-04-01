import './App.css'
import { Toolbar } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Chatbot from './components/Chatbot'
import Connection from './views/connection'
import Products from './views/products'
import Register from './views/register'
import Home from './views/home'
import Cart from './views/cart'
import ProductDetail from './views/productDetail'
import { CartProvider } from './context/CartContext'

function App() {
  return (
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
          </Routes>
        </main>
        <Chatbot />
      </div>
    </BrowserRouter>
    </CartProvider>
  )
}

export default App
