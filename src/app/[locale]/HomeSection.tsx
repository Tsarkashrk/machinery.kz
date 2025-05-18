'use client'

import { CategoryList } from '@/entities/category'
import { useCategories } from '@/entities/category/hooks/useCategories'
import { IEquipment, useEquipmentWithImages } from '@/entities/equipment'

import Hero from '@/shared/components/Hero/Hero'
import { PLATFORM_PAGES } from '@/shared/config/pages-url.config'
import { ICON_SIZE } from '@/shared/constants/constants'
import Button from '@/shared/ui/Buttons/Button'
import { Loading } from '@/shared/ui/Loading/Loading'
import { SectionWithContent } from '@/shared/ui/SectionWithContent/SectionWithContent'
import Title from '@/shared/ui/Title/Title'
import { TitleMore } from '@/shared/ui/TitleMore/TitleMore'
import { EquipmentList } from '@/widgets/equipment-list'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function HomeSection() {
  const t = useTranslations('HomePage')

  const { data: equipmentListData, isLoading, isSuccess } = useEquipmentWithImages()
  const { categories, isLoading: isCategoriesLoading } = useCategories()

  return (
    <div className="home-section">
      <div className="home-section__wrapper">
        <Hero />
        <SectionWithContent>
          <Title size="h1">
            {t('popular-equipment-categories')}
            <TitleMore link={PLATFORM_PAGES.CATEGORIES}>
              {t('all-equipment-categories')} <ChevronRight size={ICON_SIZE} />
            </TitleMore>
          </Title>
          {isCategoriesLoading ? <Loading /> : categories && <CategoryList categories={categories.slice(0, 11)} />}
        </SectionWithContent>

        <SectionWithContent>
          <Title size="h1">
            {t('popular-machinery-categories')}
            <TitleMore link={PLATFORM_PAGES.CATEGORIES}>
              {t('all-machinery-categories')} <ChevronRight size={ICON_SIZE} />
            </TitleMore>
          </Title>
          {isCategoriesLoading ? <Loading /> : categories && <CategoryList categories={categories.slice(11, 22)} />}
        </SectionWithContent>

        <SectionWithContent>
          <Title size="h1">
            {t('popular-equipment-categories')}
            <TitleMore link={PLATFORM_PAGES.CATEGORIES}>
              {t('all-equipment-categories')} <ChevronRight size={ICON_SIZE} />
            </TitleMore>
          </Title>
          <EquipmentList equipmentList={equipmentListData} isLoading={isLoading} />
        </SectionWithContent>
      </div>
    </div>
  )
}
