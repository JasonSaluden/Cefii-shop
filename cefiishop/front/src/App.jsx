import logo from './logo.svg'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Cefii Shop</p>
      </header>
      <Navbar />
    </div>
  )
}

export default App
