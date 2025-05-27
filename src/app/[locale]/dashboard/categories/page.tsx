import { Metadata } from 'next'
import { CategoriesSection } from './CategoriesSection'

export const metadata: Metadata = {
  title: 'Категории',
}

const CategoriesPage = () => {
  return <CategoriesSection />
}

export default CategoriesPage
