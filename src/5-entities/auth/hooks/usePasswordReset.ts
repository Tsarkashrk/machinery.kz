import { authApi } from '@/6-shared/api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

type Props = {
  email: string;
};

export const usePasswordReset = () => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: Props) => authApi.resetPassword(data),
    onSuccess: () =>
      toast.success('Инструкция по сбросу пароля отправлена вам на почту!'),
    onError(error: AxiosError) {
      const status = error.response?.status;

      if (status === 404) {
        toast.error('Пользователь с такой почтой не найден');
      } else if (status === 400) {
        toast.error('Почта введена неправильно');
      } else {
        toast.error('Ошибка сервера. Попробуйте позднее');
      }
    },
  });

  return { mutate, isPending, isSuccess };
};
