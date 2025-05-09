import { axiosClassic } from '@/api/interceptors'

const BASE_URL = '/users'

export const usersApi = {
  async getUsers() {
    const response = await axiosClassic.get(`${BASE_URL}/`)
    return response.data
  },

  async getUserById(id: number) {
    const response = await axiosClassic.get(`${BASE_URL}/${id}/`)
    return response.data
  },
}
