import { axiosWithAuth } from '@/api/interceptors'

const BASE_URL = '/equipment/'

export const equipmentService = {
  async createEquipment(data: any) {
    const response = await axiosWithAuth.post(BASE_URL, data)

    return response
  },
}
