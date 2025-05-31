import { chatApi } from '@/6-shared/api/chats.api'
import { useQuery } from '@tanstack/react-query'
import { IChatResponse } from '../model/chat.model'

export const useChatById = (id: number) => {
  const { data, isLoading, error } = useQuery<IChatResponse>({
    queryKey: [`chat-${id}`],
    queryFn: () => chatApi.getChatById(id),
    enabled: !!id,
  })

  return { data, isLoading, error }
}
