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
  type?: 'button' | 'submit' | 'reset' | undefined
  variant?: 'light' | 'dark' | 'default' | 'outlined' | 'underlined' | 'secondary' | 'rounded' | 'danger' | 'success'
  textStart?: 'start' | 'middle' | 'end'
  children?: ReactNode
  onClick?: () => void
}

const Button = ({ isLoading = false, width, textStart = 'middle', link = '', text, icon, variant = 'default', onClick, type, children }: IButton) => {
  const pathname = usePathname()
  const isActive = link && pathname.startsWith(link)

  const baseClass = 'button'
  const variantClass = `${baseClass}--${variant}`
  const activeClass = isActive ? `${variantClass}--active` : ''
  const isLoadingClass = isLoading ? `${baseClass}--loading` : ''

  const className = `${baseClass} ${variantClass} ${activeClass} ${isLoadingClass}`.trim()

  return link ? (
    <Link className={`${className} ${textStart && 'button--' + textStart}`} href={link} style={{ width: `${width}` }}>
      {children}
    </Link>
  ) : (
    <button disabled={isLoading} type={type} className={`${className} ${textStart && 'button--' + textStart}`} onClick={onClick} style={{ width: `${width}` }}>
      {children}
    </button>
  )
}

export default Button
