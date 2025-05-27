'use client'

import { EquipmentList } from '@/3-widgets/equipment-list'
import { useCategories, useCategoryById } from '@/5-entities/category'
import { useEquipmentWithImages } from '@/5-entities/equipment'
import { SectionWithContent } from '@/6-shared/ui/SectionWithContent/SectionWithContent'
import { Title } from '@/6-shared/ui/Title/Title'
import { useParams } from 'next/navigation'
import React from 'react'

const CategoriesSlug = () => {
  const { slug } = useParams()

  const { data: equipmentList, isLoading } = useEquipmentWithImages({ category: Number(slug) })
  const { category, isLoading: categoryLoading } = useCategoryById(Number(slug))

  return (
    <section className="categories-slug">
      <div className="categories-slug__wrapper">
        <SectionWithContent>
          <Title>{category?.name}</Title>
          <EquipmentList equipmentList={equipmentList} isLoading={false} />
        </SectionWithContent>
      </div>
    </section>
  )
}

export default CategoriesSlug
