import React from 'react'
import { IEquipmentWithImage } from '../model/equipment.model'

interface Props {
  equipment: IEquipmentWithImage
}

export const EquipmentCardSmall: React.FC<Props> = ({ equipment }) => {
  return (
    <div className={'equipment-card'}>
      <img src={equipment.image} alt={equipment.name} className="equipment-card__image" />
      <div className="equipment-card__info">
        <h4 className="equipment-card__name">{equipment.name}</h4>
      </div>
    </div>
  )
}
