'use client'

import React from 'react'
import { useCategories } from '@/entities/category/hooks/useCategories'
import { useEquipmentList } from '@/entities/equipment'
import { CategoryList } from '@/entities/category'
import { EquipmentList } from '@/widgets/equipment-list'
import { useTranslations } from 'next-intl'
import { SectionWithContent } from '@/shared/ui/SectionWithContent/SectionWithContent'
import Title from '@/shared/ui/Title/Title'
import { Loading } from '@/shared/ui/Loading/Loading'

const CatalogSection = () => {
  // const { equipmentList, isLoading: isEquipmentListLoading } = useEquipmentList()

  const { categories, isLoading: isCategoriesLoading } = useCategories()

  const t = useTranslations('CatalogPage')

  return (
    <section className="catalog-section">
      <div className="catalog-section__wrapper">
        <SectionWithContent>
          <Title size="h1">{t('categories')}</Title>
          <div className="catalog-section__categories">{isCategoriesLoading ? <Loading /> : categories && <CategoryList categories={categories} />}</div>
        </SectionWithContent>
        {/* <div className="catalog-section__categories">{isEquipmentListLoading ? loadingContent : categories && <CategoryList categories={categories} />}</div> */}
        {/* <div className="catalog-section__block">
            <h1 className="catalog-section__title">{t('equipment-catalog')}</h1>
            {isCategoriesLoading ? loadingContent : equipmentList && <EquipmentList equipmentList={equipmentList} />}
          </div> */}
      </div>
    </section>
  )
}

export default CatalogSection
