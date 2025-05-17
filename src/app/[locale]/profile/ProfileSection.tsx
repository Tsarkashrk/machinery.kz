'use client'

import Button from '@/shared/ui/Buttons/Button'
import { LogoutButton } from '@/shared/ui/Buttons/LogoutButton'
import { Input } from '@/shared/ui/Input/Input'
import Label from '@/shared/ui/Label/Label'
import { useProfile } from '@/entities/user'
import { profileApi, usersApi } from '@/shared/api'
import { IUserRequest } from '@/entities/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const ProfileSection = () => {
  const { profile, isLoading } = useProfile()

  const { register, handleSubmit } = useForm<IUserRequest>({
    mode: 'onChange',
  })

  const { push } = useRouter()

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['edit profile'],
    mutationFn: (data: IUserRequest) => profileApi.editProfile(data),
    onSuccess: (updatedData) => {
      queryClient.setQueryData(['profile'], updatedData)
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      toast.success('Successfully edited!')
    },
    onError: () => {
      toast.error('Invalid credentials', { description: 'Try again!' })
    },
  })

  const onSubmit: SubmitHandler<IUserRequest> = (data) => {
    mutate(data)
  }

  if (isLoading) {
    return <>...Loading</>
  }

  return (
    <section className="profile-section">
      <div className="profile-section__header">
        <h1 className="profile-section__title">My Profile</h1>
        <LogoutButton />
      </div>
      <form className="profile-section__body" onSubmit={handleSubmit(onSubmit)}>
        <div className="profile-section__credentials">
          <Label text="Username" forElement="username" />
          <Input
            type="text"
            id="username"
            {...register('username', {
              required: 'Username is required!',
              value: profile?.username,
            })}
          />
        </div>
        <div className="profile-section__credentials">
          <Label text="Email" forElement="email" />
          <Input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required!',
              value: profile?.email,
            })}
          />
        </div>
        <Button text="Save changes" variant="dark" />
      </form>
    </section>
  )
}

export default ProfileSection
