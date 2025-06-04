import { chatApi } from '@/6-shared/api/chats.api'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateChat = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['create-chat'],
    mutationFn: chatApi.createChat,
    onSuccess() {
      toast.success('Чат успешно создан!')
    },
    onError(error: any) {
      toast.error('Error: ' + error.message || error)
    },
  })

  return { mutate, isPending }
}
