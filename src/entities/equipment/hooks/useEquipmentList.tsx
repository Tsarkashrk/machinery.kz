import { equipmentApi } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'
import { IEquipment } from '../model/equipment.model'

export const useEquipmentList = () => {
  const { data, isLoading, isSuccess } = useQuery<IEquipment[]>({
    queryKey: ['equipment'],
    queryFn: equipmentApi.getAllEquipment,
  })

  return {
    equipmentList: data || [],
    isLoading,
    isSuccess,
  }
}
