import { Metadata } from 'next'
import ProfileSection from './ProfileSection'
import Sidebar from '@/components/Sidebar/Sidebar'
import { useProfile } from '@/hooks/useProfile'
import { ListChecks, ShoppingBasket, User } from 'lucide-react'
import { ICON_SIZE } from '@/constants/constants'

export const metadata: Metadata = {
  title: 'Profile',
}

const sidebarData = [
  {
    icon: <User size={ICON_SIZE} />,
    text: 'My profile',
  },
  { text: 'My orders', icon: <ListChecks size={ICON_SIZE} /> },
  { text: 'My cart', icon: <ShoppingBasket size={ICON_SIZE} /> },
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
