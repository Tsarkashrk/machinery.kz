'use client'

import { ICON_SIZE } from '@/6-shared/constants/constants'
import { BadgeCheck, Building2, ChartGantt, Home, OctagonAlert, PanelsLeftBottomIcon, ShieldCheck, Star, Users } from 'lucide-react'
import { AdminSidebarList } from './AdminSidebarList'
import { useTranslations } from 'next-intl'
import { DASHBOARD_PAGES } from '@/6-shared/config/pages-url.config'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const AdminSidebar = () => {
  const pathname = usePathname()
  const isActive = pathname.includes(DASHBOARD_PAGES.root)

  const t = useTranslations('DashboardPage')

  const mainManagement = [{ name: 'Главная', path: `${DASHBOARD_PAGES.root}`, icon: <Home size={ICON_SIZE} /> }]

  const userManagement = [
    { name: 'Пользователи', path: `${DASHBOARD_PAGES.USERS}`, icon: <Users size={ICON_SIZE} /> },
    { name: 'Компании', path: `${DASHBOARD_PAGES.COMPANIES}`, icon: <Building2 size={ICON_SIZE} /> },
  ]

  const platformManagement = [
    { name: t('categories'), path: `${DASHBOARD_PAGES.CATEGORIES}`, icon: <ChartGantt size={ICON_SIZE} /> },
    { name: t('brands'), path: `${DASHBOARD_PAGES.BRANDS}`, icon: <BadgeCheck size={ICON_SIZE} /> },
  ]

  const publicationManagement = [
    { name: t('publications'), path: `${DASHBOARD_PAGES.PUBLICATIONS}`, icon: <PanelsLeftBottomIcon size={ICON_SIZE} /> },
    { name: t('verification'), path: `${DASHBOARD_PAGES.VERIFICATION}`, icon: <ShieldCheck size={ICON_SIZE} /> },
  ]

  const feedbackManagement = [
    { name: t('reviews'), path: `${DASHBOARD_PAGES.REVIEWS}`, icon: <Star size={ICON_SIZE} /> },
    { name: t('complaints'), path: `${DASHBOARD_PAGES.COMPLAINTS}`, icon: <OctagonAlert size={ICON_SIZE} /> },
  ]

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar__wrapper">
        <AdminSidebarList routes={mainManagement} />
        <AdminSidebarList title={t('platform-management')} routes={platformManagement} />
        <AdminSidebarList title={t('user-management')} routes={userManagement} />
        <AdminSidebarList title={t('publication-management')} routes={publicationManagement} />
        <AdminSidebarList title={t('feedback-management')} routes={feedbackManagement} />
      </div>
    </div>
  )
}
