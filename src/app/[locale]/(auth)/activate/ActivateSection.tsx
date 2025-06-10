'use client';

import { AxiosError } from 'axios';
import { useActivateUser } from '@/5-entities/auth';
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config';
import Button from '@/6-shared/ui/Buttons/Button';
import { EmptyCard } from '@/6-shared/ui/EmptyCard/EmptyCard';
import { useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { Check, X } from 'lucide-react';

export const ActivateSection = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const { data, error, isLoading, isSuccess } = useActivateUser(token);

  const queryClient = useQueryClient();
  const profileData = queryClient.getQueryData(['profile']);

  if (!token) {
    return (
      <div className="activate-section">
        <div className="activate-section__wrapper">
          <EmptyCard
            className="activate-section__empty"
            text="Неверная ссылка активации"
          >
            <X className="activate-section__x" />
          </EmptyCard>
          <Button
            variant="secondary"
            link={PLATFORM_PAGES.HOME}
          >
            На главную страницу
          </Button>
        </div>
      </div>
    );
  }

  // if (isLoading) {
  //   return (
  //     <div className="activate-section">
  //       <div className="activate-section__wrapper">
  //         <EmptyCard>Проверяем ваш токен...</EmptyCard>
  //       </div>
  //     </div>
  //   );
  // }

  const axiosError = error as AxiosError<{ error: string }>;
  if (axiosError?.response?.data?.error === 'Account is already activated.') {
    return (
      <div className="activate-section">
        <div className="activate-section__wrapper">
          <EmptyCard
            className="activate-section__empty"
            text="Ваш аккаунт уже активирован"
          >
            <Check className="activate-section__check" />
          </EmptyCard>
          {profileData ? (
            <Button variant="secondary" link={PLATFORM_PAGES.HOME}>На главную страницу</Button>
          ) : (
            <Button variant="secondary" link={PLATFORM_PAGES.LOGIN}>Войти в аккаунт</Button>
          )}
        </div>
      </div>
    );
  }

  if (error || !isSuccess || !data) {
    return (
      <div className="activate-section">
        <div className="activate-section__wrapper">
          <EmptyCard
            className="activate-section__empty"
            text="Ошибка активации, попробуйте позже..."
          >
            <X className="activate-section__x" />
          </EmptyCard>
          <Button variant="secondary" link={PLATFORM_PAGES.HOME}>На главную страницу</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="activate-section">
      <div className="activate-section__wrapper">
        <EmptyCard
          className="activate-section__empty"
          text="Вы успешно активировали свой аккаунт. Войдите в него"
        >
          <Check className="activate-section__check" />
        </EmptyCard>
        <Button variant="secondary" link={PLATFORM_PAGES.LOGIN}>Войти в аккаунт</Button>
      </div>
    </div>
  );
};
