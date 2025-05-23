import { equipmentApi } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'
import { IEquipment, IEquipmentData } from '../../../entities/equipment/model/equipment.model'

export const useSearchEquipment = (query: string) => {
  const { data, isLoading, isSuccess } = useQuery<IEquipmentData>({
    queryKey: ['equipment', query],
    queryFn: () => equipmentApi.searchEquipment(query),
    enabled: !!query,
  })

  return {
    data,
    isLoading,
    isSuccess,
  }
}
