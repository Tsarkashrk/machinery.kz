import { Metadata } from 'next'
import ProfileSection from './ProfileSection'
import Sidebar from '@/shared/components/Sidebar/Sidebar'
import { useProfile } from '@/hooks/useProfile'
import { ListChecks, ShoppingBasket, User } from 'lucide-react'
import { ICON_SIZE } from '@/constants/constants'

export const metadata: Metadata = {
  title: 'Profile',
}

const sidebarData = [
  {
    icon: <User size={ICON_SIZE} />,
    text: 'Edit profile',
  },
  { text: 'Orders', icon: <ListChecks size={ICON_SIZE} /> },
  { text: 'Cart', icon: <ShoppingBasket size={ICON_SIZE} /> },
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
