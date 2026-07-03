import { ProductGrid } from '../components/ProductGrid/ProductGrid'
import { CatalogBlock } from '../components/CatalogBlock/CatalogBlock'
import { ReviewsBlock } from '../components/ReviewsBlock/ReviewsBlock'
import { products } from '../data/products'

export default function HomePage() {
  return (
    <>
      <ProductGrid products={products} />
      <CatalogBlock />
      <ReviewsBlock />
    </>
  )
}
