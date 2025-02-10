'use client'

import Link from 'next/link'

import { UserPen, Plus, Globe } from 'lucide-react'

import Navigation from '../Navigation/Navigation'
import Button from '../ui/Buttons/Button'
import { PLATFORM_PAGES } from '@/config/pages-url.config'
import { useProfile } from '@/hooks/useProfile'
import { useEffect, useState } from 'react'
import { IUser } from '@/types/user.type'
import Avatar from '../ui/Avatar/Avatar'
import ProfileButton from '../ui/Buttons/ProfileButton'

const Header = () => {
  const { data } = useProfile()

  return (
    <header className="header">
      <Link className="header__logo" href={PLATFORM_PAGES.HOME}>
        mchnry_kz
      </Link>
      <Navigation />
      <div className="header__buttons">
        <Button isLoading icon={<Plus size={18} />} link={PLATFORM_PAGES.NEW} variant="green" text='New listing' isLink />

        <Button icon={<Globe size={18} />} text="EN" variant="default" />

        {data ? <Avatar username={data?.username} link={PLATFORM_PAGES.PROFILE} /> : <Button isLink text="Log in or Sign up" link={PLATFORM_PAGES.LOGIN} variant="outlined" />}
      </div>
    </header>
  )
}

export default Header
