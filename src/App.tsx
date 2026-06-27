import { Routes, Route } from 'react-router-dom'
import { products } from './data/products'
import { ProductGrid } from './components/ProductGrid/ProductGrid'
import { ProductDetails } from './pages/ProductDetails/ProductDetails'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ProductGrid products={products} />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
