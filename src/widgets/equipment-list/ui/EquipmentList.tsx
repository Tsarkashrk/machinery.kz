'use client'

import { IEquipment, IEquipmentWithImage } from '@/entities/equipment/model/equipment.model'
import { EquipmentCard } from '@/widgets/equipment-card'

type Props = {
  equipmentList: IEquipmentWithImage[]
  isLoading: boolean
}

export const EquipmentList = ({ equipmentList, isLoading }: Props) => {
  return isLoading ? (
    'loading'
  ) : (
    <div className="equipment-list">
      {equipmentList?.map((equipment: IEquipmentWithImage) => (
        <EquipmentCard key={equipment.id} id={equipment.id} name={equipment.name} available_for_rent={equipment.available_for_rent} daily_rental_rate={equipment.daily_rental_rate} purchase_price={equipment.purchase_price} />
      ))}
    </div>
  )
}
