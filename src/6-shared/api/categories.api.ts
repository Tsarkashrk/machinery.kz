import { axiosClassic, axiosWithAuth } from './interceptors'
import { useQuery } from '@tanstack/react-query'

const BASE_URL = '/equipment-categories'

export const categoriesApi = {
  async getCategories() {
    const response = await axiosClassic.get(`${BASE_URL}/`)
    return response.data
  },

  async getCategoryById(id: number) {
    const response = await axiosClassic.get(`${BASE_URL}/${id}/`)
    return response.data
  },
}
