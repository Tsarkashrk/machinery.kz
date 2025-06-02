import { equipmentApi } from '@/6-shared/api'
import { useQuery } from '@tanstack/react-query'
import { IEquipment } from '../model/equipment.model'

export const useEquipmentById = (id: number): { equipmentData: IEquipment | undefined; isLoading: boolean; isSuccess: boolean } => {
  const { data, isLoading, isSuccess } = useQuery<IEquipment>({
    queryKey: ['equipment', id],
    queryFn: () => equipmentApi.getEquipmentById(id),
  })

  return { equipmentData: data, isLoading, isSuccess }
}
