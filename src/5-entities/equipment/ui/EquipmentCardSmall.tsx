import React from 'react'
import { IEquipmentWithImage } from '../model/equipment.model'
import Image from 'next/image'
import { Title } from '@/6-shared/ui/Title/Title'
import { TitleDescription } from '@/6-shared/ui/TitleDescription/TitleDescription'
import Link from 'next/link'

interface Props {
  equipment: IEquipmentWithImage
}

export const EquipmentCardSmall = ({ equipment }: Props) => {
  return (
    <Link href={`${equipment.id}`} className="equipment-card equipment-card--small">
      <Image className="equipment-card__image" src="/assets/eq1.webp" width={50} height={50} alt={''} />
      <div className="equipment-card__info">
        <Title size="h2">{equipment.name}</Title>
        <TitleDescription color="gray">{equipment.description}</TitleDescription>
      </div>
    </Link>
  )
}
