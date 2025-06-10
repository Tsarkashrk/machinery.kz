'use client';

import Button from '@/6-shared/ui/Buttons/Button';
import { Input } from '@/6-shared/ui/Input/Input';
import Label from '@/6-shared/ui/Label/Label';
import { useProfile } from '@/5-entities/user';
import { profileApi } from '@/6-shared/api';
import { IUserRequest } from '@/5-entities/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import ErrorMessage from '@/6-shared/ui/ErrorMessage/ErrorMessage';

export const ProfileSettingsSection = () => {
  const t = useTranslations('Button');
  const tProfile = useTranslations('ProfilePage');

  const { profile, isLoading } = useProfile();

  console.log(profile);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRequest>({
    defaultValues: {
      phone_number: profile?.phone_number || null,
    },
    mode: 'onChange',
  });

  const { push } = useRouter();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['edit profile'],
    mutationFn: (data: IUserRequest) => profileApi.editProfile(data),
    onSuccess: (updatedData) => {
      queryClient.setQueryData(['profile'], updatedData);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Успешно обновлено!');
    },
    onError: (error) => {
      toast.error(`Ошибка, ${error}`);
    },
  });

  const onSubmit: SubmitHandler<IUserRequest> = (data) => {
    mutate(data);
  };

  return (
    <section className="settings-section">
      <div className="settings-section__wrapper">
        <form
          className="profile-section__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="profile-section--horizontal">
            <div className="profile-section__credentials">
              <Label forElement="first_name">{tProfile('first-name')}</Label>
              <Input
                type="text"
                id="first_name"
                placeholder="Alex"
                {...register('first_name', {
                  // required: 'Введите имя',
                  value: profile?.first_name,
                })}
              />
              {errors.first_name && (
                <ErrorMessage>{errors.first_name.message}</ErrorMessage>
              )}
            </div>
            <div className="profile-section__credentials">
              <Label forElement="last_name">{tProfile('last-name')}</Label>
              <Input
                type="text"
                id="last_name"
                placeholder="Morro"
                {...register('last_name', {
                  // required: 'Last name is required!',
                  value: profile?.last_name,
                })}
              />
              {errors.last_name && (
                <ErrorMessage>{errors.last_name.message}</ErrorMessage>
              )}
            </div>
            <div className="profile-section__credentials">
              <Label forElement="email">{tProfile('email')}</Label>
              <Input
                type="email"
                id="email"
                placeholder="mchnry@ex.com"
                {...register('email', {
                  required: 'Введите почту',
                  value: profile?.email,
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
            <div className="profile-section__credentials">
              <Label forElement="phone_number">
                {tProfile('phone-number')}
              </Label>
              <Input
                type="text"
                id="phone_number"
                placeholder="+7-(707)-707-70-70"
                {...register('phone_number', {
                  setValueAs: (value) => (value === '' ? null : value),
                  pattern: {
                    value: /^\+?[0-9]{10,15}$/,
                    message: 'Некорректный номер телефона',
                  },
                  minLength: {
                    value: 10,
                    message: 'Номер должен содержать минимум 10 цифр',
                  },
                  maxLength: {
                    value: 15,
                    message: 'Номер не должен превышать 15 цифр',
                  },
                })}
              />
              {errors.phone_number && (
                <ErrorMessage>{errors.phone_number.message}</ErrorMessage>
              )}
            </div>
            <div className="profile-section__credentials">
              <Label forElement="address">{tProfile('address')}</Label>
              <Input
                type="text"
                id="address"
                {...register('address', {
                  // required: 'Address is required!',
                  value: profile?.address,
                })}
              />
              {errors.address && (
                <ErrorMessage>{errors.address.message}</ErrorMessage>
              )}
            </div>
          </div>
          <Button variant="dark">{t('save-changes')}</Button>
        </form>
      </div>
    </section>
  );
};
