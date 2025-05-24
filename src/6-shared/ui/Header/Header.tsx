'use client'

import Link from 'next/link'

import { Plus, MessagesSquare, Heart } from 'lucide-react'

import Navigation from '../Navigation/Navigation'
import Button from '../Buttons/Button'
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config'
import { useProfile } from '@/5-entities/user'
import { ICON_SIZE } from '@/6-shared/constants/constants'
import Avatar from '../Avatar/Avatar'
import { usePathname } from 'next/navigation'
import { Logo } from '@/6-shared/ui/Logo/Logo'
import { useTranslations } from 'next-intl'

const Header = () => {
  const { profile } = useProfile()
  const path = usePathname()

  const tNav = useTranslations('Navigation')
  const tButton = useTranslations('Button')

  const actionLinks = [
    { link: `${PLATFORM_PAGES.MESSAGES}`, title: tNav('messages-title'), icon: <MessagesSquare size={ICON_SIZE} /> },
    { link: `${PLATFORM_PAGES.FAVORITES}`, title: tNav('favorites-title'), icon: <Heart size={ICON_SIZE} /> },
  ]

  return (
    <header className="header">
      <div className="header__wrapper">
        {/* <div className="header__top">
          <MapPin size={ICON_SIZE} /> Astana
        </div> */}
        <div className="header__bottom">
          <Logo />
          <Navigation />
          <div className="header__buttons">
            <Button link={PLATFORM_PAGES.NEW} variant="default" isLink>
              <Plus size={ICON_SIZE} />
              {tButton('new-listing')}
            </Button>

            {/* <Button icon={<Globe size={ICON_SIZE} />} text="EN" variant="outlined" /> */}
            <div className="header__actions">
              {actionLinks.map((item) => (
                <Link key={item.link} href={item.link} className={`header__link ${path === item.link && 'header__link--active'}`}>
                  {item.icon}
                </Link>
              ))}
            </div>

            {profile ? (
              <Avatar username={profile.username} link={PLATFORM_PAGES.PROFILE} />
            ) : (
              <Button isLink link={PLATFORM_PAGES.LOGIN} variant="outlined">
                {tButton('login')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
