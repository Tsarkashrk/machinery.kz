import { Metadata } from 'next'
import { ProfileOrdersSection } from './ProfileOrdersSection'

export const metadata: Metadata = {
  title: 'Мои сделки',
}

export default function ProfileOrdersPage() {
  return (
    <div className="profile-orders">
      <ProfileOrdersSection />
    </div>
  )
}
