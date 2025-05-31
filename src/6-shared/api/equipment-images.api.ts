import { axiosClassic, axiosWithAuth } from './interceptors'

const BASE_URL = '/equipment-images'

export const equipmentImagesApi = {
  async uploadImage(formData: FormData) {
    const response = await axiosWithAuth.post(`${BASE_URL}/`, formData)
    return response.data
  },

  async getImageById(equipmentId: number) {
    const response = await axiosClassic.get(`${BASE_URL}/equipment/${equipmentId}/`)
    return response.data
  },
}
