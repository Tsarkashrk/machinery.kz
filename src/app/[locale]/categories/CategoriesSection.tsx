'use client'

import { useCategories } from '@/5-entities/category/hooks/useCategories'
import { CategoryList } from '@/5-entities/category'
import { useTranslations } from 'next-intl'
import { SectionWithContent } from '@/6-shared/ui/SectionWithContent/SectionWithContent'
import { Title } from '@/6-shared/ui/Title/Title'
import { Loading } from '@/6-shared/ui/Loading/Loading'
import { useState } from 'react'
import Button from '@/6-shared/ui/Buttons/Button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { ICON_SIZE } from '@/6-shared/constants/constants'

const CategoriesSection = () => {
  const { categories, isLoading: isCategoriesLoading } = useCategories()
  const [fullCategoryList, setFullCategoryList] = useState<boolean>(false)

  const t = useTranslations('CategoriesPage')

  const toggleMoreCategories = () => {
    setFullCategoryList(!fullCategoryList)
  }

  return (
    <section className="categories-section">
      <div className="categories-section__wrapper">
        <SectionWithContent>
          <Title size="h1">{t('categories')}</Title>
          <Title size="h2">{t('equipment-categories')}</Title>
          <div className="categories-section__categories">{isCategoriesLoading ? <Loading /> : categories && <CategoryList categories={categories.slice(0, fullCategoryList ? 22 : 11)} />}</div>
          <div className="categories-section__more">
            <Button
              variant="underlined"
              onClick={() => {
                toggleMoreCategories()
              }}>
              {fullCategoryList ? `Скрыть категории` : `Показать все категории`}
              {fullCategoryList ? <ChevronUp size={ICON_SIZE} /> : <ChevronDown size={ICON_SIZE} />}
            </Button>
          </div>
          <Title size="h2">{t('machinery-categories')}</Title>
          <div className="categories-section__categories">{isCategoriesLoading ? <Loading /> : categories && <CategoryList categories={categories.slice(22, 100)} />}</div>
        </SectionWithContent>
      </div>
    </section>
  )
}

export default CategoriesSection
