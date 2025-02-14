'use client'

import Sidebar from '@/components/Sidebar/Sidebar'
import Button from '@/components/ui/Buttons/Button'
import { LogoutButton } from '@/components/ui/Buttons/LogoutButton'
import Input from '@/components/ui/Input/Input'
import Label from '@/components/ui/Label/Label'
import { PLATFORM_PAGES } from '@/config/pages-url.config'
import { useProfile } from '@/hooks/useProfile'
import { authService } from '@/services/auth.service'
import { userService } from '@/services/user.service'
import { TypeUserEdit } from '@/types/user.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const ProfileSection = () => {
  const { register, handleSubmit } = useForm<TypeUserEdit>({
    mode: 'onChange',
  })

  const { push } = useRouter()

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['edit profile'],
    mutationFn: (data: TypeUserEdit) => userService.editProfile(data),
    onSuccess: (updatedData) => {
      queryClient.setQueryData(['profile'], updatedData)
      queryClient.invalidateQueries({ queryKey: ['profile'] }) 
      toast.success('Successfully edited!')
    },
    onError: () => {
      toast.error('Invalid credentials', { description: 'Try again!' })
    },
  })

  const onSubmit: SubmitHandler<TypeUserEdit> = (data) => {
    mutate(data)
  }

  const { data, isLoading } = useProfile()

  if (isLoading) {
    return <>...Loading</>
  }

  return (
    <section className="profile-section">
      <h1>My Profile</h1>
      <form className="profile-section__body" onSubmit={handleSubmit(onSubmit)}>
        <div className="profile-section__credentials">
          <Label text="Username" forElement="username" />
          <Input
            type="text"
            id="username"
            placeholder={data?.username}
            {...register('username', {
              required: 'Username is required!',
            })}
          />
        </div>
        <div className="profile-section__credentials">
          <Label text="Email" forElement="email" />
          <Input
            type="email"
            id="email"
            placeholder={data?.email}
            {...register('email', {
              required: 'Email is required!',
            })}
          />
        </div>
        <div className="profile-section__credentials"></div>
        <Button text="Save changes" variant="dark" />
      </form>
      <LogoutButton />
    </section>
  )
}

export default ProfileSection
