'use client'

import { useFavorites } from '@/entities/favorite'
import { EquipmentList } from '@/widgets/equipment-list'
import { FavoritesList } from '@/widgets/favorites-list/FavoritesList'

const FavoritesSection = () => {
  const { favorites, isLoading, isSuccess } = useFavorites()

  return (
    <section className="favorite">
      <FavoritesList favoritesList={favorites} />
    </section>
  )
}

export default FavoritesSection
