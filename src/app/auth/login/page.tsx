'use client'

import Button from '@/components/ui/Button/Button'
import Input from '@/components/ui/Input/Input'
import Label from '@/components/ui/Label/Label'
import TextMuted from '@/components/ui/TextMuted/TextMuted'
import Title from '@/components/ui/Title/Title'
import { PLATFORM_PAGES } from '@/config/pages-url.config'
import { authService } from '@/services/auth.service'
import { IAuthForm } from '@/types/auth.type'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'

const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm<IAuthForm>({
    mode: 'onChange',
  })

  const { push } = useRouter()

  const { mutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: IAuthForm) => authService.login(data),
    onSuccess() {
      toast.success('Successfully logged in!')
      reset()
      push(PLATFORM_PAGES.PROFILE)
    },
    onError() {
      toast.error('Invalid credentials', {description: 'Try again!'})
    },
  })

  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    mutate(data)
  }

  return (
    <main>
      <div className="auth-form">
        <div className="auth-form__wrapper">
          <div className="auth-form__header">
            <Title text="Log in to your account" />
            <TextMuted text="Enter your credentials below to log in to your account" />
          </div>
          <form className="auth-form__body" onSubmit={handleSubmit(onSubmit)}>
            <div className="auth-form__credentials"></div>
            <div className="auth-form__credentials">
              <Label text="Email" forElement="email" />
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
              <Label text="Password" forElement="password" />
              <Input
                type="password"
                id="password"
                {...register('password', {
                  required: 'Password is required!',
                })}
              />
            </div>
            <Button text="Log in" variant="dark" />
          </form>
          <p className="auth-form__footer">
            Don't have an account? <Button isLink link={PLATFORM_PAGES.REGISTER} variant="underlined" text="Sign up" />
          </p>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
