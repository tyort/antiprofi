import { products } from './data/products'
import { ProductGrid } from './components/ProductGrid/ProductGrid'
import './App.css'

function App() {
  return (
    <>
      <ProductGrid products={products} />
    </>
  )
}

export default App
