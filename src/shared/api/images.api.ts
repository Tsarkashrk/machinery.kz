import { axiosClassic, axiosWithAuth } from './interceptors'

const BASE_URL = '/equipment-images/'

export const imagesApi = {
  async uploadImage(data: any) {
    const response = await axiosWithAuth.post(BASE_URL, data)

    return response
  },
}
