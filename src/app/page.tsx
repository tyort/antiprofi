import { ProductGrid } from '../components/ProductGrid/ProductGrid'
import { HomeDeferredSections } from '../components/HomeDeferredSections/HomeDeferredSections'
import { products } from '../data/products'

export default function HomePage() {
  return (
    <>
      <ProductGrid products={products} />
      <HomeDeferredSections />
    </>
  )
}
