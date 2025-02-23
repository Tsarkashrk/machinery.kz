import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import localFont from 'next/font/local'
import '../scss/main.css'
import Header from '@/components/Header/Header'
import { SITE_NAME } from '@/constants/seo.constant'
import { Providers } from './providers'
import { Toaster } from 'sonner'
import Footer from '@/components/Footer/Footer'

const gilroyFont = localFont({
  src: [
    {
      path: './fonts/Gilroy-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Gilroy-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/Gilroy-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Gilroy-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/Gilroy-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Gilroy-SemiboldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: './fonts/Gilroy-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Gilroy-BoldItalic.woff2',
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
    template: `%s | ${SITE_NAME}`,
  },
  description: 'Best one for purchase and rent',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${gilroyFont.className}`}>
        <Providers>
          <Header />
          <main className="main">
            <div className="main__wrapper">{children}</div>
          </main>
          <Toaster theme="light" position="top-right" duration={5000} richColors closeButton />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
