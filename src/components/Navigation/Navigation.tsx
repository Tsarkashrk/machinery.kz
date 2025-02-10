import { Handshake, Users, ShoppingBag } from 'lucide-react'

import Button from '../ui/Buttons/Button'
import { PLATFORM_PAGES } from '@/config/pages-url.config'

const navItems = [
  { link: `${PLATFORM_PAGES.PURCHASE}`, title: 'Purchase', icon: <ShoppingBag size={18} /> },
  { link: `${PLATFORM_PAGES.RENT}`, title: 'Rent', icon: <Handshake size={18} /> },
  { link: `${PLATFORM_PAGES.DEALERS}`, title: 'Dealers', icon: <Users size={18} /> },
]

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {navItems.map((item) => (
          <li key={item.link} className="navigation__item">
            <Button isLink link={item.link} icon={item.icon} text={item.title} variant="default" />
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
