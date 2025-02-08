'use client'

import { LogoutButton } from '@/components/ui/LogoutButton/LogoutButton'
import { useProfile } from '@/hooks/useProfile'
import React from 'react'

const ProfileView = () => {
  const { data, isLoading } = useProfile()

  if (isLoading) {
    return <>...Loading</>
  }

  return (
    <div className="profile-view">
      {data?.username} {data?.email}
      <LogoutButton />
    </div>
  )
}

export default ProfileView
