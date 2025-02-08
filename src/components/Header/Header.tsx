'use client'

import Link from 'next/link'

import { UserPen, Plus, Globe } from 'lucide-react'

import Navigation from '../Navigation/Navigation'
import Button from '../ui/Button/Button'
import { PLATFORM_PAGES } from '@/config/pages-url.config'
import { useProfile } from '@/hooks/useProfile'
import { useEffect, useState } from 'react'
import { IUser } from '@/types/user.type'
import Avatar from '../ui/Avatar/Avatar'

const Header = () => {
  const { data } = useProfile()

  return (
    <header className="header">
      <Link className="header__logo" href={PLATFORM_PAGES.HOME}>
        mchnry_kz
      </Link>
      <Navigation />
      <div className="header__buttons">
        <Button isLoading icon={<Plus size={18} />} link={PLATFORM_PAGES.NEW} text="New listing" variant="green" isLink />

        <Button icon={<Globe size={18} />} text="EN" variant="default" />

        {data ? <Avatar link={PLATFORM_PAGES.PROFILE} username={data.username} /> : <Button isLink text="Log in or Sign up" link={PLATFORM_PAGES.LOGIN} variant="outlined" />}
      </div>
    </header>
  )
}

export default Header
