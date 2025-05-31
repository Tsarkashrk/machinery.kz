import { ICompanyEditRequest, ICompanyPostRequest, ICompanyResponse } from '@/5-entities/company'
import { axiosClassic, axiosWithAuth } from './interceptors'

const BASE_URL = '/companies'

export const companiesApi = {
  async getAllCompanies() {
    const response = await axiosClassic.get(`${BASE_URL}/`)
    return response.data
  },

  async getCompany(id: number) {
    const response = await axiosClassic.get(`${BASE_URL}/${id}/`)
    return response.data
  },

  createCompany: async (data: ICompanyPostRequest) => {
    const response = await axiosWithAuth.post(`${BASE_URL}/create/`, data)
    return response.data
  },

  async updateCompany(id: number, data: any) {
    const response = await axiosWithAuth.put(`${BASE_URL}/${id}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  async deleteCompany(id: number) {
    const response = await axiosWithAuth.delete(`${BASE_URL}/users/${id}/`)
    return response.data
  },
}
