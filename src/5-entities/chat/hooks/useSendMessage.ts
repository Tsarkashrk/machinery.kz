import { chatApi } from '@/6-shared/api/chats.api';
import { useMutation } from '@tanstack/react-query';

type Props = {
  chatId: number;
  messageData: any;
};

export const useSendMessage = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ chatId, messageData }: Props) =>
      chatApi.sendMessage(chatId, messageData),
  });

  return { mutate };
};
