'use client'

import { useProfile } from '@/hooks/useProfile'

const ProfilePage = () => {
  const { data, isLoading } = useProfile()

  return (
    <main>
      {data?.username} {data?.email}
    </main>
  )
}

export default ProfilePage
