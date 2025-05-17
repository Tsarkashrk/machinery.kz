'use client'

import { EquipmentCardSmall } from '@/entities/equipment'
import { IEquipmentWithImage } from '@/entities/equipment/model/equipment.model'
import { EquipmentCard } from '@/widgets/equipment-card'

type Props = {
  equipmentList: IEquipmentWithImage[]
  isLoading: boolean
  variant?: 'default' | 'small'
}

export const EquipmentList = ({ equipmentList, isLoading, variant = 'default' }: any) => {
  if (isLoading) return <div>Loading...</div>

  return (
    <div className="equipment-list">
      {equipmentList?.map((equipment: IEquipmentWithImage) => (variant === 'default' 
      ? 
      <EquipmentCard 
      key={equipment.id} 
      id={equipment.id} 
      name={equipment.name} 
      available_for_rent={equipment.available_for_rent} 
      daily_rental_rate={equipment.daily_rental_rate} 
      purchase_price={equipment.purchase_price} /> 
      : 
      <EquipmentCardSmall 
      key={equipment.id} 
      equipment={equipment} />))}
    </div>
  )
}
