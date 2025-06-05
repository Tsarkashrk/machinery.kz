import { ICategoryRequest } from "@/5-entities/category";
import { axiosClassic, axiosWithAuth } from "./interceptors";

const BASE_URL = "/equipment-categories";

type Props = {
  ordering?: string;
  page?: number;
  search?: string;
};

export const categoriesApi = {
  getCategories: async (params: Props) => {
    const response = await axiosClassic.get(`${BASE_URL}/`, { params });
    return response.data;
  },

  getCategoryById: async (id: number) => {
    const response = await axiosClassic.get(`${BASE_URL}/${id}/`);
    return response.data;
  },

  createCategory: async (data: FormData) => {
    const response = await axiosWithAuth.post(`${BASE_URL}/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateCategory: async (id: number, data: FormData) => {
    const response = await axiosWithAuth.put(`${BASE_URL}/${id}/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteCategory: async (id: number) => {
    const response = await axiosWithAuth.delete(`${BASE_URL}/${id}/`);
    return response.data;
  },
};
