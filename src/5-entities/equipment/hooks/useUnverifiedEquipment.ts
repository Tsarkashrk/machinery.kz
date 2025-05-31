import { equipmentApi } from '@/6-shared/api'
import { useQuery } from '@tanstack/react-query'
import { IEquipmentResponse } from '../model/equipment.model'

type Props = {
  brand?: number
  available_for_rent?: boolean
  available_for_sale?: boolean
  category?: number
  max_price?: number
  max_rental_rate?: number
  max_year?: number
  min_price?: number
  min_rental_rate?: number
  min_year?: number
  ordering?: string
  page?: number
  page_size?: number
  search?: string
  year?: number
}

export const useUnverifiedEquipment = (params: Props) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['equipment', 'unverified', params],
    queryFn: () => equipmentApi.getUnverifiedEquipment(params),
  })

  return {
    data,
    isLoading,
    isSuccess,
  }
}
