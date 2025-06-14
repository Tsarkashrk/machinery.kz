import { axiosClassic, axiosWithAuth } from "./interceptors";
import { IEquipment } from "@/5-entities/equipment";

const BASE_URL = "/equipment";

type Props = {
  brand?: number;
  available_for_rent?: boolean;
  available_for_sale?: boolean;
  category?: number;
  max_price?: number;
  max_rental_rate?: number;
  max_year?: number;
  min_price?: number;
  min_rental_rate?: number;
  min_year?: number;
  ordering?: string;
  page?: number;
  page_size?: number;
  search?: string;
  year?: number;
  owner?: number;
};

export const equipmentApi = {
  async getAllEquipment(params?: Props) {
    const response = await axiosClassic.get(`${BASE_URL}/`, { params });
    return response.data;
  },

  async getEquipmentById(id: number) {
    const response = await axiosClassic.get(`${BASE_URL}/${id}/`);
    return response.data;
  },

  async createEquipment(data: IEquipment): Promise<IEquipment> {
    const response = await axiosWithAuth.post(`${BASE_URL}/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async searchEquipment(query: string) {
    const response = await axiosWithAuth.get(
      `${BASE_URL}/search/?query=${query}`,
    );
    return response.data;
  },

  async updateEquipment(id: number, data: any) {
    const response = await axiosWithAuth.put(`${BASE_URL}/${id}/`, data);
    return response.data;
  },

  async deleteEquipment(id: number) {
    const response = await axiosWithAuth.delete(`${BASE_URL}/${id}/`);
    return response.data;
  },

  async getUnverifiedEquipment(params?: Props) {
    const response = await axiosWithAuth.get(`${BASE_URL}/unverified/`, {
      params,
    });
    return response.data;
  },
};
