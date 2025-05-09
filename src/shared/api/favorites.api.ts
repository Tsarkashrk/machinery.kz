import { axiosClassic, axiosWithAuth } from './interceptors'

const BASE_URL = '/favorites'

export const favoritesApi = {
  async getFavorites() {
    const response = await axiosClassic.get(`${BASE_URL}/`)

    return response.data
  },

  async addFavorite(data: any) {
    const response = await axiosWithAuth.post(`${BASE_URL}/add/`, data)

    return response
  },

  async removeFavorite(id: number) {
    const response = await axiosClassic.delete(`${BASE_URL}/${id}/`)

    return response.data
  },
}
