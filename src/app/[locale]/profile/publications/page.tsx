import { Metadata } from 'next'
import { ProfilePublicationsSection } from './ProfilePublicationsSection'

export const metadata: Metadata = {
  title: 'Мои объявления',
}

export default function ProfilePublicationsPage() {
  return <ProfilePublicationsSection />
}
