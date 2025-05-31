import { EnumUserRoles, IUser } from '@/5-entities/user'
import { axiosWithAuth } from './interceptors'
import { IUserUpdateRole } from '@/5-entities/admin'

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

  async editUser(id: number, data: IUserUpdateRole) {
    const response = await axiosWithAuth.put(`${BASE_URL}/users/${id}/role/`, data)
    return response.data
  },
}
