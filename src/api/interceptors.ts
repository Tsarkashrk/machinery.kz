'use client'

import axios, { type CreateAxiosDefaults } from 'axios'
import { useRouter } from 'next/navigation'

import { errorCatch } from './error'
import { getAccessToken, removeFromStorage } from '@/services/auth-token.service'
import { PLATFORM_PAGES } from '@/config/pages-url.config'

const options: CreateAxiosDefaults = {
  baseURL: 'http://89.169.162.108:8084/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use((config) => {
  const accessToken = getAccessToken()

  if (config?.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config

    if ((error?.response?.status === 401 || errorCatch(error) === 'jwt expired' || errorCatch(error) === 'jwt must be provided') && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true

      try {
        if (error?.response?.status === 401) {
          removeFromStorage()
        }
        return axiosWithAuth.request(originalRequest)
      } catch (err) {
        if (error?.response?.status === 401) {
          removeFromStorage()
        }
      }
    }
    throw error
  },
)

export { axiosClassic, axiosWithAuth }
