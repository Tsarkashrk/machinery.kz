import { axiosClassic, axiosWithAuth } from '@/api/interceptors'

const BASE_URL = '/equipment/'

export const equipmentService = {
  async getAllEquipments() {
    const response = await axiosClassic.get(BASE_URL)

    return response.data
  },

  async createEquipment(data: any) {
    const response = await axiosWithAuth.post(BASE_URL, data)

    return response
  },

  async getEquipment(id: number) {
    const response = await axiosClassic.get(`${BASE_URL}${id}/`)

    return response.data
  },
}
