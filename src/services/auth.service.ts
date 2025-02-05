import { IAuthForm, IAuthResponse } from '@/types/auth.type'

import { axiosClassic } from '@/api/interceptors'

import { removeFromStorage, saveTokenStorage } from './auth-token.service'

export const authService = {
  async main(type: 'login' | 'register/', data: IAuthForm) {
    const response = await axiosClassic.post<IAuthResponse>(`/auth/${type}`, data)

    if (response.data.access) saveTokenStorage(response.data.access)

    return response
  },

  async register(data: IAuthForm) {
    const response = await axiosClassic.post<IAuthResponse>(`/auth/register/`, data)

    return response
  },

  async login(data: IAuthForm) {
    const response = await axiosClassic.post<IAuthResponse>(`/auth/login/`, data)

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
