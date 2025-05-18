'use client'

import { useCategories } from '@/entities/category/hooks/useCategories'
import { CategoryList } from '@/entities/category'
import { useTranslations } from 'next-intl'
import { SectionWithContent } from '@/shared/ui/SectionWithContent/SectionWithContent'
import Title from '@/shared/ui/Title/Title'
import { Loading } from '@/shared/ui/Loading/Loading'

const CategoriesSection = () => {
  // const { equipmentList, isLoading: isEquipmentListLoading } = useEquipmentList()

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
