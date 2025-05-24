'use client'

import { useCategories } from '@/5-entities/category/hooks/useCategories'
import { CategoryList } from '@/5-entities/category'
import { useTranslations } from 'next-intl'
import { SectionWithContent } from '@/6-shared/ui/SectionWithContent/SectionWithContent'
import Title from '@/6-shared/ui/Title/Title'
import { Loading } from '@/6-shared/ui/Loading/Loading'

const CategoriesSection = () => {
  const { categories, isLoading: isCategoriesLoading } = useCategories()

  const t = useTranslations('CategoriesPage')

  return (
    <section className="categories-section">
      <div className="categories-section__wrapper">
        <SectionWithContent>
          <Title size="h1">{t('categories')}</Title>
          <Title size="h2">{t('equipment-categories')}</Title>
          <div className="categories-section__categories">{isCategoriesLoading ? <Loading /> : categories && <CategoryList categories={categories} />}</div>
          <Title size="h2">{t('machinery-categories')}</Title>
          <div className="categories-section__categories">{isCategoriesLoading ? <Loading /> : categories && <CategoryList categories={[...categories].reverse()} />}</div>
        </SectionWithContent>
      </div>
    </section>
  )
}

export default CategoriesSection
