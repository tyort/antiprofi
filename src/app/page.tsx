import dynamic from 'next/dynamic'
import { ProductGrid } from '../components/ProductGrid/ProductGrid'
import { products } from '../data/products'

const CatalogBlock = dynamic(
  () => import('../components/CatalogBlock/CatalogBlock').then((module) => module.CatalogBlock),
  {
    loading: () => <section aria-hidden="true" style={{ minHeight: 520 }} />,
  }
)

const ReviewsBlock = dynamic(
  () => import('../components/ReviewsBlock/ReviewsBlock').then((module) => module.ReviewsBlock),
  {
    loading: () => <section aria-hidden="true" style={{ minHeight: 460 }} />,
  }
)

export default function HomePage() {
  return (
    <>
      <ProductGrid products={products} />
      <CatalogBlock />
      <ReviewsBlock />
    </>
  )
}
