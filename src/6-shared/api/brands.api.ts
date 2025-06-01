import { IBrandRequest } from '@/5-entities/brand'
import { axiosClassic, axiosWithAuth } from './interceptors'

export const BASE_URL = '/brands'

export const brandsApi = {
  async getBrands() {
    const response = await axiosClassic.get(`${BASE_URL}/`)
    return response.data
  },

  async getBrandById(id: number) {
    const response = await axiosClassic.get(`${BASE_URL}/${id}/`)
    return response.data
  },

  async getBrandBySearch(slug: string) {
    const response = await axiosClassic.get(`${BASE_URL}/?search=${slug}`)
    return response.data
  },

  async createBrand(data: IBrandRequest) {
    const response = await axiosWithAuth.post(`${BASE_URL}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  async deleteBrand(id: number) {
      const response = await axiosWithAuth.delete(`${BASE_URL}/${id}/`)
      return response.data
    },
}
