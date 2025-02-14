import { Users, ShoppingBag, House, MessagesSquare } from 'lucide-react'

import Link from 'next/link'
import { PLATFORM_PAGES } from '@/config/pages-url.config'
import { usePathname } from 'next/navigation'

const iconSize = 18

const navItems = [
  { link: `${PLATFORM_PAGES.HOME}`, title: 'Home', icon: <House size={iconSize} /> },
  { link: `${PLATFORM_PAGES.CATALOG}`, title: 'Catalog', icon: <ShoppingBag size={iconSize} /> },
  { link: `${PLATFORM_PAGES.DEALERS}`, title: 'Dealers', icon: <Users size={iconSize} /> },
  { link: `${PLATFORM_PAGES.MESSAGES}`, title: 'Messages', icon: <MessagesSquare size={iconSize} /> },
]

const Navigation = () => {
  const path = usePathname()

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {navItems.map((item) => (
          <li key={item.link} className="navigation__item">
            {path === item.link ? (
              <Link href={item.link} className="navigation__link navigation__link--active">
                {item.icon} {item.title}
              </Link>
            ) : (
              <Link href={item.link} className="navigation__link">
                {item.icon} {item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
