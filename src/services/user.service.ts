import { axiosWithAuth } from '@/api/interceptors'
import { IUser } from '@/types/user.type'
import { TypeUserEdit } from '@/types/user.type'

const BASE_URL = '/me/'

export const userService = {
  async getProfile() {
    const response = await axiosWithAuth.get<IUser>(BASE_URL)

    return response.data
  },

  async editProfile(data: TypeUserEdit) {
    const response = await axiosWithAuth.put<IUser>(BASE_URL, data)

    return response
  },
}
