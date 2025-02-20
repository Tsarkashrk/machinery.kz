import Hero from '@/components/Hero/Hero'
import { Metadata } from 'next'
import HomeSection from './HomeSection'

export const metadata: Metadata = {
  title: 'Home | Machinery',
}

export default function HomePage() {
  return <HomeSection />
}
