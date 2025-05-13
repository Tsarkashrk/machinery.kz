'use client'

import { IEquipment, useEquipmentWithImages } from '@/entities/equipment'
import Hero from '@/shared/components/Hero/Hero'
import { SectionWithContent } from '@/shared/ui/SectionWithContent/SectionWithContent'
import Title from '@/shared/ui/Title/Title'
import { EquipmentList } from '@/widgets/equipment-list'
import { useTranslations } from 'next-intl'

export default function HomeSection() {
  const t = useTranslations('HomePage')

  const { data: equipmentList, isLoading, isSuccess } = useEquipmentWithImages()

  return (
    <div className="home-section">
      <div className="home-section__wrapper">
        <Hero />
        <SectionWithContent>
          <Title text={t('popular-equipment')} size="h1" />
          <EquipmentList equipmentList={equipmentList} isLoading={isLoading} />
        </SectionWithContent>
      </div>
    </div>
  )
}
