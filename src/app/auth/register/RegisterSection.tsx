'use client'

import Button from '@/components/ui/Buttons/Button'
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

const RegisterSection = () => {
  const { register, handleSubmit, reset } = useForm<IAuthForm>({
    mode: 'onChange',
  })

  const { push } = useRouter()

  const { mutate } = useMutation({
    mutationKey: ['register'],
    mutationFn: (data: IAuthForm) => authService.register(data),
    onSuccess() {
      toast.success('Successfully registered!')
      reset()
      push(PLATFORM_PAGES.LOGIN)
    },
    onError() {
      toast.error('Registration error!', { description: 'Make sure your credentials are valid' })
    },
  })

  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    mutate(data)
  }

  return (
    <section className="auth-form">
      <div className="auth-form__wrapper">
        <div className="auth-form__header">
          <Title text="Create a new account" />
          <TextMuted text="Fill in the fields below to register a new account" />
        </div>
        <form className="auth-form__body" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-form__credentials">
            <Label text="Username" forElement="username" />
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
          <Button text="Sign up" variant="dark" />
        </form>
        <p className="auth-form__footer">
          Already have an account? <Button isLink link={PLATFORM_PAGES.LOGIN} variant="underlined" text="Log in" />
        </p>
      </div>
    </section>
  )
}

export default RegisterSection
