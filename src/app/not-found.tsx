export default function NotFound() {
  return <main>Страница не найдена</main>;
}

// // export default function NotFound() {
// //   return <main>not found</main>
// // }

// import React from 'react'
// import localFont from 'next/font/local'
// import { Geist, Inter } from 'next/font/google'
// import '@/scss/main.css'
// import Button from '@/6-shared/ui/Buttons/Button'
// import { hasLocale, NextIntlClientProvider } from 'next-intl'
// import { Providers } from './[locale]/providers'
// import { getMessages } from 'next-intl/server'
// import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config'

// const gilroyFont = localFont({
//   src: [
//     {
//       path: './fonts/Gilroy-Regular.woff2',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: './fonts/Gilroy-Medium.woff2',
//       weight: '500',
//       style: 'normal',
//     },
//     {
//       path: './fonts/Gilroy-Bold.woff2',
//       weight: '700',
//       style: 'normal',
//     },
//   ],
//   variable: '--font-gilroy',
// })

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// })

// const inter = Inter({
//   variable: '--font-inter',
//   subsets: ['latin'],
// })

// export default async function GlobalNotFound({
//   children,
//   params,
// }: Readonly<{
//   children: React.ReactNode
//   params: { locale: string }
// }>) {
//   const { locale } = await params
//   const messages = await getMessages()

//   return (
//     <html lang={locale}>
//       <body className={`${geistSans.variable} ${inter.variable} ${gilroyFont.className}`}>
//         <Providers>
//           <NextIntlClientProvider messages={messages}>
//             <main className="main">
//               <div className="main__wrapper" style={{ padding: 0 }}>
//                 <div className="not-found-page" style={{ height: '100vh' }}>
//                   <div
//                     className="not-found-content"
//                     style={{
//                       maxWidth: '100%',
//                       height: '100%',
//                       display: 'flex',
//                       gap: '2rem',
//                       flexDirection: 'column',
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                     }}>
//                     <h1 className="not-found-title" style={{ fontSize: '25rem', lineHeight: '1' }}>
//                       404
//                     </h1>
//                     <h1 className="not-found-subtitle" style={{ fontSize: '5rem' }}>
//                       Страница не найдена
//                     </h1>
//                     <p className="not-found-description" style={{ fontSize: '1.8rem' }}>
//                       К сожалению, запрашиваемая страница не существует или была перемещена.
//                     </p>
//                     <div className="not-found-actions" style={{ display: 'flex', gap: '1rem' }}>
//                       <Button variant="default" link={`${PLATFORM_PAGES.HOME}`}>
//                         Вернуться на главную
//                       </Button>
//                       <Button variant="outlined" link={`${PLATFORM_PAGES.CATEGORIES}`}>
//                         Перейти в категории
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </main>
//           </NextIntlClientProvider>
//         </Providers>
//       </body>
//     </html>
//   )
// }
