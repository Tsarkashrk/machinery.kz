import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <Link className="header__logo" href={PLATFORM_PAGES.HOME}>
          mchnry_kz
        </Link>
      </div>
    </footer>
  )
}

export default Footer
