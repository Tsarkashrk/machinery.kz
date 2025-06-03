'use client'

import { useFavorites } from '@/5-entities/favorite'
import { SectionWithContent } from '@/6-shared/ui/SectionWithContent/SectionWithContent'
import { Title } from '@/6-shared/ui/Title/Title'
import { FavoritesList } from '@/3-widgets/favorites-list/FavoritesList'
import { useTranslations } from 'next-intl'
import { EmptyCard } from '@/6-shared/ui/EmptyCard/EmptyCard'

const FavoritesSection = () => {
  const { favorites, isLoading, isSuccess } = useFavorites()
  const t = useTranslations('FavoritesPage')

  return (
    <section className="favorite-section">
      <SectionWithContent>
        <Title size="h1">{t('title')}</Title>
        {!favorites || favorites.count === 0 ? <EmptyCard>У вас нет избранных публикаций</EmptyCard> : <FavoritesList favoritesList={favorites.results} isLoading={isLoading} />}
      </SectionWithContent>
    </section>
  )
}

export default FavoritesSection
