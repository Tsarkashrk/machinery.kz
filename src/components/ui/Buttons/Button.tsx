'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface IButton {
  isLink?: boolean
  isLoading?: boolean
  width?: string
  link?: string
  text?: string
  icon?: ReactNode
  variant?: 'light' | 'dark' | 'primary' | 'secondary' | 'profile' | 'default' | 'outlined' | 'green' | 'underlined' | 'rounded' | 'new'
  textStart?: 'start' | 'middle' | 'end'
  onClick?: () => void
}

const Button = ({ isLoading, width, textStart = 'middle', link = '', text, icon, variant = 'default', onClick }: IButton) => {
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

  return link ? (
    <Link className={`${className} ${textStart && 'button--' + textStart}`} href={link} style={{ width: `${width}` }}>
      {ButtonContent}
    </Link>
  ) : (
    <button className={`${className} ${textStart && 'button--' + textStart}`} onClick={onClick} style={{ width: `${width}` }}>
      {ButtonContent}
    </button>
  )
}

export default Button
