import { axiosClassic, axiosWithAuth } from '@/api/interceptors'

const BASE_URL = '/equipment-images/'

export const imagesService = {
  async uploadImage(data: any) {
    const response = await axiosWithAuth.post(BASE_URL, data)

    return response
  },
}
