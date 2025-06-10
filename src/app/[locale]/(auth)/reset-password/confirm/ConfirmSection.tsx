'use client';

import { usePasswordConfirm, useValidateResetToken } from '@/5-entities/auth';
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config';
import { ICON_SIZE } from '@/6-shared/constants/constants';
import Button from '@/6-shared/ui/Buttons/Button';
import { EmptyCard } from '@/6-shared/ui/EmptyCard/EmptyCard';
import ErrorMessage from '@/6-shared/ui/ErrorMessage/ErrorMessage';
import { Input } from '@/6-shared/ui/Input/Input';
import Label from '@/6-shared/ui/Label/Label';
import TextMuted from '@/6-shared/ui/TextMuted/TextMuted';
import { Title } from '@/6-shared/ui/Title/Title';
import { AxiosError } from 'axios';
import { Eye, EyeOff, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface IResetPassword {
  token: string;
  new_password: string;
  confirm_password: string;
}

export const ConfirmSection = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const {
    data: validateData,
    isLoading,
    error: validateError,
  } = useValidateResetToken(token);
  const {
    mutate,
    isPending,
    error: confirmError,
    isSuccess,
  } = usePasswordConfirm();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IResetPassword>({ mode: 'onChange' });

  const onSubmit = (data: IResetPassword) => {
    mutate({ ...data, token });
  };

  const password = watch('new_password');

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

  if (isLoading) {
    return (
      <div className="activate-section">
        <div className="activate-section__wrapper">
          <EmptyCard
            className="activate-section__empty"
            text="Проверяем вашу ссылку..."
          ></EmptyCard>
        </div>
      </div>
    );
  }

  const axiosError = validateError as AxiosError<{ message?: string }>;
  const statusCode = axiosError?.response?.status;
  const message = axiosError?.response?.data?.message;

  if (statusCode === 400) {
    return (
      <div className="activate-section">
        <div className="activate-section__wrapper">
          <EmptyCard
            className="activate-section__empty"
            text="Ссылка истекла или недействительна"
          >
            <X className="activate-section__x" />
          </EmptyCard>
          <Button
            variant="secondary"
            link={PLATFORM_PAGES.RESET}
          >
            Повторите запрос
          </Button>
        </div>
      </div>
    );
  }

  if (statusCode === 404) {
    return (
      <div className="activate-section">
        <div className="activate-section__wrapper">
          <EmptyCard
            className="activate-section__empty"
            text="Ссылка не найдена"
          >
            <X className="activate-section__x" />
          </EmptyCard>
          <Button
            variant="secondary"
            link={PLATFORM_PAGES.RESET}
          >
            Повторите запрос
          </Button>
        </div>
      </div>
    );
  }

  if (validateError || !validateData?.valid) {
    return (
      <div className="activate-section">
        <div className="activate-section__wrapper">
          <EmptyCard
            className="activate-section__empty"
            text={message || 'Ошибка сброса, попробуйте позже...'}
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

  return (
    <div className="confirm-section">
      <div className="confirm-section__wrapper">
        <div className="confirm-section__header">
          <Title>Введите новый пароль</Title>
          <TextMuted>Заполните поля ниже</TextMuted>
        </div>
        <form
          className="confirm-section__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="auth-form__credentials auth-form__password">
            <Label forElement="password">Пароль</Label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="••••••"
                {...register('new_password', {
                  required: 'Введите пароль',
                  minLength: {
                    value: 6,
                    message: 'Пароль должен содержать не менее 6 символов!',
                  },
                })}
              />
              <div
                className="auth-form__eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye size={ICON_SIZE} />
                ) : (
                  <EyeOff size={ICON_SIZE} />
                )}
              </div>
            </div>

            {errors.new_password && (
              <ErrorMessage>{errors.new_password.message}</ErrorMessage>
            )}
          </div>

          <div className="auth-form__credentials auth-form__password">
            <Label forElement="confirm_password">Подтвердите пароль</Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirm_password"
                placeholder="••••••"
                {...register('confirm_password', {
                  required: 'Подтвердите пароль',
                  validate: (value) =>
                    value === password || 'Пароли не совпадают!',
                })}
              />
              <div
                className="auth-form__eye"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <Eye size={ICON_SIZE} />
                ) : (
                  <EyeOff size={ICON_SIZE} />
                )}
              </div>
            </div>
            {errors.confirm_password && (
              <ErrorMessage>{errors.confirm_password.message}</ErrorMessage>
            )}
          </div>

          <div className="confirm-section__button">
            <Button
              isLoading={isPending}
              disabled={isPending}
              width="100%"
            >
              Сбросить текущий пароль
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
