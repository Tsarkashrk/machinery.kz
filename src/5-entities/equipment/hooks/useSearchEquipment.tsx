import { equipmentApi } from '@/6-shared/api'
import { useQuery } from '@tanstack/react-query'
import { IEquipmentData } from '../../../5-entities/equipment/model/equipment.model'

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
