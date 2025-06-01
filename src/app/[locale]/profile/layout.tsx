import { hasLocale, NextIntlClientProvider } from 'next-intl'
import React, { ReactNode } from 'react'
import { Providers } from '../providers'
import { routing } from '@/i18n/routing'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ProfileSidebarWrapper } from './ProfileSidebarWrapper'
import { ProfileContentWrapper } from './ProfileContentWrapper'

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function DashboardLayout({ children, params }: Props) {
  const resolvedParams = await params
  const { locale } = resolvedParams

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const t = getTranslations('DashboardPage')

  const messages = await getMessages({ locale })

  return (
    <div className="dashboard-layout">
      {/* <Providers> */}
      {/* <NextIntlClientProvider messages={messages} locale={locale}> */}
      <div className="dashboard-layout__sidebar">
        <ProfileSidebarWrapper />
      </div>
      <main className="dashboard-layout__content">
        <ProfileContentWrapper>{children}</ProfileContentWrapper>
      </main>
      {/* </NextIntlClientProvider> */}
      {/* </Providers> */}
    </div>
  )
}
