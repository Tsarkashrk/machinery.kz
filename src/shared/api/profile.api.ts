import { axiosWithAuth } from '@/api/interceptors'
import { IUser, IUserRequest } from '@/entities/user'

const BASE_URL = '/me'

export const profileApi = {
  async getProfile() {
    const response = await axiosWithAuth.get<IUser>(`${BASE_URL}/`)
    return response.data
  },

  async editProfile(data: IUserRequest) {
    const response = await axiosWithAuth.put(`${BASE_URL}/`, data)
    return response.data
  },
}
