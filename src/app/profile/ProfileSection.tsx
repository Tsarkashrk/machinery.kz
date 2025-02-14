'use client'

import Sidebar from '@/components/Sidebar/Sidebar'
import { LogoutButton } from '@/components/ui/Buttons/LogoutButton'
import { useProfile } from '@/hooks/useProfile'
import React from 'react'

const ProfileSection = () => {
  const { data, isLoading } = useProfile()

  if (isLoading) {
    return <>...Loading</>
  }

  return (
    <section className="profile-view">
      {data?.username} {data?.email}
      <LogoutButton />
    </section>
  )
}

export default ProfileSection
