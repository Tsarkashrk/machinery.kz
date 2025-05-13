'use client'

import { IEquipment, useEquipmentWithImages } from '@/entities/equipment'

import Hero from '@/shared/components/Hero/Hero'
import { PLATFORM_PAGES } from '@/shared/config/pages-url.config'
import { ICON_SIZE } from '@/shared/constants/constants'
import Button from '@/shared/ui/Buttons/Button'
import { SectionWithContent } from '@/shared/ui/SectionWithContent/SectionWithContent'
import Title from '@/shared/ui/Title/Title'
import { TitleMore } from '@/shared/ui/TitleMore/TitleMore'
import { EquipmentList } from '@/widgets/equipment-list'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function HomeSection() {
  const t = useTranslations('HomePage')

  const { data: equipmentList, isLoading, isSuccess } = useEquipmentWithImages()

  return (
    <div className="home-section">
      <div className="home-section__wrapper">
        <Hero />
        <SectionWithContent>
          <Title size="h1">
            {t('popular-equipment')}
            <TitleMore link={PLATFORM_PAGES.CATALOG}>
              {t('all-equipment')} <ChevronRight size={ICON_SIZE} />
            </TitleMore>
          </Title>
          <EquipmentList equipmentList={equipmentList} isLoading={isLoading} />
        </SectionWithContent>
      </div>
    </div>
  )
}
