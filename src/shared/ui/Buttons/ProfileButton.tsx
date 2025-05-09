'use client'

import { PLATFORM_PAGES } from '@/config/pages-url.config'
import Link from 'next/link'
import Avatar from '../Avatar/Avatar'
import { useProfile } from '@/hooks/useProfile'

interface ProfileButtonProps {
  email: string
  username: string
}

const ProfileButton = (data: ProfileButtonProps) => {
  return (
    <Link href={PLATFORM_PAGES.PROFILE} className="profile-button">
      <Avatar link={PLATFORM_PAGES.PROFILE} username={data.username} />
      <p className="profile-button__email">{data.email}</p>
    </Link>
  )
}

export default ProfileButton
