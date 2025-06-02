'use client'

import Button from '@/6-shared/ui/Buttons/Button'
import { LogoutButton } from '@/6-shared/ui/Buttons/LogoutButton'
import { Input } from '@/6-shared/ui/Input/Input'
import Label from '@/6-shared/ui/Label/Label'
import { useProfile } from '@/5-entities/user'
import { profileApi, usersApi } from '@/6-shared/api'
import { IUserRequest } from '@/5-entities/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { ProfileSidebar } from '@/4-features/profile'
import ErrorMessage from '@/6-shared/ui/ErrorMessage/ErrorMessage'
import TextMuted from '@/6-shared/ui/TextMuted/TextMuted'
import { ProfileCard } from '@/3-widgets/profile-card'
import { useEquipmentList } from '@/5-entities/equipment'

const ProfileSection = () => {
  const t = useTranslations('Button')
  const tProfile = useTranslations('ProfilePage')

  const { profile, isLoading } = useProfile()

  const profileId = profile?.id

  const { data: equipmentList } = useEquipmentList(profileId ? { owner: profileId } : undefined)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRequest>({
    defaultValues: {
      phone_number: profile?.phone_number || null,
    },
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
      <div className="profile-section__wrapper">
        <LogoutButton />
        {profile && equipmentList && (
          <ProfileCard
            user={{
              id: profile.id,
              name: profile.first_name || profile.username,
              title: profile.user_role,
              location: profile.address,
              avatar: profile.image_url,
              isPro: true,
              stats: {
                equipment: equipmentList.count,
                deals: 0,
                rating: 0,
              },
            }}
          />
        )}
      </div>
    </section>
  )
}

export default ProfileSection
