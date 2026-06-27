import { ProductGrid } from '../components/ProductGrid/ProductGrid'
import { products } from '../data/products'

export default function HomePage() {
  return <ProductGrid products={products} />
}
