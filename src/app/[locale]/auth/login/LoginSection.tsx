'use client'

import Button from '@/6-shared/ui/Buttons/Button'
import { Input } from '@/6-shared/ui/Input/Input'
import Label from '@/6-shared/ui/Label/Label'
import TextMuted from '@/6-shared/ui/TextMuted/TextMuted'
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config'
import { authApi } from '@/6-shared/api'
import { IAuthLoginRequest } from '@/entities/auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const LoginSection = () => {
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
          <h1>Log in to your account</h1>
          <TextMuted>Enter your credentials below to log in to your account</TextMuted>
        </div>

        <form className="auth-form__body" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-form__credentials">
            <Label text="Email" forElement="email" />
            <Input type="email" id="email" placeholder="mchnry@ex.com" {...register('email', { required: 'Email is required!' })} />
          </div>

          <div className="auth-form__credentials">
            <Label text="Password" forElement="password" />
            <Input type="password" id="password" {...register('password', { required: 'Password is required!' })} />
          </div>

          <Button variant="default" type="submit" isLoading={isPending}>
            Log in
          </Button>
        </form>

        <p className="auth-form__footer">
          Don't have an account?{' '}
          <Button link={PLATFORM_PAGES.REGISTER} variant="underlined">
            Sign up
          </Button>
        </p>
      </div>
    </section>
  )
}

export default LoginSection
