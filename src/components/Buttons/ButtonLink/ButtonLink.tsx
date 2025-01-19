'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

import styles from './_button-link.module.scss'
import { usePathname } from 'next/navigation'

interface IButtonLink {
  link: string
  text: string
  img: ReactNode
}

const ButtonLink = ({ link, text, img }: IButtonLink) => {
  const isActive = usePathname().startsWith(link)

  return (
    <Link className={`${styles.buttonLink} ${isActive && styles['buttonLink--active']}`} href={link}>
      {img}
      {text}
    </Link>
  )
}

export default ButtonLink
