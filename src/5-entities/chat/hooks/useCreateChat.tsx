import { chatApi } from '@/6-shared/api/chats.api';
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useCreateChat = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ['create-chat'],
    mutationFn: chatApi.createChat,
    onSuccess() {
      toast.success('Чат успешно создан!');
    },
    onError(error: any) {
      if (
        error.response.data.non_field_errors[0] ===
        'The fields dealer, buyer, equipment must make a unique set.'
      ) {
        return router.push(`${PLATFORM_PAGES.MESSAGES}`);
      }
      toast.error('Error: ' + error.message || error);
    },
  });

  return { mutate, isPending };
};
