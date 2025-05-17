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

const CategoriesSection = () => {
  // const { equipmentList, isLoading: isEquipmentListLoading } = useEquipmentList()

  const { categories, isLoading: isCategoriesLoading } = useCategories()

  const t = useTranslations('CategoriesPage')

  return (
    <section className="categories-section">
      <div className="categories-section__wrapper">
        <SectionWithContent>
          <Title size="h1">{t('categories')}</Title>
          <div className="categories-section__categories">{isCategoriesLoading ? <Loading /> : categories && <CategoryList categories={categories} />}</div>
        </SectionWithContent>
        {/* <div className="categories-section__categories">{isEquipmentListLoading ? loadingContent : categories && <CategoryList categories={categories} />}</div> */}
        {/* <div className="categories-section__block">
            <h1 className="categories-section__title">{t('equipment-categories')}</h1>
            {isCategoriesLoading ? loadingContent : equipmentList && <EquipmentList equipmentList={equipmentList} />}
          </div> */}
      </div>
    </section>
  )
}

export default CategoriesSection
