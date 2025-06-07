'use client';

import { authApi } from '@/6-shared/api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config';
import { useRouter } from 'next/navigation'; // ✅ импорт

type Props = {
  token: string;
  new_password: string;
  confirm_password: string;
};

export const usePasswordConfirm = () => {
  const router = useRouter();

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: (data: Props) => authApi.confirmPassword(data),
    onSuccess: () => {
      toast.success('Вы успешно поменяли пароль!');
      router.push(PLATFORM_PAGES.LOGIN);
    },
    onError(error: AxiosError) {
      const status = error.response?.status;

      if (status === 404) {
        toast.error('Пользователь не найден');
      } else if (status === 400) {
        toast.error('Данные введены неправильно');
      } else {
        toast.error('Ошибка сервера. Попробуйте позднее');
      }
    },
  });

  return { mutate, isSuccess, isPending, error };
};
