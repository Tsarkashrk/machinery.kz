'use client'

import Button from '@/6-shared/ui/Buttons/Button'
import { Input } from '@/6-shared/ui/Input/Input'
import Label from '@/6-shared/ui/Label/Label'
import TextMuted from '@/6-shared/ui/TextMuted/TextMuted'
import { PLATFORM_PAGES, PROFILE_PAGES } from '@/6-shared/config/pages-url.config'
import { authApi } from '@/6-shared/api'
import { IAuthLoginRequest } from '@/5-entities/auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { Title } from '@/6-shared/ui/Title/Title'
import { useState } from 'react'
import { ICON_SIZE } from '@/6-shared/constants/constants'
import { Eye, EyeOff } from 'lucide-react'
import ErrorMessage from '@/6-shared/ui/ErrorMessage/ErrorMessage'

const LoginSection = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const t = useTranslations('AuthPage')
  const tButton = useTranslations('Button')

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IAuthLoginRequest>({ mode: 'onChange' })

  const password = watch('password')

  const { push } = useRouter()

  const { mutate, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: IAuthLoginRequest) => authApi.login(data),
    onSuccess() {
      toast.success('Successfully logged in!')
      reset()
      push(PROFILE_PAGES.PROFILE)
    },
    onError() {
      toast.error('Invalid credentials', { description: 'Try again!' })
    },
  })

  const onSubmit: SubmitHandler<IAuthLoginRequest> = (data) => {
    const { confirm_password, ...payload } = data
    mutate(payload)
  }

  return (
    <section className="auth-form auth-form--login">
      <div className="auth-form__wrapper">
        <div className="auth-form__header">
          <Title>{t('login-title')}</Title>
          <TextMuted>{t('login-description')}</TextMuted>
        </div>

        <form className="auth-form__body" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-form__credentials">
            <Label forElement="email">{t('register-email')}</Label>
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
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </div>

          <div className="auth-form__credentials auth-form__password">
            <Label forElement="password">{t('register-password')}</Label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="••••••"
                {...register('password', {
                  required: 'Введите пароль',
                  minLength: { value: 6, message: 'Пароль должен содержать не менее 6 символов!' },
                })}
              />
              <div className="auth-form__eye" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Eye size={ICON_SIZE} /> : <EyeOff size={ICON_SIZE} />}
              </div>
            </div>
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
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
