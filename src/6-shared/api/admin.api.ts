import { axiosWithAuth } from './interceptors'

const BASE_URL = '/admin'

export const adminApi = {
  async getAllUsers() {
    const response = await axiosWithAuth.get(`${BASE_URL}/users-all/`)
    return response.data
  },

  async deleteUser(id: number) {
    const response = await axiosWithAuth.delete(`${BASE_URL}/users/${id}/`)
    return response.data
  },

  async editUser(id: number) {
    const response = await axiosWithAuth.put(`${BASE_URL}/users/${id}/role/`)
    return response.data
  },
}
