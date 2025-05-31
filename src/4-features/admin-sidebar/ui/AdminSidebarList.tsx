'use client'

import { Title } from '@/6-shared/ui/Title/Title'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface IRoute {
  name: string
  path: string
  icon: ReactNode
}

type Props = {
  title?: string
  routes: IRoute[]
}

export const AdminSidebarList = ({ routes, title }: Props) => {
  const pathname = usePathname()

  return (
    <div className="admin-sidebar-list">
      <div className="admin-sidebar-list__title">
        <Title fontSize="14px" fontFamily="geist" fontWeight="500" color="gray">
          {title}
        </Title>
      </div>
      <ul className="admin-sidebar-list__list">
        {routes.map((route) => {
          const path = route.path
          const isActive = pathname.includes(route.path)

          return (
            <Link key={route.path} href={path} className={`admin-sidebar-list__route ${isActive ? 'admin-sidebar-list__route--active' : ''}`}>
              {route.icon}
              {route.name}
            </Link>
          )
        })}
      </ul>
    </div>
  )
}
