import { products } from './data/products'
import { ProductGrid } from './components/ProductGrid/ProductGrid'
import { Header } from './components/Header/Header'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <ProductGrid products={products} />
      </main>
    </>
  )
}

export default App
