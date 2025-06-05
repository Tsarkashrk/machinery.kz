import { axiosWithAuth } from "./interceptors";

const BASE_URL = "/favorites";

export const favoritesApi = {
  async getFavorites() {
    const response = await axiosWithAuth.get(`${BASE_URL}/`);

    return response.data;
  },

  async addFavorite(equipmentId: any) {
    const response = await axiosWithAuth.post(`${BASE_URL}/add/`, {
      equipment: equipmentId,
    });

    return response;
  },

  async removeFavorite(id: number) {
    const response = await axiosWithAuth.delete(`${BASE_URL}/remove/${id}/`);

    return response.data;
  },
};
