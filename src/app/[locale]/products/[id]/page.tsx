import { Metadata } from 'next'
import { ProductIdSection } from './ProductsIdSection'

export const metadata: Metadata = {
  title: 'Объявление',
}

export default function ProductsIdPage() {
  return <ProductIdSection />
}
