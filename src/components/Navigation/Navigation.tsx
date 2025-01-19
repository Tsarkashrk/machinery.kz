import { Handshake, House, ShoppingBag } from 'lucide-react'

import ButtonLink from '../Buttons/ButtonLink/ButtonLink'

import styles from './_navigation.module.scss'

const navItems = [
  { link: '/catalog', title: 'Catalog', img: <House size={20} /> },
  { link: '/purchase', title: 'Purchase', img: <ShoppingBag size={20} /> },
  { link: '/rent', title: 'Rent', img: <Handshake size={20} /> },
]

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__list}>
        {navItems.map((item) => (
          <li key={item.link} className={styles.navigation__item}>
            <ButtonLink link={item.link} img={item.img} text={item.title} />
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
