import { Handshake, House, ShoppingBag } from 'lucide-react'

import Button from '../Button/Button'

const navItems = [
  // { link: '/catalog', title: 'Catalog', icon: <House size={20} /> },
  { link: '/purchase', title: 'Purchase', icon: <ShoppingBag size={18} /> },
  { link: '/rent', title: 'Rent', icon: <Handshake size={18} /> },
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
