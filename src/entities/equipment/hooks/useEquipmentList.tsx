import { equipmentApi } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'

export const useEquipmentList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['equipment'],
    queryFn: equipmentApi.getAllEquipment,
  })

  return {
    equipmentList: data || [],
    isLoading,
    error,
  }
}
