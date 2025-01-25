'use client'

import Link from 'next/link'

import { UserPen, Plus, Globe } from 'lucide-react'

import Navigation from '../Navigation/Navigation'
import Button from '../Button/Button'

const Header = () => {
  const isAuth = false

  return (
    <header className="header">
      <Link className="header__logo" href="/">
        mchnry_kz
      </Link>
      <Navigation />
      <div className="header__buttons">
        <Button icon={<Plus size={18} />} link="/new" text="Create listing" variant="light" isLink />
        <Button icon={<Globe size={18} />} text="EN" variant="default" />
        {isAuth ? <Button isLink icon={<UserPen size={18} />} text=">" link={'/profile'} variant="default" /> : <Button isLink text="Login or Sign up" link={'/profile'} variant="outlined" />}
      </div>
    </header>
  )
}

export default Header
