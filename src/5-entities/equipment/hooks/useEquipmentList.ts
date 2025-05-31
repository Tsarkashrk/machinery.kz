import { equipmentApi } from '@/6-shared/api'
import { useQuery } from '@tanstack/react-query'
import { IEquipmentResponse } from '../model/equipment.model'

export const useEquipmentList = () => {
  const { data, isLoading, isSuccess } = useQuery<IEquipmentResponse>({
    queryKey: ['equipment'],
    queryFn: () => equipmentApi.getAllEquipment(),
  })

  return {
    data,
    isLoading,
    isSuccess,
  }
}
