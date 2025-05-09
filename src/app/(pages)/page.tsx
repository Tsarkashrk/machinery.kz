import Hero from '@/shared/components/Hero/Hero'
import { Metadata } from 'next'
import HomeSection from './HomeSection'

export const metadata: Metadata = {
  title: 'Home',
}

export default function HomePage() {
  return <HomeSection />
}
