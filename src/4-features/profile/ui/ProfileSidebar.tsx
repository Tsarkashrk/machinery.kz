'use client'

import { ICON_SIZE } from '@/6-shared/constants/constants'
import { ChartBarStacked, PanelsLeftBottomIcon, Settings, Users } from 'lucide-react'
import { ProfileSidebarList } from './ProfileSidebarList'
import { useTranslations } from 'next-intl'
import { PROFILE_PAGES } from '@/6-shared/config/pages-url.config'

export const ProfileSidebar = () => {
  const t = useTranslations('DashboardPage')

  const userManagement = [
    { name: 'Профиль', path: `/profile`, icon: <Users size={ICON_SIZE} /> },
    { name: 'Мои публикации', path: `${PROFILE_PAGES.PUBLICATIONS}`, icon: <PanelsLeftBottomIcon size={ICON_SIZE} /> },
    { name: 'Мои сделки', path: `${PROFILE_PAGES.ORDERS}`, icon: <ChartBarStacked size={ICON_SIZE} /> },
    { name: 'Настройки', path: `${PROFILE_PAGES.SETTINGS}`, icon: <Settings size={ICON_SIZE} /> },
  ]

  return (
    <div className="profile-sidebar">
      <div className="profile-sidebar__wrapper">
        <ProfileSidebarList routes={userManagement} />
      </div>
    </div>
  )
}
