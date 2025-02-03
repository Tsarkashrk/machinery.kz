import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import '../scss/main.css'
import Header from '@/components/Header/Header'
import { SITE_NAME } from '@/constants/seo.constant'

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
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable}`}>
        <Header />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  )
}
