'use client'

import { EquipmentCard } from '@/entities/equipment'
import { useEquipmentList } from '@/entities/equipment'
import { IEquipment } from '@/entities/equipment/model/equipment.model'

export const EquipmentList = () => {
  const { equipmentList, isLoading, error } = useEquipmentList()

  return (
    <div>
      {equipmentList?.map((equipment: IEquipment) => (
        <EquipmentCard key={equipment.id} equipment={equipment} />
      ))}
    </div>
  )
}
