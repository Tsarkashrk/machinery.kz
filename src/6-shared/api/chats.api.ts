import { IChatRequest } from '@/5-entities/chat'
import { axiosWithAuth } from './interceptors'

const BASE_URL = '/chats'

export const chatApi = {
  async getChats() {
    const response = await axiosWithAuth.get(`${BASE_URL}/`)
    return response.data
  },

  async createChat(data: IChatRequest) {
    const response = await axiosWithAuth.post('/chats/', data)
    return response.data
  },

  async getChatMessages(id: number) {
    const response = await axiosWithAuth.get(`${BASE_URL}/${id}/messages/`)
    return response.data
  },

  async sendChatMessages(id: number, data: any) {
    const response = await axiosWithAuth.post(`${BASE_URL}/${id}/messages/`, data)
    return response.data
  },

  async getChatById(id: number) {
    const response = await axiosWithAuth.get(`${BASE_URL}/${id}/`)
    return response.data
  },

  async markMessageRead(id: number) {
    const response = await axiosWithAuth.post(`${BASE_URL}/${id}/mark-read/`)
    return response.data
  },
}
