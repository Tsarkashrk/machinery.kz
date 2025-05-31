import { ICompanyEditRequest, ICompanyPostRequest, ICompanyResponse } from '@/5-entities/company'
import { axiosClassic, axiosWithAuth } from './interceptors'

const BASE_URL = '/companies'

export const companiesApi = {
  getAllCompanies: async () => {
    const response = await axiosClassic.get(`${BASE_URL}/`)
    return response.data
  },

  getCompany: async (id: number) => {
    const response = await axiosClassic.get(`${BASE_URL}/${id}/`)
    return response.data
  },

  createCompany: async (data: ICompanyPostRequest) => {
    const response = await axiosWithAuth.post(`${BASE_URL}/create/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  updateCompany: async (id: number, data: any) => {
    const response = await axiosWithAuth.put(`${BASE_URL}/${id}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  deleteCompany: async (id: number) => {
    const response = await axiosWithAuth.delete(`${BASE_URL}/users/${id}/`)
    return response.data
  },
}
