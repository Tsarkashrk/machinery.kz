import { Metadata } from 'next'
import FavoritesSection from './FavoritesSection'

export const metadata: Metadata = {
  title: 'Favorites',
}

const FavoritesPage = () => {
  return <FavoritesSection />
}

export default FavoritesPage
