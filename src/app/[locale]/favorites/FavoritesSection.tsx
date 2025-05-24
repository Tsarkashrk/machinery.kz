'use client'

import { useFavorites } from '@/entities/favorite'
import { SectionWithContent } from '@/6-shared/ui/SectionWithContent/SectionWithContent'
import Title from '@/6-shared/ui/Title/Title'
import { FavoritesList } from '@/widgets/favorites-list/FavoritesList'
import { useTranslations } from 'next-intl'

const FavoritesSection = () => {
  const { favorites, isLoading, isSuccess } = useFavorites()
  const t = useTranslations('FavoritesPage')

  return (
    <section className="favorite">
      <SectionWithContent>
        <Title size="h1">{t('title')}</Title>
        <FavoritesList favoritesList={favorites} isLoading={isLoading} />
      </SectionWithContent>
    </section>
  )
}

export default FavoritesSection
