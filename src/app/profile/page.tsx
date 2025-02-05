'use client'

import Button from '@/components/ui/Button/Button'
import { LogoutButton } from '@/components/ui/LogoutButton/LogoutButton'
import { useProfile } from '@/hooks/useProfile'
import { authService } from '@/services/auth.service'

const ProfilePage = () => {
  const { data, isLoading } = useProfile()

  return (
    <main>
      {data?.username} {data?.email}
      <LogoutButton />
    </main>
  )
}

export default ProfilePage
