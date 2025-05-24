import { IAuth, IAuthLoginRequest, IAuthRegisterRequest } from '@/entities/auth'

import { axiosClassic } from './interceptors'

import { removeFromStorage, saveTokenStorage } from './auth-token.api'

const BASE_URL = '/auth'

export const authApi = {
  async register(data: IAuthRegisterRequest) {
    const response = await axiosClassic.post<IAuth>(`${BASE_URL}/register/`, data)

    return response
  },

  async login(data: IAuthLoginRequest) {
    const response = await axiosClassic.post<IAuth>(`${BASE_URL}/login/`, data)

    if (response.data.access && response.data.refresh) saveTokenStorage(response.data.access, response.data.refresh)

    return response
  },

  // async getNewTokens() {
  // 	const response = await axiosClassic.post<IAuthResponse>(
  // 		'auth/login/access-token'
  // 	)

  // 	if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

  // 	return response
  // },

  async logout() {
    // const response = await axiosClassic.post<boolean>('/auth/logout')

    // if (response.data)
    removeFromStorage()

    // return response
  },
}
