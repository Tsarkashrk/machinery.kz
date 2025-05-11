import { Users, ShoppingBag, House, MessagesSquare, Heart, BadgeCheck, Search } from 'lucide-react'

import Link from 'next/link'
import { PLATFORM_PAGES } from '@/shared/config/pages-url.config'
import { usePathname } from 'next/navigation'
import { ICON_SIZE } from '@/shared/constants/constants'
import { useTranslations } from 'next-intl'
import Input from '@/shared/ui/Input/Input'

const Navigation = () => {
  const path = usePathname()
  const t = useTranslations('Navigation')

  const navItems = [
    { link: `${PLATFORM_PAGES.CATALOG}`, title: `${t('catalog-title')}`, icon: <ShoppingBag size={ICON_SIZE} /> },
    { link: `${PLATFORM_PAGES.BRANDS}`, title: t('brands-title'), icon: <BadgeCheck size={ICON_SIZE} /> },
    { link: `${PLATFORM_PAGES.DEALERS}`, title: t('dealers-title'), icon: <Users size={ICON_SIZE} /> },
  ]

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {navItems.map((item) => (
          <li key={item.link} className="navigation__item">
            <Link href={item.link} className={`navigation__link ${path === item.link && 'navigation__link--active'}`}>
              {item.icon} {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="navigation__search">
        <Input placeholder="Search" id="search">
          <Search size={ICON_SIZE} />
        </Input>
      </div>
    </nav>
  )
}

export default Navigation
