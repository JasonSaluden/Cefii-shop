import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toolbar } from '@mui/material'
import Connection from './views/connection'
import Register from './views/register'
import Chatbot from './components/Chatbot'
import Home from './views/home'
import Cart from './views/cart'
import Products from './views/products'

function App() {
  return (
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
          </Routes>
        </main>
        <Chatbot />
      </div>
    </BrowserRouter>
  )
}

export default App
