import { chatApi } from '@/6-shared/api/chats.api';
import { useQuery } from '@tanstack/react-query';
import { IChatResponse } from '../model/chat.model';

export const useChatById = (id: number) => {
  const { data, isLoading, error } = useQuery<IChatResponse>({
    queryKey: [`chat-${id}`],
    queryFn: () => chatApi.getChatById(id),
    enabled: !!id,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 10 * 1000, // 10 секунд
    gcTime: 5 * 60 * 1000, // 5 минут
    retry: 2,
  });

  return { data, isLoading, error };
};
