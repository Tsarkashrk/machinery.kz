'use client'

import Link from 'next/link'

import { UserPen, Plus, Globe } from 'lucide-react'

import Navigation from '../Navigation/Navigation'
import Button from '../ui/Buttons/Button'
import { PLATFORM_PAGES } from '@/config/pages-url.config'
import { useProfile } from '@/hooks/useProfile'
import { ICON_SIZE } from '@/constants/constants'
import Avatar from '../ui/Avatar/Avatar'

const Header = () => {
  const { data } = useProfile()

  return (
    <header className="header">
      <div className="header__wrapper">
        <Link className="header__logo" href={PLATFORM_PAGES.HOME}>
          mchnry_kz
        </Link>
        <Navigation />
        <div className="header__buttons">
          <Button icon={<Plus size={ICON_SIZE} />} link={PLATFORM_PAGES.NEW} variant="default" text="New listing" isLink />

          {/* <Button icon={<Globe size={ICON_SIZE} />} text="EN" variant="outlined" /> */}

          {data ? <Avatar username={data?.username} link={PLATFORM_PAGES.PROFILE} /> : <Button isLink text="Log in or Sign up" link={PLATFORM_PAGES.LOGIN} variant="outlined" />}
        </div>
      </div>
    </header>
  )
}

export default Header
