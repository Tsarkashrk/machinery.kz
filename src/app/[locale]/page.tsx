import { Metadata } from 'next'
import HomeSection from './HomeSection'

export const metadata: Metadata = {
  title: 'Home',
}

export default async function HomePage() {
  return <HomeSection />
}
