import { Metadata } from 'next'
import { BrandsSection } from './BrandsSection'

export const metadata: Metadata = {
  title: 'Бренды',
}

const BrandsPage = () => {
  return <BrandsSection />
}

export default BrandsPage
