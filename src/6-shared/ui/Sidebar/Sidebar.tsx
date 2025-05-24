'use client'

import { IUser } from '@/entities/user'
import Button from '../Buttons/Button'
import { useProfile } from '@/entities/user'
import { ReactNode } from 'react'
import { LogoutButton } from '../Buttons/LogoutButton'
import Label from '../Label/Label'

interface IData {
  text: string
  icon: ReactNode
}

interface SidebarProps {
  sidebarData: IData[]
}

const Sidebar = ({ sidebarData }: SidebarProps) => {
  const { profile } = useProfile()

  return (
    <div className="sidebar">
      <div className="sidebar__wrapper">
        <div className="sidebar__header">
          <div className="sidebar__logo">{profile?.username?.charAt(0)}</div>
          <h1 className="sidebar__name">{profile?.username}</h1>
          <p className="sidebar__email">{profile?.email}</p>
        </div>
        <hr />
        <div className="sidebar__buttons">
          {/* <Label text="General" position="start" color="gray" /> */}
          {sidebarData.map((item) => (
            <button key={item.text} type="button" className="sidebar__button">
              {item.icon} {item.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
