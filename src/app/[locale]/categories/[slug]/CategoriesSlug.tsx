'use client'

import { EquipmentList } from '@/3-widgets/equipment-list'
import { EquipmentFilter } from '@/4-features/filter'
import { useCategories, useCategoryById } from '@/5-entities/category'
import { useEquipmentList } from '@/5-entities/equipment'
import { SectionWithContent } from '@/6-shared/ui/SectionWithContent/SectionWithContent'
import { Title } from '@/6-shared/ui/Title/Title'
import { useParams } from 'next/navigation'
import React, { useState, useCallback } from 'react'
import type { IEquipmentFilters } from '@/4-features/filter'
import { EmptyCard } from '@/6-shared/ui/EmptyCard/EmptyCard'

const CategoriesSlug = () => {
  const { slug } = useParams()
  const baseFilters = {
    category: Number(slug),
    page: 1,
    page_size: 20,
  }
  const [filters, setFilters] = useState<IEquipmentFilters>(baseFilters)

  const { data: equipmentList, isLoading } = useEquipmentList(filters)
  const { category, isLoading: categoryLoading } = useCategoryById(Number(slug))

  const handleFiltersChange = useCallback(
    (newFilters: IEquipmentFilters) => {
      setFilters({
        ...newFilters,
        category: Number(slug),
      })
    },
    [slug],
  )

  return (
    <section className="categories-slug">
      <div className="categories-slug__wrapper">
        <SectionWithContent>
          <Title>{category?.name}</Title>

          <EquipmentFilter onFiltersChange={handleFiltersChange} initialFilters={filters} className="mb-6" />

          {!equipmentList || equipmentList.count === 0 ? <EmptyCard>По вашему поиску публикаций не найдено</EmptyCard> : <EquipmentList equipmentList={equipmentList?.results} isLoading={isLoading} />}
        </SectionWithContent>
      </div>
    </section>
  )
}

export default CategoriesSlug
