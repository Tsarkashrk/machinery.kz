import Hero from '@/components/Hero/Hero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home | Machinery',
}

export default function HomePage() {
  return <Hero />
}
