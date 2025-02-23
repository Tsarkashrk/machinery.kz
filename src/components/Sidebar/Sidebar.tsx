'use client'

import { IUser } from '@/types/user.type'
import Button from '../ui/Buttons/Button'
import { useProfile } from '@/hooks/useProfile'
import { ReactNode } from 'react'
import { LogoutButton } from '../ui/Buttons/LogoutButton'

interface IData {
  text: string
  icon: ReactNode
}

interface SidebarProps {
  sidebarData: IData[]
}

const Sidebar = ({ sidebarData }: SidebarProps) => {
  const { data } = useProfile()

  return (
    <div className="sidebar">
      <div className="sidebar__wrapper">
        <div className="sidebar__header">
          <div className="sidebar__logo">{data?.username?.charAt(0)}</div>
          <h1 className="sidebar__name">{data?.username}</h1>
          <p className="sidebar__email">{data?.email}</p>
        </div>
        <div className="sidebar__buttons">
          {sidebarData.map((item) => (
            // <Button textStart="start" icon={item.icon} key={item.text} text={item.text} variant="light" />
            <button type="button" className="sidebar__button">
              {item.icon} {item.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
