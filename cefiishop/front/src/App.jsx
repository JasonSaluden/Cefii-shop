import logo from './logo.svg'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Connection from './views/connection'
import Register from './views/register'
import Chatbot from './components/Chatbot'

function Home() {
  return (
    <div className="p-8">
      <header className="App-header mb-6">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Cefii Shop</p>
      </header>
      <div className="space-x-4">
        <Link to="/connection" className="px-4 py-2 bg-primary text-white rounded">Se connecter</Link>
        <Link to="/register" className="px-4 py-2 border rounded">S'inscrire</Link>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <main className="mt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/connection" element={<Connection />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Chatbot />
      </div>
    </BrowserRouter>
  )
}

export default App
