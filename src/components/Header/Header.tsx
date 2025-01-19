import Link from 'next/link'

import { UserPen } from 'lucide-react'

import Navigation from '../Navigation/Navigation'
import styles from './_header.module.scss'
import ButtonLink from '../Buttons/ButtonLink/ButtonLink'

const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.header__logo} href="/">
        machinery_kz
      </Link>
      <Navigation />
      <ButtonLink img={<UserPen size={20} />} text=">" link={'/profile'} />
    </header>
  )
}

export default Header
