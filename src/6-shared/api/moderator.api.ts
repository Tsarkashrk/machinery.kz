import { axiosClassic, axiosWithAuth } from "./interceptors";

export const BASE_URL = "/moderator";

export const moderatorApi = {
  async confirmEquipmentVerification(equipmentId: number) {
    const response = await axiosWithAuth.post(
      `${BASE_URL}/verify/${equipmentId}`,
    );
    return response.data;
  },
  async rejectEquipmentVerification(equipmentId: number) {
    const response = await axiosWithAuth.delete(
      `${BASE_URL}/delete/${equipmentId}`,
    );
    return response.data;
  },
};
