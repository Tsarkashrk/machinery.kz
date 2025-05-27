'use client'

import { ICON_SIZE } from '@/6-shared/constants/constants'
import { BadgeCheck, ChartGantt, OctagonAlert, PanelsLeftBottomIcon, ShieldCheck, Star, Users } from 'lucide-react'
import { AdminSidebarList } from './AdminSidebarList'

const userManagement = [{ name: 'Пользователи', path: 'users', icon: <Users size={ICON_SIZE} /> }]

const platformManagement = [
  { name: 'Категории', path: 'categories', icon: <ChartGantt size={ICON_SIZE} /> },
  { name: 'Бренды', path: 'brands', icon: <BadgeCheck size={ICON_SIZE} /> },
]

const publicationManagement = [
  { name: 'Публикации', path: 'publications', icon: <PanelsLeftBottomIcon size={ICON_SIZE} /> },
  { name: 'Верификация', path: 'verification', icon: <ShieldCheck size={ICON_SIZE} /> },
]

const feedbackManagement = [
  { name: 'Отзывы', path: 'reviews', icon: <Star size={ICON_SIZE} /> },
  { name: 'Жалобы', path: 'complaints', icon: <OctagonAlert size={ICON_SIZE} /> },
]

export const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar__wrapper">
        <AdminSidebarList title="Управление платформой" routes={platformManagement} />
        <AdminSidebarList title="Управление пользователями" routes={userManagement} />
        <AdminSidebarList title="Управление публикациями" routes={publicationManagement} />
        <AdminSidebarList title="Управление отзывами" routes={feedbackManagement} />
      </div>
    </div>
  )
}
