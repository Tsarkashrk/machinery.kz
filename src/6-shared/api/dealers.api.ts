import { axiosClassic } from "./interceptors";

export const BASE_URL = "/dealers";

export const dealersApi = {
  async getDealers() {
    const response = await axiosClassic.get(`${BASE_URL}/`);
    console.log(response);

    return response.data;
  },

  async getDealerById(id: number) {
    const response = await axiosClassic.get(`${BASE_URL}/${id}/`);
    return response.data;
  },
};
