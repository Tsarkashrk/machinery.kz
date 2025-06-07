import {
  IAuth,
  IAuthLoginRequest,
  IAuthRegisterRequest,
} from '@/5-entities/auth';

import { axiosClassic } from './interceptors';

import { removeFromStorage, saveTokenStorage } from './auth-token.api';

const BASE_URL = '/auth';

type Props = {
  email: string;
};

export const authApi = {
  async register(data: IAuthRegisterRequest) {
    const response = await axiosClassic.post<IAuth>(
      `${BASE_URL}/register/`,
      data,
    );

    return response;
  },

  async login(data: IAuthLoginRequest) {
    const response = await axiosClassic.post<IAuth>(`${BASE_URL}/login/`, data);

    if (response.data.access && response.data.refresh)
      saveTokenStorage(response.data.access, response.data.refresh);

    return response;
  },

  async activateUser(token: string | null) {
    const response = await axiosClassic.get(
      `${BASE_URL}/activate/?token=${token}`,
    );

    return response;
  },

  async resetPassword(data: Props) {
    const response = await axiosClassic.post(`${BASE_URL}/password-reset/`, {
      email: data.email,
    });

    return response.data;
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
    removeFromStorage();

    // return response
  },
};
