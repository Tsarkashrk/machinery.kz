'use client'

import { IUser } from '@/types/user.type'
import Button from '../ui/Buttons/Button'
import { useProfile } from '@/hooks/useProfile'

interface IData {
  text: string
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
            <Button textStart="start" key={item.text} text={item.text} variant="light" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
