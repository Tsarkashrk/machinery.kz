'use client'

import Link from 'next/link'

import { UserPen, Plus, Globe } from 'lucide-react'

import Navigation from '../Navigation/Navigation'
import Button from '../ui/Button/Button'
import { PLATFORM_PAGES } from '@/config/pages-url.config'
import { useProfile } from '@/hooks/useProfile'

const Header = () => {
  const { data, isLoading } = useProfile()

  return (
    <header className="header">
      <Link className="header__logo" href={PLATFORM_PAGES.HOME}>
        mchnry_kz
      </Link>
      <Navigation />
      <div className="header__buttons">
        <Button isLoading icon={<Plus size={18} />} link={PLATFORM_PAGES.NEW} text="Create listing" variant="green" isLink />

        <Button icon={<Globe size={18} />} text="EN" variant="default" />

        {isLoading ? 'Loading...' : data ? <Button isLink icon={<UserPen size={18} />} text=">" link={PLATFORM_PAGES.PROFILE} variant="default" /> : <Button isLink text="Log in or Sign up" link={PLATFORM_PAGES.LOGIN} variant="outlined" />}
      </div>
    </header>
  )
}

export default Header
