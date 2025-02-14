import { Users, ShoppingBag, House, MessagesSquare, Heart } from 'lucide-react'

import Link from 'next/link'
import { PLATFORM_PAGES } from '@/config/pages-url.config'
import { usePathname } from 'next/navigation'
import { ICON_SIZE } from '@/constants/constants'

const navItems = [
  { link: `${PLATFORM_PAGES.HOME}`, title: 'Home', icon: <House size={ICON_SIZE} /> },
  { link: `${PLATFORM_PAGES.CATALOG}`, title: 'Catalog', icon: <ShoppingBag size={ICON_SIZE} /> },
  { link: `${PLATFORM_PAGES.DEALERS}`, title: 'Dealers', icon: <Users size={ICON_SIZE} /> },
  { link: `${PLATFORM_PAGES.MESSAGES}`, title: 'Messages', icon: <MessagesSquare size={ICON_SIZE} /> },
  { link: `${PLATFORM_PAGES.FAVORITES}`, title: 'Favorites', icon: <Heart size={ICON_SIZE} /> },
]

const Navigation = () => {
  const path = usePathname()

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
    </nav>
  )
}

export default Navigation
