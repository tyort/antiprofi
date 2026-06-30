import { ProductGrid } from '../components/ProductGrid/ProductGrid'
import { ReviewsBlock } from '../components/ReviewsBlock/ReviewsBlock'
import { products } from '../data/products'

export default function HomePage() {
  return (
    <>
      <ProductGrid products={products} />
      <ReviewsBlock />
    </>
  )
}
