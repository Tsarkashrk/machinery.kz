import { axiosClassic, axiosWithAuth } from './interceptors'
import { useQuery } from '@tanstack/react-query'

const BASE_URL = '/equipment-categories/'

export const categoriesApi = {
  getCategories: async () => {
    const { data } = await axiosClassic.get(BASE_URL)
    return data
  },
}

export const useEquipmentCategories = () => {
  return useQuery({
    queryKey: ['equipmentCategories'],
    queryFn: () => categoriesApi.getCategories(),
  })
}
