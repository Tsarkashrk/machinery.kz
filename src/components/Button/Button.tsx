'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface IButton {
  isLink?: boolean
  link?: string
  text?: string
  icon?: ReactNode
  variant?: 'light' | 'dark' | 'primary' | 'secondary' | 'profile' | 'default' | 'outlined'
  onClick?: () => void
}

const Button = ({ isLink = false, link = '', text, icon, variant = 'default', onClick }: IButton) => {
  const pathname = usePathname()
  const isActive = link && pathname.startsWith(link)

  const baseClass = 'button'
  const variantClass = `${baseClass}--${variant}`
  const activeClass = isActive ? `${variantClass}--active` : ''

  const className = `${baseClass} ${variantClass} ${activeClass}`.trim()

  const Content = (
    <>
      {icon}
      {text}
    </>
  )

  return isLink ? ( 
    <Link className={className} href={link}>
      {Content}
    </Link>
  ) : (
    <button className={className} onClick={onClick}>
      {Content}
    </button>
  )
}

export default Button
