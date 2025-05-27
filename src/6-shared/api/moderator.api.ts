import { axiosClassic } from './interceptors'

export const BASE_URL = '/moderator'

export const moderatorApi = {
  async getDealers() {
    const response = await axiosClassic.get(`${BASE_URL}/`)
    console.log(response)

    return response.data
  },
}
