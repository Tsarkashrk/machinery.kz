import { axiosClassic, axiosWithAuth } from './interceptors'
import { useQuery } from '@tanstack/react-query'

const BASE_URL = '/equipment-categories/'

export const categoriesApi = {
  getCategories: async () => {
    const response = await axiosClassic.get(BASE_URL)
    return response.data
  },
}
