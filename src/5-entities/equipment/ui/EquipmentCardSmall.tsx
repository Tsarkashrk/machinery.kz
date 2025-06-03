import React from 'react'
import { IEquipment, IEquipmentWithImage } from '../model/equipment.model'
import Image from 'next/image'
import { Title } from '@/6-shared/ui/Title/Title'
import { TitleDescription } from '@/6-shared/ui/TitleDescription/TitleDescription'
import Link from 'next/link'
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config'

interface Props {
  equipment: IEquipment
}

export const EquipmentCardSmall = ({ equipment }: Props) => {
  return (
    <Link href={`${PLATFORM_PAGES.PRODUCT}/${equipment.id}`} className="equipment-card equipment-card--small">
      <Image className="equipment-card__image" src="/assets/eq1.webp" width={50} height={50} alt={''} />
      <div className="equipment-card__info">
        <Title size="h2">{equipment.name}</Title>
        <TitleDescription color="gray">{equipment.description}</TitleDescription>
      </div>
    </Link>
  )
}
