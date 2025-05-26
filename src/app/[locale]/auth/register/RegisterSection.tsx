'use client'

import Button from '@/6-shared/ui/Buttons/Button'
import { Input } from '@/6-shared/ui/Input/Input'
import Label from '@/6-shared/ui/Label/Label'
import TextMuted from '@/6-shared/ui/TextMuted/TextMuted'
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config'
import { authApi } from '@/6-shared/api'
import { IAuthRegisterRequest } from '@/5-entities/auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import { Title } from '@/6-shared/ui/Title/Title'
import { useTranslations } from 'next-intl'

const RegisterSection = () => {
  const t = useTranslations('AuthPage')
  const tButton = useTranslations('Button')

  const { register, handleSubmit, reset } = useForm<IAuthRegisterRequest>({
    mode: 'onChange',
  })

  const { push } = useRouter()

  const { mutate, isPending } = useMutation({
    mutationKey: ['register'],
    mutationFn: (data: IAuthRegisterRequest) => authApi.register(data),
    onSuccess() {
      toast.success('Successfully registered!')
      reset()
      push(PLATFORM_PAGES.LOGIN)
    },
    onError() {
      toast.error('Registration error!', { description: 'Make sure your credentials are valid' })
    },
  })

  const onSubmit: SubmitHandler<IAuthRegisterRequest> = (data) => {
    mutate(data)
  }

  return (
    <section className="auth-form">
      <div className="auth-form__wrapper">
        <div className="auth-form__header">
          <Title>{t('register-title')}</Title>
          <TextMuted>{t('register-description')}</TextMuted>
        </div>
        <form className="auth-form__body" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-form__credentials">
            <Label text={t('register-username')} forElement="username" />
            <Input
              type="text"
              id="username"
              placeholder="Jame Smith"
              {...register('username', {
                required: 'Username is required!',
              })}
            />
          </div>
          <div className="auth-form__credentials">
            <Label text={t('register-email')} forElement="email" />
            <Input
              type="email"
              id="email"
              placeholder="mchnry@ex.com"
              {...register('email', {
                required: 'Email is required!',
              })}
            />
          </div>
          <div className="auth-form__credentials">
            <Label text={t('register-password')} forElement="password" />
            <Input
              type="password"
              id="password"
              {...register('password', {
                required: 'Password is required!',
              })}
            />
          </div>
          <Button variant="default" isLoading={isPending}>
            {tButton('register')}
          </Button>
        </form>
        <p className="auth-form__footer">
          {t('register-to-login')}{' '}
          <Button link={PLATFORM_PAGES.LOGIN} variant="underlined">
            {tButton('login')}
          </Button>
        </p>
      </div>
    </section>
  )
}

export default RegisterSection
