import { IChatRequest } from '@/5-entities/chat';
import { axiosWithAuth } from './interceptors';

const BASE_URL = '/chats';

export const chatApi = {
  getChats: async () => {
    const response = await axiosWithAuth.get(`${BASE_URL}/`);
    return response.data;
  },

  createChat: async (data: IChatRequest) => {
    const response = await axiosWithAuth.post('/chats/', data);
    return response.data;
  },

  getChatMessages: async (id: number) => {
    const response = await axiosWithAuth.get(`${BASE_URL}/${id}/messages/`);
    return response.data;
  },

  sendMessage: async (chatId: number, messageData: any): Promise<any> => {
    const response = await axiosWithAuth.post(
      `${BASE_URL}/${chatId}/messages/`,
      messageData,
    );
    return response.data;
  },

  getChatById: async (id: number) => {
    const response = await axiosWithAuth.get(`${BASE_URL}/${id}/`);
    return response.data;
  },
};
