import { axiosClassic, axiosWithAuth } from './interceptors'
import { IUserRequest, IUser } from '@/5-entities/user'

const BASE_URL = '/users'

export const usersApi = {
  async getUsers() {
    const response = await axiosWithAuth.get<IUser>(`${BASE_URL}/`)
    return response.data
  },

  async getUserById(id: number) {
    const response = await axiosClassic.get<IUser>(`${BASE_URL}/${id}/`)
    return response.data
  },

  async editProfile(data: IUserRequest) {
    const response = await axiosWithAuth.put<IUser>(BASE_URL, data)

    return response
  },
}
