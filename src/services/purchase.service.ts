import { axiosClassic, axiosWithAuth } from '@/api/interceptors'

const BASE_URL = '/purchase-transactions/'

export const purchaseService = {
  async uploadImage(data: any) {
    const response = await axiosWithAuth.post(BASE_URL, data)

    return response
  },
}
