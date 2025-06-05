import { axiosClassic, axiosWithAuth } from "./interceptors";

const BASE_URL = "/rental-transactions/";

export const rentApi = {
  async rentEquipment(data: any) {
    const response = await axiosWithAuth.post(BASE_URL, data);

    return response;
  },
};
