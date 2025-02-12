'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface IButton {
  isLink?: boolean
  isLoading?: boolean
  link?: string
  text?: string
  icon?: ReactNode
  variant?: 'light' | 'dark' | 'primary' | 'secondary' | 'profile' | 'default' | 'outlined' | 'green' | 'underlined' | 'rounded'
  onClick?: () => void
}

const Button = ({ isLoading, isLink = false, link = '', text, icon, variant = 'default', onClick }: IButton) => {
  const pathname = usePathname()
  const isActive = link && pathname.startsWith(link)

  const baseClass = 'button'
  const variantClass = `${baseClass}--${variant}`
  const activeClass = isActive ? `${variantClass}--active` : ''

  const className = `${baseClass} ${variantClass} ${activeClass}`.trim()

  const ButtonContent = (
    <>
      {icon && <span className={`button__icon`}>{icon}</span>}
      {text}
    </>
  )

  return isLink ? (
    <Link className={className} href={link}>
      {ButtonContent}
    </Link>
  ) : (
    <button className={className} onClick={onClick}>
      {ButtonContent}
    </button>
  )
}

export default Button
