'use client';

import { usePasswordReset } from '@/5-entities/auth';
import Button from '@/6-shared/ui/Buttons/Button';
import ErrorMessage from '@/6-shared/ui/ErrorMessage/ErrorMessage';
import { Input } from '@/6-shared/ui/Input/Input';
import Label from '@/6-shared/ui/Label/Label';
import { SectionWithContent } from '@/6-shared/ui/SectionWithContent/SectionWithContent';
import TextMuted from '@/6-shared/ui/TextMuted/TextMuted';
import { Title } from '@/6-shared/ui/Title/Title';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IResetPassword {
  email: string;
}

export const ResetPasswordSection = () => {
  const t = useTranslations();

  const { mutate, isSuccess, isPending } = usePasswordReset();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPassword>();

  const onSubmit = async (data: IResetPassword) => {
    mutate({ email: data.email });
  };

  return (
    <section className="reset-password">
      <div className="reset-password__wrapper">
        <div className="reset-password__header">
          <Title>Восстановление пароля</Title>
          <TextMuted>Для сброса пароля введите свою почту</TextMuted>
        </div>
        <div className="reset-password__content">
          <form
            className="reset-password__form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="reset-password__field">
              <Label>Почта</Label>
              <Input
                type="email"
                id="email"
                placeholder="mchnry@ex.com"
                {...register('email', {
                  required: 'Введите почту',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Неверный формат!',
                  },
                })}
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>
            <div className="reset-password__button">
              <Button
                isLoading={isPending}
                disabled={isPending}
                width="100%"
              >
                {isPending
                  ? 'Сбросить текущий пароль...'
                  : `Сбросить текущий пароль`}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
