import { axiosClassic, axiosWithAuth } from './interceptors'

const BASE_URL = '/purchase-transactions/'

export const purchaseApi = {
  async uploadImage(data: any) {
    const response = await axiosWithAuth.post(BASE_URL, data)

    return response
  },
}
