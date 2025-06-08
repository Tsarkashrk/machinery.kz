import { ICategoryRequest } from '@/5-entities/category';
import { axiosClassic, axiosWithAuth } from './interceptors';

const EQUIPMENT_URL = '/equipment-categories';
const MACHINERY_URL = '/heavy-machinery-categories';

export type CategoryType = 'equipment' | 'machinery';

type Props = {
  ordering?: string;
  page?: number;
  search?: string;
};

const getUrl = (type: CategoryType) => {
  return type === 'equipment' ? EQUIPMENT_URL : MACHINERY_URL;
};

export const categoriesApi = {
  getCategories: async (type: CategoryType, params?: Props) => {
    const response = await axiosClassic.get(`${getUrl(type)}/`, { params });
    return response.data;
  },

  getCategoryById: async (type: CategoryType, id: number) => {
    const response = await axiosClassic.get(`${getUrl(type)}/${id}/`);
    return response.data;
  },

  createCategory: async (type: CategoryType, data: FormData) => {
    const response = await axiosWithAuth.post(`${getUrl(type)}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateCategory: async (type: CategoryType, id: number, data: FormData) => {
    const response = await axiosWithAuth.put(`${getUrl(type)}/${id}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteCategory: async (type: CategoryType, id: number) => {
    const response = await axiosWithAuth.delete(`${getUrl(type)}/${id}/`);
    return response.data;
  },
};
