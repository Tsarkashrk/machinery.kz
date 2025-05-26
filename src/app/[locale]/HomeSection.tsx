'use client'

import { CategoryList } from '@/5-entities/category'
import { useCategories } from '@/5-entities/category/hooks/useCategories'
import { useEquipmentWithImages } from '@/5-entities/equipment'

import { Hero } from '@/6-shared/ui/Hero/Hero'
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config'
import { ICON_SIZE } from '@/6-shared/constants/constants'
import { Loading } from '@/6-shared/ui/Loading/Loading'
import { SectionWithContent } from '@/6-shared/ui/SectionWithContent/SectionWithContent'
import { Title } from '@/6-shared/ui/Title/Title'
import { TitleMore } from '@/6-shared/ui/TitleMore/TitleMore'
import { EquipmentList } from '@/3-widgets/equipment-list'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { BrandsList, useBrands } from '@/5-entities/brand'

export default function HomeSection() {
  const t = useTranslations('HomePage')

  const { data: equipmentListData, isLoading, isSuccess } = useEquipmentWithImages()
  const { brands, isLoading: isBrandsLoading } = useBrands()
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
          {isCategoriesLoading ? <Loading /> : categories && <CategoryList categories={categories.slice(0, 5)} />}
        </SectionWithContent>

        <SectionWithContent>
          <Title size="h1">
            {t('popular-machinery-categories')}
            <TitleMore link={PLATFORM_PAGES.CATEGORIES}>
              {t('all-machinery-categories')} <ChevronRight size={ICON_SIZE} />
            </TitleMore>
          </Title>
          {isCategoriesLoading ? <Loading /> : categories && <CategoryList categories={categories.slice(23, 26)} />}
        </SectionWithContent>

        <SectionWithContent>
          <Title size="h1">
            {t('popular-equipment')}
            <TitleMore link={PLATFORM_PAGES.CATEGORIES}>
              {t('all-equipment')} <ChevronRight size={ICON_SIZE} />
            </TitleMore>
          </Title>
          <EquipmentList equipmentList={equipmentListData} isLoading={isLoading} />
        </SectionWithContent>

        <SectionWithContent>
          <Title size="h1">
            {t('popular-brands')}
            <TitleMore link={PLATFORM_PAGES.BRANDS}>
              {t('all-brands')} <ChevronRight size={ICON_SIZE} />
            </TitleMore>
          </Title>
          <BrandsList brands={brands} />
        </SectionWithContent>
      </div>
    </div>
  )
}
