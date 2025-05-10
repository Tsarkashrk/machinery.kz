import { axiosClassic, axiosWithAuth } from './interceptors'
import { IEquipment } from '@/entities/equipment'

const BASE_URL = '/equipment'

export const equipmentApi = {
  async getAllEquipment() {
    const response = await axiosClassic.get(`${BASE_URL}/`)
    return response.data
  },

  async getEquipmentById(id: number) {
    const response = await axiosClassic.get(`${BASE_URL}/${id}/`)
    return response.data
  },

  async createEquipment(data: IEquipment): Promise<IEquipment> {
    const response = await axiosWithAuth.post(`${BASE_URL}/`)
    return response.data
  },
}
