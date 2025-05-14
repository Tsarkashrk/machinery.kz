import { Metadata } from 'next'
import HomeSection from './HomeSection'

export const metadata: Metadata = {
  title: 'Главная',
}

export default function HomePage() {
  return <HomeSection />
}
