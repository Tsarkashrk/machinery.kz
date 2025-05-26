'use client'

import Button from '@/6-shared/ui/Buttons/Button'
import { Input } from '@/6-shared/ui/Input/Input'
import Label from '@/6-shared/ui/Label/Label'
import TextMuted from '@/6-shared/ui/TextMuted/TextMuted'
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config'
import { authApi } from '@/6-shared/api'
import { IAuthLoginRequest } from '@/5-entities/auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { Title } from '@/6-shared/ui/Title/Title'

const LoginSection = () => {
  const t = useTranslations('AuthPage')
  const tButton = useTranslations('Button')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAuthLoginRequest>({ mode: 'onChange' })

  const { push } = useRouter()

  const { mutate, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: IAuthLoginRequest) => authApi.login(data),
    onSuccess() {
      toast.success('Successfully logged in!')
      reset()
      push(PLATFORM_PAGES.PROFILE)
    },
    onError() {
      toast.error('Invalid credentials', { description: 'Try again!' })
    },
  })

  const onSubmit: SubmitHandler<IAuthLoginRequest> = (data) => {
    mutate(data)
  }

  return (
    <section className="auth-form">
      <div className="auth-form__wrapper">
        <div className="auth-form__header">
          <Title>{t('login-title')}</Title>
          <TextMuted>{t('login-description')}</TextMuted>
        </div>

        <form className="auth-form__body" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-form__credentials">
            <Label text={t('login-email')} forElement="email" />
            <Input type="email" id="email" placeholder="mchnry@ex.com" {...register('email', { required: 'Email is required!' })} />
          </div>

          <div className="auth-form__credentials">
            <Label text={t('login-password')} forElement="password" />
            <Input type="password" id="password" {...register('password', { required: 'Password is required!' })} />
          </div>

          <Button variant="default" type="submit" isLoading={isPending}>
            {tButton('login')}
          </Button>
        </form>

        <p className="auth-form__footer">
          {t('login-to-register')}{' '}
          <Button link={PLATFORM_PAGES.REGISTER} variant="underlined">
            {tButton('register')}
          </Button>
        </p>
      </div>
    </section>
  )
}

export default LoginSection
