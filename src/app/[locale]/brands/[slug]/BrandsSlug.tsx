'use client'

import Card from '@/6-shared/ui/Cards/Card/Card'
import React from 'react'
import { useParams } from 'next/navigation'
import { BrandHeader, useBrandSearch } from '@/5-entities/brand'
import Image from 'next/image'
import { EquipmentList } from '@/3-widgets/equipment-list'
import { useEquipmentWithImages } from '@/5-entities/equipment'
import { Title } from '@/6-shared/ui/Title/Title'
import { useTranslations } from 'next-intl'
import { TitleMore } from '@/6-shared/ui/TitleMore/TitleMore'
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config'
import { ChevronRight } from 'lucide-react'
import { ICON_SIZE } from '@/6-shared/constants/constants'

const BrandsSlug = () => {
  const params = useParams()
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug

  const { brand, isLoading, isSuccess } = useBrandSearch(slug || '')
  const { data: equipmentList } = useEquipmentWithImages({ brand: brand?.id })

  const t = useTranslations('BrandPage')

  console.log('Brand data:', brand)

  if (!brand || !isSuccess) {
    return (
      <section className="brands-slug">
        <div className="brands-slug__wrapper">
          <Card>
            <div>Brand not found</div>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="brands-slug">
      <div className="brands-slug__wrapper">
        <Title>
          {t('title')} {brand.name}
        </Title>
        <BrandHeader id={brand.id} logoUrl={brand.file} name={brand.name} description={brand.description} foundedYear={brand.founded_year} />
        <Title size="h2">
          {t('brands-equipment')}
        </Title>
        <EquipmentList equipmentList={equipmentList} isLoading={false} />
        <Title size="h2">
          {t('brands-machinery')}
          <TitleMore link={PLATFORM_PAGES.CATEGORIES}>
            {t('brands-all-machinery')} <ChevronRight size={ICON_SIZE} />
          </TitleMore>
        </Title>
      </div>
    </section>
  )
}

export default BrandsSlug
