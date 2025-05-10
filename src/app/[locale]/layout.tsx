import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter, Poppins } from 'next/font/google'
import localFont from 'next/font/local'
import '@/scss/main.css'
import Header from '@/shared/components/Header/Header'
import { SITE_NAME } from '@/shared/constants/seo.constant'
import { Providers } from './providers'
import { Toaster } from 'sonner'
import Footer from '@/shared/components/Footer/Footer'
import { NextIntlClientProvider, hasLocale, useMessages } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import NotFoundPage from './not-found'

const gilroyFont = localFont({
  src: [
    {
      path: '../fonts/Gilroy-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Gilroy-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/Gilroy-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Gilroy-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../fonts/Gilroy-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Gilroy-SemiboldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../fonts/Gilroy-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Gilroy-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-gilroy',
})

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s - ${SITE_NAME}`,
  },
  description: 'Best one for purchase and rent',
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const { locale } = params
  console.log(locale)
  const messages = getMessages()

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${gilroyFont.className} ${poppins.variable}`}>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <main className="main">
              <div className="main__wrapper">{children}</div>
            </main>
            <Toaster theme="light" position="top-right" duration={5000} richColors closeButton />
            <Footer />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
