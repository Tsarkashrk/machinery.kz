import { Metadata } from 'next'
import ProfileSection from './ProfileSection'
import Sidebar from '@/components/Sidebar/Sidebar'
import { useProfile } from '@/hooks/useProfile'

export const metadata: Metadata = {
  title: 'Profile',
}

const sidebarData = [
  {
    text: 'My profile',
  },
  { text: 'My orders' },
  { text: 'My cart' },
]

const ProfilePage = () => {
  return (
    <div className="profile">
      <div className="profile__wrapper">
        <Sidebar sidebarData={sidebarData} />
        <ProfileSection />
      </div>
    </div>
  )
}

export default ProfilePage
